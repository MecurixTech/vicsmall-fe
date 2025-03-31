"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { ChevronRight, Loader2, Plus, CreditCard, MapPin, Check } from "lucide-react"
import NavbarWrapper from "@/app/components/Navbarwrapper"
import Footer from "@/app/components/footer"
import { useCart } from "@/context/cart-context"
import { getAddressesClient } from "@/lib/addresses-client"
import { getPaymentMethodsClient } from "@/lib/payment-methods-client"
import type { Address } from "@/lib/addresses"
import type { PaymentMethod } from "@/lib/payment-methods"
import { fadeIn, slideUp } from "@/lib/animation-utils"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, isLoading: cartLoading } = useCart()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [paymentType, setPaymentType] = useState<"card" | "delivery">("card")
  const [isAddressesLoading, setIsAddressesLoading] = useState(true)
  const [isPaymentMethodsLoading, setIsPaymentMethodsLoading] = useState(true)
  const [isAddressesOpen, setIsAddressesOpen] = useState(false)
  const [isPaymentMethodsOpen, setIsPaymentMethodsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderNotes, setOrderNotes] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)

  const subtotal = total
  const deliveryFee = 1500
  const discount = 0
  const grandTotal = subtotal + deliveryFee - discount

  const fetchAddresses = useCallback(async () => {
    setIsAddressesLoading(true)
    try {
      const result = await getAddressesClient()
      if (result.success) {
        setAddresses(result.data)
       
        const defaultAddress = result.data.find((addr: Address) => addr.is_default)
        if (defaultAddress) {
          setSelectedAddress(defaultAddress)
        } else if (result.data.length > 0) {
          setSelectedAddress(result.data[0])
        }
      } else {
        toast.error("Failed to load addresses")
      }
    } catch (error) {
      console.error("Error fetching addresses:", error)
      toast.error("Failed to load addresses")
    } finally {
      setIsAddressesLoading(false)
    }
  }, [])

  const fetchPaymentMethods = useCallback(async () => {
    setIsPaymentMethodsLoading(true)
    try {
      const result = await getPaymentMethodsClient()
      if (result.success) {
        setPaymentMethods(result.data)
        
        const defaultPaymentMethod = result.data.find((pm: PaymentMethod) => pm.is_default)
        if (defaultPaymentMethod) {
          setSelectedPaymentMethod(defaultPaymentMethod)
        } else if (result.data.length > 0) {
          setSelectedPaymentMethod(result.data[0])
        }
      } else {
        toast.error("Failed to load payment methods")
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error)
      toast.error("Failed to load payment methods")
    } finally {
      setIsPaymentMethodsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAddresses()
    fetchPaymentMethods()
  }, [fetchAddresses, fetchPaymentMethods])

  useEffect(() => {
    if (!cartLoading && (!items || items.length === 0)) {
      toast.error("Your cart is empty")
      router.push("/cart")
    }
  }, [cartLoading, items, router])

  const handleProceedToPayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address")
      return
    }

    if (paymentType === "card" && !selectedPaymentMethod) {
      toast.error("Please select a payment method")
      return
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions")
      return
    }

    setIsSubmitting(true)

    try {
    
      const checkoutData = {
        items,
        subtotal,
        deliveryFee,
        discount,
        grandTotal,
        paymentType,
        address: selectedAddress,
        paymentMethod: selectedPaymentMethod,
        orderNotes,
      }

      sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData))

      if (paymentType === "card") {
        router.push("/payment")
      } else {
       
        router.push("/order-confirmation?paymentType=delivery")
      }
    } catch (error) {
      console.error("Error processing checkout:", error)
      toast.error("Failed to process checkout")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartLoading || isAddressesLoading || isPaymentMethodsLoading) {
    return (
      <>
        <NavbarWrapper />
        <div className="container mx-auto px-4 py-8">
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="mb-2 h-8 w-8 animate-spin text-orange-500" />
              <p className="text-gray-600">Loading checkout information...</p>
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
          <span className="text-gray-900">Checkout</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Delivery & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address Section */}
            <motion.div className="rounded-lg border bg-white p-6 shadow-sm" variants={slideUp} custom={1}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Delivery Address</h2>
                <Link href="/addresses" className="text-sm text-orange-500 hover:underline flex items-center">
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Address
                </Link>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4">You dont have any saved addresses</p>
                  <Link
                    href="/addresses"
                    className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Address
                  </Link>
                </div>
              ) : (
                <>
                  {/* Selected Address */}
                  {selectedAddress && (
                    <div className="mb-4 p-4 border rounded-lg bg-orange-50 border-orange-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <MapPin className="h-5 w-5 text-orange-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{selectedAddress.full_name}</h3>
                              {selectedAddress.is_default && (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {[
                                selectedAddress.address_line1,
                                selectedAddress.address_line2,
                                `${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip_code}`,
                                selectedAddress.country,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{selectedAddress.phone_number}</p>
                          </div>
                        </div>
                        <button
                          className="text-orange-500 hover:text-orange-800"
                          onClick={() => setIsAddressesOpen(!isAddressesOpen)}
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Address Selection */}
                  <AnimatePresence>
                    {isAddressesOpen && (
                      <motion.div
                        className="space-y-4 mt-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-medium">Select a delivery address</h3>
                        {addresses.map((address) => (
                          <motion.div
                            key={address.address_id}
                            className={`p-4 border rounded-lg cursor-pointer ${
                              selectedAddress?.address_id === address.address_id
                                ? "border-orange-500 bg-orange-50"
                                : "border-gray-200 hover:border-orange-300"
                            }`}
                            onClick={() => {
                              setSelectedAddress(address)
                              setIsAddressesOpen(false)
                            }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  {selectedAddress?.address_id === address.address_id ? (
                                    <div className="h-5 w-5 rounded-full bg-orange-600 flex items-center justify-center">
                                      <Check className="h-3 w-3 text-white" />
                                    </div>
                                  ) : (
                                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{address.full_name}</h3>
                                    {address.is_default && (
                                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {[
                                      address.address_line1,
                                      address.address_line2,
                                      `${address.city}, ${address.state} ${address.zip_code}`,
                                      address.country,
                                    ]
                                      .filter(Boolean)
                                      .join(", ")}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">{address.phone_number}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        <div className="flex justify-end">
                          <button
                            className="text-sm text-gray-500 hover:text-gray-700"
                            onClick={() => setIsAddressesOpen(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>

            {/* Payment Method Section */}
            <motion.div className="rounded-lg border bg-white p-6 shadow-sm" variants={slideUp} custom={2}>
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>

              <div className="space-y-4">
                {/* Payment Type Selection */}
                <div className="space-y-3">
                  <h3 className="font-medium">Select payment type</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.div
                      className={`flex-1 p-4 border rounded-lg cursor-pointer ${
                        paymentType === "card" ? "border-orange-500 bg-orange-50" : "border-gray-200"
                      }`}
                      onClick={() => setPaymentType("card")}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          {paymentType === "card" ? (
                            <div className="h-5 w-5 rounded-full bg-orange-600 flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">Card Payment</h4>
                          <p className="text-sm text-gray-500">Pay now with your credit/debit card</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className={`flex-1 p-4 border rounded-lg cursor-pointer ${
                        paymentType === "delivery" ? "border-orange-500 bg-orange-50" : "border-gray-200"
                      }`}
                      onClick={() => setPaymentType("delivery")}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          {paymentType === "delivery" ? (
                            <div className="h-5 w-5 rounded-full bg-orange-600 flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">Pay on Delivery</h4>
                          <p className="text-sm text-gray-500">Pay when your order is delivered</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Card Payment Method Selection */}
                {paymentType === "card" && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Select payment card</h3>
                      <Link href="/payment-methods" className="text-sm text-orange-500 hover:underline flex items-center">
                        <Plus className="h-4 w-4 mr-1" />
                        Add New Card
                      </Link>
                    </div>

                    {paymentMethods.length === 0 ? (
                      <div className="text-center py-8">
                        <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 mb-4">You dont have any saved payment methods</p>
                        <Link
                          href="/payment-methods"
                          className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Payment Method
                        </Link>
                      </div>
                    ) : (
                      <>
                        {/* Selected Payment Method */}
                        {selectedPaymentMethod && (
                          <div className="mb-4 p-4 border rounded-lg bg-orange-50 border-orange-200">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  <CreditCard className="h-5 w-5 text-orange-500" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{selectedPaymentMethod.card_holder}</h3>
                                    {selectedPaymentMethod.is_default && (
                                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    •••• •••• •••• {selectedPaymentMethod.last4 || "****"}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Expires: {selectedPaymentMethod.expiry_date.slice(0, 2)}/
                                    {selectedPaymentMethod.expiry_date.slice(2, 4)}
                                  </p>
                                </div>
                              </div>
                              <button
                                className="text-orange-500 hover:text-orange-800"
                                onClick={() => setIsPaymentMethodsOpen(!isPaymentMethodsOpen)}
                              >
                                Change
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Payment Method Selection */}
                        <AnimatePresence>
                          {isPaymentMethodsOpen && (
                            <motion.div
                              className="space-y-4 mt-4"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <h3 className="font-medium">Select a payment method</h3>
                              {paymentMethods.map((paymentMethod) => (
                                <motion.div
                                  key={paymentMethod.payment_method_id}
                                  className={`p-4 border rounded-lg cursor-pointer ${
                                    selectedPaymentMethod?.payment_method_id === paymentMethod.payment_method_id
                                      ? "border-orange-500 bg-orange-50"
                                      : "border-gray-200 hover:border-orange-300"
                                  }`}
                                  onClick={() => {
                                    setSelectedPaymentMethod(paymentMethod)
                                    setIsPaymentMethodsOpen(false)
                                  }}
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                      <div className="mt-1">
                                        {selectedPaymentMethod?.payment_method_id ===
                                        paymentMethod.payment_method_id ? (
                                          <div className="h-5 w-5 rounded-full bg-orange-600 flex items-center justify-center">
                                            <Check className="h-3 w-3 text-white" />
                                          </div>
                                        ) : (
                                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                                        )}
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <h3 className="font-medium">{paymentMethod.card_holder}</h3>
                                          {paymentMethod.is_default && (
                                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                                              Default
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                          •••• •••• •••• {paymentMethod.last4 || "****"}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                          Expires: {paymentMethod.expiry_date.slice(0, 2)}/
                                          {paymentMethod.expiry_date.slice(2, 4)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                              <div className="flex justify-end">
                                <button
                                  className="text-sm text-gray-500 hover:text-gray-700"
                                  onClick={() => setIsPaymentMethodsOpen(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Order Notes */}
            <motion.div className="rounded-lg border bg-white p-6 shadow-sm" variants={slideUp} custom={3}>
              <h2 className="text-xl font-bold mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-1">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="orderNotes"
                    rows={4}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Special instructions for delivery or any other notes"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <motion.div className="lg:col-span-1" variants={slideUp} custom={4}>
            <div className="rounded-lg border bg-white p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 max-h-60 overflow-y-auto mb-6">
                {items.map((item) => (
                  <div key={item.cart_id} className="flex gap-3 border-b pb-3">
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
                        <span>₦{((item.price || 0) * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-red-500">-₦{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Terms and Proceed Button */}
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-500">
                    I have read and agree to the website{" "}
                    <Link href="/terms" className="text-orange-500 hover:underline">
                      terms and conditions
                    </Link>
                  </label>
                </div>

                <button
                  type="button"
                  className="w-full rounded-md bg-orange-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleProceedToPayment}
                  disabled={
                    isSubmitting ||
                    !termsAccepted ||
                    !selectedAddress ||
                    (paymentType === "card" && !selectedPaymentMethod)
                  }
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </div>
                  ) : paymentType === "card" ? (
                    "Proceed to Payment"
                  ) : (
                    "Place Order"
                  )}
                </button>

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
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  )
}

