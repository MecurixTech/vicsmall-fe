"use server"

import { cookies } from "next/headers"

export interface UserProfile {
  id: string
  email: string
  full_name: string
  country_code: string
  phone_number: string
  date_joined: string
}

export interface ProfileResponse {
  success: boolean
  data?: UserProfile
  error?: string
}

export interface UpdateProfileResponse {
  success: boolean
  message?: string
  error?: string
}

export async function getUserProfile(): Promise<ProfileResponse> {
  try {
  
    const accessToken = (await cookies()).get("access_token")?.value

    if (!accessToken) {
      console.log("No access token found, cannot fetch profile")
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/customer-profile`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error fetching user profile:", errorData)
      return {
        success: false,
        error: errorData.Message || "Failed to fetch user profile",
      }
    }

    const data = await response.json()

    if (data.Success && data.Data) {
      console.log("Successfully fetched user profile")
      return {
        success: true,
        data: data.Data,
      }
    }

    return {
      success: false,
      error: data.Message || "Failed to fetch user profile",
    }
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return {
      success: false,
      error: "An unexpected error occurred while fetching user profile",
    }
  }
}

export async function updateUserProfile(profileData: {
  full_name: string
  phone_number: string
  country_code?: string
}): Promise<UpdateProfileResponse> {
  try {

    const accessToken = (await cookies()).get("access_token")?.value

    if (!accessToken) {
      console.log("No access token found, cannot update profile")
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/customer-profile/update`

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profileData),
      cache: "no-store",
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Error updating user profile:", data)
      return {
        success: false,
        error: data.Message || "Failed to update user profile",
      }
    }

    if (data.Success) {
      console.log("Successfully updated user profile")
      return {
        success: true,
        message: data.Message || "Profile updated successfully",
      }
    }

    return {
      success: false,
      error: data.Message || "Failed to update user profile",
    }
  } catch (error) {
    console.error("Error updating user profile:", error)
    return {
      success: false,
      error: "An unexpected error occurred while updating user profile",
    }
  }
}

