"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useOnboarding } from "@/context/onboarding-context"

export const OnboardingSpotlight: React.FC = () => {
  const { isOnboarding, currentStepIndex, steps, nextStep, prevStep, skipOnboarding, endOnboarding } = useOnboarding()

  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })
  const spotlightRef = useRef<HTMLDivElement>(null)

  const currentStep = steps[currentStepIndex]
  const isLastStep = currentStepIndex === steps.length - 1

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isOnboarding || !currentStep) return

    const findElement = () => {
      const element = document.querySelector(currentStep.element) as HTMLElement
      if (element) {
        setTargetElement(element)
        const rect = element.getBoundingClientRect()
        setTargetRect(rect)

        if (rect.top < 0 || rect.bottom > window.innerHeight || rect.left < 0 || rect.right > window.innerWidth) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })

          setTimeout(() => {
            setTargetRect(element.getBoundingClientRect())
          }, 500)
        }
      }
    }

    findElement()

    const timeoutId = setTimeout(findElement, 300)

    return () => clearTimeout(timeoutId)
  }, [isOnboarding, currentStep, currentStepIndex, windowSize])

  const getTooltipPosition = () => {
    if (!targetRect) return { top: "50%", left: "50%" }

    const padding = 20
    const tooltipHeight = 180 
    const tooltipWidth = 300

    switch (currentStep.placement) {
      case "top":
        return {
          top: `${targetRect.top - tooltipHeight - padding}px`,
          left: `${targetRect.left + targetRect.width / 2 - tooltipWidth / 2}px`,
        }
      case "bottom":
        return {
          top: `${targetRect.bottom + padding}px`,
          left: `${targetRect.left + targetRect.width / 2 - tooltipWidth / 2}px`,
        }
      case "left":
        return {
          top: `${targetRect.top + targetRect.height / 2 - tooltipHeight / 2}px`,
          left: `${targetRect.left - tooltipWidth - padding}px`,
        }
      case "right":
        return {
          top: `${targetRect.top + targetRect.height / 2 - tooltipHeight / 2}px`,
          left: `${targetRect.right + padding}px`,
        }
      default:
        return {
          top: `${targetRect.bottom + padding}px`,
          left: `${targetRect.left + targetRect.width / 2 - tooltipWidth / 2}px`,
        }
    }
  }

  const adjustTooltipPosition = (position: { top: string; left: string }) => {
    if (!spotlightRef.current) return position

    const tooltipRect = spotlightRef.current.getBoundingClientRect()
    const { top, left } = position

    let topValue = Number.parseInt(top)
    let leftValue = Number.parseInt(left)

    if (topValue < 20) topValue = 20
    if (topValue + tooltipRect.height > window.innerHeight - 20) {
      topValue = window.innerHeight - tooltipRect.height - 20
    }

    if (leftValue < 20) leftValue = 20
    if (leftValue + tooltipRect.width > window.innerWidth - 20) {
      leftValue = window.innerWidth - tooltipRect.width - 20
    }

    return { top: `${topValue}px`, left: `${leftValue}px` }
  }

  if (!isOnboarding || !currentStep) return null

  const tooltipPosition = getTooltipPosition()
  const adjustedPosition = adjustTooltipPosition(tooltipPosition)

  const spotlightRadius =
    currentStep.spotlightRadius || (targetRect ? Math.max(targetRect.width, targetRect.height) / 1.5 : 100)

  return (
    <AnimatePresence>
      {isOnboarding && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay with spotlight cutout */}
          <div className="absolute inset-0 bg-black/70">
            {targetRect && (
              <svg className="absolute h-full w-full pointer-events-none">
                <defs>
                  <mask id="spotlight-mask">
                    <rect width="100%" height="100%" fill="white" />
                    <circle
                      cx={targetRect.left + targetRect.width / 2}
                      cy={targetRect.top + targetRect.height / 2}
                      r={spotlightRadius}
                      fill="black"
                    />
                  </mask>
                </defs>
                <rect width="100%" height="100%" fill="black" mask="url(#spotlight-mask)" fillOpacity="0.7" />
              </svg>
            )}
          </div>

          {/* Tooltip */}
          <motion.div
            ref={spotlightRef}
            className="absolute w-[300px] rounded-lg bg-white p-4 shadow-lg"
            style={adjustedPosition}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <button
              onClick={endOnboarding}
              className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close onboarding"
            >
              <X size={16} />
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">{currentStep.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{currentStep.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-6 rounded-full ${index === currentStepIndex ? "bg-[#FF8C48]" : "bg-gray-200"}`}
                  />
                ))}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={skipOnboarding}
                  className="rounded px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700"
                >
                  Skip
                </button>
                {currentStepIndex > 0 && (
                  <button onClick={prevStep} className="rounded px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100">
                    Back
                  </button>
                )}
                <button
                  onClick={nextStep}
                  className="rounded bg-[#FF8C48] px-3 py-1.5 text-xs text-white hover:bg-orange-500"
                >
                  {isLastStep ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

