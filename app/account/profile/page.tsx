"use client";

import { Field, Form, Formik } from "formik";

const ProfilePage = () => {
  const initialValues = {
    first_name: "John",
    last_name: "Doe",
    display_name: "johndoe123",
    email: "thejohndoe@gmail.com",
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  const onSubmit = (values: {
    first_name: string;
    last_name: string;
    display_name: string;
    email: string;
    current_password: string;
    new_password: string;
    confirm_new_password: string;
  }) => {
    console.log(values);
  };
  return (
    <>
      <h1 className="mb-4">Account details</h1>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="col-span-1">
              <label htmlFor="first_name" className="mb-2">
                First name
              </label>
              <Field type="text" name="first_name" className="w-full" />
            </div>
            <div className="col-span-1">
              <label htmlFor="last_name" className="mb-2">
                Last name
              </label>
              <Field type="text" name="last_name" className="w-full" />
            </div>
            <div className="col-span-1">
              <label htmlFor="display_name" className="mb-2">
                Display name
              </label>
              <Field type="text" name="display_name" className="w-full" />
              <p className="mt-1 text-xs text-gray-400">
                This will be how your name will be displayed in the account
                section and in reviews
              </p>
            </div>
            <div className="col-span-1">
              <label htmlFor="email" className="mb-2">
                Email address
              </label>
              <Field type="text" name="email" className="w-full" />
            </div>
          </div>

          <hr className="my-4" />

          <h2 className="mb-4 text-base">Password change</h2>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div className="col-span-1">
              <label htmlFor="current_password" className="mb-2">
                Current password (leave blank to leave unchanged)
              </label>
              <Field
                type="password"
                name="current_password"
                className="w-full"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="new_password" className="mb-2">
                New password (leave blank to leave unchanged)
              </label>
              <Field type="password" name="new_password" className="w-full" />
            </div>
            <div className="col-span-1">
              <label htmlFor="confirm_new_password" className="mb-2">
                Confirm new password
              </label>
              <Field
                type="password"
                name="confirm_new_password"
                className="w-full"
              />
            </div>
          </div>

          <button type="submit" className="button button-accent px-8 py-3">
            Save changes
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default ProfilePage;
