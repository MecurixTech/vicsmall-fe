"use client"
import { useRef } from "react"

import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material"
import ProductCard from "../product-card/product-card"
import type { productData } from "@/app/data/dummyTypes"
import { ShoppingBag } from "lucide-react"

interface SliderProps {
  products: productData[]
}

const Slider = ({ products }: SliderProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
        <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
        <p className="text-gray-500 font-medium">No products available</p>
        <p className="text-gray-400 text-sm mt-1">Check back later for new items</p>
      </div>
    )
  }
  const cards = products.map((product) => (
    <div key={product.id}>
      <ProductCard product={product} />
    </div>
  ))

  return (
    <div className="relative mb-12">
      <div className="relative flex items-center">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 grid h-10 w-10 place-content-center rounded-full bg-white shadow-md hover:bg-neutral-light-gray"
          aria-label="Scroll Left"
        >
          <ArrowBackIosOutlined />
        </button>
        <div ref={scrollContainerRef} className="scrollbar-hide flex w-full gap-4 overflow-x-auto px-8 py-4">
          {cards}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 grid h-10 w-10 place-content-center rounded-full bg-white shadow-md hover:bg-neutral-light-gray"
          aria-label="Scroll Right"
        >
          <ArrowForwardIosOutlined />
        </button>

        <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-12 bg-gradient-to-l from-neutral-light-gray to-transparent"></div>
      </div>
    </div>
  )
}

export default Slider

