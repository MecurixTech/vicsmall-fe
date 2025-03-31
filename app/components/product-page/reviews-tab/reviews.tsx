"use client"

import { useEffect, useState } from "react"
import { ArrowDownwardOutlined, Star } from "@mui/icons-material"
import ReviewList from "./review-list"
import Link from "next/link"
import { getProductReviews, calculateReviewStats, type ProductReview, type ReviewStats } from "@/lib/reviews-service"
import EmptyReviews from "./empty-reviews"

interface ReviewsProps {
  productId?: string
}

const Reviews = ({ productId = "default" }: ReviewsProps) => {
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    distribution: [
      { star: 5, amount: 0 },
      { star: 4, amount: 0 },
      { star: 3, amount: 0 },
      { star: 2, amount: 0 },
      { star: 1, amount: 0 },
    ],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true)
        const response = await getProductReviews(productId)

        if (response.success && response.data) {
          setReviews(response.data)
          setStats(calculateReviewStats(response.data))
        } else {
          setError(response.error || "Failed to load reviews")
        }
      } catch (err) {
        console.error("Error in fetchReviews:", err)
        setError("An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-accent-900"></div>
        <p className="mt-4 text-gray-600">Loading reviews...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <p className="text-red-800">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 rounded-lg bg-accent-900 px-4 py-2 text-white">
          Try Again
        </button>
      </div>
    )
  }

  if (reviews.length === 0) {
    return <EmptyReviews productId={productId} />
  }

  return (
    <>
      <section className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center text-center text-gray-800 md:items-start md:text-left">
          <div className="mb-4 flex items-center gap-4">
            <span className="text-6xl font-bold sm:text-7xl md:text-8xl">{stats.averageRating}</span>
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const currentRating = index + 1
                return (
                  <Star
                    fontSize="inherit"
                    key={index}
                    className={`${
                      currentRating > Math.round(stats.averageRating) ? "text-gray-300" : "text-accent-900"
                    } text-4xl sm:text-5xl`}
                  />
                )
              })}
            </div>
          </div>
          <p className="text-sm sm:text-lg">Based on {stats.totalReviews} verified ratings</p>
        </div>

        <div className="w-full md:w-1/2">
          {stats.distribution.map((item) => (
            <div key={item.star} className="mb-4 flex items-center gap-2 text-sm sm:text-base">
              <span className="font-medium text-gray-800">{item.star} star</span>
              <span className="relative h-3 w-full rounded-full bg-gray-100 sm:w-64 md:w-72">
                <span
                  className="absolute left-0 top-0 h-full rounded-full bg-accent-900"
                  style={{
                    width: stats.totalReviews > 0 ? `${(item.amount / stats.totalReviews) * 100}%` : "0%",
                  }}
                />
              </span>
              <span className="whitespace-nowrap">{item.amount} reviews</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-8" />

      <ReviewList reviews={reviews} />

      {reviews.length > 5 && (
        <Link href={`/reviews?productId=${productId}`}>
          <button className="button button-secondary mx-auto flex items-center gap-2 px-4 py-2">
            <span>View more</span>
            <ArrowDownwardOutlined fontSize="inherit" />
          </button>
        </Link>
      )}
    </>
  )
}

export default Reviews

