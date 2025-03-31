"use server"

export interface ProductGalleryItem {
  product_image: string
}

export interface ProductGalleryData {
  product_id: string
  items: ProductGalleryItem[]
  product_name: string
  product_description: string
  product_tags: string
  product_sale_price: string
  product_regular_price: string
  product_visibility: boolean
  product_status: boolean
  product_variant: string
  created_at: string
  updated_at: string
  product_shop: string
  category: string
}

export interface ProductGalleryResponse {
  success: boolean
  data?: ProductGalleryData
  error?: string
}

export async function getProductGallery(productId: string): Promise<ProductGalleryResponse> {
  if (!productId) {
    return { success: false, error: "Product ID is required" }
  }

  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const response = await fetch(
      `${apiBaseUrl}/shop/product-view-all/${productId}`,
      { cache: "no-store" }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to fetch product data")
    }

    const { Data: apiData }: { Data: any[] } = await response.json()
    
    if (!apiData?.length) {
      throw new Error("No product data found in response")
    }

    const primaryProduct = apiData[0]
    
    // Transform image URLs
    const transformedData: ProductGalleryData = {
      ...primaryProduct,
      items: primaryProduct.items?.map((item: any) => ({
        product_image: item.product_image
          ?.replace(/^image\/upload\//, "")
          ?.replace("https://res.cloudinary.com/", "") || ""
      })) || []
    }

    return { 
      success: true,
      data: transformedData
    }

  } catch (error) {
    console.error("Product gallery error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    }
  }
}