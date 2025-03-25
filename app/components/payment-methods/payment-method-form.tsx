"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, CreditCard } from "lucide-react"
import { toast } from "react-hot-toast"
import { createPaymentMethodClient, updatePaymentMethodClient } from "@/lib/payment-methods-client"
import type { PaymentMethod } from "@/lib/payment-methods"

interface PaymentMethodFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (paymentMethod: PaymentMethod) => void
  editMode?: boolean
  paymentMethod?: PaymentMethod
}

export default function PaymentMethodForm({
  isOpen,
  onClose,
  onSuccess,
  editMode = false,
  paymentMethod,
}: PaymentMethodFormProps) {
  const [cardHolder, setCardHolder] = useState(paymentMethod?.card_holder || "")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState(paymentMethod?.expiry_date || "")
  const [isDefault, setIsDefault] = useState(paymentMethod?.is_default || false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const groups = []

    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4))
    }

    return groups.join(" ")
  }

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "")

    if (digits.length <= 2) {
      return digits
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value)
    setExpiryDate(formattedValue)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return

    if (!cardHolder.trim()) {
      toast.error("Card holder name is required")
      return
    }

    if (!editMode && (!cardNumber.trim() || cardNumber.replace(/\D/g, "").length < 16)) {
      toast.error("Valid card number is required")
      return
    }

    if (!expiryDate.trim() || expiryDate.replace(/\D/g, "").length < 4) {
      toast.error("Valid expiry date is required (MM/YY)")
      return
    }

    setIsSubmitting(true)

    try {
      
      const formattedExpiryDate = expiryDate.replace(/\D/g, "")

      if (editMode && paymentMethod) {
       
        const result = await updatePaymentMethodClient(paymentMethod.payment_method_id, {
          card_holder: cardHolder,
          expiry_date: formattedExpiryDate,
          is_default: isDefault,
        })

        if (result.success && result.data) {
          onSuccess(result.data)
          onClose()
        }
      } else {
        
        const result = await createPaymentMethodClient({
          card_holder: cardHolder,
          expiry_date: formattedExpiryDate,
          is_default: isDefault,
          full_card_number: cardNumber.replace(/\D/g, ""),
        })

        if (result.success && result.data) {
          onSuccess(result.data)
          onClose()
        }
      }
    } catch (error) {
      console.error("Error submitting payment method:", error)
      toast.error("Failed to save payment method")
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
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{editMode ? "Edit Payment Method" : "Add Payment Method"}</h2>
          <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700" onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cardHolder" className="mb-1 block text-sm font-medium text-gray-700">
              Card Holder Name
            </label>
            <input
              type="text"
              id="cardHolder"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="John Doe"
              required
            />
          </div>

          {!editMode && (
            <div className="mb-4">
              <label htmlFor="cardNumber" className="mb-1 block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full rounded-md border border-gray-300 p-2 pl-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
                <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="expiryDate" className="mb-1 block text-sm font-medium text-gray-700">
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="MM/YY"
              maxLength={5}
              required
            />
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
                Set as default payment method
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

