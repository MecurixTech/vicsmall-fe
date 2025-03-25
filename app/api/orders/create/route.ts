import { type NextRequest, NextResponse } from "next/server"
import { createOrder } from "@/lib/order-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // console.log("[API] Creating order with data:", body)

    if (!body.product_id || body.quantity === undefined) {
      return NextResponse.json({ error: "Product ID and quantity are required" }, { status: 400 })
    }

    const result = await createOrder({
      product_id: body.product_id,
      quantity: body.quantity,
    })

    // console.log("[API] Create order result:", result)

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to create order" }, { status: 400 })
    }

    return NextResponse.json({ data: result.data })
  } catch (error) {
    // console.error("[API] Error in create order API route:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

