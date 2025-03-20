"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import NavbarWrapper from "@/app/components/Navbarwrapper"
import ProductSettings from "@/app/components/product-page/product-settings"
import InfoTabs from "@/app/components/product-page/info-tabs-container"
import ProductCard from "@/app/components/product-card/product-card"
import Footer from "@/app/components/footer"
import { getProductDetails } from "@/lib/product-details-actions"
import type { ProductDetails } from "@/lib/product-details-actions"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<ProductDetails | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await getProductDetails(productId)

        if (!response.success || !response.data) {
          setError(response.error || "Product not found")
          setIsLoading(false)
          return
        }

        setProduct(response.data)

        setRelatedProducts([])
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("An error occurred while loading the product")
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      fetchProductData()
    }
  }, [productId])

  if (isLoading) {
    return (
      <>
        <NavbarWrapper />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-lg">Loading product details...</span>
          </div>
        </div>
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <NavbarWrapper />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-500 mb-8">
              {error || "The product you're looking for doesn't exist or has been removed."}
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavbarWrapper />
      <title>{product.name} - VicSmall</title>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-start justify-between gap-4">
          <ProductSettings product={product} />
        </div>

        <InfoTabs product={{ ...product, imgSrc: product.imgSrc || "" }} />

        <hr className="mb-8 mt-8" />

        {relatedProducts.length > 0 && (
          <section className="mx-auto my-14 w-[95%]">
            <h3 className="mb-4 text-xl font-semibold">Recommended items</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  )
}

