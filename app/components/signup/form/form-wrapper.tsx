"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import StepOne from "./step-one"
import StepTwo from "./step-two"
import StepThree from "./step-three"
import { signUpUser } from "@/lib/signup-actions"
import { loginAfterSignup } from "@/lib/auth-actions"
import type { FormData } from "@/types/auth"
import toast, { Toaster } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

const FormWrapper = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])
  const [data, setData] = useState<FormData>({
    email: "",
    full_name: "",
    country_code: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    recaptchaToken: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: -100,
    },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  const handleSignup = async (formData: FormData) => {
    setIsLoading(true)
    try {
      const signupResult = await signUpUser({
        email: formData.email,
        full_name: formData.full_name,
        country_code: formData.country_code,
        phone_number: formData.phone_number,
        password: formData.password,
        recaptchaToken: formData.recaptchaToken || "",
      })

      if (signupResult.success) {
        toast.success("Account created successfully!")

        const loginResult = await loginAfterSignup(formData.email, formData.password)

        if (loginResult.success) {
          await new Promise((resolve) => setTimeout(resolve, 500))

          setCurrentStep(2)
        } else {
          console.error("Login after signup failed:", loginResult.error)
          toast.error("Account created but automatic login failed. Please try logging in manually.")
          router.push("/login")
        }
      } else {
        if (signupResult.error?.includes("recaptcha")) {
          toast.error("reCAPTCHA verification failed. Please try again.")
        } else if (signupResult.error?.includes("custom user with this email address already exists")) {
          toast.error("This email is already registered. Please use a different email or try logging in.")
        } else if (signupResult.error) {
          toast.error(signupResult.error)
        } else {
          toast.error("Failed to create your account. Please check your information and try again.")
        }
      }
    } catch (error) {
      console.error("Signup error:", error)
      toast.error("An unexpected error occurred. Our team has been notified. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreferences = async (categories: string[]) => {
    setSelectedPreferences(categories)
    setCurrentStep(3)
  }

  const handleNextStep = (newData: FormData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }))

    if (final) {
      handleSignup(newData)
    }
  }

  if (currentStep === 3) {
    return <StepThree preferences={selectedPreferences} />
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
            {/* Enhanced loading spinner animation */}
            <motion.div className="flex flex-col items-center">
              <motion.div
                className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-orange-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.p
                className="mt-4 text-gray-700 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Creating your account...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        className="mx-auto mb-12 w-[95%] rounded-xl bg-white p-8 shadow-lg sm:w-3/5 lg:w-2/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "white",
              },
            },
          }}
        />
        <AnimatePresence mode="wait">
          {currentStep === 1 ? (
            <motion.div
              key="step1"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <StepOne next={handleNextStep} data={data} />
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <StepTwo onSubmit={handlePreferences} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </>
  )
}

export default FormWrapper

