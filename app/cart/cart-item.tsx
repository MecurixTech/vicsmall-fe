"use client"

import type React from "react"
import { useCart } from "@/context/cart-context"
import { Trash2, Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { AddOutlined, RemoveOutlined } from "@mui/icons-material"
import { useState } from "react"
import toast from "react-hot-toast"

const hoverButton = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
}

interface CartItemProps {
  item: {
    cart_id: number
    product_id: string
    quantity: number
    name: string
    price: number
    originalPrice?: number
    image: string
    variant?: string
    added_at: string
  }
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart, isLoading } = useCart()
  const [imageError, setImageError] = useState(false)

  const price = item.price
  const originalPrice = item.originalPrice || price
  const totalPrice = price * item.quantity
  const hasDiscount = originalPrice > price

  const handleIncrease = () => {
    updateQuantity(item.product_id, item.quantity + 1)
     
  }

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product_id, item.quantity - 1)
       
    }
  }

  const handleRemove = () => {
    removeFromCart(item.cart_id)
      .then(() => {
        toast.success(`${item.name} removed from cart`)
      })
      .catch(() => {
        toast.error("Failed to remove item")
      })
  }

  const handleImageError = () => {
    setImageError(true)
    toast.error(`Failed to load image for ${item.name}`)
  }

  return (
    <motion.div
      className="flex gap-4 rounded-lg border p-4 bg-white shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="h-24 w-24 relative overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
        {imageError ? (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
        ) : (
          <Image
            src={item.image || "/placeholder.svg?height=120&width=120"}
            alt={item.name || "Product"}
            width={120}
            height={120}
            className="rounded-lg object-cover transition-transform duration-300 hover:scale-110"
            priority
            onError={handleImageError}
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <Link href={`/product/${item.product_id}`}>
          <motion.h3
            className="mb-2 text-lg font-bold sm:text-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {item.name}
          </motion.h3>
        </Link>
        {item.variant && (
          <motion.p
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {item.variant}
          </motion.p>
        )}

        <motion.div
          className="mb-4 flex flex-wrap items-center gap-4 text-xl font-semibold"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-gray-800">&#8358;{totalPrice.toLocaleString()}</p>
          {hasDiscount && (
            <motion.p
              className="text-lg text-gray-400 line-through"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              &#8358;{(originalPrice * item.quantity).toLocaleString()}
            </motion.p>
          )}
        </motion.div>

        <div className="mt-2 flex items-center justify-between gap-4">
          <motion.div
            className="mb-4 flex w-max items-center gap-2 rounded-xl border border-gray-500 p-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <motion.button
              onClick={handleDecrease}
              aria-label="Decrease quantity"
              className="rounded-xl bg-red-500 p-1 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              variants={hoverButton}
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              disabled={isLoading || item.quantity <= 1}
            >
              <RemoveOutlined />
            </motion.button>
            <motion.span
              className="font-bold text-gray-800"
              key={item.quantity}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.quantity}
            </motion.span>
            <motion.button
              onClick={handleIncrease}
              aria-label="Increase quantity"
              className="rounded-xl bg-green-500 p-1 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              variants={hoverButton}
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              disabled={isLoading}
            >
              <AddOutlined />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
        aria-label="Remove item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Loader2 className="h-5 w-5" />
          </motion.div>
        ) : (
          <Trash2 className="h-5 w-5" />
        )}
      </motion.button>
    </motion.div>
  )
}

export default CartItem

