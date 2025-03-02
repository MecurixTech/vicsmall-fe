"use server"

import { cookies } from "next/headers"
import type { PreferenceResult } from "@/types/preferences"

export async function savePreferences(categories: string[]): Promise<PreferenceResult> {
  try {
    const payload = {
      selected_categories: categories,
    }

    const accessToken = (await cookies()).get("access_token")?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/customer-preference/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    if (!response.ok) {
      const data = await response.json()
      return {
        success: false,
        error: data.Message || "Failed to save preferences",
      }
    }

    return { success: true }
  } catch (error) {
    
    return {
      success: false,
      error: "An unexpected error occurred while saving preferences",
    }
  }
}

