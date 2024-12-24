"use client";

import { Dispatch, SetStateAction } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../text-error";

const AddNewCardPopup = ({
  setIsShowingAddNewCardPopup,
}: {
  setIsShowingAddNewCardPopup: Dispatch<SetStateAction<boolean>>;
}) => {
  const initialValues = {
    card_holder: "",
    card_number: "",
    expiry_date: "",
    cvv: "",
  };

  const validationSchema = Yup.object({
    card_holder: Yup.string().required("Card holder name is required"),
    card_number: Yup.string().required("Card number is required"),
    expiry_date: Yup.string().required("Expiry date is required"),
    cvv: Yup.string().required("CVV is required"),
  });

  const handleSubmit = (values: {
    card_holder: string;
    card_number: string;
    expiry_date: string;
    cvv: string;
  }) => {
    console.log(values);
  };
  return (
    <>
      <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm" />

      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 sm:w-4/5 lg:w-3/5">
        <p className="mb-8 font-semibold tracking-tight text-gray-800">
          Add payment method
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="card_holder">Card holder</label>
                <Field type="text" name="card_holder" className="w-full" />
                <ErrorMessage name="card_holder" component={TextError} />
              </div>

              <div>
                <label htmlFor="card_number">Card number</label>
                <Field type="text" name="card_number" className="w-full" />
                <ErrorMessage name="card_number" component={TextError} />
              </div>

              <div>
                <label htmlFor="expiry_date">Expiry date</label>
                <Field type="text" name="expiry_date" className="w-full" />
                <ErrorMessage name="expiry_date" component={TextError} />
              </div>

              <div>
                <label htmlFor="cvv">CVV</label>
                <Field type="text" name="cvv" className="w-full" />
                <ErrorMessage name="cvv" component={TextError} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setIsShowingAddNewCardPopup(false)}
                className="button button-secondary flex-1 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button button-accent flex-1 py-2"
              >
                Add card
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default AddNewCardPopup;
