import { type NextRequest, NextResponse } from "next/server"
import { submitOrderReview } from "@/lib/order-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.product || body.rating === undefined || !body.review) {
      return NextResponse.json({ error: "Product ID, rating, and review are required" }, { status: 400 })
    }

    const result = await submitOrderReview({
      product: body.product,
      rating: body.rating,
      review: body.review,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to submit review" }, { status: 400 })
    }

    return NextResponse.json({ message: result.message || "Review submitted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

