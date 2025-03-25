"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { ChevronRight, Loader2, CreditCard, Calendar, Lock } from "lucide-react"
import NavbarWrapper from "@/app/components/Navbarwrapper"
import Footer from "@/app/components/footer"
import { fadeIn, slideUp } from "@/lib/animation-utils"
import { createOrder } from "@/lib/create-order-client"
import { useCart } from "@/context/cart-context"

interface PaymentFormData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardHolderName: string
}

export default function PaymentPage() {
  const router = useRouter()
  const { clearCart } = useCart()

  const [checkoutData, setCheckoutData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  })

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const groups = []

    for (let i = 0; i < digits.length && i < 16; i += 4) {
      groups.push(digits.slice(i, i + 4))
    }

    return groups.join(" ")
  }

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "")

    if (digits.length <= 2) {
      return digits
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "cardNumber") {
      setFormData({ ...formData, cardNumber: formatCardNumber(value) })
    } else if (name === "expiryDate") {
      setFormData({ ...formData, expiryDate: formatExpiryDate(value) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }
  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("checkoutData")
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setCheckoutData(parsedData)

         
        if (parsedData.paymentMethod) {
          const pm = parsedData.paymentMethod
          const last4 = pm.last4 || "****"
          const maskedCardNumber = `**** **** **** ${last4}`

          const expiryDate = pm.expiry_date ? `${pm.expiry_date.slice(0, 2)}/${pm.expiry_date.slice(2, 4)}` : ""

          setFormData({
            cardHolderName: pm.card_holder || "",
            cardNumber: maskedCardNumber,
            expiryDate: expiryDate,
            cvv: "", 
          })
        }
      } else {
        toast.error("No checkout data found")
        router.push("/checkout")
      }
    } catch (error) {
      console.error("Error loading checkout data:", error)
      toast.error("Failed to load checkout data")
      router.push("/checkout")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.cardNumber.trim() ||
      (formData.cardNumber.replace(/\D/g, "").length < 16 && !formData.cardNumber.includes("****"))
    ) {
      toast.error("Please enter a valid card number")
      return
    }

    if (!formData.expiryDate.trim() || formData.expiryDate.replace(/\D/g, "").length < 4) {
      toast.error("Please enter a valid expiry date")
      return
    }

    if (!formData.cvv.trim() || formData.cvv.length < 3) {
      toast.error("Please enter a valid CVV")
      return
    }

    if (!formData.cardHolderName.trim()) {
      toast.error("Please enter the card holder name")
      return
    }

    setIsSubmitting(true)

    try {
    
      toast.loading("Processing payment...", { id: "payment" })
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const orderPromises = checkoutData.items.map(async (item: any) => {
        return createOrder({
          product_id: item.product_id,
          quantity: item.quantity,
        })
      })

      const orderResults = await Promise.all(orderPromises)

      const allSuccessful = orderResults.every((result) => result.success)

      if (allSuccessful) {
        toast.success("Payment successful!", { id: "payment" })

        await clearCart()

        const paymentMethodInfo = checkoutData.paymentMethod || {
          card_holder: formData.cardHolderName,
          last4: formData.cardNumber.slice(-4),
        }

        const orderData = {
          orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
          date: new Date().toISOString(),
          items: checkoutData.items,
          subtotal: checkoutData.subtotal,
          deliveryFee: checkoutData.deliveryFee,
          discount: checkoutData.discount,
          grandTotal: checkoutData.grandTotal,
          address: checkoutData.address,
          paymentType: "card",
          paymentMethod: paymentMethodInfo,
          orderNotes: checkoutData.orderNotes,
        }

        sessionStorage.setItem("orderConfirmation", JSON.stringify(orderData))

        router.push("/order-confirmation?paymentType=card")
      } else {
        toast.error("Failed to create one or more orders", { id: "payment" })
      }
    } catch (error) {
      console.error("Error processing payment:", error)
      toast.error("Payment failed. Please try again.", { id: "payment" })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <NavbarWrapper />
        <div className="container mx-auto px-4 py-8">
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="mb-2 h-8 w-8 animate-spin text-orange-500" />
              <p className="text-gray-600">Loading payment information...</p>
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
          <Link href="/cart" className="hover:text-gray-700">
            Cart
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/checkout" className="hover:text-gray-700">
            Checkout
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Payment</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Payment Form */}
          <motion.div className="rounded-lg border bg-white p-6 shadow-sm" variants={slideUp} custom={1}>
            <h2 className="text-xl font-bold mb-6">Payment Details</h2>

            {/* Display selected card information */}
            {checkoutData?.paymentMethod && (
              <div className="mb-6 p-4 border rounded-lg bg-orange-50 border-orange-200">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <CreditCard className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Selected Payment Card</h3>
                    <p className="text-sm text-gray-600">{checkoutData.paymentMethod.card_holder}</p>
                    <p className="text-sm text-gray-600">•••• •••• •••• {checkoutData.paymentMethod.last4 || "****"}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Expires: {checkoutData.paymentMethod.expiry_date.slice(0, 2)}/
                      {checkoutData.paymentMethod.expiry_date.slice(2, 4)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Please confirm your payment by entering the CVV code from the back of your card
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    id="cardHolderName"
                    name="cardHolderName"
                    value={formData.cardHolderName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="John Doe"
                    required
                    readOnly={checkoutData?.paymentMethod != null}
                    disabled={checkoutData?.paymentMethod != null}
                  />
                </div>

                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 pl-10 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                      readOnly={checkoutData?.paymentMethod != null}
                      disabled={checkoutData?.paymentMethod != null}
                    />
                    <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 pl-10 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        readOnly={checkoutData?.paymentMethod != null}
                        disabled={checkoutData?.paymentMethod != null}
                      />
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 pl-10 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full rounded-md bg-orange-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay ₦${checkoutData?.grandTotal.toLocaleString() || "0"}`
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Secured by <span className="font-bold text-gray-800">paystack</span>
                </p>
                <div className="flex justify-center gap-4 mt-2">
                  <Image
                    src="https://utfs.io/f/wLDjZbdcJHpRrxdlQbfYBWtjunxSf09cIbVqlDOvXH5MFzyi"
                    alt="Paystack logo"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                  <Image
                    src="https://utfs.io/f/wLDjZbdcJHpRmvvpNoyR3IeQOKw86LrAaEsNXpnHzPq75WUR"
                    alt="Mastercard logo"
                    width={50}
                    height={30}
                    className="object-contain"
                  />
                  <Image
                    src="https://utfs.io/f/wLDjZbdcJHpRPX4PXilmjskbuFOfhd9rRGH0xBp2yi3evQ71"
                    alt="Visa logo"
                    width={50}
                    height={30}
                    className="object-contain"
                  />
                  <Image
                    src="https://utfs.io/f/wLDjZbdcJHpRuAGKTsYKYAcqWPj3BXOmpaeFbVsvr7H24o1Q"
                    alt="Verve logo"
                    width={50}
                    height={30}
                    className="object-contain"
                  />
                </div>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div variants={slideUp} custom={2}>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 max-h-60 overflow-y-auto mb-6">
                {checkoutData?.items.map((item: any, index: number) => (
                  <div key={index} className="flex gap-3 border-b pb-3">
                    <div className="h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=64&width=64"}
                        alt={item.name || "Product"}
                        width={64}
                        height={64}
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <div className="flex justify-between text-sm">
                        <span>Qty: {item.quantity}</span>
                        <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Delivery Address</h3>
                <div className="rounded-lg bg-gray-50 p-3 text-sm">
                  <p className="font-medium">{checkoutData?.address?.full_name}</p>
                  <p className="text-gray-600">
                    {[
                      checkoutData?.address?.address_line1,
                      checkoutData?.address?.address_line2,
                      `${checkoutData?.address?.city}, ${checkoutData?.address?.state} ${checkoutData?.address?.zip_code}`,
                      checkoutData?.address?.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <p className="text-gray-600 mt-1">{checkoutData?.address?.phone_number}</p>
                </div>
              </div>

              {/* Order Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₦{checkoutData?.subtotal.toLocaleString() || "0"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span>₦{checkoutData?.deliveryFee.toLocaleString() || "0"}</span>
                </div>
                {(checkoutData?.discount || 0) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-red-500">-₦{checkoutData?.discount.toLocaleString() || "0"}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₦{checkoutData?.grandTotal.toLocaleString() || "0"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  )
}

