"use client"

import { motion } from "framer-motion"
import { CreditCard, Plus } from "lucide-react"

interface EmptyPaymentMethodsProps {
  onAddNew: () => void
}

export default function EmptyPaymentMethods({ onAddNew }: EmptyPaymentMethodsProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
      >
        <CreditCard className="h-8 w-8 text-orange-500" />
      </motion.div>

      <motion.h3
        className="mb-2 text-lg font-medium text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        No Payment Methods
      </motion.h3>

      <motion.p
        className="mb-6 max-w-md text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        You haven't added any payment methods yet. Add a payment method to make checkout faster.
      </motion.p>

      <motion.button
        className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 font-medium text-white shadow-md hover:bg-orange-600"
        onClick={onAddNew}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="h-4 w-4" />
        <span>Add Payment Method</span>
      </motion.button>
    </motion.div>
  )
}

