import { type NextRequest, NextResponse } from "next/server";
import { updatePaymentMethod, deletePaymentMethod } from "@/lib/payment-methods";


export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ paymentMethodId: string }> }
) {
  try {
    
    const { paymentMethodId } = await params;
    const body = await request.json();

    if (!paymentMethodId) {
      return NextResponse.json({ error: "Payment method ID is required" }, { status: 400 });
    }

    const result = await updatePaymentMethod(paymentMethodId, {
      card_holder: body.card_holder,
      expiry_date: body.expiry_date,
      is_default: body.is_default,
      full_card_number: body.full_card_number,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update payment method" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error("[API] Error in update payment method API route:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ paymentMethodId: string }> } 
) {
  try {
    
    const { paymentMethodId } = await params;

    if (!paymentMethodId) {
      return NextResponse.json({ error: "Payment method ID is required" }, { status: 400 });
    }

    const result = await deletePaymentMethod(paymentMethodId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to delete payment method" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Payment method deleted successfully" });
  } catch (error) {
    console.error("[API] Error in delete payment method API route:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
