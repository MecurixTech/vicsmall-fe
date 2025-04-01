"use server"

import { cookies } from "next/headers"

export interface Vendor {
  id: string
  email: string
  full_name: string
  profile_picture: string
  country_code: string
  phone_number: string
  is_vendor: boolean
  is_active: boolean
  is_deleted: boolean
  shop: string
  status: string
  date: string
}

export interface VendorDetails {
  id: string
  full_name: string
  profile_picture: string
  rating: string
}

export async function getAllVendors(): Promise<Vendor[]> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/customer-vendors`
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`Error fetching vendors. Status: ${response.status}`)
      return []
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Exception in getAllVendors:", error)
    return []
  }
}

export async function getVendorById(vendorId: string): Promise<VendorDetails | null> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/vendors/${vendorId}`
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`Error fetching vendor details. Status: ${response.status}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error(`Exception in getVendorById for vendor ${vendorId}:`, error)
    return null
  }
}