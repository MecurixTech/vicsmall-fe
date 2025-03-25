"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { cancelOrderClient } from "@/lib/order-client"
import type { OrderItem } from "@/lib/order-service"
import { Loader2 } from "lucide-react"

interface OrderItemProps {
  order: OrderItem
  onCancelled: () => void
  onViewDetails: (orderId: string) => void
  onWriteReview: (orderId: string) => void
}

export default function OrderItemCard({ order, onCancelled, onViewDetails, onWriteReview }: OrderItemProps) {
  const [isCancelling, setIsCancelling] = useState(false)

  const formattedDate = new Date(order.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

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

  const getStatusColor = () => {
    switch (currentStatus) {
      case "delivered":
        return "bg-green-100 text-green-600"
      case "out for delivery":
      case "shipped":
      case "packed":
      case "processing":
        return "bg-yellow-100 text-yellow-600"
      case "cancelled":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const handleCancelOrder = async () => {
    if (isCancelling) return

    if (confirm("Are you sure you want to cancel this order?")) {
      setIsCancelling(true)

      try {
        const result = await cancelOrderClient(order.order_id)

        if (result.success) {
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

  const canCancel = ["pending", "processing", "packed"].includes(currentStatus)
  const canReview = currentStatus === "delivered"
  const productImage = "/placeholder.svg?height=128&width=128"

  return (
    <motion.div
      className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      layout
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <motion.div
            className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={order.product_details?.image || productImage}
              alt={order.product_details?.name || `Order ${order.order_id}`}
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {order.product_details?.name || `Order #${order.order_id.slice(-6)}`}
                </h3>
                <p className="text-sm text-gray-500">Ordered on {formattedDate}</p>
              </div>

              <motion.span
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor()}`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {currentStatus}
              </motion.span>
            </div>

            <p className="mb-4 text-lg font-semibold text-gray-900">
              ₦{Number.parseFloat(order.amount).toLocaleString()}
            </p>

            <div className="flex flex-wrap gap-2">
              <motion.button
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewDetails(order.order_id)}
              >
                View Details
              </motion.button>

              {canCancel && (
                <motion.button
                  className="rounded-md border border-red-600 px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Cancelling...
                    </span>
                  ) : (
                    "Cancel Order"
                  )}
                </motion.button>
              )}

              {["shipped", "out for delivery"].includes(currentStatus) && (
                <motion.button
                  className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toast.success("Tracking information opened")}
                >
                  Track Order
                </motion.button>
              )}

              {canReview && (
                <motion.button
                  className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onWriteReview(order.order_id)}
                >
                  Write Review
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

