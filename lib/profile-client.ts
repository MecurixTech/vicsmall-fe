"use client"

import type { UserProfile } from "./profile-actions"

export async function fetchUserProfile(): Promise<{
  success: boolean
  data?: UserProfile
  error?: string
}> {
  try {
    const response = await fetch("/api/profile")

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.error || "Failed to fetch profile",
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching profile:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

export async function updateProfile(profileData: {
  full_name: string
  phone_number: string
  country_code?: string
}): Promise<{
  success: boolean
  message?: string
  error?: string
}> {
  try {
    const response = await fetch("/api/profile/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error updating profile:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

