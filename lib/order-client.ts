"use client"

import { toast } from "react-hot-toast"

export async function cancelOrderClient(orderId: string) {
  try {
    toast.loading("Cancelling order...", { id: "cancel-order" })

    const response = await fetch(`/api/orders/cancel/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      toast.error(data.error || "Failed to cancel order", { id: "cancel-order" })
      return { success: false, error: data.error }
    }

    toast.success("Order cancelled successfully", { id: "cancel-order" })
    return { success: true }
  } catch (error) {
    console.error("Error cancelling order:", error)
    toast.error("An error occurred while cancelling the order", { id: "cancel-order" })
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function submitReviewClient(reviewData: {
  product: string
  rating: number
  review: string
}) {
  try {
    toast.loading("Submitting review...", { id: "submit-review" })
    console.log("Submitting review with data:", reviewData)

    const response = await fetch("/api/orders/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })

    const data = await response.json()

    if (!response.ok) {
      let errorMessage = data.error || "Failed to submit review"

      if (typeof data.error === "object") {
        const errors = Object.entries(data.error)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
          .join("; ")
        errorMessage = errors || errorMessage
      }

      toast.error(errorMessage, { id: "submit-review" })
      return { success: false, error: data.error }
    }

    toast.success("Review submitted successfully", { id: "submit-review" })
    return { success: true }
  } catch (error) {
    console.error("Error submitting review:", error)
    toast.error("An error occurred while submitting the review", { id: "submit-review" })
    return { success: false, error: "An unexpected error occurred" }
  }
}

