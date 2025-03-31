"use client"
import { HelpCircle } from "lucide-react"
import { useTour } from "@/context/tour-context"
import { motion } from "framer-motion"

type TourButtonProps = {
  className?: string
  variant?: "icon" | "full"
}

export function TourButton({ className = "", variant = "full" }: TourButtonProps) {
  const { isAuthenticated, userDeclinedTour, startTour, resetTour } = useTour()

  const handleStartTour = () => {
    resetTour()
    startTour()
  }

  if (!isAuthenticated) return null

  if (variant === "icon") {
    return (
      <motion.button
        onClick={handleStartTour}
        className={`flex items-center justify-center rounded-full w-9 h-9 text-[#FF8C48] hover:bg-orange-50 ${className}`}
        aria-label="Start app tour"
        whileHover={{
          backgroundColor: "rgba(255, 140, 72, 0.1)",
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <HelpCircle size={20} />
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={handleStartTour}
      className={`flex items-center gap-2 rounded-md bg-[#FF8C48] px-4 py-2 text-white hover:bg-orange-500 ${className}`}
      aria-label="Start app tour"
      whileHover={{
        backgroundColor: "#ff7a30",
        scale: 1.02,
        boxShadow: "0 4px 12px rgba(255, 140, 72, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <HelpCircle size={18} />
      <span>{userDeclinedTour ? "Restart Tour" : "App Tour"}</span>
    </motion.button>
  )
}

