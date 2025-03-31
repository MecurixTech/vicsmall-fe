import { RateReview } from "@mui/icons-material"

interface EmptyReviewsProps {
  productId: string
}

const EmptyReviews = ({ productId }: EmptyReviewsProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-accent-100 p-4">
        <RateReview className="text-4xl text-accent-900" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">No Reviews Yet</h3>
      <p className="mb-6 max-w-md text-gray-600">
        This product doesn't have any reviews yet.
      </p>
      {/* <Link href={`/write-review?productId=${productId}`}>
        <button className="rounded-lg bg-accent-900 px-6 py-3 font-medium text-white transition-colors hover:bg-accent-800">
          Write a Review
        </button>
      </Link> */}
    </div>
  )
}

export default EmptyReviews

