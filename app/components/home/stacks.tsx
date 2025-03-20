"use client"

import ProductCardv3 from "../product-card/product-card-v3"
import type { productData } from "@/app/data/dummyTypes"
import { ShoppingBag } from "lucide-react"

interface StacksProps {
  products: productData[]
}

const Stacks = ({ products }: StacksProps) => {

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg">
        <ShoppingBag className="h-10 w-10 text-gray-300 mb-2" />
        <p className="text-sm text-gray-500 font-medium">No products available</p>
        <p className="text-xs text-gray-400 mt-1">Check back later for new items</p>
      </div>
    )
  }

  const cards = products.map((product) => (
    <div key={product.id}>
      <ProductCardv3 product={product} />
    </div>
  ))

  return (
    <div className="block sm:hidden py-4">
      <div className="grid grid-cols-3 gap-x-6 gap-y-8 mx-[10px] max-w-[90%]">{cards}</div>
    </div>
  )
}

export default Stacks

