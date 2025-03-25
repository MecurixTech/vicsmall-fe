"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Edit, Trash2, Star } from "lucide-react"
import { toast } from "react-hot-toast"
import { deleteAddressClient, updateAddressClient } from "@/lib/addresses-client"
import type { Address } from "@/lib/addresses"

interface AddressCardProps {
  address: Address
  onDelete: (id: string) => void
  onEdit: (address: Address) => void
  onSetDefault: (id: string) => void
}

export default function AddressCard({ address, onDelete, onEdit, onSetDefault }: AddressCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSettingDefault, setIsSettingDefault] = useState(false)

  const handleDelete = async () => {
    if (isDeleting) return

    if (confirm("Are you sure you want to delete this address?")) {
      setIsDeleting(true)

      try {
        const result = await deleteAddressClient(address.address_id)

        if (result.success) {
          onDelete(address.address_id)
        }
      } catch (error) {
        console.error("Error deleting address:", error)
        toast.error("Failed to delete address")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleSetDefault = async () => {
    if (isSettingDefault || address.is_default) return

    setIsSettingDefault(true)

    try {
      const result = await updateAddressClient(address.address_id, {
        is_default: true,
      })

      if (result.success) {
        onSetDefault(address.address_id)
      }
    } catch (error) {
      console.error("Error setting default address:", error)
      toast.error("Failed to set default address")
    } finally {
      setIsSettingDefault(false)
    }
  }

  const formattedAddress = [
    address.address_line1 || "",
    address.address_line2,
    address.city && address.state ? `${address.city}, ${address.state} ${address.zip_code || ""}` : "",
    address.country || "",
  ]
    .filter(Boolean)
    .join(", ")

  return (
    <motion.div
      className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <MapPin className="h-6 w-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">{address.full_name || "Unnamed Address"}</h3>
              {address.is_default && (
                <motion.span
                  className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  Default
                </motion.span>
              )}
            </div>
            <p className="text-gray-600">{formattedAddress || "No address details available"}</p>
            <p className="mt-1 text-sm text-gray-500">{address.phone_number || "No phone number"}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {!address.is_default && (
            <motion.button
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              onClick={handleSetDefault}
              disabled={isSettingDefault}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Set as default"
            >
              {isSettingDefault ? (
                <motion.div
                  className="h-5 w-5 rounded-full border-2 border-t-transparent border-gray-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              ) : (
                <Star className="h-5 w-5" />
              )}
            </motion.button>
          )}

          <motion.button
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onEdit(address)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Edit address"
          >
            <Edit className="h-5 w-5" />
          </motion.button>

          <motion.button
            className="rounded-full p-2 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleDelete}
            disabled={isDeleting}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Delete address"
          >
            {isDeleting ? (
              <motion.div
                className="h-5 w-5 rounded-full border-2 border-t-transparent border-red-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            ) : (
              <Trash2 className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

