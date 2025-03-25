import { type NextRequest, NextResponse } from "next/server"
import { getPaymentMethods, createPaymentMethod } from "@/lib/payment-methods"

export async function GET(request: NextRequest) {
  try {
    const result = await getPaymentMethods()
    console.log("[API] Get payment methods result:", result)

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to fetch payment methods" }, { status: 400 })
    }

    return NextResponse.json({ data: result.data || [] })
  } catch (error) {
    console.error("[API] Error in get payment methods API route:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[API] Creating payment method with data:", {
      ...body,
      full_card_number: body.full_card_number ? "****" : undefined,
    })

    if (!body.card_holder || !body.expiry_date || !body.full_card_number) {
      return NextResponse.json({ error: "Card holder, expiry date, and card number are required" }, { status: 400 })
    }

    const result = await createPaymentMethod({
      card_holder: body.card_holder,
      expiry_date: body.expiry_date,
      is_default: body.is_default || false,
      full_card_number: body.full_card_number,
    })

    console.log("[API] Create payment method result:", result)

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to create payment method" }, { status: 400 })
    }

    return NextResponse.json({ data: result.data })
  } catch (error) {
    console.error("[API] Error in create payment method API route:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

