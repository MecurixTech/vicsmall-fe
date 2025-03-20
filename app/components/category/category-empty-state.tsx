"use client"

import { ShoppingBag, RefreshCw, Search } from "lucide-react"
import Link from "next/link"

interface CategoryEmptyStateProps {
  title?: string
  description?: string
  showHomeButton?: boolean
  showRefreshButton?: boolean
  refreshAction?: () => void
}

export default function CategoryEmptyState({
  title = "No products found",
  description = "We couldn't find any products matching your criteria.",
  showHomeButton = true,
  showRefreshButton = true,
  refreshAction = () => window.location.reload(),
}: CategoryEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-md">
      <div className="mb-6 rounded-full bg-gray-100 p-6">
        <ShoppingBag className="h-12 w-12 text-gray-400" />
      </div>

      <h3 className="mb-3 text-xl font-semibold text-gray-800">{title}</h3>

      <p className="mb-8 max-w-md text-gray-600">{description}</p>

      <div className="flex flex-wrap justify-center gap-4">
        {showHomeButton && (
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md bg-white border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Search className="h-5 w-5" />
            <span>Browse other categories</span>
          </Link>
        )}

        {showRefreshButton && (
          <button
            onClick={refreshAction}
            className="flex items-center gap-2 rounded-md bg-[#FF8C48] px-6 py-3 font-medium text-white transition-colors hover:bg-[#e67e3e]"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Refresh</span>
          </button>
        )}
      </div>
    </div>
  )
}

