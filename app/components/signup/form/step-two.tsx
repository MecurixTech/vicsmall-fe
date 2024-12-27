"use client";

import { interests } from "@/app/data/dummyData";
import { SearchOutlined } from "@mui/icons-material";
import Link from "next/link";

interface StepTwoProps {
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
    final?: boolean,
  ) => void;

  prev: (newData: {
    email: string;

    first_name: string;

    last_name: string;

    phone_number: string;

    password: string;

    confirm_password: string;

    interests: string;
  }) => void;

  data: {
    email: string;

    first_name: string;

    last_name: string;

    phone_number: string;

    password: string;

    confirm_password: string;

    interests: string;
  };
}

const StepTwo: React.FC<StepTwoProps> = ({ next, prev, data }) => {
  return (
    <>
      <h1 className="mb-2 text-center text-2xl">
        Select your Areas of Interest
      </h1>
      <p className="mx-auto mb-4 max-w-[40ch] text-center text-gray-400">
        Select a minimum of five (5) and maximum of seven (7) wear types you are
        interested in to help VicsMall personalize your experience.
      </p>

      <div className="relative mx-auto mb-8 w-3/5">
        <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="w-full pl-10"
        />
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {interests.map((interest) => (
          <button
            key={interest.id}
            className="rounded-full border border-gray-400 px-6 py-3 font-medium hover:bg-gray-100"
          >
            {interest.value}
          </button>
        ))}
      </div>

      <button type="submit" className="button button-accent mb-8 w-full py-3">
        Sign up
      </button>

      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-blue-800">
          Sign in
        </Link>
      </p>
    </>
  );
};

export default StepTwo;
