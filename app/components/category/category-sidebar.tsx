"use client"

import type { Dispatch, SetStateAction } from "react"

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
  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
      <div>
        <h2 className="mb-4 text-lg font-semibold">{categoryName}</h2>
        <ul className="space-y-2">
          {subcategories.map((subcategory) => (
            <li key={subcategory}>
              <button
                className={`w-full rounded-md px-4 py-2 text-left ${
                  selectedSubcategory === subcategory ? "bg-gray-100" : ""
                } transition-colors hover:bg-gray-100`}
                onClick={() => setSelectedSubcategory(subcategory)}
              >
                {/* {subcategory} */}
                None
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Sort By Price</h2>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-20 rounded-md border px-2 py-1"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-20 rounded-md border px-2 py-1"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Sort By Rating</h2>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              className={`w-full rounded-md px-4 py-2 text-left ${
                selectedRating === rating ? "bg-gray-100" : ""
              } transition-colors hover:bg-gray-100`}
              onClick={() => setSelectedRating(rating === selectedRating ? 0 : rating)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{rating} Stars</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? "fill-yellow-400 text-yellow-400" : "fill-[#B6B6B6] text-gray-300"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

