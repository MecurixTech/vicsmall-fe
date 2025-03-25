"use client"

import { useState, useEffect, useCallback } from "react"
import { SearchOutlined, TuneOutlined } from "@mui/icons-material"
import { toast } from "react-hot-toast"
import NavbarWrapper from "@/app/components/Navbarwrapper"
import Footer from "@/app/components/footer"
import Order from "@/app/components/orders/order"
import OrderDetailsModal from "@/app/components/orders/order-details-modal"
import ReviewModal from "@/app/components/orders/review-modal"
import FilterModal from "@/app/components/orders/filter-modal"
import EmptyOrders from "@/app/components/orders/empty-orders"
import type { OrderItem } from "@/lib/order-service"
import { Loader2 } from "lucide-react"

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [filteredOrders, setFilteredOrders] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<{
    status: string[]
    dateRange: { from: string; to: string }
  }>({
    status: [],
    dateRange: { from: "", to: "" },
  })

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [reviewOrderId, setReviewOrderId] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // console.log("[OrdersPage] Fetching orders")
      const response = await fetch("/api/orders")
      // console.log("[OrdersPage] Orders response status:", response.status)

      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const data = await response.json()
      // console.log("[OrdersPage] Orders data:", data)

      if (data.error) {
        throw new Error(data.error)
      }

      setOrders(data.data || [])
      setFilteredOrders(data.data || [])
    } catch (err) {
      // console.error("[OrdersPage] Error fetching orders:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch orders")
      toast.error("Failed to load orders")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  useEffect(() => {
    if (orders.length === 0) return

    let result = [...orders]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (order) =>
          order.order_id.toLowerCase().includes(query) || order.product_details?.name.toLowerCase().includes(query),
      )
    }

    if (activeFilters.status.length > 0) {
      result = result.filter((order) => {
        const status = order.status
        return activeFilters.status.includes(status)
      })
    }

    if (activeFilters.dateRange.from) {
      const fromDate = new Date(activeFilters.dateRange.from)
      result = result.filter((order) => new Date(order.created_at) >= fromDate)
    }

    if (activeFilters.dateRange.to) {
      const toDate = new Date(activeFilters.dateRange.to)
      toDate.setHours(23, 59, 59, 999) 
      result = result.filter((order) => new Date(order.created_at) <= toDate)
    }

    setFilteredOrders(result)
  }, [orders, searchQuery, activeFilters])


  const handleOrderCancelled = () => {
    fetchOrders()
    toast.success("Order cancelled successfully")
  }


  const handleReviewSubmitted = () => {
    toast.success("Review submitted successfully")
  }

  const handleApplyFilters = (filters: {
    status: string[]
    dateRange: { from: string; to: string }
  }) => {
    setActiveFilters(filters)
  }

  return (
    <>
    

      <div className="container mx-auto px-4 py-8 bg-white rounded-[9px]">
        <div className="mb-4 flex flex-wrap items-center justify-between">
          <h1>Orders</h1>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="search"
                placeholder="Search for an order"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="button button-secondary flex items-center gap-2 px-4"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <span>Filter</span>
              <TuneOutlined fontSize="inherit" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="mb-2 h-8 w-8 animate-spin text-orange-500" />
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 text-red-600">
            <p>{error}</p>
            <button className="mt-2 text-sm font-medium text-red-700 hover:underline" onClick={fetchOrders}>
              Try again
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <EmptyOrders
            message={
              searchQuery ||
              activeFilters.status.length > 0 ||
              activeFilters.dateRange.from ||
              activeFilters.dateRange.to
                ? "No orders match your search or filters"
                : "You haven't placed any orders yet"
            }
          />
        ) : (
          filteredOrders.map((order) => (
            <Order
              key={order.order_id}
              order={order}
              onViewDetails={(orderId) => setSelectedOrderId(orderId)}
              onWriteReview={(orderId) => setReviewOrderId(orderId)}
              onCancelled={handleOrderCancelled}
            />
          ))
        )}
      </div>

   
      <OrderDetailsModal orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />

      <ReviewModal
        orderId={reviewOrderId}
        onClose={() => setReviewOrderId(null)}
        onReviewSubmitted={handleReviewSubmitted}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </>
  )
}

export default OrdersPage

