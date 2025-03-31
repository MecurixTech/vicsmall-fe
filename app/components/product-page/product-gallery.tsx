"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ProductGalleryProps = {
  productId: string
  selectedColor?: "black" | "red" | "orange" | "gray" | null
  productImages?: string
}

export default function ProductGallery({ productId, selectedColor, productImages }: ProductGalleryProps) {
  

  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const processImages = async () => {
    
      setLoading(true)

      try {

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/product-view-all/${productId}`
      

        const cookieToken =
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("access_token="))
            ?.split("=")[1] || ""


        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: cookieToken ? `Bearer ${cookieToken}` : "",
          },
          cache: "no-store",
        })

       

        if (!response.ok) {
          throw new Error(`Failed to fetch product images. Server returned ${response.status}`)
        }

        const data = await response.json()
       

        if (!data.Success) {
          
          throw new Error(data.Message || "API request was not successful")
        }

        if (!data.Data || !Array.isArray(data.Data) || data.Data.length === 0) {
         
          throw new Error("No product data found in API response")
        }

        if (!data.Data[0].items || !Array.isArray(data.Data[0].items)) {
    
          throw new Error("No product images found in API response")
        }

        const apiImages = data.Data[0].items.map((item: { product_image: string }, index: number) => {
   
          if (item.product_image.startsWith("image/upload/") && item.product_image.includes("https://")) {
            const fixedUrl = item.product_image.substring(item.product_image.indexOf("https://"))
         
            return fixedUrl
          }
          return item.product_image
        })


        if (apiImages.length > 0) {
          
          setImages(apiImages)
          setSelectedImage(apiImages[0])
          setError(null)
        } else {
          

          if (productImages) {
         
            const singleImage = [productImages.trim()]
            setImages(singleImage)
            setSelectedImage(singleImage[0])
            setError(null)
          } else {
            setImages([])
            setError("No product images found")
          }
        }
      } catch (error) {
   
        if (productImages) {
       
          const singleImage = [productImages.trim()]
          setImages(singleImage)
          setSelectedImage(singleImage[0])
          setError(null)
        } else {
          setImages([])
          setError("Failed to load product images")
        }
      } finally {
        setLoading(false)
    
      }
    }

    processImages()
  }, [productId, productImages])

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      const canScrollLeftValue = container.scrollLeft > 0
      const canScrollRightValue = container.scrollLeft < container.scrollWidth - container.clientWidth

      setCanScrollLeft(canScrollLeftValue)
      setCanScrollRight(canScrollRightValue)

     
    }
  }

  useEffect(() => {
  
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [images])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = 200
      const newScrollLeft =
        direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

     

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleThumbnailClick = (image: string) => {
    
    setSelectedImage(image)
  }

  

  if (loading) {
   
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-orange-500"></div>
      </div>
    )
  }

  if (error) {
    
    return <div className="flex h-64 items-center justify-center text-red-500">{error}</div>
  }

  const displayImages = images.length > 0 ? images : Array(4).fill("/placeholder.svg?height=120&width=120")

  const mainImage =
    selectedImage || (displayImages.length > 0 ? displayImages[0] : "/placeholder.svg?height=400&width=600")

 

  return (
    <div className="flex flex-col items-center gap-6">

      <div className="relative h-[400px] w-full max-w-xl overflow-hidden rounded-lg bg-white">
        <Image
          src={mainImage || "/placeholder.svg"}
          alt="Product main image"
          fill
          className="object-contain"
          priority
          onError={(e) => {
           
            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=600"
          }}
        />
      </div>

      <div className="relative w-full max-w-xl">
        {/* Left scroll button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Thumbnails container */}
        <div
          ref={scrollContainerRef}
          className="flex w-full gap-4 overflow-x-auto pb-2 pt-2 scrollbar-hide"
          onScroll={checkScroll}
        >
          {displayImages.map((image, index) => {
            
            return (
              <div
                key={index}
                className={`relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                  image === selectedImage ? "border-orange-500 scale-105" : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => handleThumbnailClick(image)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                   
                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=80&width=80"
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Right scroll button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}

