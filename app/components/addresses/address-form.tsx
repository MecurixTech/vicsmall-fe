"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { toast } from "react-hot-toast"
import { createAddressClient, updateAddressClient } from "@/lib/addresses-client"
import type { Address } from "@/lib/addresses"

interface AddressFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (address: Address) => void
  editMode?: boolean
  address?: Address
}

export default function AddressForm({ isOpen, onClose, onSuccess, editMode = false, address }: AddressFormProps) {
  const [fullName, setFullName] = useState(address?.full_name || "")
  const [phoneNumber, setPhoneNumber] = useState(address?.phone_number || "")
  const [addressLine1, setAddressLine1] = useState(address?.address_line1 || "")
  const [addressLine2, setAddressLine2] = useState(address?.address_line2 || "")
  const [city, setCity] = useState(address?.city || "")
  const [state, setState] = useState(address?.state || "")
  const [zipCode, setZipCode] = useState(address?.zip_code || "")
  const [country, setCountry] = useState(address?.country || "")
  const [isDefault, setIsDefault] = useState(address?.is_default || false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return
    if (!fullName.trim()) {
      toast.error("Full name is required")
      return
    }

    if (!phoneNumber.trim()) {
      toast.error("Phone number is required")
      return
    }

    if (!addressLine1.trim()) {
      toast.error("Address line 1 is required")
      return
    }

    if (!city.trim()) {
      toast.error("City is required")
      return
    }

    if (!state.trim()) {
      toast.error("State is required")
      return
    }

    if (!zipCode.trim()) {
      toast.error("ZIP code is required")
      return
    }

    if (!country.trim()) {
      toast.error("Country is required")
      return
    }

    setIsSubmitting(true)

    try {
      if (editMode && address) {
       
        const result = await updateAddressClient(address.address_id, {
          full_name: fullName,
          phone_number: phoneNumber,
          address_line1: addressLine1,
          address_line2: addressLine2 || undefined,
          city,
          state,
          zip_code: zipCode,
          country,
          is_default: isDefault,
        })

        if (result.success && result.data) {
          console.log("Address updated successfully:", result.data)
          onSuccess(result.data)
        }
      } else {
      
        const result = await createAddressClient({
          full_name: fullName,
          phone_number: phoneNumber,
          address_line1: addressLine1,
          address_line2: addressLine2 || undefined,
          city,
          state,
          zip_code: zipCode,
          country,
          is_default: isDefault,
        })

        if (result.success && result.data) {
          console.log("Address created successfully:", result.data)
          onSuccess(result.data)
        }
      }
    } catch (error) {
      console.error("Error submitting address:", error)
      toast.error("Failed to save address")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{editMode ? "Edit Address" : "Add New Address"}</h2>
          <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700" onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="mb-1 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="addressLine1" className="mb-1 block text-sm font-medium text-gray-700">
                Address Line 1
              </label>
              <input
                type="text"
                id="addressLine1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="123 Main St"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="addressLine2" className="mb-1 block text-sm font-medium text-gray-700">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                id="addressLine2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Apt 4B"
              />
            </div>

            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="New York"
                required
              />
            </div>

            <div>
              <label htmlFor="state" className="mb-1 block text-sm font-medium text-gray-700">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="NY"
                required
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="mb-1 block text-sm font-medium text-gray-700">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="10001"
                required
              />
            </div>

            <div>
              <label htmlFor="country" className="mb-1 block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="United States"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                Set as default address
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <motion.button
              type="button"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 disabled:opacity-50"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    className="h-4 w-4 rounded-full border-2 border-t-transparent border-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  {editMode ? "Updating..." : "Adding..."}
                </span>
              ) : editMode ? (
                "Update"
              ) : (
                "Add"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

