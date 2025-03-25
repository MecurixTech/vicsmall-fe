"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { ChevronRight, CheckCircle, Loader2, Package, Truck, Home, CreditCard } from "lucide-react"
import NavbarWrapper from "@/app/components/Navbarwrapper"
import Footer from "@/app/components/footer"
import { fadeIn, slideUp } from "@/lib/animation-utils"

export default function OrderConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentType = searchParams.get("paymentType") || "card"

  const [orderData, setOrderData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("orderConfirmation")
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setOrderData(parsedData)
      } else {
        
        if (paymentType === "delivery") {
          const checkoutData = sessionStorage.getItem("checkoutData")
          if (checkoutData) {
            const parsedCheckoutData = JSON.parse(checkoutData)
            const newOrderData = {
              orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
              date: new Date().toISOString(),
              items: parsedCheckoutData.items,
              subtotal: parsedCheckoutData.subtotal,
              deliveryFee: parsedCheckoutData.deliveryFee,
              discount: parsedCheckoutData.discount,
              grandTotal: parsedCheckoutData.grandTotal,
              address: parsedCheckoutData.address,
              paymentType: "delivery",
              paymentMethod: null,
              orderNotes: parsedCheckoutData.orderNotes,
            }
            setOrderData(newOrderData)
            sessionStorage.setItem("orderConfirmation", JSON.stringify(newOrderData))
          } else {
            toast.error("No order data found")
            router.push("/")
          }
        } else {
          toast.error("No order data found")
          router.push("/")
        }
      }
    } catch (error) {
      console.error("Error loading order data:", error)
      toast.error("Failed to load order data")
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }, [paymentType, router])

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <>
        <NavbarWrapper />
        <div className="container mx-auto px-4 py-8">
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="mb-2 h-8 w-8 animate-spin text-orange-500" />
              <p className="text-gray-600">Loading order information...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <NavbarWrapper />
      <motion.div className="container mx-auto px-4 py-8" initial="hidden" animate="visible" variants={fadeIn}>
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Order Confirmation</span>
        </nav>

        <motion.div className="mx-auto max-w-3xl" variants={slideUp} custom={1}>
          {/* Success Message */}
          <div className="mb-8 text-center">
            <motion.div
              className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your order. We've received your {paymentType === "card" ? "payment" : "order"} and will
              process it shortly.
            </p>
          </div>

          {/* Order Details */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-6 border-b pb-6">
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">Order #{orderData?.orderNumber}</h2>
                  <p className="text-sm text-gray-500">Placed on {formatDate(orderData?.date)}</p>
                </div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                    {paymentType === "card" ? "Paid" : "Payment on Delivery"}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="mb-4 font-semibold">Order Items</h3>
              <div className="space-y-4">
                {orderData?.items.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="h-20 w-20 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=80&width=80"}
                        alt={item.name || "Product"}
                        width={80}
                        height={80}
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="mt-1 flex flex-wrap justify-between gap-2">
                        <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-6 border-b pb-6">
              <h3 className="mb-4 font-semibold">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₦{orderData?.subtotal.toLocaleString() || "0"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span>₦{orderData?.deliveryFee.toLocaleString() || "0"}</span>
                </div>
                {(orderData?.discount || 0) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-red-500">-₦{orderData?.discount.toLocaleString() || "0"}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 my-2 pt-2"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₦{orderData?.grandTotal.toLocaleString() || "0"}</span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mb-6 border-b pb-6">
              <h3 className="mb-4 font-semibold">Delivery Information</h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="font-medium">{orderData?.address?.full_name}</p>
                <p className="text-gray-600">
                  {[
                    orderData?.address?.address_line1,
                    orderData?.address?.address_line2,
                    `${orderData?.address?.city}, ${orderData?.address?.state} ${orderData?.address?.zip_code}`,
                    orderData?.address?.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                <p className="text-gray-600 mt-1">{orderData?.address?.phone_number}</p>
              </div>
            </div>

            {/* Order Tracking */}
            <div className="mb-6">
              <h3 className="mb-4 font-semibold">Order Status</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

                <div className="relative mb-6 pl-10">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Order Placed</h4>
                    <p className="text-sm text-gray-500">Your order has been placed</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(orderData?.date)}</p>
                  </div>
                </div>

                <div className="relative mb-6 pl-10">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    <Package className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Order Packed</h4>
                    <p className="text-sm text-gray-500">Your order is being prepared</p>
                  </div>
                </div>

                <div className="relative mb-6 pl-10">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    <Truck className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Order Shipped</h4>
                    <p className="text-sm text-gray-500">Your order is on the way</p>
                  </div>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    <Home className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Order Delivered</h4>
                    <p className="text-sm text-gray-500">Your order will be delivered soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            {paymentType === "card" && orderData?.paymentMethod && (
              <div className="mb-6">
                <h3 className="mb-4 font-semibold">Payment Information</h3>
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Card Payment</span>
                  </div>
                  <p className="text-gray-600 mt-1">•••• •••• •••• {orderData.paymentMethod.last4 || "****"}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/account/orders"
                className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
              >
                View All Orders
              </Link>
              <Link
                href="/"
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  )
}

