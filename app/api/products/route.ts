import { getProductsByCategory, getFlashProducts, getRecommendedProducts } from "@/lib/product-actions"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category")

  if (!category) {
    return NextResponse.json({ success: false, error: "Category parameter is required" }, { status: 400 })
  }

  try {
   
    let response

    if (category.toLowerCase() === "flash sale") {
      response = await getFlashProducts()
    } else if (category.toLowerCase() === "recommended") {
      response = await getRecommendedProducts()
    } else {
      response = await getProductsByCategory(category)
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in products API route:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

