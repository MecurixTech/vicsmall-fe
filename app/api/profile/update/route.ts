import { type NextRequest, NextResponse } from "next/server"
import { updateUserProfile } from "@/lib/profile-actions"

export async function POST(request: NextRequest) {
  try {
    const profileData = await request.json()

    if (!profileData.full_name || !profileData.phone_number) {
      return NextResponse.json({ error: "Full name and phone number are required", success: false }, { status: 400 })
    }

    const response = await updateUserProfile(profileData)
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in profile update API route:", error)
    return NextResponse.json({ error: "Failed to update profile", success: false }, { status: 500 })
  }
}

