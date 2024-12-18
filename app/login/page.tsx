"use client";

import { Facebook, Google } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import Link from "next/link";

const LoginPage = () => {
  const handleSubmit = () => {
    // TODO: Authenticate user
    console.log("Form submitted");
  };

  const initialValues = {
    email_or_phone: "",
    password: "",
  };

  return (
    <main className="mx-auto w-2/5 rounded-xl bg-white p-8 shadow-lg">
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
            <Field
              type="text"
              id="password"
              name="password"
              className="w-full"
            />
          </div>
          <button className="button button-accent w-full py-3">Login</button>
        </Form>
      </Formik>

      <div className="my-8 flex items-center gap-4">
        <span className="flex-grow border border-gray-200" />
        <span>Or login with</span>
        <span className="flex-grow border border-gray-200" />
      </div>

      <div className="flex gap-2">
        <Link
          href="https://google.com"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-500 py-3"
        >
          <Google />
          <span>Google</span>
        </Link>
        <Link
          href="https://facebook.com"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-500 py-3"
        >
          <Facebook />
          <span>Facebook</span>
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
