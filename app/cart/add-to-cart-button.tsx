"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { ShoppingCart, Loader2 } from "lucide-react"

interface AddToCartButtonProps {
  productId: string
  quantity?: number
  className?: string
  showIcon?: boolean
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  quantity = 1,
  className = "",
  showIcon = true,
}) => {
  const { addToCart, isLoading } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      await addToCart(productId, quantity)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || isLoading}
      className={`flex items-center justify-center gap-2 rounded-md bg-[#030359] px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-70 ${className}`}
    >
      {isAdding || isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        showIcon && <ShoppingCart className="h-4 w-4" />
      )}
      <span>Add to Cart</span>
    </button>
  )
}

export default AddToCartButton

