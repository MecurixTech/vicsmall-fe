"use client"

import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

interface EmptyOrdersProps {
  message?: string
}

export default function EmptyOrders({ message = "You haven't placed any orders yet" }: EmptyOrdersProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-6 rounded-full bg-gray-100 p-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
      >
        <ShoppingBag className="h-12 w-12 text-gray-400" />
      </motion.div>

      <motion.h2
        className="mb-2 text-xl font-bold text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        No Orders Found
      </motion.h2>

      <motion.p
        className="mb-6 max-w-md text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/" className="rounded-md bg-orange-500 px-6 py-3 font-medium text-white shadow-md ">
          Continue Shopping
        </Link>
      </motion.div>
    </motion.div>
  )
}

