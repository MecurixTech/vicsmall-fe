"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"
import NavbarWrapper from "@/app/components/Navbarwrapper"
import Footer from "@/app/components/footer"
import AddressCard from "@/app/components/addresses/address-card"
import AddressForm from "@/app/components/addresses/address-form"
import EmptyAddresses from "@/app/components/addresses/empty-addresses"
import { getAddressesClient } from "@/lib/addresses-client"
import type { Address } from "@/lib/addresses"

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)

  const fetchAddresses = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getAddressesClient()
      // console.log("Client received addresses:", result)

      if (result.success) {
        setAddresses(result.data || [])
      } else {
        setError(result.error || "Failed to load addresses")
      }
    } catch (err) {
      // console.error("Error fetching addresses:", err)
      setError("An unexpected error occurred")
      toast.error("Failed to load addresses")
    } finally {
      setLoading(false)
    }
  }, [])

 
  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  const handleAddAddress = useCallback((newAddress: Address) => {
    // console.log("Adding new address to state:", newAddress)
    setAddresses((prev) => {
    
      if (newAddress.is_default) {
        return [
          newAddress,
          ...prev.map((addr) => ({
            ...addr,
            is_default: false,
          })),
        ]
      }

      return [newAddress, ...prev]
    })

    setIsAddModalOpen(false)
  }, [])

  const handleEditAddress = useCallback((updatedAddress: Address) => {
    // console.log("Updating address in state:", updatedAddress)
    setAddresses((prev) => {
    
      if (updatedAddress.is_default) {
        return prev.map((addr) =>
          addr.address_id === updatedAddress.address_id ? updatedAddress : { ...addr, is_default: false },
        )
      }

      return prev.map((addr) => (addr.address_id === updatedAddress.address_id ? updatedAddress : addr))
    })

    setIsEditModalOpen(false)
    setSelectedAddress(null)
  }, [])

  const handleDeleteAddress = useCallback((addressId: string) => {
    // console.log("Deleting address from state:", addressId)
    setAddresses((prev) => prev.filter((addr) => addr.address_id !== addressId))
  }, [])

  const handleSetDefaultAddress = useCallback((addressId: string) => {
    // console.log("Setting default address:", addressId)
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        is_default: addr.address_id === addressId,
      })),
    )
  }, [])

  const openEditModal = useCallback((address: Address) => {
    setSelectedAddress(address)
    setIsEditModalOpen(true)
  }, [])

  if (loading) {
    return (
      <>
     
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Addresses</h1>
          </div>
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="mb-2 h-8 w-8 animate-spin text-orange-500" />
              <p className="text-gray-600">Loading addresses...</p>
            </div>
          </div>
        </div>
      
      </>
    )
  }

  return (
    <>
    
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <motion.h1
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Addresses
          </motion.h1>

          <motion.button
            className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-orange-600"
            onClick={() => setIsAddModalOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-4 w-4" />
            <span>Add New</span>
          </motion.button>
        </div>

        {error ? (
          <div className="rounded-lg bg-red-50 p-4 text-red-600">
            <p>{error}</p>
            <button className="mt-2 text-sm font-medium text-red-700 hover:underline" onClick={fetchAddresses}>
              Try again
            </button>
          </div>
        ) : addresses.length === 0 ? (
          <EmptyAddresses onAddNew={() => setIsAddModalOpen(true)} />
        ) : (
          <div>
            {addresses.map((address) => (
              <AddressCard
                key={address.address_id}
                address={address}
                onDelete={handleDeleteAddress}
                onEdit={openEditModal}
                onSetDefault={handleSetDefaultAddress}
              />
            ))}
          </div>
        )}
      </div>

  

      {/* Add Address Modal */}
      {isAddModalOpen && (
        <AddressForm isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={handleAddAddress} />
      )}

      {/* Edit Address Modal */}
      {isEditModalOpen && selectedAddress && (
        <AddressForm
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedAddress(null)
          }}
          onSuccess={handleEditAddress}
          editMode={true}
          address={selectedAddress}
        />
      )}
    </>
  )
}

