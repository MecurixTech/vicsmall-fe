"use client"

import { useState } from "react"
import Review from "./review"
import type { ProductReview } from "@/lib/reviews-service"

interface ReviewListProps {
  reviews: ProductReview[]
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  const [activeTab, setActiveTab] = useState<string>("all")

  const filteredReviews = reviews.filter((review) => {
    if (activeTab === "all") return true
    if (activeTab === "5-star") return review.rating === 5
    if (activeTab === "4-star") return review.rating === 4
    if (activeTab === "3-star") return review.rating === 3
    if (activeTab === "2-star") return review.rating === 2
    if (activeTab === "1-star") return review.rating === 1
    return true
  })

  const counts = {
    all: reviews.length,
    "5-star": reviews.filter((r) => r.rating === 5).length,
    "4-star": reviews.filter((r) => r.rating === 4).length,
    "3-star": reviews.filter((r) => r.rating === 3).length,
    "2-star": reviews.filter((r) => r.rating === 2).length,
    "1-star": reviews.filter((r) => r.rating === 1).length,
  }

  return (
    <section>
      <div className="mb-8 flex flex-wrap gap-2 sm:gap-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`${activeTab === "all" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          All reviews ({counts.all})
        </button>
        <button
          onClick={() => setActiveTab("5-star")}
          className={`${activeTab === "5-star" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          5 stars ({counts["5-star"]})
        </button>
        <button
          onClick={() => setActiveTab("4-star")}
          className={`${activeTab === "4-star" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          4 stars ({counts["4-star"]})
        </button>
        <button
          onClick={() => setActiveTab("3-star")}
          className={`${activeTab === "3-star" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          3 stars ({counts["3-star"]})
        </button>
        <button
          onClick={() => setActiveTab("2-star")}
          className={`${activeTab === "2-star" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          2 stars ({counts["2-star"]})
        </button>
        <button
          onClick={() => setActiveTab("1-star")}
          className={`${activeTab === "1-star" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          1 star ({counts["1-star"]})
        </button>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="py-8 text-center text-gray-600">No reviews match the selected filter.</div>
      ) : (
        filteredReviews.map((review, index) => <Review key={index} review={review} />)
      )}
    </section>
  )
}

export default ReviewList

