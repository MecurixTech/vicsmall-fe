"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryInteractiveProps {
  images: string[]
}

export default function ProductGalleryInteractive({ images }: ProductGalleryInteractiveProps) {
  const [selectedImage, setSelectedImage] = useState<string>(images[0] || "/placeholder.svg")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = 200
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main Image */}
      <div className="relative h-[400px] w-full max-w-xl overflow-hidden rounded-lg bg-white">
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt="Product main image"
          fill
          className="object-contain"
          priority
          onError={(e) => {
            console.error(`Image load error for: ${selectedImage}`)
            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=600"
          }}
        />
      </div>

      {/* Thumbnails Section */}
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
          {images.map((image, index) => (
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
                  console.error(`Thumbnail load error for: ${image}`)
                  ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=80&width=80"
                }}
              />
            </div>
          ))}
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

