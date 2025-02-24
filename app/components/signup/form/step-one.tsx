import { Field, Form, Formik } from "formik";
import {
  ArrowForwardOutlined,
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import * as Yup from "yup";
import { useState } from "react";
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
    final: boolean
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
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] =
    useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    
    interface FormValues {
      first_name: string;
      last_name: string;
      email: string;
      phone_number?: string;
      password: string;
      confirm_password?: string;
      interests?: string;
    }
    
    const handleSubmit = async (values: FormValues) => {
      console.log("Form submission triggered with values:", values);
      setLoading(true);
    
      const requestBody = {
        email: values.email,
        full_name: `${values.first_name} ${values.last_name}`,
        country_code: values.phone_number ? values.phone_number.slice(0, 4) : "+234",
        phone_number: values.phone_number,
        password: values.password,
        is_customer: true,
        is_active: true,
        is_delete: false,
      };
    
      try {
        const response = await fetch(
          "https://vicsmall-backend.onrender.com/v1/api/auth/create-customer/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          }
        );
    
        const data = await response.json();
    
        if (response.ok) {
          console.log("Account created successfully:", data);
          alert("Account created successfully!");
    
          // Save user details to local storage
          localStorage.setItem(
            "user",
            JSON.stringify({
              full_name: requestBody.full_name,
              email: requestBody.email,
              phone_number: requestBody.phone_number,
            })
          );
    
          // Ensure confirm_password and interests are included
          const updatedValues = {
            ...values,
            confirm_password: values.confirm_password || "",
            interests: values.interests || "",
          };
    
          props.next(updatedValues, false);
        } else {
          console.error("Failed to create account. Response:", data);
          alert(`Signup failed: ${data.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert(`Signup error: ${error.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };
    
  return (
    <>
   <Formik
  initialValues={props.data}
  validationSchema={stepOneValidationSchema}
  onSubmit={handleSubmit}
>
  {({ values, errors, touched, setFieldValue }) => (
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
        {touched.email && errors.email && (
          <div className="text-red-600">{errors.email}</div>
        )}
      </div>

      <div className="mb-4 flex gap-2">
        <div className="flex-1">
          <label htmlFor="first_name">First name</label>
          <Field
            type="text"
            id="first_name"
            name="first_name"
            className="w-full"
            placeholder="e.g. John"
            required
          />
          {touched.first_name && errors.first_name && (
            <div className="text-red-600">{errors.first_name}</div>
          )}
        </div>

        <div className="flex-1">
          <label htmlFor="last_name">Last name</label>
          <Field
            type="text"
            id="last_name"
            name="last_name"
            className="w-full"
            placeholder="e.g. Doe"
            required
          />
          {touched.last_name && errors.last_name && (
            <div className="text-red-600">{errors.last_name}</div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="phone_number">Phone number</label>
        <PhoneInput
          placeholder="Enter phone number"
          value={values.phone_number}
          onChange={(value) => setFieldValue("phone_number", value)}
          country="NG"
          className="w-full"
        />
        {touched.phone_number && errors.phone_number && (
          <div className="text-red-600">{errors.phone_number}</div>
        )}
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
            {isShowingPassword ? (
              <RemoveRedEyeOutlined />
            ) : (
              <VisibilityOffOutlined />
            )}
          </button>
        </div>
        {touched.password && errors.password && (
          <div className="text-red-600">{errors.password}</div>
        )}
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
            {isShowingConfirmPassword ? (
              <RemoveRedEyeOutlined />
            ) : (
              <VisibilityOffOutlined />
            )}
          </button>
        </div>
        {touched.confirm_password && errors.confirm_password && (
          <div className="text-red-600">{errors.confirm_password}</div>
        )}
      </div>

      <button
  type="submit"
  className="button button-accent flex w-full items-center justify-center gap-1 py-3"
  disabled={loading} // Disable the button when loading
>
  {loading ? (
    <span className="loader"> Creating Account...</span> // You can use a spinner or loading text here
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
  );
};

export default StepOne;
