"use client"

import { toast } from "react-hot-toast"

interface CreateOrderParams {
  product_id: string
  quantity: number
}

export async function createOrder(data: CreateOrderParams) {
  try {
    // toast.loading("Creating order...", { id: "create-order" })

    const response = await fetch("/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    if (!response.ok) {
      toast.error(responseData.error || "Failed to create order", { id: "create-order" })
      return { success: false, error: responseData.error }
    }

    toast.success("Order created successfully", { id: "create-order" })
    return { success: true, data: responseData.data }
  } catch (error) {
    console.error("Error creating order:", error)
    toast.error("An error occurred while creating order", { id: "create-order" })
    return { success: false, error: "An unexpected error occurred" }
  }
}

