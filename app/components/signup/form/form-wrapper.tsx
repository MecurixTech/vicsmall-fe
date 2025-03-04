"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import StepOne from "./step-one"
import StepTwo from "./step-two"
import StepThree from "./step-three"
import { signUpUser } from "@/lib/signup-actions"
import { savePreferences } from "@/lib/preference-actions"
import type { FormData } from "@/types/auth"
import toast, { Toaster } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

const FormWrapper = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<FormData>({
    email: "",
    full_name: "",
    country_code: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSignup = async (formData: FormData) => {
    setIsLoading(true)
    try {
      const result = await signUpUser({
        email: formData.email,
        full_name: formData.full_name,
        country_code: formData.country_code,
        phone_number: formData.phone_number,
        password: formData.password,
      })

      if (result.success) {
        setCurrentStep(2)
      } else {
        if (result.error?.includes("custom user with this email address already exists")) {
          toast.error("An account with this email already exists")
        } else if (result.error) {
          toast.error(result.error)
        } else {
          toast.error("Failed to create account. Please try again.")
        }
      }
    } catch (error) {
      
      toast.error("An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreferences = async (categories: string[]) => {
    setIsLoading(true)
    try {
      const result = await savePreferences(categories)
      if (result.success) {
        setCurrentStep(3) 
      } else {
        toast.error(result.error || "Failed to save preferences")
      }
    } catch (error) {
      
      toast.error("An unexpected error occurred while saving preferences")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextStep = (newData: FormData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }))

    if (final) {
      handleSignup(newData)
    }
  }

  if (currentStep === 3) {
    return <StepThree />
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75"
          >
            <motion.div
              className="h-16 w-16 border-t-4 border-orange-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto mb-12 w-[95%] rounded-xl bg-white p-8 shadow-lg sm:w-3/5 lg:w-2/5">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#4CAF50",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#E57373",
                secondary: "#fff",
              },
            },
          }}
        />
        {currentStep === 1 ? <StepOne next={handleNextStep} data={data} /> : <StepTwo onSubmit={handlePreferences} />}
      </main>
    </>
  )
}

export default FormWrapper

