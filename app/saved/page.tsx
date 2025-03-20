"use client";

import { useEffect, useState } from "react";
import { useSavedProducts } from "@/context/saved-products-context";
import NavbarWrapper from "@/app/components/Navbarwrapper";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import ProductCardWithFavorite from "../components/product-card/product-card-with-favorite";
import type { productData } from "@/app/data/dummyTypes";
import { motion } from "framer-motion";
import { getProductDetails } from "@/lib/product-details-actions";

export default function SavedProductsPage() {
  const { savedProducts, isLoading, refreshSavedProducts } = useSavedProducts();
  const [enrichedProducts, setEnrichedProducts] = useState<productData[]>([]);
  const [isEnriching, setIsEnriching] = useState(false);

  useEffect(() => {
    refreshSavedProducts();
  }, [refreshSavedProducts]);

  useEffect(() => {}, [savedProducts]);

  useEffect(() => {
    const enrichProducts = async () => {
      if (savedProducts.length > 0) {
        setIsEnriching(true);

        try {
          const enrichedProductsPromises = savedProducts.map(async (item) => {
            try {
              const response = await getProductDetails(item.product);

              if (response.success && response.data) {
                return response.data;
              }

              return {
                id: item.product,
                name: `Product ${item.product.substring(0, 8)}...`,
                currentPrice: 0,
                originalPrice: 0,
                imgSrc: "/placeholder.svg?height=120&width=120",
                category: "",
                isShippedFromAbroad: false,
                colorVariants: [],
                rating: 0,
                isNew: false,
                isFeatured: false,
                stockQuantity: 0,
                vendor: "Unknown",
                description: "",
                variant: "",
                tags: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                visibility: false,
                status: false,
              } as productData;
            } catch (error) {
              console.error(
                `[SavedProductsPage] Error fetching details for product ${item.product}:`,
                error,
              );

              return {
                id: item.product,
                name: `Product ${item.product.substring(0, 8)}...`,
                currentPrice: 0,
                originalPrice: 0,
                imgSrc: "/placeholder.svg?height=120&width=120",
                category: "",
                isShippedFromAbroad: false,
                colorVariants: [],
                rating: 0,
                isNew: false,
                isFeatured: false,
                stockQuantity: 0,
                vendor: "Unknown",
                description: "",
                variant: "",
                tags: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                visibility: false,
                status: false,
              } as productData;
            }
          });

          const enrichedProductsResult = await Promise.all(
            enrichedProductsPromises,
          );

          setEnrichedProducts(enrichedProductsResult.filter(Boolean));
        } catch (error) {
          console.error("[SavedProductsPage] Error enriching products:", error);
        } finally {
          setIsEnriching(false);
        }
      } else {
        setEnrichedProducts([]);
        setIsEnriching(false);
      }
    };

    enrichProducts();
  }, [savedProducts]);

  const isPageLoading = isLoading || isEnriching;

  return (
    <>
      <NavbarWrapper />
      <div className="container mx-auto mb-24 px-4 py-8 sm:mb-0">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span>/</span>
          <span>Saved Products</span>
        </nav>

        {isPageLoading ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-lg">Loading your saved products...</span>
          </div>
        ) : savedProducts.length === 0 ? (
          <motion.div
            className="py-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-4 text-3xl font-bold">
              Your Saved Products List is Empty
            </h1>
            <p className="mb-8 text-gray-500">
              Looks like you havent saved any products yet.
            </p>
            <Link
              href="/"
              className="inline-block rounded-md bg-orange-400 px-6 py-3 text-white transition-colors hover:bg-orange-500"
            >
              Start saving
            </Link>
          </motion.div>
        ) : enrichedProducts.length === 0 ? (
          <div className="py-16 text-center">
            <h1 className="mb-4 text-3xl font-bold">Loading Product Details</h1>
            <p className="mb-8 text-gray-500">
              We found {savedProducts.length} saved products, but we are having
              trouble loading their details.
            </p>
            <button
              onClick={() => refreshSavedProducts()}
              className="inline-block rounded-md bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-6 text-2xl font-bold">
              Saved Products ({enrichedProducts.length})
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {enrichedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCardWithFavorite product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
