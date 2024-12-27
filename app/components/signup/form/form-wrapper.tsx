"use client";

import { useEffect, useState } from "react";
import StepOne from "./step-one";
import StepTwo from "./step-two";

const FormWrapper = () => {
  const [data, setData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    interests: "",
  });
  const [currentStep, setCurrentStep] = useState<number>(0);

  const makeRequest = (formData: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    confirm_password: string;
    interests: string;
  }) => {
    console.log("Form submitted", formData);
  };

  const handleNextStep = (
    newData: {
      email: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      password: string;
      confirm_password: string;
      interests: string;
    },
    final = false,
  ) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = (newData: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    confirm_password: string;
    interests: string;
  }) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} key={0} />,
    <StepTwo
      next={handleNextStep}
      prev={handlePreviousStep}
      data={data}
      key={1}
    />,
  ];

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <main className="mx-auto mb-12 w-[95%] rounded-xl bg-white p-8 shadow-lg sm:w-3/5 lg:w-2/5">
      {steps[currentStep]}
    </main>
  );
};

export default FormWrapper;
