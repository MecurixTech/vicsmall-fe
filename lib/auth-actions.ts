"use server"

import { cookies } from "next/headers"
import type { LoginResult } from "@/types/auth"

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not defined")
      return false
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

export async function loginUser(values: {
  email: string
  password: string
  recaptchaToken?: string
}): Promise<LoginResult> {
  try {
    
    if (values.recaptchaToken) {
      const isRecaptchaValid = await verifyRecaptcha(values.recaptchaToken)

      if (!isRecaptchaValid) {
        return {
          success: false,
          error: "recaptcha verification failed",
        }
      }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login-customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      cache: "no-store",
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.Message || "Login failed. Please try again.",
      }
    }

    if (data.Success && data.Data) {
      const cookieStore = await cookies()

      cookieStore.set("access_token", data.Data.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 30,
        path: "/",
      })

      cookieStore.set("refresh_token", data.Data.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })

      cookieStore.set("auth_status", "logged_in", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 30,
        path: "/",
      })

      const userData = {
        firstName: data.Data.user.full_name.split(" ")[0],
        fullName: data.Data.user.full_name,
        email: data.Data.user.email,
        phoneNumber: data.Data.user.phone_number,
        countryCode: data.Data.user.country_code,
      }

      return {
        success: true,
        userData,
      }
    }

    return {
      success: false,
      error: "Login failed: No authentication token received",
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}

export async function loginAfterSignup(email: string, password: string): Promise<LoginResult> {
 
  return loginUser({ email, password })
}

export async function checkAuthStatus(): Promise<{ isLoggedIn: boolean }> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")

  return {
    isLoggedIn: !!accessToken,
  }
}

export async function logoutUser(): Promise<{ success: boolean }> {
  const cookieStore = await cookies()

  cookieStore.set("access_token", "", {
    expires: new Date(0),
    path: "/",
  })

  cookieStore.set("refresh_token", "", {
    expires: new Date(0),
    path: "/",
  })

  cookieStore.set("auth_status", "", {
    expires: new Date(0),
    path: "/",
  })

  return { success: true }
}

