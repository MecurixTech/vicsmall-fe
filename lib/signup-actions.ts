"use server"

import { cookies } from "next/headers"
import type { SignUpCredentials, SignUpResult } from "@/types/auth"

export async function signUpUser(credentials: SignUpCredentials): Promise<SignUpResult> {
  
  try {
  
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


    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/create-customer/`, {
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
          const cookiestore = await cookies()
          cookiestore.set({
            name: "auth_token",
            value: data.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          })

          if (data.email) {
            cookiestore.set({
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
     
      return {
        success: false,
        error: "Unable to parse server response. Please try again later.",
      }
    }
  } catch (error) {
   
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}

