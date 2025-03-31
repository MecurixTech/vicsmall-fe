export async function deleteAddress(addressId: string): Promise<{ success: boolean; error?: string }> {
   
    console.log(`Deleting address with ID: ${addressId}`)
    try {
      
      return { success: true }
    } catch (error: any) {
      console.error("Error deleting address:", error)
      return { success: false, error: "Failed to delete address" }
    }
  }
  
  export async function updateAddress(
    addressId: string,
    addressData: {
      full_name?: string
      phone_number?: string
      address_line1?: string
      address_line2?: string
      city?: string
      state?: string
      zip_code?: string
      country?: string
      is_default?: boolean
    },
  ): Promise<{ success: boolean; data?: any; error?: string }> {
   
    console.log(`Updating address with ID: ${addressId}`, addressData)
    try {
  
      const updatedData = { id: addressId, ...addressData }
      return { success: true, data: updatedData }
    } catch (error: any) {
      console.error("Error updating address:", error)
      return { success: false, error: "Failed to update address" }
    }
  }
  
  