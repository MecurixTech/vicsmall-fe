"use client";
import ChangePasswordForm from "../profile/changepassword";
import { Field, Form, Formik } from "formik";

const ProfilePage = () => {
  
  const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = storedUser ? JSON.parse(storedUser) : { full_name: "", email: "", phone_number: "" };

  const initialValues = {
    full_name: user.full_name || "",
    phone_number: user.phone_number || "",
    email: user.email || "",
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };
  return (
    <>
      <h1 className="mb-4">Account details</h1>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="col-span-1">
              <label htmlFor="full_name" className="mb-2">
                Full Name
              </label>
              <Field type="text" name="full_name" className="w-full" />
            </div>
           
            <div className="col-span-1">
              <label htmlFor="phone_number" className="mb-2">
                Phone Number
              </label>
              <Field type="text" name="phone_number" className="w-full" />
              
            </div>
            <div className="col-span-1">
              <label htmlFor="email" className="mb-2">
                Email address
              </label>
              <Field type="text" name="email" className="w-full" />
            </div>
          </div>

          <hr className="my-4" />

         <ChangePasswordForm/>
        </Form>
      </Formik>
    </>
  );
};

export default ProfilePage;
