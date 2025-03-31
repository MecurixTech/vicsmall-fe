"use client"

import { Button } from "./pagination-button"
import { ChevronLeft, ChevronRight } from "./pagination-icons"




interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
     
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {

      pageNumbers.push(1)

      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 4)
      }

      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3)
      }

      if (start > 2) {
        pageNumbers.push("...")
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      if (end < totalPages - 1) {
        pageNumbers.push("...")
      }

      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex items-center justify-center" aria-label="Pagination">
      <ul className="flex items-center gap-1">
        <li>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 rounded-full"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </li>

        {pageNumbers.map((page, index) => (
          <li key={`page-item-${index}`}>
            {page === "..." ? (
              <span className="px-2 text-sm text-gray-500">•••</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                onClick={() => typeof page === "number" && onPageChange(page)}
                className={`h-8 w-8 rounded-full text-sm ${currentPage === page ? "font-medium" : ""}`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Button>
            )}
          </li>
        ))}

        <li>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 rounded-full"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </li>
      </ul>
    </nav>
  )
}

