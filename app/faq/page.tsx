"use client";

import {
  Facebook,
  Google,
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const LoginPage = () => {
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch(
        "https://vicsmall-backend.onrender.com/v1/api/auth/login-customer/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        if (data.email) {
          alert(`Email error: ${data.email.join(", ")}`);
        } else {
          alert(data.message || "Login failed. Please try again.");
        }
      } else {
       
  
        if (data.token) {
        
          localStorage.setItem("token", data.token);
  
          if (data.email) {
            localStorage.setItem("email", data.email);
          }
  
          window.dispatchEvent(new Event("tokenChanged"));
        }
  
        router.push("/");
      }
    } catch (error) {
   
      alert("An error occurred. Please try again later.");
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <main className="mx-auto mb-12 w-[95%] rounded-xl bg-white p-8 shadow-lg sm:w-3/5 lg:w-2/5 mt-[100px]">
      <h1 className="mb-8 text-center text-2xl">Welcome back to Vicsmall</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="mb-2 block">
                Password
              </label>
              <div className="relative">
                <Field
                  type={isShowingPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full border rounded p-2"
                />
                <button
                  type="button"
                  onClick={() => setIsShowingPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {isShowingPassword ? (
                    <RemoveRedEyeOutlined />
                  ) : (
                    <VisibilityOffOutlined />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="button button-accent w-full py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="my-8 flex items-center gap-4">
        <span className="flex-grow border border-gray-200" />
        <span>Or login with</span>
        <span className="flex-grow border border-gray-200" />
      </div>

      <div className="mb-8 flex gap-2">
        <Link
          href="https://google.com"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-500 py-3 hover:bg-gray-100"
        >
          <Google />
          <span className="font-medium">Google</span>
        </Link>
        <Link
          href="https://facebook.com"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-500 py-3 hover:bg-gray-100"
        >
          <Facebook />
          <span className="font-medium">Facebook</span>
        </Link>
      </div>

      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-bold text-blue-800">
          Sign up
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
