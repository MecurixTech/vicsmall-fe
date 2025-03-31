
export interface ProductReview {
    product: string
    rating: number
    review: string
    created_at: string
    user_name?: string
    user_avatar?: string
    images?: { id: string; imgSrc: string; alt: string }[]
  }
  
  export interface ReviewsResponse {
    success: boolean
    data: ProductReview[]
    error?: string
  }
  
  export interface ReviewStats {
    averageRating: number
    totalReviews: number
    distribution: {
      star: number
      amount: number
    }[]
  }
  
 
  export async function getProductReviews(productId: string): Promise<ReviewsResponse> {
    console.log(`[ReviewsService] Fetching reviews for product: ${productId}`)
  
    try {
      if (!productId) {
        console.error("[ReviewsService] No product ID provided")
        return {
          success: false,
          data: [],
          error: "Product ID is required",
        }
      }
  
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const url = `${apiBaseUrl}/shop/customers/review/${productId}`
  
      console.log(`[ReviewsService] Fetching from URL: ${url}`)
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
  
      if (!response.ok) {
        console.error(`[ReviewsService] API error: ${response.status}`)
        return {
          success: false,
          data: [],
          error: `Failed to fetch reviews. Server returned ${response.status}`,
        }
      }
  
      const data = await response.json()
      console.log(`[ReviewsService] Raw API response:`, JSON.stringify(data).substring(0, 200) + "...")
  
      let reviews: ProductReview[] = []
  
      if (Array.isArray(data)) {
       
        reviews = data
      } else if (data.data && Array.isArray(data.data)) {
    
        reviews = data.data
      } else if (data.Data && Array.isArray(data.Data)) {
       
        reviews = data.Data
      } else {
    
        reviews = [data]
      }
  
      // console.log(`[ReviewsService] Processed ${reviews.length} reviews`)
  
      return {
        success: true,
        data: reviews,
      }
    } catch (error) {
      console.error("[ReviewsService] Error fetching reviews:", error)
      return {
        success: false,
        data: [],
        error: "An unexpected error occurred while fetching reviews",
      }
    }
  }
  
  export function calculateReviewStats(reviews: ProductReview[]): ReviewStats {
    if (!reviews || reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        distribution: [
          { star: 5, amount: 0 },
          { star: 4, amount: 0 },
          { star: 3, amount: 0 },
          { star: 2, amount: 0 },
          { star: 1, amount: 0 },
        ],
      }
    }
  
    const totalReviews = reviews.length
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / totalReviews
  
    const distribution = [
      { star: 5, amount: reviews.filter((r) => r.rating === 5).length },
      { star: 4, amount: reviews.filter((r) => r.rating === 4).length },
      { star: 3, amount: reviews.filter((r) => r.rating === 3).length },
      { star: 2, amount: reviews.filter((r) => r.rating === 2).length },
      { star: 1, amount: reviews.filter((r) => r.rating === 1).length },
    ]
  
    return {
      averageRating: Number.parseFloat(averageRating.toFixed(1)),
      totalReviews,
      distribution,
    }
  }
  
  