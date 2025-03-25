"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import NavbarWrapper from "../components/Navbarwrapper"
import { getCategories, type Category } from "@/lib/api"
import Image from "next/image"


import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { ErrorBoundary } from "../components/error-boundary"
import { staggerContainer, staggerItem } from "@/lib/animation-utils"
import { handleError } from "@/utils/error-handler"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const data = await getCategories()
        setCategories(data)
        toast.success("Categories loaded successfully")
      } catch (error) {
        console.error("Error fetching categories:", error)
        setError(error instanceof Error ? error : new Error("Failed to fetch categories"))
        handleError(error, "Failed to load categories")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  if (isLoading && isMobile) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] pb-24">
        <NavbarWrapper />

        <div className="px-6 py-4 mt-4">
          <div className="bg-white rounded-md shadow-md p-4 mb-5 flex justify-between items-center animate-pulse">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>

          <div className="flex flex-col gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-md shadow-md p-4 animate-pulse">
                <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>

                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="flex flex-col items-center">
                      <div className="w-[96px] h-[80px] bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  if (isLoading && !isMobile) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavbarWrapper />

        <div className="container mx-auto px-4 py-8 z-10">
          <div className="mb-8 flex gap-2 text-sm text-gray-500 animate-pulse">
            <div className="h-4 w-10 bg-gray-200 rounded"></div>
            <div className="h-4 w-2 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-lg bg-white shadow-md animate-pulse">
                <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded w-3/4"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] pb-24">
        <NavbarWrapper />

        <motion.div
          className="px-[23px] py-4 mt-4 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-[#FDFDFD] rounded-[5px] shadow-[0px_4px_28px_-2px_rgba(0,0,0,0.08)] p-4 mb-5 flex justify-between items-center h-[51px]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="font-semibold text-[14px] text-[#1E1E1E] font-poppins">All Products</span>
            <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.40485 8L6.55015 7L0.793783 1.41L2.25605 0L10.4941 8L2.25605 16L0.804081 14.59L6.55015 9L7.40485 8Z"
                fill="black"
              />
            </svg>
          </motion.div>

          <motion.div
            className="flex flex-col gap-[21px]"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {error ? (
              <ErrorBoundary>
                <div className="bg-red-50 p-4 rounded-md text-red-600">
                  Failed to load categories. Please try again.
                </div>
              </ErrorBoundary>
            ) : (
              categories.map((category) => (
                <motion.div
                  key={category.id}
                  
                  className="bg-[#FDFDFD] rounded-[5px] shadow-[0px_4px_28px_-2px_rgba(0,0,0,0.08)] p-[9px] pb-[17px]"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h3 className="font-semibold text-[14px] mb-[25px] font-poppins text-[#1E1E1E]">{category.name}</h3>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex gap-[16px] mb-[17px]">
                      {category.subcategories.slice(0, 3).map((subcategory) => (
                        <motion.div key={subcategory.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link
                            href={`/category/${category.id}/${subcategory.id}`}
                            className="flex flex-col items-center"
                          >
                            <div className="w-[96.67px] h-[80px] border border-[rgba(0,0,0,0.21)] rounded-[4px] mb-[8px] overflow-hidden">
                              <Image
                                src={subcategory.image || "/placeholder.svg"}
                                alt={subcategory.name}
                                className="w-full h-full object-cover rounded-[4px] transition-transform duration-300 hover:scale-110"
                                height={80}
                                width={96.67}
                              />
                            </div>
                            <span className="text-[12px] text-[rgba(30,30,30,0.89)] font-light font-poppins">
                              {subcategory.name}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex gap-[16px]">
                      {category.subcategories.slice(3, 6).map((subcategory) => (
                        <motion.div key={subcategory.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link href={`/category-page/${subcategory.id}`} className="flex flex-col items-center">
                            <div className="w-[96.67px] h-[80px] border border-[rgba(0,0,0,0.21)] rounded-[4px] mb-[8px] overflow-hidden">
                              <Image
                                src={subcategory.image || "/placeholder.svg"}
                                alt={subcategory.name}
                                className="w-full h-full object-cover rounded-[4px] transition-transform duration-300 hover:scale-110"
                                height={80}
                                width={96.67}
                              />
                            </div>
                            <span className="text-[12px] text-[rgba(30,30,30,0.89)] font-light font-poppins">
                              {subcategory.name}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWrapper />

      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700 transition-colors duration-200">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-700">Categories</span>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {error ? (
            <ErrorBoundary>
              <div className="col-span-full bg-red-50 p-4 rounded-md text-red-600">
                Failed to load categories. Please try again.
              </div>
            </ErrorBoundary>
          ) : (
            categories.map((category) => (
              <motion.div
                key={category.id}
                variants={staggerItem}
                className="rounded-lg bg-white p-6 shadow-md"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="mb-4 text-lg font-semibold">{category.name}</h3>
                <ul className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <motion.li
                      key={subcategory.id}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      <Link
                        href={`/category-page/${subcategory.id}`}
                        className="flex items-center gap-2 rounded-md py-1 transition-colors hover:text-orange-600"
                      >
                        <span>{subcategory.name}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

