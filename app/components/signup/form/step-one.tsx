"use client";

import { Field, Form, Formik } from "formik";
import {
  ArrowForwardOutlined,
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import * as Yup from "yup";
import TextError from "../../text-error";
import { useState } from "react";
import { Value } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/input";
import Link from "next/link";

const stepOneValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Your email is required"),
  first_name: Yup.string().required("Please enter your first name"),
  last_name: Yup.string().required("Please enter your last name"),
  phone_number: Yup.string().required("Please enter your phone number"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 characters minimum.")
    .required("Required"),
  confirm_password: Yup.string()
    .required("Required")
    .min(8, "Password is too short")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const StepOne = (props: {
  next: (
    newData: {
      email: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      password: string;
      confirm_password: string;
      interests: string;
    },
    final: boolean,
  ) => void;
  data: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    confirm_password: string;
    interests: string;
  };
  key: number;
}) => {
  const handleSubmit = (values: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    confirm_password: string;
    interests: string;
  }) => {
    console.log("Wassup!");
    props.next(values, false);
  };

  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] =
    useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<Value>();

  return (
    <>
      <Formik
        initialValues={props.data}
        validationSchema={stepOneValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mb-8">
          <h1 className="mb-8 text-center text-2xl">Sign up to Vicsmall</h1>
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
              required
            />
            {/* <ErrorMessage name="email" component={TextError} /> */}
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
                required
              />
              {/* <ErrorMessage name="first_name" component={TextError} /> */}
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
                required
              />
              {/* <ErrorMessage name="last_name" component={TextError} /> */}
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-2 mr-2 flex items-center justify-between">
              <label htmlFor="phone_number">Phone number</label>
              <span className="text-xl font-bold leading-none text-red-500">
                *
              </span>
            </div>
            <PhoneInput
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
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
                required
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
            {/* <ErrorMessage name="password" component={TextError} /> */}
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
                required
              />
              <button
                type="button"
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
            {/* <ErrorMessage name="confirm_password" component={TextError} /> */}
          </div>

          <button
            type="submit"
            className="button button-accent flex w-full items-center justify-center gap-1 py-3"
          >
            <span>Continue</span>
            <ArrowForwardOutlined fontSize="inherit" className="mt-1" />
          </button>
        </Form>
      </Formik>

      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-blue-800">
          Sign in
        </Link>
      </p>
    </>
  );
};

export default StepOne;
