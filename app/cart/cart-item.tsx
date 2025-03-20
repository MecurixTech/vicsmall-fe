"use client"

import type React from "react"
import { useCart } from "@/context/cart-context"
import { Trash2, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { AddOutlined, RemoveOutlined } from "@mui/icons-material"

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


  const price = item.price
  const originalPrice = item.originalPrice || price
  const totalPrice = price * item.quantity
  const hasDiscount = originalPrice > price


  const handleIncrease = () => updateQuantity(item.product_id, item.quantity + 1)
  const handleDecrease = () => item.quantity > 1 && updateQuantity(item.product_id, item.quantity - 1)

  const handleRemove = () => {
    removeFromCart(item.cart_id)
  }

  return (
    <motion.div
      className="flex gap-4 rounded-lg border p-4 bg-white shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-24 w-24 relative overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg?height=120&width=120"}
          alt={item.name || "Product"}
          width={120}
          height={120}
          className="rounded-lg object-cover"
          priority
        />
      </div>

      <div className="min-w-0 flex-1">
        <Link href={`/product/${item.product_id}`}>
          {/* Using the exact same heading style and content access as product-settings */}
          <motion.h3 className="mb-2 text-lg font-bold sm:text-xl" whileHover={{ scale: 1.02 }}>
            {item.name /* This is equivalent to product.name in product-settings */}
          </motion.h3>
        </Link>
        {item.variant && <p className="text-sm text-gray-500">{item.variant}</p>}

        {/* Using the exact same price display as product-settings */}
        <div className="mb-4 flex flex-wrap items-center gap-4 text-xl font-semibold">
          <p className="text-gray-800">&#8358;{totalPrice.toLocaleString()}</p>
          {hasDiscount && <p className="text-lg text-gray-400 line-through">&#8358;{originalPrice.toLocaleString()}</p>}
        </div>

        <div className="mt-2 flex items-center justify-between gap-4">
          {/* Using the exact same quantity control styling from product-settings */}
          <div className="mb-4 flex w-max items-center gap-2 rounded-xl border border-gray-500 p-2">
            <motion.button
              onClick={handleDecrease}
              aria-label="Decrease quantity"
              className="rounded-xl bg-red-500 p-1 text-white"
              variants={hoverButton}
              whileHover="hover"
              disabled={isLoading || item.quantity <= 1}
            >
              <RemoveOutlined />
            </motion.button>
            <span className="font-bold text-gray-800">{item.quantity}</span>
            <motion.button
              onClick={handleIncrease}
              aria-label="Increase quantity"
              className="rounded-xl bg-green-500 p-1 text-white"
              variants={hoverButton}
              whileHover="hover"
              disabled={isLoading}
            >
              <AddOutlined />
            </motion.button>
          </div>
        </div>
      </div>

      <motion.button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-600 disabled:opacity-50"
        disabled={isLoading}
        aria-label="Remove item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
      </motion.button>
    </motion.div>
  )
}

export default CartItem

