"use client"
import { ShoppingCart, Heart } from "lucide-react"
import type React from "react"

import type { Product } from "@/lib/api"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import toast from "react-hot-toast"

interface ProductCardProps {
  product: Product
  showHeart?: boolean
}

export default function MobileProductCard({ product, showHeart = false }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAddingToCart(true)

    setTimeout(() => {
      setIsAddingToCart(false)
      toast.success(`${product.name} added to cart`)
    }, 600)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAddingToWishlist(true)

    setTimeout(() => {
      setIsAddingToWishlist(false)
      toast.success(`${product.name} added to wishlist`)
    }, 600)
  }

  return (
    <motion.div
      className="w-[164px] bg-[#FDFDFD] rounded-[5px] shadow-[0px_4px_28px_-2px_rgba(0,0,0,0.08)] p-[8px_9px_17px] relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{
        y: -5,
        boxShadow: "0px 8px 30px -2px rgba(0,0,0,0.15)",
      }}
    >
      <div className="relative">
        <motion.div
          className="overflow-hidden rounded-[11px]"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-[146px] h-[126px] object-cover rounded-[11px] border border-black/10 mb-[9px] transition-transform duration-300 hover:scale-110"
            height={126}
            width={146}
          />
        </motion.div>

        <motion.div
          className="absolute top-[3px] left-[3px] bg-white/70 backdrop-blur-md rounded-[20px] p-[3px] flex gap-[8px]"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {product.colors?.map((color, i) => (
            <motion.div
              key={i}
              className="w-[14px] h-[14px] rounded-[150px]"
              style={{
                backgroundColor: color,
                border: color === "#242B33" ? "1px solid white" : "none",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.2 }}
            ></motion.div>
          ))}
        </motion.div>

        <motion.button
          className="absolute right-[9px] top-[99px] w-[30px] h-[30px] bg-[#FDFDFD] rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.1, backgroundColor: "#f0f0f0" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <motion.div
              className="h-4 w-4 border-2 border-t-transparent border-black rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          ) : (
            <ShoppingCart size={16} className="text-black" />
          )}
        </motion.button>

        {showHeart && (
          <motion.div
            className="absolute right-[9px] bottom-[-30px] flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToWishlist}
          >
            {isAddingToWishlist ? (
              <motion.div
                className="h-4 w-4 border-2 border-t-transparent border-[#767575] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            ) : (
              <Heart size={14} className="text-[#767575]" />
            )}
          </motion.div>
        )}
      </div>

      <motion.div className="mt-[9px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <p className="text-[14px] leading-[24px] text-[#474747] font-ubuntu">{product.name}</p>
        <div className="flex gap-[9px] items-center mt-[2px]">
          <motion.span
            className="font-bold text-[16px] leading-[20px] text-[#00171F] font-ubuntu"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            ₦ {product.price.toLocaleString()}
          </motion.span>
          <motion.span
            className="text-[14px] leading-[20px] text-[#CD011C] line-through font-ubuntu"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            ₦ {product.originalPrice.toLocaleString()}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}

