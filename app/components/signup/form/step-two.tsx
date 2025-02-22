"use client";

import { interests } from "@/app/data/dummyData";
import { SearchOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";

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
    final?: boolean
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

const StepTwo: React.FC<StepTwoProps> = ({ data, next }) => {
  // Track selected interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>(data.interests ? data.interests.split(",") : []);
  const [loading, setLoading] = useState(false);

  const handleInterestSelection = (interest: string) => {
    setSelectedInterests((prev) => {
      // Toggle selection of the interest
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest); // Remove if already selected
      }
      return [...prev, interest]; // Add if not selected
    });
  };

  const handleSubmit = async () => {
    if (selectedInterests.length < 5 || selectedInterests.length > 7) {
      alert("Please select between 5 to 7 interests.");
      return;
    }

    setLoading(true);

    const requestBody = {
      email: data.email,
      full_name: `${data.first_name} ${data.last_name}`,
      country_code: data.phone_number.slice(0, 4),
      phone_number: data.phone_number,
      password: data.password,
      is_customer: true,
      is_active: true,
      is_delete: false,
      interests: selectedInterests.join(",") // Joining the selected interests as a comma-separated string
    };

    try {
      const response = await fetch(
        "https://vicsmall-backend.onrender.com/v1/api/auth/create-customer/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        next({ ...data, interests: selectedInterests.join(",") }, true); // Passing selected interests
      } else {
        alert(`Signup failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

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
            onClick={() => handleInterestSelection(interest.value)}
            className={`rounded-full border px-6 py-3 font-medium ${selectedInterests.includes(interest.value) ? 'bg-blue-500 text-white' : 'border-gray-400 hover:bg-gray-100'}`}
          >
            {interest.value}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="button button-accent mb-8 w-full py-3"
        disabled={loading || selectedInterests.length < 5 || selectedInterests.length > 7} // Disable if the conditions aren't met
      >
        {loading ? "Signing up..." : "Sign up"}
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
