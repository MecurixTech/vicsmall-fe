"use client";

import type React from "react";
import { interests } from "@/app/data/dummyData";
import { SearchOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { logoutUser } from "@/utils/auth-helpers";
import { motion } from "framer-motion";

interface StepTwoProps {
  onSubmit: (categories: string[]) => Promise<void>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const StepTwo: React.FC<StepTwoProps> = ({ onSubmit }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInterestSelection = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      }
      return [...prev, interest];
    });
  };

  const handleSubmit = async () => {
    if (selectedInterests.length < 5 || selectedInterests.length > 7) {
      toast.error(
        "Please select between 5 to 7 interests to personalize your experience.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(selectedInterests);
      toast.success("Your preferences have been saved successfully!");
      await logoutUser();
      toast.success("You've been logged out. Please log in again to continue.");
    } catch (error) {
      toast.error("Failed to save your preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredInterests = interests.filter((interest) =>
    interest.value.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-center text-2xl">
          Select your Areas of Interest
        </h1>
        <p className="mx-auto mb-4 max-w-[40ch] text-center text-gray-400">
          Select a minimum of five (5) and maximum of seven (7) wear types you
          are interested in to help VicsMall personalize your experience.
        </p>
      </motion.div>

      <motion.div
        className="relative mx-auto mb-8 w-3/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="w-full pl-10 transition-all duration-300 focus:ring-2 focus:ring-orange-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      <motion.div
        className="mb-8 flex flex-wrap justify-center gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredInterests.map((interest) => (
          <motion.button
            key={interest.id}
            onClick={() => handleInterestSelection(interest.value)}
            className={`rounded-full border px-6 py-3 font-medium transition-all duration-300 ${
              selectedInterests.includes(interest.value)
                ? "bg-orange-500 text-white"
                : "border-gray-400 hover:bg-gray-100"
            }`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {interest.value}
          </motion.button>
        ))}
      </motion.div>

      <motion.button
        type="button"
        onClick={handleSubmit}
        className={`button w-full py-3 ${
          selectedInterests.length >= 5 && selectedInterests.length <= 7
            ? "button-accent"
            : "cursor-not-allowed bg-gray-300"
        }`}
        disabled={
          selectedInterests.length < 5 ||
          selectedInterests.length > 7 ||
          isSubmitting
        }
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={
          selectedInterests.length >= 5 && selectedInterests.length <= 7
            ? { scale: 1.02 }
            : {}
        }
        whileTap={
          selectedInterests.length >= 5 && selectedInterests.length <= 7
            ? { scale: 0.98 }
            : {}
        }
      >
        {isSubmitting ? (
          <motion.div className="flex items-center justify-center">
            <motion.div
              className="mr-2 h-5 w-5 rounded-full border-2 border-white border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <span>Saving preferences...</span>
          </motion.div>
        ) : (
          "Continue"
        )}
      </motion.button>

      <motion.p
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-blue-800">
          Sign in
        </Link>
      </motion.p>
    </>
  );
};

export default StepTwo;
