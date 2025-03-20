import type { CartItem } from "@/context/cart-context"

export interface CartTotals {
  subtotal: number
  deliveryFee: number
  discount: number
  grandTotal: number
}


export function calculateCartTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((sum, item) => {
    const price = item.price || 0
    return sum + price * item.quantity
  }, 0)

  const deliveryFee = 1500 
  const discount = 0 
  const grandTotal = subtotal + deliveryFee - discount

  return {
    subtotal,
    deliveryFee,
    discount,
    grandTotal,
  }
}


export function getCartTotalsFromStorage(): CartTotals | null {
  try {
    const savedTotals = localStorage.getItem("cart_totals")
    if (savedTotals) {
      return JSON.parse(savedTotals)
    }
  } catch (error) {
    console.error("[CartCalculations] Error loading cart totals from localStorage:", error)
  }
  return null
}


export function saveCartTotalsToStorage(totals: CartTotals): void {
  try {
    localStorage.setItem("cart_totals", JSON.stringify(totals))
    
  } catch (error) {
    console.error("[CartCalculations] Error saving cart totals to localStorage:", error)
  }
}


export function getProductQuantitiesFromStorage(): Record<string, number> | null {
  try {
    const savedQuantities = localStorage.getItem("vicsmall_cart_quantities")
    if (savedQuantities) {
      return JSON.parse(savedQuantities)
    }
  } catch (error) {
    console.error("[CartCalculations] Error loading product quantities from localStorage:", error)
  }
  return null
}


export function prepareCheckoutDataForProduct(
  product: {
    id: string
    name: string
    currentPrice: number
    originalPrice: number
    imgSrc: string
    variant?: string
    description?: string
  },
  quantity: number,
): any {
  const subtotal = product.currentPrice * quantity
  const deliveryFee = 1500
  const discount = 0
  const grandTotal = subtotal + deliveryFee - discount

  return {
    items: [
      {
        product_id: product.id,
        quantity,
        name: product.name,
        price: product.currentPrice,
        originalPrice: product.originalPrice,
        image: product.imgSrc,
        variant: product.variant || "",
        description: product.description || "",
        added_at: new Date().toISOString(),
      },
    ],
    subtotal,
    deliveryFee,
    discount,
    grandTotal,
    paymentMode: "full",
    partPayment: 0,
    partPaymentPercentage: 0,
  }
}

