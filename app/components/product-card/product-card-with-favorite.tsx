"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { productData } from "@/app/data/dummyTypes"
import { ShoppingCart } from "lucide-react"
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useSavedProducts } from "@/context/saved-products-context"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import ColorSelector from "../product-page/color-selector"

const ProductCardWithFavorite = ({ product }: { product: productData }) => {
  const { addToCart, isLoading: cartIsLoading, items } = useCart()
  const {
    isProductSaved,
    saveProduct: saveFavoriteProduct,
    removeSavedProduct,
    getSavedProductId,
    isLoading: savedProductsLoading,
    savedProducts,
  } = useSavedProducts()

  const [isAdding, setIsAdding] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedColor, setSelectedColor] = useState<"black" | "red" | "orange" | "gray" | null>(null)
  const [isFavorite, setIsFavorite] = useState(isProductSaved(product.id))

  useEffect(() => {
    const saved = isProductSaved(product.id)

    setIsFavorite(saved)
  }, [isProductSaved, product.id, savedProducts])

  const handleColorSelect = (color: "black" | "red" | "orange" | "gray") => {
    setSelectedColor(color)
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()


    if (isAdding || cartIsLoading) {

      return
    }

    const isInCart = items.some((item) => item.product_id === product.id)

    if (isInCart) {
      toast.error("This item is already in your cart")
      return
    }

    setIsAdding(true)
    try {

      await addToCart(product.id, 1)

    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add item to cart")
    } finally {
      setIsAdding(false)
    }
  }

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isSaving || savedProductsLoading) return

    setIsSaving(true)
    const newFavoriteState = !isFavorite
    setIsFavorite(newFavoriteState)

    try {
      if (newFavoriteState) {

        await saveFavoriteProduct(product.id)
      } else {
        const savedProductId = getSavedProductId(product.id)
        if (savedProductId) {

          await removeSavedProduct(savedProductId)
        } else {
          console.error(`[ProductCardWithFavorite] Cannot find saved product ID for product: ${product.id}`)
          throw new Error("Cannot find saved product ID")
        }
      }

      toast.success(newFavoriteState ? "Product saved to favorites" : "Product removed from favorites")
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast.error("Failed to update saved status")
      setIsFavorite(!newFavoriteState)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="col-span-1 min-w-60 rounded-xl bg-white p-2 relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative w-full">
          <Image
            src={product.imgSrc || "/placeholder.svg?height=120&width=120"}
            alt={product.name}
            height={120}
            width={120}
            className="mb-4 w-full h-48 object-cover rounded-xl"
          />
          {product.colorVariants && product.colorVariants.length > 0 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/80 p-1">
              <ColorSelector onColorSelect={handleColorSelect} />
            </div>
          )}
        </div>

        <div className="px-2">
          <div className="mb-2">
            <p className="truncate text-sm font-medium">{product.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-800">₦{product.currentPrice?.toLocaleString()}</p>
            {product.originalPrice && product.originalPrice > product.currentPrice && (
              <p className="text-red-500 line-through text-sm">₦{product.originalPrice?.toLocaleString()}</p>
            )}
          </div>
        </div>
      </Link>

      {/* Cart button outside the Link component */}
      <button
        onClick={handleAddToCart}
        title="Add to cart"
        aria-label="Add to cart"
        className="absolute right-2 top-2 grid h-12 w-12 place-content-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 cursor-pointer z-30"
      >
        {isAdding ? (
          <span className="h-5 w-5 animate-spin rounded-full border-t-2 border-gray-900"></span>
        ) : (
          <ShoppingCart size={20} />
        )}
      </button>

      {/* Favorite button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className={`absolute left-2 top-2 grid h-12 w-12 place-content-center rounded-full bg-white shadow-lg hover:bg-gray-100 cursor-pointer z-30 ${isFavorite ? "text-red-500" : "text-gray-700"
          } ${isSaving || savedProductsLoading ? "opacity-50" : ""}`}
      >
        {isSaving ? (
          <span className="h-5 w-5 animate-spin rounded-full border-t-2 border-gray-900"></span>
        ) : isFavorite ? (
          <Favorite />
        ) : (
          <FavoriteBorderOutlined />
        )}
      </motion.button>
    </div>
  )
}

export default ProductCardWithFavorite

