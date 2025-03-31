import { type NextRequest, NextResponse } from "next/server";
import { updateAddress, deleteAddress } from "@/lib/addresses";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ addressId: string }> }
) {
  try {
    
    const { addressId } = await params;
    const body = await request.json();

    if (!addressId) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
    }

    const result = await updateAddress(addressId, {
      full_name: body.full_name,
      phone_number: body.phone_number,
      address_line1: body.address_line1,
      address_line2: body.address_line2,
      city: body.city,
      state: body.state,
      zip_code: body.zip_code,
      country: body.country,
      is_default: body.is_default,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update address" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ addressId: string }> }
) {
  try {
   
    const { addressId } = await params;

    if (!addressId) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
    }

    const result = await deleteAddress(addressId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to delete address" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
