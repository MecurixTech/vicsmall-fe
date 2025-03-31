"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type OnboardingStep = {
  id: string
  title: string
  description: string
  element: string
  placement: "top" | "bottom" | "left" | "right"
  spotlightRadius?: number
  action?: () => void
  isCompleted: boolean
}

type OnboardingContextType = {
  isOnboarding: boolean
  currentStepIndex: number
  steps: OnboardingStep[]
  startOnboarding: () => void
  endOnboarding: () => void
  nextStep: () => void
  prevStep: () => void
  skipOnboarding: () => void
  completeStep: (id: string) => void
  resetOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}

type OnboardingProviderProps = {
  children: ReactNode
  initialSteps: Omit<OnboardingStep, "isCompleted">[]
  storageKey?: string
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
  initialSteps,
  storageKey = "vicsmall-onboarding-state",
}) => {
  const [isOnboarding, setIsOnboarding] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [steps, setSteps] = useState<OnboardingStep[]>(initialSteps.map((step) => ({ ...step, isCompleted: false })))

  useEffect(() => {
    const savedState = localStorage.getItem(storageKey)
    if (savedState) {
      try {
        const { completedStepIds, hasCompletedOnboarding } = JSON.parse(savedState)

        if (hasCompletedOnboarding) {
          return
        }

        setSteps(
          steps.map((step) => ({
            ...step,
            isCompleted: completedStepIds.includes(step.id),
          })),
        )

        const firstIncompleteIndex = steps.findIndex((step) => !completedStepIds.includes(step.id))
        if (firstIncompleteIndex !== -1) {
          setCurrentStepIndex(firstIncompleteIndex)
        }
      } catch (error) {
        console.error("Failed to parse onboarding state:", error)
      }
    } else {
      
      const isFirstTimeUser = !localStorage.getItem("vicsmall-user-visited")
      if (isFirstTimeUser) {
        localStorage.setItem("vicsmall-user-visited", "true")
        
        setTimeout(() => setIsOnboarding(true), 1000)
      }
    }
  }, [storageKey])

  useEffect(() => {
    const completedStepIds = steps.filter((step) => step.isCompleted).map((step) => step.id)
    const hasCompletedOnboarding = steps.every((step) => step.isCompleted)

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        completedStepIds,
        hasCompletedOnboarding,
      }),
    )
  }, [steps, storageKey])

  const startOnboarding = () => {
    setIsOnboarding(true)
  }

  const endOnboarding = () => {
    setIsOnboarding(false)
  }

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      
      completeStep(steps[currentStepIndex].id)
      setCurrentStepIndex((prev) => prev + 1)
    } else {
     
      completeStep(steps[currentStepIndex].id)
      endOnboarding()
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const skipOnboarding = () => {
    
    setSteps(steps.map((step) => ({ ...step, isCompleted: true })))
    endOnboarding()
  }

  const completeStep = (id: string) => {
    setSteps((prevSteps) => prevSteps.map((step) => (step.id === id ? { ...step, isCompleted: true } : step)))

    const step = steps.find((s) => s.id === id)
    if (step?.action) {
      step.action()
    }
  }

  const resetOnboarding = () => {
    setSteps(initialSteps.map((step) => ({ ...step, isCompleted: false })))
    setCurrentStepIndex(0)
    localStorage.removeItem(storageKey)
  }

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding,
        currentStepIndex,
        steps,
        startOnboarding,
        endOnboarding,
        nextStep,
        prevStep,
        skipOnboarding,
        completeStep,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

