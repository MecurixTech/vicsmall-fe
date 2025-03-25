"use server"

import { cookies } from "next/headers"
import type { SignUpCredentials, SignUpResult } from "@/types/auth"

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

export async function signUpUser(credentials: SignUpCredentials & { recaptchaToken: string }): Promise<SignUpResult> {
  try {
    
    if (credentials.recaptchaToken) {
      const isRecaptchaValid = await verifyRecaptcha(credentials.recaptchaToken)

      if (!isRecaptchaValid) {
        return {
          success: false,
          error: "recaptcha verification failed",
        }
      }
    }

    const cleanPhoneNumber = credentials.phone_number.replace(/\D/g, "")
    const cleanCountryCode = credentials.country_code.replace(/\D/g, "")

    const payload = {
      email: credentials.email,
      full_name: credentials.full_name,
      country_code: cleanCountryCode,
      phone_number: cleanPhoneNumber,
      password: credentials.password,
      is_customer: true,
      is_active: true,
      is_deleted: false,
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/create-customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    let data
    try {
      data = await response.json()

      if (!response.ok) {
        if (data.Data?.email) {
          return {
            success: false,
            error: data.Data.email[0],
          }
        }

        if (data.Message) {
          return {
            success: false,
            error: data.Message,
          }
        }

        return {
          success: false,
          error: "Sign up failed. Please try again.",
        }
      }

      if (data.Success) {
        if (data.token) {
          const cookieStore = await cookies()

          cookieStore.set({
            name: "access_token",
            value: data.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          })

          if (data.email) {
            cookieStore.set({
              name: "user_email",
              value: data.email,
              secure: process.env.NODE_ENV === "production",
              maxAge: 60 * 60 * 24 * 7,
              path: "/",
            })
          }
        }
        return { success: true }
      }

      return {
        success: false,
        error: data.Message || "Sign up failed. Please try again.",
      }
    } catch (error) {
      console.error("Error parsing response:", error)
      return {
        success: false,
        error: "Unable to parse server response. Please try again later.",
      }
    }
  } catch (error) {
    console.error("Signup error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}

