"use client"

import { useCart } from "@/context/cart-context"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import NavbarWrapper from "@/app/components/Navbarwrapper"
import CartItem from "./cart-item"
import PartPaymentModal from "./part-payment-modal"
import { getProductDetails } from "@/lib/product-details-actions"
import { toast } from "react-hot-toast"

const productDetailsCache = new Map()
const fetchProductDetails = async (productId: string) => {
  try {

    if (productDetailsCache.has(productId)) {
      return productDetailsCache.get(productId)
    }

    const response = await getProductDetails(productId)

    if (!response.success || !response.data) {
      console.error(`[CartPage] Error fetching product details for ${productId}:`, response.error)
      return {
        name: `Product ${productId.substring(0, 8)}...`,
        price: 0,
        originalPrice: 0,
        image: "/placeholder.svg?height=120&width=120",
      }
    }

    const data = response.data

    const details = {
      name: data.name,
      price: data.currentPrice,
      originalPrice: data.originalPrice,
      image: data.imgSrc,
      variant: data.variant || "",
      description: data.description || "",
    }

    productDetailsCache.set(productId, details)
    return details
  } catch (error) {
    console.error(`[CartPage] Exception in fetchProductDetails for ${productId}:`, error)
    return {
      name: "Unknown Product",
      price: 0,
      originalPrice: 0,
      image: "/placeholder.svg?height=120&width=120",
    }
  }
}

