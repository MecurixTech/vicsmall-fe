"use client"

import type React from "react"

import { Field, Form, Formik } from "formik"
import {
  ArrowForwardOutlined,
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
  CheckCircleOutlined,
  CancelOutlined,
} from "@mui/icons-material"
import * as Yup from "yup"
import { useState, useEffect } from "react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import type { FormData } from "@/types/auth"
import toast from "react-hot-toast"
import Recaptcha from "../../recaptcha"


const stepOneValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Your email is required"),
  full_name: Yup.string().required("Please enter your full name"),
  country_code: Yup.string().required("Country code is required"),
  phone_number: Yup.string().required("Please enter your phone number"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
})

interface StepOneProps {
  data: FormData
  next: (values: FormData, final: boolean) => void
}

interface PasswordRequirement {
  id: string
  label: string
  validator: (password: string) => boolean
}

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3 } },
  tap: { scale: 0.98, transition: { duration: 0.3 } },
}

const StepOne: React.FC<StepOneProps> = ({ data, next }) => {
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null)

  const passwordRequirements: PasswordRequirement[] = [
    {
      id: "length",
      label: "At least 8 characters",
      validator: (password) => password.length >= 8,
    },
    {
      id: "uppercase",
      label: "At least one uppercase letter",
      validator: (password) => /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      label: "At least one lowercase letter",
      validator: (password) => /[a-z]/.test(password),
    },
    {
      id: "number",
      label: "At least one number",
      validator: (password) => /[0-9]/.test(password),
    },
    {
      id: "special",
      label: "At least one special character",
      validator: (password) => /[^A-Za-z0-9]/.test(password),
    },
  ]

  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    const metRequirements = passwordRequirements.filter((req) => req.validator(password)).length
    setPasswordStrength((metRequirements / passwordRequirements.length) * 100)
  }, [password])

  const handleSubmit = (values: FormData) => {
    if (!recaptchaToken) {
      setRecaptchaError("Please complete the reCAPTCHA verification")
      return
    }

    const allRequirementsMet = passwordRequirements.every((req) => req.validator(values.password))

    if (!allRequirementsMet) {
      toast.error("Your password doesn't meet all security requirements. Please check and try again.")
      return
    }

    next({ ...values, recaptchaToken }, true)
  }

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token)
    setRecaptchaError(null)
  }

  const handleRecaptchaExpire = () => {
    setRecaptchaToken(null)
    setRecaptchaError("reCAPTCHA verification expired. Please verify again.")
  }

  const getStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500"
    if (passwordStrength < 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthLabel = () => {
    if (passwordStrength < 40) return "Weak"
    if (passwordStrength < 80) return "Medium"
    return "Strong"
  }

  return (
    <>
      <Formik initialValues={data} validationSchema={stepOneValidationSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, setFieldValue, isSubmitting, handleChange }) => (
          <Form className="mb-8 space-y-6">
            <h1 className="mb-8 text-center text-2xl">Sign up to Vicsmall</h1>

            <motion.div custom={0} initial="hidden" animate="visible" variants={formItemVariants} className="mb-4">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full transition-all duration-300 focus:ring-2 focus:ring-orange-300"
                placeholder="e.g. johndoe@gmail.com"
                required
              />
              {touched.email && errors.email && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-600"
                >
                  {errors.email}
                </motion.div>
              )}
            </motion.div>

            <motion.div custom={1} initial="hidden" animate="visible" variants={formItemVariants} className="mb-4">
              <label htmlFor="full_name">Full Name</label>
              <Field
                type="text"
                id="full_name"
                name="full_name"
                className="w-full transition-all duration-300 focus:ring-2 focus:ring-orange-300"
                placeholder="e.g. John Doe"
                required
              />
              {touched.full_name && errors.full_name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-600"
                >
                  {errors.full_name}
                </motion.div>
              )}
            </motion.div>

            <motion.div custom={2} initial="hidden" animate="visible" variants={formItemVariants} className="mb-4">
              <label htmlFor="phone_number" className="flex items-center gap-1">
                Phone Number
                <span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <PhoneInput
                  country="ng"
                  value={values.phone_number}
                  onChange={(phone, country: any) => {
                    setFieldValue("phone_number", phone)
                    setFieldValue("country_code", country.dialCode)
                  }}
                  inputClass="!w-full"
                  containerClass="!w-full"
                  buttonClass="!bg-[#F5F5F5] !border-[#A8A6A6] !rounded-[10px]"
                  dropdownClass="!w-[300px]"
                  specialLabel=""
                  inputStyle={{
                    width: "100%",
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "10px",
                    border: "0.5px solid #A8A6A6",
                  }}
                  buttonStyle={{
                    border: "0.5px solid #A8A6A6",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                  }}
                />
              </div>
              {touched.phone_number && errors.phone_number && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-600"
                >
                  {errors.phone_number}
                </motion.div>
              )}
            </motion.div>

            <motion.div custom={3} initial="hidden" animate="visible" variants={formItemVariants} className="mb-4">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <Field
                  type={isShowingPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full transition-all duration-300 focus:ring-2 focus:ring-orange-300"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e)
                    setPassword(e.target.value)
                  }}
                />
                <motion.button
                  type="button"
                  onClick={() => setIsShowingPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isShowingPassword ? <RemoveRedEyeOutlined /> : <VisibilityOffOutlined />}
                </motion.button>
              </div>
              {touched.password && errors.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-600"
                >
                  {errors.password}
                </motion.div>
              )}

              {/* Password strength indicator */}
              <AnimatePresence>
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Password Strength:</span>
                      <motion.span
                        className={`text-sm font-medium ${
                          passwordStrength < 40
                            ? "text-red-500"
                            : passwordStrength < 80
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                        animate={{
                          scale: [1, 1.05, 1],
                          transition: { duration: 0.5 },
                        }}
                      >
                        {getStrengthLabel()}
                      </motion.span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        className={`h-2.5 rounded-full ${getStrengthColor()}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength}%` }}
                        transition={{ duration: 0.5 }}
                      ></motion.div>
                    </div>

                    {/* Password requirements */}
                    <motion.div
                      className="mt-3 space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {passwordRequirements.map((requirement, index) => (
                        <motion.div
                          key={requirement.id}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          {requirement.validator(password) ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            >
                              <CheckCircleOutlined className="text-green-500 mr-2" fontSize="small" />
                            </motion.div>
                          ) : (
                            <CancelOutlined className="text-red-500 mr-2" fontSize="small" />
                          )}
                          <span className="text-sm">{requirement.label}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div custom={4} initial="hidden" animate="visible" variants={formItemVariants} className="mb-4">
              <label htmlFor="confirm_password">Confirm password</label>
              <div className="relative">
                <Field
                  type={isShowingConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  className="w-full transition-all duration-300 focus:ring-2 focus:ring-orange-300"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setIsShowingConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isShowingConfirmPassword ? <RemoveRedEyeOutlined /> : <VisibilityOffOutlined />}
                </motion.button>
              </div>
              {touched.confirm_password && errors.confirm_password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-600"
                >
                  {errors.confirm_password}
                </motion.div>
              )}
            </motion.div>

            {/* reCAPTCHA Component */}
            <Recaptcha onVerify={handleRecaptchaVerify} onExpire={handleRecaptchaExpire} />

            {recaptchaError && (
              <motion.div
                className="text-sm text-red-600"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                {recaptchaError}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="button button-accent flex w-full items-center justify-center gap-1 py-3 mt-8"
              disabled={isSubmitting || !recaptchaToken}
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
            >
              {isSubmitting ? (
                <motion.div className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.div
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <span>Processing...</span>
                </motion.div>
              ) : (
                <>
                  <span>Continue</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  >
                    <ArrowForwardOutlined fontSize="inherit" className="mt-1" />
                  </motion.div>
                </>
              )}
            </motion.button>
          </Form>
        )}
      </Formik>

      <p className="text-center">
        Already have an account?
        <Link href="/login" className="font-bold text-blue-800">
          Sign in
        </Link>
      </p>
    </>
  )
}

export default StepOne

