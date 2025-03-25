import { getProductDetails } from "./product-details-actions"
import type { productData } from "@/app/data/dummyTypes"

export async function getProductById(productId: string): Promise<productData | null> {
  try {
    const response = await getProductDetails(productId)

    if (!response.success || !response.data) {
      console.error(`[ProductUtils] Failed to get product ${productId}:`, response.error)
      return null
    }

    return response.data as unknown as productData
  } catch (error) {
    console.error(`[ProductUtils] Error getting product ${productId}:`, error)
    return null
  }
}
export async function getRelatedProducts(
  currentProductId: string,
  category: string,
  limit = 4,
): Promise<productData[]> {
  

  return []
}

