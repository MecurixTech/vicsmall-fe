"use client"

import { toast } from "react-hot-toast"
import type { CreatePaymentMethodData, UpdatePaymentMethodData, PaymentMethod } from "./payment-methods"

export async function getPaymentMethodsClient() {
  try {
    // toast.loading("Loading payment methods...", { id: "payment-methods" })

    const response = await fetch("/api/payment-methods")
    const data = await response.json()

    if (!response.ok) {
      toast.error(data.error || "Failed to load payment methods", { id: "payment-methods" })
      return { success: false, data: [], error: data.error }
    }

    // toast.success("Payment methods loaded", { id: "payment-methods" })
    return { success: true, data: data.data || [] }
  } catch (error) {
    console.error("Error fetching payment methods:", error)
    toast.error("An error occurred while loading payment methods", { id: "payment-methods" })
    return { success: false, data: [], error: "An unexpected error occurred" }
  }
}

export async function createPaymentMethodClient(data: CreatePaymentMethodData) {
  try {
    // toast.loading("Adding payment method...", { id: "add-payment-method" })

    const response = await fetch("/api/payment-methods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()
    console.log("Create payment method response:", responseData)

    if (!response.ok) {
      toast.error(responseData.error || "Failed to add payment method", { id: "add-payment-method" })
      return { success: false, error: responseData.error }
    }

    toast.success("Payment method added successfully", { id: "add-payment-method" })

    let paymentMethod: PaymentMethod | null = null

    if (responseData.data) {
      paymentMethod = responseData.data
    } else if (responseData.Data) {
      paymentMethod = responseData.Data
    }

    if (!paymentMethod) {
      console.error("Unexpected response format:", responseData)
      toast.error("Unexpected response format", { id: "add-payment-method" })
      return { success: false, error: "Unexpected response format" }
    }

    return { success: true, data: paymentMethod }
  } catch (error) {
    console.error("Error adding payment method:", error)
    toast.error("An error occurred while adding payment method", { id: "add-payment-method" })
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updatePaymentMethodClient(paymentMethodId: string, data: UpdatePaymentMethodData) {
  try {
    // toast.loading("Updating payment method...", { id: "update-payment-method" })

    const response = await fetch(`/api/payment-methods/${paymentMethodId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    if (!response.ok) {
      toast.error(responseData.error || "Failed to update payment method", { id: "update-payment-method" })
      return { success: false, error: responseData.error }
    }

    toast.success("Payment method updated successfully", { id: "update-payment-method" })

    let paymentMethod: PaymentMethod | null = null

    if (responseData.data) {
      paymentMethod = responseData.data
    } else if (responseData.Data) {
      paymentMethod = responseData.Data
    }

    if (!paymentMethod) {
      console.error("Unexpected response format:", responseData)
      toast.error("Unexpected response format", { id: "update-payment-method" })
      return { success: false, error: "Unexpected response format" }
    }

    return { success: true, data: paymentMethod }
  } catch (error) {
    console.error("Error updating payment method:", error)
    toast.error("An error occurred while updating payment method", { id: "update-payment-method" })
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deletePaymentMethodClient(paymentMethodId: string) {
  try {
    // toast.loading("Deleting payment method...", { id: "delete-payment-method" })

    const response = await fetch(`/api/payment-methods/${paymentMethodId}`, {
      method: "DELETE",
    })

    const responseData = await response.json()

    if (!response.ok) {
      toast.error(responseData.error || "Failed to delete payment method", { id: "delete-payment-method" })
      return { success: false, error: responseData.error }
    }

    toast.success("Payment method deleted successfully", { id: "delete-payment-method" })
    return { success: true }
  } catch (error) {
    console.error("Error deleting payment method:", error)
    toast.error("An error occurred while deleting payment method", { id: "delete-payment-method" })
    return { success: false, error: "An unexpected error occurred" }
  }
}

