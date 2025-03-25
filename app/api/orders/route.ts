import { type NextRequest, NextResponse } from "next/server"
import { getOrderHistory } from "@/lib/order-service"

export async function GET(request: NextRequest) {
  try {
    // console.log("[API] Fetching orders")
    const result = await getOrderHistory()
    // console.log("[API] Order history result:", result)

    if (!result.success && result.error) {
  
      if (result.error.includes("empty order")) {
        // console.log("[API] Empty order detected, returning empty array")
        return NextResponse.json({ data: [] })
      }
      return NextResponse.json({ error: result.error || "Failed to fetch orders" }, { status: 400 })
    }

    return NextResponse.json({ data: result.data })
  } catch (error) {
    // console.error("[API] Error in get orders API route:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

