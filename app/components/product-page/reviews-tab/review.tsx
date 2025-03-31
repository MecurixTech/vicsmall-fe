import { Star } from "@mui/icons-material"
import Image from "next/image"
import type { ProductReview } from "@/lib/reviews-service"
import { formatDistanceToNow } from "date-fns"

interface ReviewProps {
  review: ProductReview
}

const Review = ({ review }: ReviewProps) => {
  
  const formattedDate = review.created_at
    ? formatDistanceToNow(new Date(review.created_at), { addSuffix: true })
    : "Recently"

  const avatarSrc = review.user_avatar || "/placeholder.svg?height=56&width=56&text=User"

  const userName = review.user_name || "Anonymous User"

  return (
    <>
      <div className="flex flex-wrap items-start gap-4 sm:gap-6">
        <Image
          src={avatarSrc || "/placeholder.svg"}
          alt={userName}
          height={56}
          width={56}
          className="rounded-full"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=56&width=56&text=User"
          }}
        />

        <div className="flex-1">
          <p className="font-medium text-sm text-gray-800 sm:text-base">{userName}</p>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => {
                const currentRating = index + 1
                return (
                  <Star
                    fontSize="inherit"
                    key={index}
                    className={currentRating > Number(review.rating) ? "text-gray-300" : "text-accent-900"}
                  />
                )
              })}
            </div>
            <span>•</span>
            <span>{review.rating} rating</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>

          <p className="text-sm text-gray-700 sm:text-base">{review.review}</p>
          {review.images && review.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
              {review.images?.map((image, index) => (
                <Image
                  key={index}
                  src={image.imgSrc || "/placeholder.svg"}
                  alt={image.alt}
                  height={240}
                  width={240}
                  className="rounded-xl"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=240&width=240"
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <hr className="my-4 last:hidden" />
    </>
  )
}

export default Review

