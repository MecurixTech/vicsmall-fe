"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Loader2 } from "lucide-react"
import { useSavedProducts } from "@/context/saved-products-context"
import { useCart } from "@/context/cart-context"
import { toast } from "react-hot-toast"

interface SavedProductCardProps {
  product: {
    product_id: string
    name: string
    price: number
    originalPrice?: number
    image: string
  }
}

export default function SavedProductCard({ product }: SavedProductCardProps) {
  const { removeSavedProduct } = useSavedProducts()
  const { addToCart } = useCart()
  const [isRemoving, setIsRemoving] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleRemove = async () => {
    if (isRemoving) return

    setIsRemoving(true)
    try {
      await removeSavedProduct(product.product_id)
    } finally {
      setIsRemoving(false)
    }
  }

  const handleAddToCart = async () => {
    if (isAddingToCart) return

    setIsAddingToCart(true)
    try {
      const result = await addToCart(product.product_id, 1)
      if (result.success) {
        toast.success("Product added to cart")
      }
    } finally {
      setIsAddingToCart(false)
    }
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  return (
    <motion.div
      className="flex flex-col rounded-xl bg-white p-2 shadow-sm relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.product_id}`} className="block">
        <div className="relative w-full">
          <Image
            src={product.image || "/placeholder.svg?height=200&width=200"}
            alt={product.name}
            width={200}
            height={200}
            className="mb-4 w-full h-48 object-cover rounded-xl"
          />
        </div>

        <div className="px-2">
          <div className="mb-2">
            <p className="truncate text-sm font-medium">{product.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-800">₦{product.price?.toLocaleString()}</p>
            {hasDiscount && (
              <p className="text-red-500 line-through text-sm">₦{product.originalPrice?.toLocaleString()}</p>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-4 flex justify-between px-2">
        <motion.button
          onClick={handleAddToCart}
          className="flex items-center justify-center rounded-md bg-[#FF8C48] px-3 py-2 text-white text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </>
          )}
        </motion.button>

        <motion.button
          onClick={handleRemove}
          className="flex items-center justify-center rounded-md border border-red-500 p-2 text-red-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isRemoving}
        >
          {isRemoving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className="h-4 w-4 fill-red-500" />}
        </motion.button>
      </div>
    </motion.div>
  )
}

