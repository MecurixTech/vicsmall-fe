"use server"

import { cookies } from "next/headers"

export interface OrderItem {
  id: number
  order_id: string
  amount: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  created_at: string
  is_placed: boolean
  is_packed: boolean
  is_shipped: boolean
  is_out_for_delivery: boolean
  is_delivered: boolean
  items?: Array<{
    quantity: number
    price: number
    product_name: string
    product_image: string
    product_id?: string 
  }>
  product_details?: {
    id: string
    name: string
    price: number
    image: string
  }
}

export interface OrderHistoryResponse {
  success: boolean
  data: OrderItem[]
  error?: string
}

export interface CancelOrderResponse {
  success: boolean
  message?: string
  error?: string
}

export interface ReviewOrderResponse {
  success: boolean
  message?: string
  error?: string
}

interface CreateOrderParams {
  product_id: string
  quantity: number
}

interface CreateOrderResponse {
  success: boolean
  data?: {
    amount: string
    created_at: string
  }
  error?: string
}

const isAuthError = (status: number, errorText: string): boolean => {
  return (
    status === 401 ||
    status === 403 ||
    errorText.includes("Authentication") ||
    errorText.includes("authentication") ||
    errorText.includes("token") ||
    errorText.includes("Token") ||
    errorText.includes("login") ||
    errorText.includes("Login")
  )
}

export async function getOrderHistory(): Promise<OrderHistoryResponse> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
      return {
        success: false,
        data: [],
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/customer/order/history`
    console.log("[OrderService] Fetching orders from:", url)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    })

    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        data: [],
        error: "Authentication required",
      }
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[OrderService] Error fetching order history. Status:", response.status, "Body:", errorText)

      if (isAuthError(response.status, errorText)) {
        return {
          success: false,
          data: [],
          error: "Authentication required",
        }
      }

      let errorData: any = {}
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        console.error("[OrderService] Failed to parse error response as JSON")
      }

      if (errorData.Message && errorData.Message.includes("empty order")) {
        console.log("[OrderService] Empty order detected, returning empty array")
        return {
          success: true,
          data: [], 
        }
      }

      return {
        success: false,
        data: [],
        error: errorData.Message || `Failed to fetch order history. Server returned ${response.status}`,
      }
    }

    let responseData: any
    try {
      responseData = await response.json()
      console.log("[OrderService] Order history response:", responseData)
    } catch (e) {
      console.error("[OrderService] Failed to parse response as JSON:", e)
      return {
        success: false,
        data: [],
        error: "Invalid response format",
      }
    }

    let orders: OrderItem[] = []

    if (Array.isArray(responseData)) {
      orders = responseData
    } else if (responseData && typeof responseData === "object") {
      if (responseData.Data && Array.isArray(responseData.Data)) {
        orders = responseData.Data
      } else if (responseData.data && Array.isArray(responseData.data)) {
        orders = responseData.data
      }
    }

    
    orders = orders.map((order) => {
      if (order.items && order.items.length > 0) {
        const firstItem = order.items[0]
        return {
          ...order,
          product_details: {
            id: order.order_id,
            name: firstItem.product_name,
            price: firstItem.price,
            image: firstItem.product_image,
          },
        }
      }
      return order
    })

    return {
      success: true,
      data: orders,
    }
  } catch (error) {
    console.error("[OrderService] Exception in getOrderHistory:", error)
    return {
      success: false,
      data: [],
      error: "An unexpected error occurred while fetching order history",
    }
  }
}

export async function cancelOrder(orderId: string): Promise<CancelOrderResponse> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/customer/cancel-order/${orderId}`
    console.log("[OrderService] Cancelling order:", url)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    })

    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        error: "Authentication required",
      }
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[OrderService] Error cancelling order. Status:", response.status, "Body:", errorText)

      if (isAuthError(response.status, errorText)) {
        return {
          success: false,
          error: "Authentication required",
        }
      }

      let errorData: any = {}
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        console.error("[OrderService] Failed to parse error response as JSON")
      }

      return {
        success: false,
        error: errorData.Message || `Failed to cancel order. Server returned ${response.status}`,
      }
    }

    let responseData: any
    try {
      responseData = await response.json()
      console.log("[OrderService] Cancel order response:", responseData)
    } catch (e) {
      console.error("[OrderService] Failed to parse response as JSON:", e)
      return {
        success: false,
        error: "Invalid response format",
      }
    }

    return {
      success: true,
      message: responseData.Message || "Order cancelled successfully",
    }
  } catch (error) {
    console.error(`[OrderService] Exception in cancelOrder for order ${orderId}:`, error)
    return {
      success: false,
      error: "An unexpected error occurred while cancelling the order",
    }
  }
}
export async function submitOrderReview(reviewData: {
  product: string
  rating: number
  review: string
}): Promise<ReviewOrderResponse> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/customer-order/review`
    console.log("[OrderService] Submitting review:", url, reviewData)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reviewData),
      cache: "no-store",
    })

    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const responseText = await response.text()
    console.error("[OrderService] Error submitting review. Status:", response.status, "Body:", responseText)

    if (!response.ok) {
      try {
       
        const errorData = JSON.parse(responseText)

        if (errorData.Message && typeof errorData.Message === "object") {
          return {
            success: false,
            error: errorData.Message,
          }
        }

        return {
          success: false,
          error: errorData.Message || `Failed to submit review. Server returned ${response.status}`,
        }
      } catch (e) {
        console.error("[OrderService] Failed to parse error response as JSON")
        return {
          success: false,
          error: `Failed to submit review. Server returned ${response.status}`,
        }
      }
    }

    let responseData: any
    try {
      responseData = JSON.parse(responseText)
      console.log("[OrderService] Submit review response:", responseData)
    } catch (e) {
      console.error("[OrderService] Failed to parse response as JSON:", e)
      return {
        success: false,
        error: "Invalid response format",
      }
    }

    return {
      success: true,
      message: responseData.Message || "Review submitted successfully",
    }
  } catch (error) {
    console.error("[OrderService] Exception in submitOrderReview:", error)
    return {
      success: false,
      error: "An unexpected error occurred while submitting the review",
    }
  }
}

export async function createOrder(data: CreateOrderParams): Promise<CreateOrderResponse> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/customer/instance-order`
    console.log("[OrderService] Creating order:", url, data)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[OrderService] Error creating order. Status:", response.status, "Body:", errorText)
      return {
        success: false,
        error: `Failed to create order. Server returned ${response.status}`,
      }
    }

    const responseData = await response.json()
    console.log("[OrderService] Create order response:", responseData)

    return {
      success: true,
      data: responseData,
    }
  } catch (error) {
    console.error("[OrderService] Exception in createOrder:", error)
    return {
      success: false,
      error: "An unexpected error occurred while creating order",
    }
  }
}

