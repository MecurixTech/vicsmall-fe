"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Edit, Trash2, Star } from "lucide-react"
import { toast } from "react-hot-toast"
import { deletePaymentMethodClient, updatePaymentMethodClient } from "@/lib/payment-methods-client"
import type { PaymentMethod } from "@/lib/payment-methods"

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod
  onDelete: (id: string) => void
  onEdit: (paymentMethod: PaymentMethod) => void
  onSetDefault: (id: string) => void
}

export default function PaymentMethodCard({ paymentMethod, onDelete, onEdit, onSetDefault }: PaymentMethodCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSettingDefault, setIsSettingDefault] = useState(false)

  const handleDelete = async () => {
    if (isDeleting) return

    if (confirm("Are you sure you want to delete this payment method?")) {
      setIsDeleting(true)

      try {
        const result = await deletePaymentMethodClient(paymentMethod.payment_method_id)

        if (result.success) {
          onDelete(paymentMethod.payment_method_id)
        }
      } catch (error) {
        console.error("Error deleting payment method:", error)
        toast.error("Failed to delete payment method")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleSetDefault = async () => {
    if (isSettingDefault || paymentMethod.is_default) return

    setIsSettingDefault(true)

    try {
      const result = await updatePaymentMethodClient(paymentMethod.payment_method_id, {
        is_default: true,
      })

      if (result.success) {
        onSetDefault(paymentMethod.payment_method_id)
      }
    } catch (error) {
      console.error("Error setting default payment method:", error)
      toast.error("Failed to set default payment method")
    } finally {
      setIsSettingDefault(false)
    }
  }

  const formattedExpiryDate =
    paymentMethod.expiry_date && paymentMethod.expiry_date.length >= 4
      ? `${paymentMethod.expiry_date.slice(0, 2)}/${paymentMethod.expiry_date.slice(2, 4)}`
      : "Invalid date"

  const getCardType = () => {
    if (!paymentMethod.last4 || typeof paymentMethod.last4 !== "string") {
      return "Credit Card"
    }

    const firstDigit = paymentMethod.last4.charAt(0)
    if (firstDigit === "4") return "Visa"
    if (firstDigit === "5") return "MasterCard"
    if (firstDigit === "3") return "American Express"
    if (firstDigit === "6") return "Discover"
    return "Credit Card"
  }

  const cardType = getCardType()

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
            <CreditCard className="h-6 w-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">{paymentMethod.card_holder || "Unnamed Card"}</h3>
              {paymentMethod.is_default && (
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
            <p className="text-gray-600">•••• •••• •••• {paymentMethod.last4 || "****"}</p>
            <div className="mt-1 flex items-center gap-4">
              <p className="text-sm text-gray-500">{cardType}</p>
              <p className="text-sm text-gray-500">Expires: {formattedExpiryDate}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {!paymentMethod.is_default && (
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
            onClick={() => onEdit(paymentMethod)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Edit payment method"
          >
            <Edit className="h-5 w-5" />
          </motion.button>

          <motion.button
            className="rounded-full p-2 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleDelete}
            disabled={isDeleting}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Delete payment method"
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

