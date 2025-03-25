"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"
import NavbarWrapper from "@/app/components/Navbarwrapper"
import Footer from "@/app/components/footer"
import PaymentMethodCard from "@/app/components/payment-methods/payment-method-card"
import PaymentMethodForm from "@/app/components/payment-methods/payment-method-form"
import EmptyPaymentMethods from "@/app/components/payment-methods/empty-payment-methods"
import { getPaymentMethodsClient } from "@/lib/payment-methods-client"
import type { PaymentMethod } from "@/lib/payment-methods"

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)

 
  const fetchPaymentMethods = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getPaymentMethodsClient()

      if (result.success) {
        setPaymentMethods(result.data || [])
      } else {
        setError(result.error || "Failed to load payment methods")
      }
    } catch (err) {
      // console.error("Error fetching payment methods:", err)
      setError("An unexpected error occurred")
      toast.error("Failed to load payment methods")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPaymentMethods()
  }, [fetchPaymentMethods])

  const handleAddPaymentMethod = useCallback((newPaymentMethod: PaymentMethod) => {
    setPaymentMethods((prev) => {
  
      if (newPaymentMethod.is_default) {
        return [
          newPaymentMethod,
          ...prev.map((pm) => ({
            ...pm,
            is_default: false,
          })),
        ]
      }

      return [newPaymentMethod, ...prev]
    })

    setIsAddModalOpen(false)
  }, [])

 
  const handleEditPaymentMethod = useCallback((updatedPaymentMethod: PaymentMethod) => {
    setPaymentMethods((prev) => {
  
      if (updatedPaymentMethod.is_default) {
        return prev.map((pm) =>
          pm.payment_method_id === updatedPaymentMethod.payment_method_id
            ? updatedPaymentMethod
            : { ...pm, is_default: false },
        )
      }

      return prev.map((pm) =>
        pm.payment_method_id === updatedPaymentMethod.payment_method_id ? updatedPaymentMethod : pm,
      )
    })

    setIsEditModalOpen(false)
    setSelectedPaymentMethod(null)
  }, [])

  const handleDeletePaymentMethod = useCallback((paymentMethodId: string) => {
    setPaymentMethods((prev) => prev.filter((pm) => pm.payment_method_id !== paymentMethodId))
  }, [])

  const handleSetDefaultPaymentMethod = useCallback((paymentMethodId: string) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        is_default: pm.payment_method_id === paymentMethodId,
      })),
    )
  }, [])

  const openEditModal = useCallback((paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod)
    setIsEditModalOpen(true)
  }, [])

  if (loading) {
    return (
      <>
       
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Payment Methods</h1>
          </div>
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="mb-2 h-8 w-8 animate-spin text-orange-500" />
              <p className="text-gray-600">Loading payment methods...</p>
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
            Payment Methods
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
            <button className="mt-2 text-sm font-medium text-red-700 hover:underline" onClick={fetchPaymentMethods}>
              Try again
            </button>
          </div>
        ) : paymentMethods.length === 0 ? (
          <EmptyPaymentMethods onAddNew={() => setIsAddModalOpen(true)} />
        ) : (
          <div>
            {paymentMethods.map((paymentMethod) => (
              <PaymentMethodCard
                key={paymentMethod.payment_method_id}
                paymentMethod={paymentMethod}
                onDelete={handleDeletePaymentMethod}
                onEdit={openEditModal}
                onSetDefault={handleSetDefaultPaymentMethod}
              />
            ))}
          </div>
        )}
      </div>

      

      {/* Add Payment Method Modal */}
      {isAddModalOpen && (
        <PaymentMethodForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddPaymentMethod}
        />
      )}

      {/* Edit Payment Method Modal */}
      {isEditModalOpen && selectedPaymentMethod && (
        <PaymentMethodForm
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedPaymentMethod(null)
          }}
          onSuccess={handleEditPaymentMethod}
          editMode={true}
          paymentMethod={selectedPaymentMethod}
        />
      )}
    </>
  )
}

