"use client"

import { toast } from "react-hot-toast"
import type { CreateAddressData, UpdateAddressData, Address } from "./addresses"

export async function getAddressesClient() {
  try {
    

    const response = await fetch("/api/addresses")
    const data = await response.json()

    if (!response.ok) {
      toast.error(data.error || "Failed to load addresses", { id: "addresses" })
      return { success: false, data: [], error: data.error }
    }
    return { success: true, data: data.data || [] }
  } catch (error) {
    console.error("Error fetching addresses:", error)
    toast.error("An error occurred while loading addresses", { id: "addresses" })
    return { success: false, data: [], error: "An unexpected error occurred" }
  }
}

export async function createAddressClient(data: CreateAddressData) {
  try {
    
    const response = await fetch("/api/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()
    console.log("Create address response:", responseData)

    if (!response.ok) {
      toast.error(responseData.error || "Failed to add address", { id: "add-address" })
      return { success: false, error: responseData.error }
    }

    toast.success("Address added successfully", { id: "add-address" })

    let address: Address | null = null

    if (responseData.data) {
      address = responseData.data
    } else if (responseData.Data) {
      address = responseData.Data
    }

    if (!address) {
      console.error("Unexpected response format:", responseData)
      toast.error("Unexpected response format", { id: "add-address" })
      return { success: false, error: "Unexpected response format" }
    }

    return { success: true, data: address }
  } catch (error) {
    console.error("Error adding address:", error)
    toast.error("An error occurred while adding address", { id: "add-address" })
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updateAddressClient(addressId: string, data: UpdateAddressData) {
  try {
   
    const response = await fetch(`/api/addresses/${addressId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()
    console.log("Update address response:", responseData)

    if (!response.ok) {
      toast.error(responseData.error || "Failed to update address", { id: "update-address" })
      return { success: false, error: responseData.error }
    }

    toast.success("Address updated successfully", { id: "update-address" })
    let address: Address | null = null

    if (responseData.data) {
      address = responseData.data
    } else if (responseData.Data) {
      address = responseData.Data
    }

    if (!address) {
      console.error("Unexpected response format:", responseData)
      toast.error("Unexpected response format", { id: "update-address" })
      return { success: false, error: "Unexpected response format" }
    }

    return { success: true, data: address }
  } catch (error) {
    console.error("Error updating address:", error)
    toast.error("An error occurred while updating address", { id: "update-address" })
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deleteAddressClient(addressId: string) {
  try {
    

    const response = await fetch(`/api/addresses/${addressId}`, {
      method: "DELETE",
    })

    const responseData = await response.json()

    if (!response.ok) {
      toast.error(responseData.error || "Failed to delete address", { id: "delete-address" })
      return { success: false, error: responseData.error }
    }

    toast.success("Address deleted successfully", { id: "delete-address" })
    return { success: true }
  } catch (error) {
    console.error("Error deleting address:", error)
    toast.error("An error occurred while deleting address", { id: "delete-address" })
    return { success: false, error: "An unexpected error occurred" }
  }
}

