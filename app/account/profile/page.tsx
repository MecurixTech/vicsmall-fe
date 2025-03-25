"use client"
import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { fetchUserProfile, updateProfile } from "@/lib/profile-client"
import type { UserProfile } from "@/lib/profile-actions"

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true)
      try {
        const response = await fetchUserProfile()

        if (response.success && response.data) {
          setProfile(response.data)


          localStorage.setItem("user", JSON.stringify(response.data))


          window.dispatchEvent(new Event("auth-change"))
        } else {
          setError(response.error || "Failed to load profile")
          toast.error(response.error || "Failed to load profile")
        }
      } catch (err) {
        // console.error("Error fetching profile:", err)
        setError("An unexpected error occurred")
        toast.error("An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [])

  const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null
  const user = profile || (storedUser ? JSON.parse(storedUser) : { full_name: "", email: "", phone_number: "" })

  const initialValues = {
    full_name: user.full_name || "",
    phone_number: user.phone_number || "",
    email: user.email || "",
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  }

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Full name is required"),
    phone_number: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),

  })

  const onSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {

      const updateData = {
        full_name: values.full_name,
        phone_number: values.phone_number,
        country_code: user.country_code || "234",
      }

      const response = await updateProfile(updateData)

      if (response.success) {
        toast.success(response.message || "Profile updated successfully")

        const profileResponse = await fetchUserProfile()
        if (profileResponse.success && profileResponse.data) {
          setProfile(profileResponse.data)
          localStorage.setItem("user", JSON.stringify(profileResponse.data))
          window.dispatchEvent(new Event("auth-change"))
        }
      } else {
        toast.error(response.error || "Failed to update profile")
      }
    } catch (err) {
      // console.error("Error updating profile:", err)
      toast.error("An unexpected error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-center" />
      <h1 className="mb-4 text-2xl font-bold">Account details</h1>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="col-span-1">
                <label htmlFor="full_name" className="block mb-2">
                  Full Name
                </label>
                <Field
                  type="text"
                  name="full_name"
                  className={`w-full p-2 border rounded ${errors.full_name && touched.full_name ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.full_name && touched.full_name && (
                  <div className="text-red-500 text-sm mt-1">{typeof errors.full_name === "string" && errors.full_name}</div>
                )}
              </div>

              <div className="col-span-1">
                <label htmlFor="phone_number" className="block mb-2">
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phone_number"
                  className={`w-full p-2 border rounded ${errors.phone_number && touched.phone_number ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.phone_number && touched.phone_number && typeof errors.phone_number === "string" && (
                  <div className="text-red-500 text-sm mt-1">{errors.phone_number}</div>
                )}
              </div>
              <div className="col-span-1">
                <label htmlFor="email" className="block mb-2">
                  Email address
                </label>
                <Field
                  type="text"
                  name="email"
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
                <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="mb-4 text-xl font-bold">Change Password</h2>


            <div className="grid gap-4 sm:grid-cols-2">
              <div className="col-span-1">
                <label htmlFor="current_password" className="block mb-2">
                  Current password
                </label>
                <Field
                  type="password"
                  name="current_password"
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="new_password" className="block mb-2">
                  New password
                </label>
                <Field
                  type="password"
                  name="new_password"
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="confirm_new_password" className="block mb-2">
                  Confirm new password
                </label>
                <Field
                  type="password"
                  name="confirm_new_password"
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="button button-accent w-full px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-400 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ProfilePage

