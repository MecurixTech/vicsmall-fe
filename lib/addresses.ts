"use server"

import { cookies } from "next/headers"

export interface Address {
  address_id: string
  full_name: string
  phone_number: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  zip_code: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface CreateAddressData {
  full_name: string
  phone_number: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  zip_code: string
  country: string
  is_default: boolean
}

export interface UpdateAddressData {
  full_name?: string
  phone_number?: string
  address_line1?: string
  address_line2?: string
  city?: string
  state?: string
  zip_code?: string
  country?: string
  is_default?: boolean
}

export async function getAddresses(): Promise<{ success: boolean; data: Address[]; error?: string }> {
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

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/customer-addresses`
    console.log("[Addresses] Fetching addresses from:", url)

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
      console.error("[Addresses] Error fetching addresses. Status:", response.status, "Body:", errorText)
      return {
        success: false,
        data: [],
        error: `Failed to fetch addresses. Server returned ${response.status}`,
      }
    }

    const responseData = await response.json()
    console.log("[Addresses] Addresses response:", responseData)

    let addresses: Address[] = []

    if (responseData.Data && Array.isArray(responseData.Data)) {
      addresses = responseData.Data
    } else if (Array.isArray(responseData)) {
      addresses = responseData
    } else if (responseData.data && Array.isArray(responseData.data)) {
      addresses = responseData.data
    } else if (responseData.address_id) {
    
      addresses = [responseData]
    }

    addresses = addresses.filter((address) => {
      return (
        address &&
        address.address_id &&
        address.full_name &&
        address.address_line1 &&
        address.city &&
        address.state &&
        address.country
      )
    })

    // console.log("[Addresses] Extracted addresses:", addresses)

    return {
      success: true,
      data: addresses,
    }
  } catch (error) {
    // console.error("[Addresses] Exception in getAddresses:", error)
    return {
      success: false,
      data: [],
      error: "An unexpected error occurred while fetching addresses",
    }
  }
}

export async function createAddress(
  data: CreateAddressData,
): Promise<{ success: boolean; data?: Address; error?: string }> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/customer-addresses`
    console.log("[Addresses] Creating address:", url)
    console.log("[Addresses] Address data:", data)

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
      // console.error("[Addresses] Error creating address. Status:", response.status, "Body:", errorText)
      return {
        success: false,
        error: `Failed to create address. Server returned ${response.status}`,
      }
    }

    const responseData = await response.json()
    // console.log("[Addresses] Create address response:", responseData)

    let address: Address | null = null

    if (responseData.Data) {
      address = responseData.Data
    } else if (responseData.data) {
      address = responseData.data
    } else if (responseData.address_id) {
      address = responseData
    }

    if (!address) {
      console.error("[Addresses] Unexpected response format:", responseData)
      return {
        success: false,
        error: "Unexpected response format",
      }
    }

    return {
      success: true,
      data: address,
    }
  } catch (error) {
    console.error("[Addresses] Exception in createAddress:", error)
    return {
      success: false,
      error: "An unexpected error occurred while creating address",
    }
  }
}

export async function updateAddress(
  addressId: string,
  data: UpdateAddressData,
): Promise<{ success: boolean; data?: Address; error?: string }> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/customer-addresses/${addressId}`
    console.log("[Addresses] Updating address:", url)
    console.log("[Addresses] Update data:", data)

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
      console.error("[Addresses] Error updating address. Status:", response.status, "Body:", errorText)
      return {
        success: false,
        error: `Failed to update address. Server returned ${response.status}`,
      }
    }

    const responseData = await response.json()
    // console.log("[Addresses] Update address response:", responseData)

    let address: Address | null = null

    if (responseData.Data) {
      address = responseData.Data
    } else if (responseData.data) {
      address = responseData.data
    } else if (responseData.address_id) {
      address = responseData
    }

    if (!address) {
      console.error("[Addresses] Unexpected response format:", responseData)
      return {
        success: false,
        error: "Unexpected response format",
      }
    }

    return {
      success: true,
      data: address,
    }
  } catch (error) {
    console.error("[Addresses] Exception in updateAddress:", error)
    return {
      success: false,
      error: "An unexpected error occurred while updating address",
    }
  }
}

export async function deleteAddress(addressId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (!accessToken) {
      return {
        success: false,
        error: "Authentication required",
      }
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/customer-addresses/${addressId}`
    console.log("[Addresses] Deleting address:", url)

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
      console.error("[Addresses] Error deleting address. Status:", response.status, "Body:", errorText)
      return {
        success: false,
        error: `Failed to delete address. Server returned ${response.status}`,
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("[Addresses] Exception in deleteAddress:", error)
    return {
      success: false,
      error: "An unexpected error occurred while deleting address",
    }
  }
}

