"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useOnboarding } from "@/context/onboarding-context"

export const WelcomeModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { startOnboarding } = useOnboarding()

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("vicsmall-welcome-seen")
    if (!hasSeenWelcome) {
     
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleStartTour = () => {
    localStorage.setItem("vicsmall-welcome-seen", "true")
    setIsVisible(false)
    startOnboarding()
  }

  const handleSkip = () => {
    localStorage.setItem("vicsmall-welcome-seen", "true")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mx-4 max-w-md rounded-xl bg-white p-6 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="mb-4 flex justify-center">
              <Image src="/vicsmall-logo.svg" alt="Vicsmall Logo" width={120} height={120} className="h-24 w-24" />
            </div>

            <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">Welcome to Vicsmall!</h2>

            <p className="mb-6 text-center text-gray-600">
              We are excited to have you here. Would you like a quick tour to discover all the amazing features our
              platform offers?
            </p>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <button
                onClick={handleSkip}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 sm:flex-1"
              >
                Skip for now
              </button>
              <button
                onClick={handleStartTour}
                className="rounded-md bg-[#FF8C48] px-4 py-2 text-white hover:bg-orange-500 sm:flex-1"
              >
                Take the tour
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

