"use client"

import type { Dispatch, SetStateAction } from "react"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/lib/animation-utils"
import toast from "react-hot-toast"

interface CategorySidebarProps {
  categoryName: string
  subcategories: string[]
  selectedSubcategory: string
  setSelectedSubcategory: Dispatch<SetStateAction<string>>
  minPrice: string
  setMinPrice: Dispatch<SetStateAction<string>>
  maxPrice: string
  setMaxPrice: Dispatch<SetStateAction<string>>
  selectedRating: number
  setSelectedRating: Dispatch<SetStateAction<number>>
}

export default function CategorySidebar({
  categoryName,
  subcategories,
  selectedSubcategory,
  setSelectedSubcategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedRating,
  setSelectedRating,
}: CategorySidebarProps) {
  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory)
    toast.success(`${subcategory} selected`)
  }

  const handlePriceChange = () => {
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      toast.error("Minimum price cannot be greater than maximum price")
      return
    }

    if (minPrice || maxPrice) {
      toast.success("Price filter applied")
    }
  }

  const handleRatingSelect = (rating: number) => {
    const newRating = rating === selectedRating ? 0 : rating
    setSelectedRating(newRating)

    if (newRating === 0) {
      toast.success("Rating filter cleared")
    } else {
      toast.success(`${rating} star filter applied`)
    }
  }

  return (
    <motion.div
      className="space-y-6 rounded-lg bg-white p-6 shadow-md"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <h2 className="mb-4 text-lg font-semibold">{categoryName}</h2>
        <motion.ul className="space-y-2" variants={staggerContainer} initial="hidden" animate="visible">
          {subcategories.map((subcategory, index) => (
            <motion.li key={subcategory} variants={staggerItem} custom={index}>
              <motion.button
                className={`w-full rounded-md px-4 py-2 text-left ${
                  selectedSubcategory === subcategory ? "bg-gray-100" : ""
                } transition-colors hover:bg-gray-100`}
                onClick={() => handleSubcategorySelect(subcategory)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* {subcategory} */}
                None
              </motion.button>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h2 className="mb-4 text-lg font-semibold">Sort By Price</h2>
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handlePriceChange}
            className="w-20 rounded-md border px-2 py-1"
            whileFocus={{ scale: 1.05, boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.5)" }}
          />
          <span>-</span>
          <motion.input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handlePriceChange}
            className="w-20 rounded-md border px-2 py-1"
            whileFocus={{ scale: 1.05, boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.5)" }}
          />
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <h2 className="mb-4 text-lg font-semibold">Sort By Rating</h2>
        <motion.div className="space-y-2" variants={staggerContainer} initial="hidden" animate="visible">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <motion.button
              key={rating}
              className={`w-full rounded-md px-4 py-2 text-left ${
                selectedRating === rating ? "bg-gray-100" : ""
              } transition-colors hover:bg-gray-100`}
              onClick={() => handleRatingSelect(rating)}
              variants={staggerItem}
              custom={index}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{rating} Stars</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? "fill-yellow-400 text-yellow-400" : "fill-[#B6B6B6] text-gray-300"
                    }`}
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </motion.svg>
                ))}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

