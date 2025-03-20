"use client"

import type React from "react"

import { CartProvider } from "@/context/cart-context"
import { SavedProductsProvider } from "@/context/saved-products-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>
        <SavedProductsProvider>
        {children}
        </SavedProductsProvider>
        </CartProvider>
}

