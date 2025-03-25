"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: {
    status: string[]
    dateRange: { from: string; to: string }
  }) => void
}

export default function FilterModal({ isOpen, onClose, onApplyFilters }: FilterModalProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"]

  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
    } else {
      setSelectedStatuses([...selectedStatuses, status])
    }
  }

  const handleApply = () => {
    onApplyFilters({
      status: selectedStatuses,
      dateRange: {
        from: dateFrom,
        to: dateTo,
      },
    })
    onClose()
  }

  const handleReset = () => {
    setSelectedStatuses([])
    setDateFrom("")
    setDateTo("")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-xl"
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

            <h2 className="mb-6 text-2xl font-bold text-gray-900">Filter Orders</h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-medium">Order Status</h3>
                <div className="space-y-2">
                  {statuses.map((status) => (
                    <motion.div
                      key={status}
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <input
                        type="checkbox"
                        id={`status-${status}`}
                        checked={selectedStatuses.includes(status)}
                        onChange={() => toggleStatus(status)}
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 accent-orange-500"
                      />
                      <label htmlFor={`status-${status}`} className="text-sm font-medium capitalize text-gray-700">
                        {status}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium">Date Range</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date-from" className="mb-1 block text-sm font-medium text-gray-700">
                      From
                    </label>
                    <input
                      type="date"
                      id="date-from"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="date-to" className="mb-1 block text-sm font-medium text-gray-700">
                      To
                    </label>
                    <input
                      type="date"
                      id="date-to"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  className="flex-1 rounded-md bg-orange-500 py-2 text-white shadow-sm hover:bg-orange-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApply}
                >
                  Apply Filters
                </motion.button>
                <motion.button
                  className="flex-1 rounded-md border border-gray-300 py-2 text-gray-700 shadow-sm hover:bg-gray-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                >
                  Reset
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

