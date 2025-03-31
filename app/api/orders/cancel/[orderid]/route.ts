import { type NextRequest, NextResponse } from "next/server";
import { cancelOrder } from "@/lib/order-service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
   
    const { orderId } = await params; 

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const result = await cancelOrder(orderId);

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to cancel order" }, { status: 400 });
    }

    return NextResponse.json({ message: result.message || "Order cancelled successfully" });
  } catch (error) {
    // console.error("Error in cancel order API route:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
