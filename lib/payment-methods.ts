"use server"

import { cookies } from "next/headers"

export interface PaymentMethod {
  payment_method_id: string
  card_holder: string
  last4: string
  expiry_date: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface CreatePaymentMethodData {
  card_holder: string
  expiry_date: string
  is_default: boolean
  full_card_number: string
}

export interface UpdatePaymentMethodData {
  card_holder?: string
  expiry_date?: string
  is_default?: boolean
  full_card_number?: string
}

export async function getPaymentMethods(): Promise<{ success: boolean; data: PaymentMethod[]; error?: string }> {
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

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/customer-payment-methods`
    console.log("[PaymentMethods] Using API URL:", url)
    console.log("[PaymentMethods] Fetching payment methods from:", url)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[PaymentMethods] Error fetching payment methods. Status:", response.status, "Body:", errorText)
      return {
        success: false,
        data: [],
        error: `Failed to fetch payment methods. Server returned ${response.status}`,
      }
    }

    const responseData = await response.json()
    console.log("[PaymentMethods] Payment methods response:", responseData)

    let paymentMethods: PaymentMethod[] = []

    if (responseData.Data && Array.isArray(responseData.Data)) {
      paymentMethods = responseData.Data
    } else if (Array.isArray(responseData)) {
      paymentMethods = responseData
    } else if (responseData.data && Array.isArray(responseData.data)) {
      paymentMethods = responseData.data
    }

    console.log("[PaymentMethods] Extracted payment methods:", paymentMethods)

    return {
      success: true,
      data: paymentMethods,
    }
  } catch (error) {
    console.error("[PaymentMethods] Exception in getPaymentMethods:", error)
    return {
      success: false,
      data: [],
      error: "An unexpected error occurred while fetching payment methods",
    }
  }
}

export async function createPaymentMethod(
  data: CreatePaymentMethodData,
): Promise<{ success: boolean; data?: PaymentMethod; error?: string }> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/customer-payment-methods`
    console.log("[PaymentMethods] Using API URL:", url)
    console.log("[PaymentMethods] Creating payment method:", url)

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
      console.error("[PaymentMethods] Error creating payment method. Status:", response.status, "Body:", errorText)
      return {
        success: false,
        error: `Failed to create payment method. Server returned ${response.status}`,
      }
    }

    const responseData = await response.json()
    console.log("[PaymentMethods] Create payment method response:", responseData)

    let paymentMethod: PaymentMethod | null = null

    if (responseData.Data) {
      paymentMethod = responseData.Data
    } else if (responseData.data) {
      paymentMethod = responseData.data
    } else if (responseData.payment_method_id) {
      paymentMethod = responseData
    }

    if (!paymentMethod) {
      console.error("[PaymentMethods] Unexpected response format:", responseData)
      return {
        success: false,
        error: "Unexpected response format",
      }
    }

    return {
      success: true,
      data: paymentMethod,
    }
  } catch (error) {
    console.error("[PaymentMethods] Exception in createPaymentMethod:", error)
    return {
      success: false,
      error: "An unexpected error occurred while creating payment method",
    }
  }
}

export async function updatePaymentMethod(
  paymentMethodId: string,
  data: UpdatePaymentMethodData,
): Promise<{ success: boolean; data?: PaymentMethod; error?: string }> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/customer-payment-methods/${paymentMethodId}`
    console.log("[PaymentMethods] Using API URL:", url)
    console.log("[PaymentMethods] Updating payment method:", url)

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[PaymentMethods] Error updating payment method. Status:", response.status, "Body:", errorText)
      return {
        success: false,
        error: `Failed to update payment method. Server returned ${response.status}`,
      }
    }

    const responseData = await response.json()
    console.log("[PaymentMethods] Update payment method response:", responseData)

    let paymentMethod: PaymentMethod | null = null

    if (responseData.Data) {
      paymentMethod = responseData.Data
    } else if (responseData.data) {
      paymentMethod = responseData.data
    } else if (responseData.payment_method_id) {
      paymentMethod = responseData
    }

    if (!paymentMethod) {
      console.error("[PaymentMethods] Unexpected response format:", responseData)
      return {
        success: false,
        error: "Unexpected response format",
      }
    }

    return {
      success: true,
      data: paymentMethod,
    }
  } catch (error) {
    console.error("[PaymentMethods] Exception in updatePaymentMethod:", error)
    return {
      success: false,
      error: "An unexpected error occurred while updating payment method",
    }
  }
}

export async function deletePaymentMethod(paymentMethodId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/customer-payment-methods/${paymentMethodId}`
    console.log("[PaymentMethods] Using API URL:", url)
    console.log("[PaymentMethods] Deleting payment method:", url)

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[PaymentMethods] Error deleting payment method. Status:", response.status, "Body:", errorText)
      return {
        success: false,
        error: `Failed to delete payment method. Server returned ${response.status}`,
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("[PaymentMethods] Exception in deletePaymentMethod:", error)
    return {
      success: false,
      error: "An unexpected error occurred while deleting payment method",
    }
  }
}

