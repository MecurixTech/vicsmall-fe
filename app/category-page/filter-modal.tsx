"use client"
import { X } from "lucide-react"

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

  return (
    <div className="fixed inset-0 bg-[#1E1E1E]/67 z-50 filter-modal-backdrop">
      <div className="absolute w-[375px] max-w-[95vw] h-[609px] bg-white rounded-[11px] top-[161px] left-1/2 transform -translate-x-1/2 filter-modal">
        <div className="absolute top-[4.36px] right-[4.36px] z-10">
          <div className="w-[15.71px] h-[15.71px] bg-[#F9F9F9] rounded-full flex items-center justify-center">
            <X size={12} className="text-[#FE3535]" onClick={onClose} />
          </div>
        </div>

        <div className="p-[14px_35px]">
          <h3 className="text-[18px] font-black text-[#1E1E1E] mt-[14px] mb-[13px] font-ubuntu">Sort Accessories</h3>

          <div className="flex flex-col gap-[13px]">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-[10px]">
                <div
                  className={`w-[16px] h-[16px] rounded-[4px] border border-[#CCD1D2] flex items-center justify-center ${selectedCategory === category ? "bg-blue-50" : "bg-white"}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {selectedCategory === category && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 6L5 8L9 4"
                        stroke="#002A48"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className="text-[14px] leading-[20px] text-[#00171F] cursor-pointer font-ubuntu"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-[40px]">
            <h3 className="text-[18px] font-black text-[#1E1E1E] mb-[15px] font-ubuntu">Sort By Price</h3>
            <div className="flex flex-col gap-[16px]">
              <div className="border border-[rgba(205,205,205,0.5)] rounded-[11px] p-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-medium text-[#242B33] font-poppins">Min</span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-20 border-none outline-none text-right"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="border border-[rgba(205,205,205,0.5)] rounded-[11px] p-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-medium text-[#242B33] font-poppins">Max</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-20 border-none outline-none text-right"
                    placeholder="100000"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[40px]">
            <h3 className="text-[18px] font-black text-[#1E1E1E] mb-[15px] font-ubuntu">Sort By Rating</h3>
            <div className="flex flex-col gap-[7px]">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  className="flex items-center gap-[9px] cursor-pointer"
                  onClick={() => setSelectedRating(rating)}
                >
                  <div
                    className={`w-[16px] h-[16px] rounded-[4px] border border-[#CCD1D2] flex items-center justify-center ${selectedRating === rating ? "bg-blue-50" : "bg-white"}`}
                  >
                    {selectedRating === rating && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 6L5 8L9 4"
                          stroke="#002A48"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-[1px]">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <svg
                          key={i}
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 1.5L9.32 5.22L13.5 5.87L10.5 8.78L11.25 13L7.5 11L3.75 13L4.5 8.78L1.5 5.87L5.68 5.22L7.5 1.5Z"
                            fill={i < rating ? "#FF8C4B" : "#B6B6B6"}
                          />
                        </svg>
                      ))}
                  </div>
                  <span className="text-[12px] leading-[20px] text-[#00171F] font-ubuntu">
                    {rating} {rating === 1 ? "Rating" : "Ratings"} & Up
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[24px] flex justify-center items-center">
          <div className="w-[114px] h-[4px] bg-black rounded-full cursor-pointer" onClick={onClose}></div>
        </div>
      </div>
    </div>
  )
}

