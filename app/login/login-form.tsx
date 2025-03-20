"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { loginUser } from "@/lib/auth-actions";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { refreshAuthState } from "@/utils/auth-helpers";

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
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3 } },
  tap: { scale: 0.98, transition: { duration: 0.3 } },
};

export default function LoginForm() {
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    setIsLoading(true);

    try {
      const result = await loginUser(values);

      if (result.success && result.userData) {
        localStorage.setItem("user_data", JSON.stringify(result.userData));
        toast.success("You've been logged in successfully!");
        refreshAuthState();
        router.push("/");
      } else {
        if (result.error?.includes("credentials")) {
          toast.error(
            "Invalid email or password. Please check your credentials and try again.",
          );
        } else if (result.error?.includes("account")) {
          toast.error(
            "Your account has been deactivated. Please contact support for assistance.",
          );
        } else {
          toast.error(
            result.error ||
              "Login failed. Please check your information and try again.",
          );
        }
      }
    } catch (error) {
      toast.error(
        "An unexpected error occurred. Our team has been notified. Please try again later.",
      );
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

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
            <motion.div className="flex flex-col items-center">
              <motion.div
                className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-orange-500"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <motion.p
                className="mt-4 font-medium text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Logging in
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        className="mx-auto mb-12 mt-[100px] w-[95%] rounded-xl bg-white p-8 shadow-lg sm:w-3/5 lg:w-2/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <motion.h1
          className="mb-8 text-center text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome back to Vicsmall
        </motion.h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={formItemVariants}
              >
                <label htmlFor="email" className="mb-2 block font-medium">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded border p-2 transition-all duration-300 focus:ring-2 focus:ring-orange-300"
                  placeholder="your@email.com"
                  disabled={isSubmitting || isLoading}
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <motion.div
                      className="mt-1 text-sm text-red-600"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      {msg}
                    </motion.div>
                  )}
                </ErrorMessage>
              </motion.div>

              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={formItemVariants}
              >
                <label htmlFor="password" className="mb-2 block font-medium">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={isShowingPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full rounded border p-2 transition-all duration-300 focus:ring-2 focus:ring-orange-300"
                    placeholder="••••••••"
                    disabled={isSubmitting || isLoading}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setIsShowingPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isSubmitting || isLoading}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isShowingPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </motion.button>
                </div>
                <ErrorMessage name="password">
                  {(msg) => (
                    <motion.div
                      className="mt-1 text-sm text-red-600"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      {msg}
                    </motion.div>
                  )}
                </ErrorMessage>

                <motion.div
                  className="mt-1 flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </motion.div>
              </motion.div>

              <motion.button
                type="submit"
                className="button-accent w-full rounded px-4 py-3 text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                disabled={isSubmitting || isLoading}
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                custom={2}
                animate="visible"
              >
                {isSubmitting || isLoading ? (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="mr-2 h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                    <span>Logging in</span>
                  </motion.div>
                ) : (
                  "Login"
                )}
              </motion.button>
            </Form>
          )}
        </Formik>

        <motion.div
          className="my-8 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="flex-grow border border-gray-200" />
          <span className="text-sm text-gray-500">Or login with</span>
          <span className="flex-grow border border-gray-200" />
        </motion.div>

        <motion.div
          className="mb-8 flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 transition duration-200 hover:bg-gray-50"
            onClick={() => {
              toast.success("Redirecting to Google login...");
              window.location.href =
                "https://accounts.google.com/o/oauth2/v2/auth";
            }}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-medium">Google</span>
          </motion.button>
          <motion.button
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 transition duration-200 hover:bg-gray-50"
            onClick={() => {
              toast.success("Redirecting to Facebook login...");
              window.location.href =
                "https://www.facebook.com/v13.0/dialog/oauth";
            }}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="h-5 w-5 text-blue-600"
            >
              <path
                fill="currentColor"
                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
              />
            </svg>
            <span className="font-medium">Facebook</span>
          </motion.button>
        </motion.div>

        <motion.p
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#2E2EDE] hover:underline"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.main>
    </>
  );
}
