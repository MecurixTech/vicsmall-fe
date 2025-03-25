import { type NextRequest, NextResponse } from "next/server"
import { getAddresses, createAddress } from "@/lib/addresses"

export async function GET(request: NextRequest) {
  try {
    const result = await getAddresses()
    // console.log("[API] Get addresses result:", result)

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to fetch addresses" }, { status: 400 })
    }

    return NextResponse.json({ data: result.data || [] })
  } catch (error) {
    // console.error("[API] Error in get addresses API route:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // console.log("[API] Creating address with data:", body)

    if (
      !body.full_name ||
      !body.phone_number ||
      !body.address_line1 ||
      !body.city ||
      !body.state ||
      !body.zip_code ||
      !body.country
    ) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    const result = await createAddress({
      full_name: body.full_name,
      phone_number: body.phone_number,
      address_line1: body.address_line1,
      address_line2: body.address_line2,
      city: body.city,
      state: body.state,
      zip_code: body.zip_code,
      country: body.country,
      is_default: body.is_default || false,
    })

    // console.log("[API] Create address result:", result)

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to create address" }, { status: 400 })
    }

    return NextResponse.json({ data: result.data })
  } catch (error) {
    // console.error("[API] Error in create address API route:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

