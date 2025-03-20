"use client"

import type React from "react"

import { useState } from "react"
import type { productData } from "@/app/data/dummyTypes"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"

const ProductCardv3 = ({ product }: { product: productData }) => {
  const { addToCart, isLoading } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isAdding || isLoading) return

    setIsAdding(true)
    try {
      await addToCart(product.id, 1)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="rounded-lg bg-white p-1 shadow-sm relative">
      <div className="relative">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative w-full">
            <Image
              src={product.imgSrc || "/placeholder.svg"}
              alt={product.name}
              height={100}
              width={100}
              className="w-full h-24 object-cover rounded-lg"
            />
          </div>

          <div className="p-1">
            <p className="truncate text-xs font-medium">{product.name}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="font-bold text-xs text-gray-800">₦{product.currentPrice?.toLocaleString()}</p>
              {product.originalPrice && (
                <p className="text-red-500 line-through text-xs">₦{product.originalPrice?.toLocaleString()}</p>
              )}
            </div>
          </div>
        </Link>

        {/* Cart button outside the Link component */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || isLoading}
          title="Add to cart"
          aria-label="Add to cart"
          className="absolute right-2 top-2 grid h-8 w-8 place-content-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 disabled:opacity-70"
          style={{ zIndex: 10 }}
        >
          {isAdding ? (
            <span className="h-4 w-4 animate-spin rounded-full border-t-2 border-gray-900"></span>
          ) : (
            <ShoppingCart size={14} />
          )}
        </button>
      </div>
    </div>
  )
}

export default ProductCardv3

