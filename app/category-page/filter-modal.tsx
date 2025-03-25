"use client"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { buttonHover, buttonTap } from "@/lib/animation-utils"
import toast from "react-hot-toast"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  minPrice: string
  setMinPrice: (price: string) => void
  maxPrice: string
  setMaxPrice: (price: string) => void
  selectedRating: number
  setSelectedRating: (rating: number) => void
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  }),
}

export default function FilterModal({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedRating,
  setSelectedRating,
}: FilterModalProps) {
  if (!isOpen) return null

  const categories = ["All Accessories", "Watches", "Rings", "Anklets", "Wrist Bands"]

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    toast.success(`Category "${category}" selected`)
  }

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating)
    toast.success(`${rating} star filter applied`)
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[#1E1E1E]/67 z-50 filter-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute w-[375px] max-w-[95vw] h-[609px] bg-white rounded-[11px] top-[161px] left-1/2 transform -translate-x-1/2 filter-modal"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="absolute top-[4.36px] right-[4.36px] z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-[15.71px] h-[15.71px] bg-[#F9F9F9] rounded-full flex items-center justify-center">
                <X size={12} className="text-[#FE3535]" onClick={onClose} />
              </div>
            </motion.div>

            <div className="p-[14px_35px]">
              <motion.h3
                className="text-[18px] font-black text-[#1E1E1E] mt-[14px] mb-[13px] font-ubuntu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Sort Accessories
              </motion.h3>

              <motion.div
                className="flex flex-col gap-[13px]"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    className="flex items-center gap-[10px]"
                    variants={staggerItem}
                    custom={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    <motion.div
                      className={`w-[16px] h-[16px] rounded-[4px] border border-[#CCD1D2] flex items-center justify-center ${selectedCategory === category ? "bg-blue-50" : "bg-white"}`}
                      onClick={() => handleCategorySelect(category)}
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      {selectedCategory === category && (
                        <motion.svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <path
                            d="M3 6L5 8L9 4"
                            stroke="#002A48"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      )}
                    </motion.div>
                    <span
                      className="text-[14px] leading-[20px] text-[#00171F] cursor-pointer font-ubuntu"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-[40px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-[18px] font-black text-[#1E1E1E] mb-[15px] font-ubuntu">Sort By Price</h3>
                <div className="flex flex-col gap-[16px]">
                  <motion.div
                    className="border border-[rgba(205,205,205,0.5)] rounded-[11px] p-[10px]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] font-medium text-[#242B33] font-poppins">Min</span>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        onBlur={handlePriceChange}
                        className="w-20 border-none outline-none text-right"
                        placeholder="0"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    className="border border-[rgba(205,205,205,0.5)] rounded-[11px] p-[10px]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] font-medium text-[#242B33] font-poppins">Max</span>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        onBlur={handlePriceChange}
                        className="w-20 border-none outline-none text-right"
                        placeholder="100000"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="mt-[40px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-[18px] font-black text-[#1E1E1E] mb-[15px] font-ubuntu">Sort By Rating</h3>
                <div className="flex flex-col gap-[7px]">
                  {[5, 4, 3, 2, 1].map((rating, index) => (
                    <motion.div
                      key={rating}
                      className="flex items-center gap-[9px] cursor-pointer"
                      onClick={() => handleRatingSelect(rating)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <div
                        className={`w-[16px] h-[16px] rounded-[4px] border border-[#CCD1D2] flex items-center justify-center ${selectedRating === rating ? "bg-blue-50" : "bg-white"}`}
                      >
                        {selectedRating === rating && (
                          <motion.svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <path
                              d="M3 6L5 8L9 4"
                              stroke="#002A48"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </motion.svg>
                        )}
                      </div>
                      <div className="flex items-center gap-[1px]">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <motion.svg
                              key={i}
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.05 }}
                            >
                              <path
                                d="M7.5 1.5L9.32 5.22L13.5 5.87L10.5 8.78L11.25 13L7.5 11L3.75 13L4.5 8.78L1.5 5.87L5.68 5.22L7.5 1.5Z"
                                fill={i < rating ? "#FF8C4B" : "#B6B6B6"}
                              />
                            </motion.svg>
                          ))}
                      </div>
                      <span className="text-[12px] leading-[20px] text-[#00171F] font-ubuntu">
                        {rating} {rating === 1 ? "Rating" : "Ratings"} & Up
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[24px] flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="w-[114px] h-[4px] bg-black rounded-full cursor-pointer"
                onClick={onClose}
                whileHover={{ width: 140 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