export default function CartPage() {
  const router = useRouter()
  const { items, isLoading, refreshCart, syncCartWithServer, cartTotals, totalItems } = useCart()
  const [enrichedItems, setEnrichedItems] = useState<any[]>([])
  const [couponCode, setCouponCode] = useState("")
  const [paymentMode, setPaymentMode] = useState("full")
  const [partPaymentPercentage, setPartPaymentPercentage] = useState(75)
  const [agreementChecked, setAgreementChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPartPaymentModal, setShowPartPaymentModal] = useState(false)

  const { subtotal, deliveryFee, discount, grandTotal } = cartTotals
  const partPayment = Math.round((grandTotal * partPaymentPercentage) / 100)

  useEffect(() => {
    const savedPaymentMode = sessionStorage.getItem("cartPaymentMode")
    if (savedPaymentMode) {
      setPaymentMode(savedPaymentMode)
    }

    const savedPercentage = sessionStorage.getItem("cartPartPaymentPercentage")
    if (savedPercentage) {
      setPartPaymentPercentage(Number(savedPercentage))
    }

    const savedAgreement = sessionStorage.getItem("cartAgreementChecked")
    if (savedAgreement === "true") {
      setAgreementChecked(true)
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem("cartPaymentMode", paymentMode)
    sessionStorage.setItem("cartPartPaymentPercentage", partPaymentPercentage.toString())
    sessionStorage.setItem("cartAgreementChecked", agreementChecked.toString())
  }, [paymentMode, partPaymentPercentage, agreementChecked])

  useEffect(() => {
    refreshCart()
  }, [])

  useEffect(() => {
    const enrichItems = async () => {
      if (items.length > 0) {
        const enrichedItemsPromises = items.map(async (item) => {

          if (item.name && item.price && item.image) {
            return item
          }
          const productDetails = await fetchProductDetails(item.product_id)
          return {
            ...item,
            name: productDetails.name,
            price: productDetails.price,
            originalPrice: productDetails.originalPrice,
            image: productDetails.image,
            variant: productDetails.variant,
          }
        })

        const enrichedItemsResult = await Promise.all(enrichedItemsPromises)
        setEnrichedItems(enrichedItemsResult)
      } else {
        setEnrichedItems([])
      }
    }

    enrichItems()
  }, [items])

  useEffect(() => {
    if (enrichedItems.length > 0) {
      const totals = {
        subtotal,
        deliveryFee,
        discount,
        grandTotal,
        paymentMode,
        partPayment: paymentMode === "part" ? partPayment : 0,
        partPaymentPercentage: paymentMode === "part" ? partPaymentPercentage : 0,
      }

      try {
        localStorage.setItem("cart_totals", JSON.stringify(totals))

      } catch (error) {
        console.error("[CartPage] Error saving cart totals to localStorage:", error)
      }
    }
  }, [enrichedItems, subtotal, deliveryFee, discount, grandTotal, paymentMode, partPayment, partPaymentPercentage])

  const handleApplyCode = () => {
    if (!couponCode.trim()) return

  }

  const handleCheckout = async () => {
    if (paymentMode === "part" && !agreementChecked) {
      setShowPartPaymentModal(true)
      return
    }

    setIsSubmitting(true)

    if (syncCartWithServer) {
      const syncSuccess = await syncCartWithServer()
      if (!syncSuccess) {
        setIsSubmitting(false)
        toast.error("Unable to update cart. Please try again.")
        return
      }
    }

    const checkoutData = {
      items: enrichedItems,
      subtotal,
      deliveryFee,
      discount,
      grandTotal,
      paymentMode,
      partPayment: paymentMode === "part" ? partPayment : 0,
      partPaymentPercentage: paymentMode === "part" ? partPaymentPercentage : 0,
    }

    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData))
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/checkout")
    }, 1000)
  }

  const handleAcceptTerms = () => {
    setAgreementChecked(true)
    setShowPartPaymentModal(false)
  }

  return (
    <>
      <NavbarWrapper />
      <div className="container mx-auto px-4 py-8 mb-24 sm:mb-0">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span>/</span>
          <span>Cart</span>
        </nav>

        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-lg">Loading your cart...</span>
          </div>
        ) : enrichedItems.length === 0 ? (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-500 mb-8">Looks like you havent added any items to your cart yet.</p>
            <Link
              href="/category-page"
              className="inline-block rounded-md bg-orange-400 px-6 py-3 text-white transition-colors hover:bg-orange-500"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
            <div>
              <h1 className="mb-6 text-2xl font-bold">
                Cart ({items.length} {items.length === 1 ? "item" : "items"})
              </h1>
              <div className="space-y-4">
                {enrichedItems.map((item) => (
                  <CartItem key={item.cart_id} item={item} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2 rounded-lg border p-4 bg-white shadow-sm">
                <h2 className="text-xl font-bold">Coupon Code</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Input code to get discounts"
                    className="h-10 flex-1 rounded-md border bg-[#EFEFEF] px-3 text-sm"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    onClick={handleApplyCode}
                    className="text-[#030359] px-4 py-2 font-medium disabled:opacity-50"
                    disabled={!couponCode.trim()}
                  >
                    Apply Code
                  </button>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border p-4 bg-white shadow-sm">
                <h2 className="text-xl font-bold">Payment Mode</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMode"
                      checked={paymentMode === "full"}
                      onChange={() => setPaymentMode("full")}
                      className="h-4 w-4 border-gray-300 text-[#030359]"
                    />
                    <span>Full Payment</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMode"
                      checked={paymentMode === "part"}
                      onChange={() => setPaymentMode("part")}
                      className="h-4 w-4 border-gray-300 text-[#030359]"
                    />
                    <span>Part Payment</span>
                  </label>
                </div>

                {paymentMode === "part" && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Select Part Payment Percentage</p>
                    <div className="relative">
                      <input
                        type="range"
                        min="25"
                        max="100"
                        value={partPaymentPercentage}
                        onChange={(e) => setPartPaymentPercentage(Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#FF8C48]"
                      />
                      <div className="mt-1 flex justify-between text-sm text-gray-600">
                        <span>25%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 rounded-lg border p-4 bg-white shadow-sm">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sub Total</span>
                    <span>N {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>N {deliveryFee.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-red-500">-N {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Grand Total</span>
                    <span>N {grandTotal.toLocaleString()}</span>
                  </div>
                  {paymentMode === "part" && (
                    <div className="flex justify-between font-bold text-green-600">
                      <span>Part Payment</span>
                      <span>N {partPayment.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {paymentMode === "part" && (
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={agreementChecked}
                    onChange={(e) => setAgreementChecked(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#FF8C48]"
                  />
                  <span className="text-sm">
                    I have read and agree to the{" "}
                    <Link href="/part-payment-terms" className="text-[#030359] underline">
                      Part Payment Agreement
                    </Link>
                  </span>
                </label>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full rounded-md bg-[#FF8C48] py-3 text-white transition-colors hover:bg-orange-500 disabled:opacity-50 flex items-center justify-center"
                  disabled={isSubmitting || (paymentMode === "part" && !agreementChecked)}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Checkout"
                  )}
                </button>
                <Link
                  href="/"
                  className="block w-full rounded-md border border-[#030359] py-3 text-center text-[#030359] transition-colors hover:bg-gray-50"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}

        <PartPaymentModal
          isOpen={showPartPaymentModal}
          onClose={() => setShowPartPaymentModal(false)}
          onAccept={handleAcceptTerms}
        />
      </div>
    </>
  )
}

