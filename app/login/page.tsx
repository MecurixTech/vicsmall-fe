"use client";

import {
  Facebook,
  Google,
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);

  const handleSubmit = () => {
    // TODO: Authenticate user
    console.log("Form submitted");
  };

  const initialValues = {
    email_or_phone: "",
    password: "",
  };

  return (
    <main className="mx-auto mb-12 w-[95%] rounded-xl bg-white p-8 shadow-lg sm:w-3/5 lg:w-2/5">
      <h1 className="mb-8 text-center text-2xl">Welcome back to Vicsmall</h1>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <div className="mb-4">
            <label htmlFor="email_or_phone" className="mb-2">
              Email or phone number
            </label>
            <Field
              type="text"
              id="email_or_phone"
              name="email_or_phone"
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <div className="relative">
              <Field
                type={isShowingPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full"
              />
              <button
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
          </div>
          <button className="button button-accent w-full py-3">Login</button>
        </Form>
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
