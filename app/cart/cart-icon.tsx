"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Link from "next/link"

const CartIcon = () => {
  const { totalItems } = useCart()

  return (
    <Link href="/cart">
      <button className="flex items-center gap-2 rounded-[60px] bg-[#FF8C48] px-4 py-3 text-white">
        <ShoppingCart className="h-5 w-5" />
        <span className="font-ubuntu text-lg font-medium">Cart</span>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
          <span className="font-inter text-base font-medium text-[#1E1E1E]">{totalItems}</span>
        </div>
      </button>
    </Link>
  )
}

export default CartIcon

