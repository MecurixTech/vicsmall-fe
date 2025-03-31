"use client"

import type React from "react"
import { HelpCircle } from "lucide-react"
import { useOnboarding } from "@/context/onboarding-context"

export const OnboardingButton: React.FC<{
  className?: string
}> = ({ className = "" }) => {
  const { startOnboarding, resetOnboarding } = useOnboarding()

  const handleStartOnboarding = () => {
    resetOnboarding()
    startOnboarding()
  }

  return (
    <button
      onClick={handleStartOnboarding}
      className={`flex items-center gap-2 rounded-md bg-[#FF8C48] px-4 py-2 text-white hover:bg-orange-500 ${className}`}
      aria-label="Start onboarding tour"
    >
      <HelpCircle size={18} />
      <span>App Tour</span>
    </button>
  )
}

