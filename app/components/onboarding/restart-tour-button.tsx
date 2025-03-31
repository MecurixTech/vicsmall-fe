"use client"

import type React from "react"
import { HelpCircle } from "lucide-react"
import { useOnboarding } from "@/context/onboarding-context"

export const RestartTourButton: React.FC = () => {
  const { resetOnboarding, startOnboarding } = useOnboarding()

  const handleRestartTour = () => {
    resetOnboarding()
    startOnboarding()
  }

  return (
    <button
      onClick={handleRestartTour}
      className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
    >
      <HelpCircle size={18} />
      <span>Restart App Tour</span>
    </button>
  )
}

