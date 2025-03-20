"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Heart, ImageOff } from 'lucide-react'
import { toast } from "react-hot-toast"
import { useCart } from "@/context/cart-context"
import { fetchProductDetails } from "@/utils/product-client"
import type { ProductDetails } from "@/lib/product-details-actions"

interface ProductGridProps {
  products: ProductDetails[]
  isLoading?: boolean
}

export default function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  const { addToCart, isLoading: cartIsLoading, items } = useCart()
  const [productStates, setProductStates] = useState<Record<string, {
    isAdding: boolean;
    imageUrl: string;
    imageError: boolean;
  }>>({})
  const [isLoadingDetails, setIsLoadingDetails] = useState(true)

  useEffect(() => {
    const initialStates: Record<string, {
      isAdding: boolean;
      imageUrl: string;
      imageError: boolean;
    }> = {}

    products.forEach(product => {
      initialStates[product.id] = {
        isAdding: false,
        imageUrl: product.imgSrc || "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLZmWv7R2vxIKbf5HP786CAD3UTizeLcunXgQ1",
        imageError: false
      }
    })

    setProductStates(initialStates)
  }, [products])
  useEffect(() => {
    const fetchAllProductDetails = async () => {
      setIsLoadingDetails(true)

      try {

        const fetchPromises = products.map(product => fetchProductDetails(product.id))

        const results = await Promise.all(fetchPromises)

        const newProductStates = { ...productStates }

        results.forEach((result, index) => {
          const productId = products[index].id



          if (result.data) {

            Object.entries(result.data).forEach(([key, value]) => {

            })


          } else {

          }




          if (result.success && result.data && result.data.imgSrc) {

            newProductStates[productId] = {
              ...newProductStates[productId],
              imageUrl: result.data.imgSrc
            }
          }
        })

        setProductStates(newProductStates)
      } catch (error) {

      } finally {
        setIsLoadingDetails(false)
      }
    }

    if (products.length > 0) {
      fetchAllProductDetails()
    } else {
      setIsLoadingDetails(false)
    }
  }, [products])

  const getRandomColors = () => {
    const colors = ["#C0C0C0", "#FFD700", "#8B4513", "#FF0000", "#00FF00", "#0000FF", "#FFA500", "#FFFFFF", "#000000"]
    const numColors = Math.floor(Math.random() * 3) + 1
    const selectedColors = []

    for (let i = 0; i < numColors; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length)
      selectedColors.push(colors[randomIndex])
    }

    return selectedColors
  }

  const handleAddToCart = async (product: ProductDetails, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (productStates[product.id]?.isAdding || cartIsLoading) {
      return
    }

    const isInCart = items.some((item) => item.product_id === product.id)
    if (isInCart) {
      toast.error("This item is already in your cart")
      return
    }

    setProductStates(prev => ({
      ...prev,
      [product.id]: {
        ...prev[product.id],
        isAdding: true
      }
    }))

    try {
      await addToCart(product.id, 1)
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add item to cart")
    } finally {
      setProductStates(prev => ({
        ...prev,
        [product.id]: {
          ...prev[product.id],
          isAdding: false
        }
      }))
    }
  }

  const handleAddToWishlist = (product: ProductDetails, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toast.success(`Added ${product.name} to wishlist`)
  }

  const handleImageError = (productId: string) => {

    setProductStates(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        imageError: true,
        imageUrl: "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLZmWv7R2vxIKbf5HP786CAD3UTizeLcunXgQ1"
      }
    }))
  }

  if (isLoading || isLoadingDetails) {
    return (
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`skeleton-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-lg bg-white shadow-md"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-200 animate-pulse" />
            <div className="space-y-2 p-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-4 w-4 rounded-full bg-gray-200 animate-pulse" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <motion.div
      className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {products.map((product) => {
          const productColors = getRandomColors()
          const productState = productStates[product.id] || {
            isAdding: false,
            imageUrl: product.imgSrc || "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLZmWv7R2vxIKbf5HP786CAD3UTizeLcunXgQ1",
            imageError: false
          }

          return (
            <motion.div
              key={product.id}
              variants={item}
              layout
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden">
                  {productState.imageError ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="flex flex-col items-center text-gray-400">
                        <ImageOff size={32} />
                        <p className="text-xs mt-2">Image not available</p>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={productState.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover object-center"
                      onError={() => handleImageError(product.id)}
                    />
                  )}

                  <div className="absolute right-2 top-2 flex flex-col gap-2">
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">Add to cart</span>
                    </button>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100"
                      onClick={(e) => handleAddToWishlist(product, e)}
                    >
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to wishlist</span>
                    </button>
                  </div>

                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {productColors.map((color, i) => (
                      <div key={i} className="h-4 w-4 rounded-full border shadow-sm" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </Link>

              <div className="space-y-2 p-4">
                <h3 className="text-sm font-medium">{product.name}</h3>
                <p className="text-sm font-semibold">₦{product.currentPrice.toLocaleString()}</p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                        }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>

              {product.isShippedFromAbroad && (
                <div className="absolute left-2 top-2">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </motion.div>
  )
}