"use client"
import Reviews from "../components/product-page/reviews-tab/reviews"
import { ArrowLeft } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"

const ReviewSection = () => {
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId") || ""

  return (
    <div className="pt-4">
      <div className="sticky top-0 z-10 mb-4 flex items-center gap-2 bg-slate-100 px-4">
        <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="text-4xl" />
        </button>

        <div className="flex-1 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Reviews</h1>
        </div>
      </div>

      <div className="px-4">
        <Reviews productId={productId} />
      </div>
    </div>
  )
}

export default ReviewSection

