import { getProductDetails } from "@/lib/product-details-actions"
import type { CartItem } from "@/context/cart-context"


export interface EnrichedCartItem extends CartItem {
  name: string
  price: number
  image: string
  variant?: string
  description?: string
}

const productDetailsCache = new Map<string, any>()

export async function enrichCartItems(cartItems: CartItem[]): Promise<EnrichedCartItem[]> {
  if (cartItems.length === 0) {
    return []
  }

  const enrichedItemsPromises = cartItems.map(async (item) => {

    if (item.name && item.price && item.image) {
      return item as EnrichedCartItem
    }

    if (productDetailsCache.has(item.product_id)) {
      const cachedDetails = productDetailsCache.get(item.product_id)
      return {
        ...item,
        name: cachedDetails.name,
        price: cachedDetails.price,
        originalPrice: cachedDetails.originalPrice,
        image: cachedDetails.image,
        variant: cachedDetails.variant,
        description: cachedDetails.description,
      } as EnrichedCartItem
    }

    try {
      const response = await getProductDetails(item.product_id)

      if (!response.success || !response.data) {
        console.error(`[CartProductUtils] Error fetching product details for ${item.product_id}:`, response.error)
        return {
          ...item,
          name: `Product ${item.product_id.substring(0, 8)}...`,
          price: 0,
          originalPrice: 0,
          image: "/placeholder.svg?height=120&width=120",
        } as EnrichedCartItem
      }

      const data = response.data

      const details = {
        name: data.name,
        price: data.currentPrice,
        originalPrice: data.originalPrice,
        image: data.imgSrc,
        variant: data.variant || "",
        description: data.description || "",
      }

      productDetailsCache.set(item.product_id, details)

      return {
        ...item,
        ...details,
      } as EnrichedCartItem
    } catch (error) {
      console.error(`[CartProductUtils] Exception in enrichCartItems for ${item.product_id}:`, error)
      return {
        ...item,
        name: "Unknown Product",
        price: 0,
        originalPrice: 0,
        image: "/placeholder.svg?height=120&width=120",
      } as EnrichedCartItem
    }
  })

  return Promise.all(enrichedItemsPromises)
}

