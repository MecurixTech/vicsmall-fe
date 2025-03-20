"use server"

import { cookies } from "next/headers"
import type { PreferenceResult } from "@/types/preferences"

const mapInterestToBackendValue = (interest: string): string => {
  const mapping: Record<string, string> = {
    Hoodies: "Hoodies",
    "T-shirts": "T-Shirt",
    Trousers: "Trouser",
    "Male wears": "Male Wears",
    Suits: "Suit",
    "Female wears": "Female Wears",
    Watches: "Watches",
    Accessories: "Accessories",
    Bangles: "Bangles",
    Earrings: "Hair Rings",
    Shoes: "Shoes",
    Caps: "Caps",
  }

  return mapping[interest] || interest
}

export async function savePreferences(categories: string[]): Promise<PreferenceResult> {
  try {

    const mappedCategories = categories.map(mapInterestToBackendValue)

    const payload = {
      selected_categories: mappedCategories,
    }

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
      console.error("No access token found")
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/customer-preference`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    const data = await response.json()
  

    if (!response.ok) {
      return {
        success: false,
        error: data.Message || "Failed to save preferences",
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error saving preferences:", error)
    return {
      success: false,
      error: "An unexpected error occurred while saving preferences",
    }
  }
}

