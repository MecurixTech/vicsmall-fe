"use client"
import { HelpCircle, Lightbulb } from "lucide-react"
import { useTour } from "@/context/tour-context"

export function AccountTourSection() {
  const { isAuthenticated, userDeclinedTour, startTour, resetTour } = useTour()

  const handleStartTour = () => {
    resetTour()
    startTour()
  }

  if (!isAuthenticated) return null

  return (
    <div className="rounded-lg border p-6 bg-white shadow-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-orange-100 p-3">
          <Lightbulb className="h-6 w-6 text-[#FF8C48]" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Discover Our Platform</h3>
          <p className="text-sm text-gray-600 mb-4">
            {userDeclinedTour
              ? "Need a refresher on how to use our platform? Take the guided tour again to explore all features."
              : "Take a guided tour to discover all the amazing features our platform offers."}
          </p>
          <button
            onClick={handleStartTour}
            className="flex items-center gap-2 rounded-md bg-[#FF8C48] px-4 py-2 text-white hover:bg-orange-500"
          >
            <HelpCircle size={18} />
            <span>{userDeclinedTour ? "Restart Tour" : "Start Tour"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

