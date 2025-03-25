"use client"

import { motion } from "framer-motion"
import { ShoppingBag, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"

interface CategoryEmptyStateProps {
  title: string
  description: string
  showRefresh?: boolean
  onRefresh?: () => void
}

export default function CategoryEmptyState({
  title,
  description,
  showRefresh = false,
  onRefresh,
}: CategoryEmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-6 rounded-full bg-gray-100 p-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
      >
        <ShoppingBag className="h-16 w-16 text-gray-400" />
      </motion.div>

      <motion.h2
        className="mb-3 text-2xl font-bold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="mb-8 max-w-md text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {description}
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md bg-[#030359] px-6 py-3 font-semibold text-white shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
        </motion.div>

        {showRefresh && onRefresh && (
          <motion.button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-md border border-gray-300 px-6 py-3 font-semibold shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh Results</span>
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}

