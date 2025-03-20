"use client"

import type React from "react"
import Link from "next/link"

interface PartPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
}

const PartPaymentModal: React.FC<PartPaymentModalProps> = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>

      {/* Modal container */}
      <div className="relative w-full max-w-md mx-auto">
        {/* Modal background */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          {/* Modal title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Part Payment Terms</h2>

          {/* Modal description */}
          <p className="text-center text-gray-700 mb-8">
            Ensure you have read and accepted the part payment terms and conditions
          </p>

          {/* Buttons container */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* Go to terms button */}
            <Link
              href="/part-payment-terms"
              className="flex-1 flex justify-center items-center py-3 px-4 border border-[#030359] rounded-md text-[#030359] font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Go To Terms & Conditions
            </Link>

            {/* Accept button */}
            <button
              onClick={onAccept}
              className="flex-1 flex justify-center items-center py-3 px-4 bg-[#FF8C48] rounded-md text-white font-semibold text-sm hover:bg-orange-500 transition-colors"
            >
              I have read and Accepted
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartPaymentModal

