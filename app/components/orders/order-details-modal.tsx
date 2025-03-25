"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Package, Truck, Home, CheckCircle, Clock, Star } from "lucide-react"
import Image from "next/image"
import type { OrderItem } from "@/lib/order-service"
import { toast } from "react-hot-toast"

interface OrderDetailsModalProps {
  orderId: string | null
  onClose: () => void
}

export default function OrderDetailsModal({ orderId, onClose }: OrderDetailsModalProps) {
  const [order, setOrder] = useState<OrderItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!orderId) return

    const fetchOrderDetails = async () => {
      setLoading(true)
      try {
       
        const response = await fetch("/api/orders")

        if (!response.ok) {
          throw new Error("Failed to fetch orders")
        }

        const data = await response.json()

        const foundOrder = data.data.find((o: OrderItem) => o.order_id === orderId)

        if (!foundOrder) {
          throw new Error("Order not found")
        }

        setOrder(foundOrder)
      } catch (error) {
        console.error("Error fetching order details:", error)
        toast.error("Failed to load order details")
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId])

  if (!orderId) return null

  const formattedDate = order?.created_at
    ? new Date(order.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""

  const getProductImage = () => {
    if (order?.product_details?.image) {
      return order.product_details.image
    }

    if (order?.items && order.items.length > 0) {
      return order.items[0].product_image
    }

    return "/placeholder.svg?height=128&width=128"
  }

  const getProductName = () => {
    if (order?.product_details?.name) {
      return order.product_details.name
    }

    if (order?.items && order.items.length > 0) {
      return order.items[0].product_name
    }

    return `Order #${order?.order_id.slice(-6) || ""}`
  }

  const getProductPrice = () => {
    if (order?.product_details?.price) {
      return order.product_details.price
    }

    if (order?.items && order.items.length > 0) {
      return order.items[0].price
    }

    return 0
  }

  const determineStatus = () => {
    if (!order) return "pending"

    if (order.status === "cancelled") return "cancelled"
    if (order.is_delivered) return "delivered"
    if (order.is_out_for_delivery) return "out for delivery"
    if (order.is_shipped) return "shipped"
    if (order.is_packed) return "packed"
    if (order.is_placed) return "processing"
    return "pending"
  }

  const currentStatus = determineStatus()
  const getTrackingSteps = () => {
    if (!order) return []

    return [
      {
        id: "placed",
        title: "Order Placed",
        description: "Your order has been placed",
        completed: true,
        icon: <Clock className="h-4 w-4" />,
        date: order.created_at ? new Date(order.created_at).toLocaleDateString() : "",
      },
      {
        id: "packed",
        title: "Order Packed",
        description: "Your order has been packed",
        completed: order.is_packed,
        icon: <Package className="h-4 w-4" />,
        date: order.is_packed ? "Processing" : "",
      },
      {
        id: "shipped",
        title: "Order Shipped",
        description: "Your order has been shipped",
        completed: order.is_shipped,
        icon: <Truck className="h-4 w-4" />,
        date: order.is_shipped ? "In transit" : "",
      },
      {
        id: "out_for_delivery",
        title: "Out for Delivery",
        description: "Your order is out for delivery",
        completed: order.is_out_for_delivery,
        icon: <Truck className="h-4 w-4" />,
        date: order.is_out_for_delivery ? "On the way" : "",
      },
      {
        id: "delivered",
        title: "Delivered",
        description: "Your order has been delivered",
        completed: order.is_delivered,
        icon: <Home className="h-4 w-4" />,
        date: order.is_delivered ? "Completed" : "",
      },
    ]
  }

  const trackingSteps = getTrackingSteps()

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="mb-6 text-2xl font-bold text-gray-900">Order Details</h2>

          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500"></div>
            </div>
          ) : order ? (
            <div className="space-y-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{order.order_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date Placed</p>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">₦{Number.parseFloat(order.amount).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <motion.span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        currentStatus === "delivered"
                          ? "bg-green-100 text-green-600"
                          : currentStatus === "cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {currentStatus}
                    </motion.span>
                  </div>
                </div>
              </div>

              {currentStatus !== "cancelled" && (
                <div>
                  <h3 className="mb-4 text-lg font-medium">Order Tracking</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

                    {trackingSteps.map((step, index) => (
                      <div key={step.id} className="relative mb-6 pl-10">
                        <div
                          className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full ${
                            step.completed ? "bg-green-500" : "bg-gray-200"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4 text-white" />
                          ) : (
                            <span className="text-white">{step.icon}</span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{step.title}</h4>
                            {step.date && <span className="text-xs text-gray-500">{step.date}</span>}
                          </div>
                          <p className="text-sm text-gray-500">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="mb-4 text-lg font-medium">Product Information</h3>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    {imageError ? (
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt={getProductName()}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={getProductImage() || "/placeholder.svg"}
                        alt={getProductName()}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                        onError={handleImageError}
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{getProductName()}</h4>
                    <p className="text-sm text-gray-500">₦{getProductPrice().toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Add a tracking button if the order is shipped or out for delivery */}
              {(order.is_shipped || order.is_out_for_delivery) && !order.is_delivered && (
                <div className="flex justify-end">
                  <motion.button
                    className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toast.success("Tracking information opened in a new tab")}
                  >
                    <Truck className="h-4 w-4" />
                    <span>Track Shipment</span>
                  </motion.button>
                </div>
              )}

              {order.is_delivered && (
                <div className="flex justify-end mt-4">
                  <motion.button
                    className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onClose()
                      
                    }}
                  >
                    <Star className="h-4 w-4" />
                    <span>Write a Review</span>
                  </motion.button>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg bg-red-50 p-4 text-red-600">Failed to load order details</div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

