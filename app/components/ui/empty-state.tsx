"use client"

import { ShoppingBag, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: "package" | "refresh" | "custom"
  showHomeButton?: boolean
  showRefreshButton?: boolean
  refreshAction?: () => void
  darkMode?: boolean
}

export default function EmptyState({
  title = "No products found",
  description = "We couldn't find any products matching your criteria.",
  icon = "package",
  showHomeButton = true,
  showRefreshButton = false,
  refreshAction,
  darkMode = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg ${
        darkMode ? "bg-gray-800" : "bg-gray-50"
      } p-8 text-center`}
    >
      <div className="mb-4">
        <ShoppingBag className={`h-16 w-16 ${darkMode ? "text-gray-400" : "text-gray-300"}`} />
      </div>

      <h3 className={`mb-2 text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{title}</h3>

      <p className={`mb-6 max-w-md ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{description}</p>

      
    </div>
  )
}

