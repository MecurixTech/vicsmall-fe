"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { cancelOrderClient } from "@/lib/order-client"
import type { OrderItem } from "@/lib/order-service"
import { Truck, Package, CheckCircle, AlertCircle, Clock, Star } from "lucide-react"
import { motion } from "framer-motion"

interface OrderProps {
  order: OrderItem
  onViewDetails?: (orderId: string) => void
  onWriteReview?: (orderId: string) => void
  onCancelled?: () => void
}

const Order = ({ order, onViewDetails, onWriteReview, onCancelled }: OrderProps) => {
  const [isCancelling, setIsCancelling] = useState(false)
  const [imageError, setImageError] = useState(false)

  const determineStatus = () => {
    if (order.status === "cancelled") return "cancelled"
    if (order.is_delivered) return "delivered"
    if (order.is_out_for_delivery) return "out for delivery"
    if (order.is_shipped) return "shipped"
    if (order.is_packed) return "packed"
    if (order.is_placed) return "processing"
    return "pending"
  }

  const currentStatus = determineStatus()

  const getStatusIcon = () => {
    switch (currentStatus) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "out for delivery":
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "packed":
        return <Package className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleCancelOrder = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isCancelling) return

    if (confirm("Are you sure you want to cancel this order?")) {
      setIsCancelling(true)

      try {
        const result = await cancelOrderClient(order.order_id)

        if (result.success && onCancelled) {
          onCancelled()
        }
      } catch (error) {
        console.error("Error cancelling order:", error)
        toast.error("Failed to cancel order")
      } finally {
        setIsCancelling(false)
      }
    }
  }

  const handleTrackOrder = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    toast.success("Tracking information opened")
  }

  const getProductImage = () => {
    if (order.product_details?.image) {
      return order.product_details.image
    }

    if (order.items && order.items.length > 0) {
      return order.items[0].product_image
    }

    return "/placeholder.svg?height=128&width=128"
  }

  const getProductName = () => {
    if (order.product_details?.name) {
      return order.product_details.name
    }

    if (order.items && order.items.length > 0) {
      return order.items[0].product_name
    }

    return `Order #${order.order_id.slice(-6)}`
  }
  const price = Number.parseFloat(order.amount).toLocaleString()

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <>
      <div className="flex items-start gap-4">
        <div className="relative h-32 w-32 overflow-hidden rounded-xl">
          {imageError ? (
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt={getProductName()}
              height={128}
              width={128}
              className="rounded-xl"
            />
          ) : (
            <Image
              src={getProductImage() || "/placeholder.svg"}
              alt={getProductName()}
              height={128}
              width={128}
              className="rounded-xl object-cover"
              onError={handleImageError}
            />
          )}
        </div>

        <div className="w-full">
          <p>{getProductName()}</p>
          <p className="mb-2 text-lg font-semibold text-gray-800">&#8358;{price}</p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <motion.span
              className={`${
                currentStatus === "delivered"
                  ? "bg-green-100 text-green-600"
                  : currentStatus === "out for delivery" || currentStatus === "shipped"
                    ? "bg-yellow-100 text-yellow-600"
                    : currentStatus === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
              } mr-auto flex items-center gap-1 rounded-xl p-2 text-xs font-medium capitalize`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {getStatusIcon()}
              <span>{currentStatus}</span>
            </motion.span>

            <div className="flex flex-wrap gap-2">
              <motion.button
                className="button button-accent px-4 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewDetails && onViewDetails(order.order_id)}
              >
                Details
              </motion.button>

              {(currentStatus === "processing" || currentStatus === "packed") && (
                <motion.button
                  className="button border-2 border-red-600 px-4 py-2 text-red-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                >
                  {isCancelling ? "Cancelling..." : "Cancel order"}
                </motion.button>
              )}

              {(currentStatus === "shipped" || currentStatus === "out for delivery") && (
                <motion.button
                  className="button border-2 border-blue-600 px-4 py-2 text-blue-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTrackOrder}
                >
                  Track Order
                </motion.button>
              )}

              {currentStatus === "delivered" && (
                <motion.button
                  className="button button-primary px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onWriteReview && onWriteReview(order.order_id)}
                >
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Write Review
                  </span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 last:hidden" />
    </>
  )
}

export default Order

