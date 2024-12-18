"use client";

import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { useState } from "react";

const SignupPage = () => {
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] =
    useState<boolean>(false);

  const handleSubmit = () => {
    // TODO: Authenticate user
    console.log("Form submitted");
  };

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    country_code: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  };

  return (
    <main className="mx-auto mb-12 w-[95%] rounded-xl bg-white p-8 shadow-lg sm:w-3/5 lg:w-2/5">
      <h1 className="mb-8 text-center text-2xl">Sign up to Vicsmall</h1>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className="mb-8">
          <div className="mb-4">
            <div className="mb-2 mr-2 flex items-center justify-between">
              <label htmlFor="email">Email</label>
              <span className="text-xl font-bold leading-none text-red-500">
                *
              </span>
            </div>
            <Field
              type="text"
              id="email"
              name="email"
              className="w-full"
              placeholder="e.g. johndoe@gmail.com"
            />
          </div>

          <div className="mb-4 flex gap-2">
            <div className="flex-1">
              <div className="mb-2 mr-2 flex items-center justify-between">
                <label htmlFor="first_name">First name</label>
                <span className="text-xl font-bold leading-none text-red-500">
                  *
                </span>
              </div>
              <Field
                type="text"
                id="first_name"
                name="first_name"
                className="w-full"
                placeholder="e.g. John"
              />
            </div>
            <div className="flex-1">
              <div className="mb-2 mr-2 flex items-center justify-between">
                <label htmlFor="last_name">Last name</label>
                <span className="text-xl font-bold leading-none text-red-500">
                  *
                </span>
              </div>
              <Field
                type="text"
                id="last_name"
                name="last_name"
                className="w-full"
                placeholder="e.g. Doe"
              />
            </div>
          </div>

          <div className="mb-4 flex gap-2">
            <div className="flex-1">
              <label htmlFor="country_code" className="mb-2">
                Country code
              </label>
              <Field
                type="text"
                id="country_code"
                name="country_code"
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <div className="mb-2 mr-2 flex items-center justify-between">
                <label htmlFor="phone_number">Phone number</label>
                <span className="text-xl font-bold leading-none text-red-500">
                  *
                </span>
              </div>
              <Field
                type="text"
                id="phone_number"
                name="phone_number"
                className="w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-2 mr-2 flex items-center justify-between">
              <label htmlFor="password">Password</label>
              <span className="text-xl font-bold leading-none text-red-500">
                *
              </span>
            </div>
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

          <div className="mb-4">
            <div className="mb-2 mr-2 flex items-center justify-between">
              <label htmlFor="confirm_password">Confirm password</label>
              <span className="text-xl font-bold leading-none text-red-500">
                *
              </span>
            </div>
            <div className="relative">
              <Field
                type={isShowingConfirmPassword ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                className="w-full"
              />
              <button
                onClick={() => setIsShowingConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {isShowingConfirmPassword ? (
                  <RemoveRedEyeOutlined />
                ) : (
                  <VisibilityOffOutlined />
                )}
              </button>
            </div>
          </div>
          <button className="button button-accent w-full py-3">Sign up</button>
        </Form>
      </Formik>

      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-blue-800">
          Sign in
        </Link>
      </p>
    </main>
  );
};

export default SignupPage;
