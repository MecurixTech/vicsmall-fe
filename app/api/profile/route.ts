import { NextResponse } from "next/server"
import { getUserProfile } from "@/lib/profile-actions"

export async function GET() {
  try {
    const response = await getUserProfile()
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in profile API route:", error)
    return NextResponse.json({ error: "Failed to fetch profile", success: false }, { status: 500 })
  }
}

