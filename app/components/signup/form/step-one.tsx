"use client"

import type React from "react"
import { Field, Form, Formik } from "formik"
import { ArrowForwardOutlined, RemoveRedEyeOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import * as Yup from "yup"
import { useState } from "react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import Link from "next/link"
import type { FormData } from "@/types/auth"

const stepOneValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Your email is required"),
  full_name: Yup.string().required("Please enter your full name"),
  country_code: Yup.string().required("Country code is required"),
  phone_number: Yup.string().required("Please enter your phone number"),
  password: Yup.string().min(8, "Password is too short - should be 8 characters minimum.").required("Required"),
  confirm_password: Yup.string()
    .required("Required")
    .min(8, "Password is too short")
    .oneOf([Yup.ref("password")], "Passwords must match"),
})

interface StepOneProps {
  data: FormData
  next: (values: FormData, final: boolean) => void
}

const StepOne: React.FC<StepOneProps> = ({ data, next }) => {
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] = useState(false)

  const handleSubmit = (values: FormData) => {
    next(values, true)
  }

  return (
    <>
      <Formik initialValues={data} validationSchema={stepOneValidationSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form className="mb-8">
            <h1 className="mb-8 text-center text-2xl">Sign up to Vicsmall</h1>

            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full"
                placeholder="e.g. johndoe@gmail.com"
                required
              />
              {touched.email && errors.email && <div className="text-red-600">{errors.email}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="full_name">Full Name</label>
              <Field
                type="text"
                id="full_name"
                name="full_name"
                className="w-full"
                placeholder="e.g. John Doe"
                required
              />
              {touched.full_name && errors.full_name && <div className="text-red-600">{errors.full_name}</div>}
            </div>

            <div className="mb-4">
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
              {touched.phone_number && errors.phone_number && <div className="text-red-600">{errors.phone_number}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <Field
                  type={isShowingPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsShowingPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {isShowingPassword ? <RemoveRedEyeOutlined /> : <VisibilityOffOutlined />}
                </button>
              </div>
              {touched.password && errors.password && <div className="text-red-600">{errors.password}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="confirm_password">Confirm password</label>
              <div className="relative">
                <Field
                  type={isShowingConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  className="w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsShowingConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {isShowingConfirmPassword ? <RemoveRedEyeOutlined /> : <VisibilityOffOutlined />}
                </button>
              </div>
              {touched.confirm_password && errors.confirm_password && (
                <div className="text-red-600">{errors.confirm_password}</div>
              )}
            </div>

            <button
              type="submit"
              className="button button-accent flex w-full items-center justify-center gap-1 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loader">Submitting...</span>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowForwardOutlined fontSize="inherit" className="mt-1" />
                </>
              )}
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-blue-800">
          Sign in
        </Link>
      </p>
    </>
  )
}

export default StepOne

