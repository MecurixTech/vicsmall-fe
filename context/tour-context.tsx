"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { isUserLoggedIn, getUserData } from "@/utils/auth-helpers"
import type { Step, CallBackProps } from "react-joyride-react-19"

type TourContextType = {
  isRunning: boolean
  stepIndex: number
  steps: Step[]
  startTour: () => void
  stopTour: () => void
  resetTour: () => void
  handleJoyrideCallback: (data: CallBackProps) => void
  isAuthenticated: boolean
  showWelcomeModal: boolean
  setShowWelcomeModal: (show: boolean) => void
  userDeclinedTour: boolean
  setUserDeclinedTour: (declined: boolean) => void
}

const TourContext = createContext<TourContextType | undefined>(undefined)

export const useTour = () => {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error("useTour must be used within a TourProvider")
  }
  return context
}

type TourProviderProps = {
  children: ReactNode
  steps: Step[]
}

export const TourProvider: React.FC<TourProviderProps> = ({ children, steps }) => {
  const [isRunning, setIsRunning] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [userDeclinedTour, setUserDeclinedTour] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isUserLoggedIn()
      const user = getUserData()

      setIsAuthenticated(loggedIn)
      setUserData(user)

      if (!loggedIn && isRunning) {
        setIsRunning(false)
      }
    }

    checkAuth()
    window.addEventListener("auth-change", checkAuth)

    return () => {
      window.removeEventListener("auth-change", checkAuth)
    }
  }, [isRunning])

  useEffect(() => {
    if (!isAuthenticated || !userData) return

    const userEmail = userData.email || "anonymous"
    const userKey = `vicsmall-tour-${userEmail}`

    const declined = localStorage.getItem(`${userKey}-declined`)
    if (declined === "true") {
      setUserDeclinedTour(true)
      return
    }

    const completed = localStorage.getItem(`${userKey}-completed`)
    if (completed === "true") {
      return
    }

    const welcomeSeen = localStorage.getItem(`${userKey}-welcome-seen`)
    if (!welcomeSeen) {
      
      setTimeout(() => setShowWelcomeModal(true), 1000)
    } else {
      
      const savedStepIndex = localStorage.getItem(`${userKey}-step`)
      if (savedStepIndex) {
        setStepIndex(Number.parseInt(savedStepIndex, 10))
      }
    }
  }, [isAuthenticated, userData])

  const startTour = () => {
    setIsRunning(true)
    setUserDeclinedTour(false)

    if (userData) {
      const userEmail = userData.email || "anonymous"
      const userKey = `vicsmall-tour-${userEmail}`

      localStorage.removeItem(`${userKey}-declined`)
      localStorage.setItem(`${userKey}-welcome-seen`, "true")
    }
  }

  const stopTour = () => {
    setIsRunning(false)
  }

  const resetTour = () => {
    setStepIndex(0)
    setUserDeclinedTour(false)

    if (userData) {
      const userEmail = userData.email || "anonymous"
      const userKey = `vicsmall-tour-${userEmail}`

      localStorage.removeItem(`${userKey}-completed`)
      localStorage.removeItem(`${userKey}-declined`)
      localStorage.removeItem(`${userKey}-step`)
    }
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data
    console.log("Joyride callback:", { action, index, status, type })

    if (!userData) return

    const userEmail = userData.email || "anonymous"
    const userKey = `vicsmall-tour-${userEmail}`

    if (isTransitioning && type !== "tour:end") return

    if (type === "step:after") {
      if (action === "next") {
       
        setIsTransitioning(true)
        const nextIndex = index + 1

        setTimeout(() => {
          setStepIndex(nextIndex)
          localStorage.setItem(`${userKey}-step`, nextIndex.toString())
          setIsTransitioning(false)
        }, 300)
      } else if (action === "prev") {
       
        setIsTransitioning(true)
        const prevIndex = index - 1

        setTimeout(() => {
          setStepIndex(prevIndex)
          localStorage.setItem(`${userKey}-step`, prevIndex.toString())
          setIsTransitioning(false)
        }, 300)
      }
    } else if (type === "tour:start") {
    
      setStepIndex(0)
      localStorage.setItem(`${userKey}-step`, "0")
    }

    if (["finished", "skipped"].includes(status)) {
      stopTour()

      if (status === "finished") {
        localStorage.setItem(`${userKey}-completed`, "true")
      } else if (status === "skipped") {
        setUserDeclinedTour(true)
        localStorage.setItem(`${userKey}-declined`, "true")
      }
    }
  }

  return (
    <TourContext.Provider
      value={{
        isRunning,
        stepIndex,
        steps,
        startTour,
        stopTour,
        resetTour,
        handleJoyrideCallback,
        isAuthenticated,
        showWelcomeModal,
        setShowWelcomeModal,
        userDeclinedTour,
        setUserDeclinedTour,
      }}
    >
      {children}
    </TourContext.Provider>
  )
}

