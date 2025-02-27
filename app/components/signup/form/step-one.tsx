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

interface StepOneProps {
  data: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    confirm_password: string;
  };
  next: (values: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    confirm_password: string;
  }, isFinalStep: boolean) => void;
}

const StepOne: React.FC<StepOneProps> = ({ data, next }) => {
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] = useState(false);
  const [loading] = useState(false);

  const handleSubmit = (values) => {
    console.log("Form data saved for Step Two:", values);
    props.next(values, false); // Pass form data to parent
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