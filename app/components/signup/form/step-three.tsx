"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { savePreferences } from "@/lib/preference-actions";
import { logoutUser } from "@/utils/auth-helpers";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface StepThreeProps {
  preferences: string[];
}
interface UserData {
  firstName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
}

export default function StepThree({ preferences }: StepThreeProps) {
  const [isSaving, setIsSaving] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const success = await logoutUser();
      if (success) {
        setIsLoggedIn(false);
        setUserData(null);
        setIsProfileMenuOpen(false);
        
        window.location.href = "/login";
      } else {
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while logging out. Please try again.");
    }
  };

  useEffect(() => {
    const saveUserPreferences = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const result = await savePreferences(preferences);
        if (!result.success) {
          console.error("Failed to save preferences:", result.error);
        } else {
          toast.success("Your preferences have been saved successfully!");
        }
      } catch (error) {
        console.error("Error saving preferences:", error);
      } finally {
        setIsSaving(false);
      }
    };

    saveUserPreferences();
  }, [preferences]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#F0F2F5] px-4">
      {/* Logo */}
      <motion.div
        className="font-poppins absolute left-[57px] top-[40px] h-20 w-20 rounded-full text-center font-extrabold leading-[34px]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/">
          <span className="flex items-center gap-2">
            <Image alt="logo" src="/vicsmalllogo.png" width={50} height={50} />
          </span>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="flex w-full max-w-[540px] flex-col items-center gap-8">
        {/* Title */}
        <motion.h1
          className="font-abril-fatface text-center text-[50px] leading-[50px] text-[#1E1E1E]"
          style={{
            textShadow: "0px 4px 60px rgba(0, 0, 0, 0.43)",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Your Account is Ready
        </motion.h1>

        {/* Success Icon */}
        <motion.div
          className="relative flex h-[179px] w-[179px] items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5,
          }}
        >
          <motion.div
            className="flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Image alt="check" src="/checkmark.png" width={179} height={188} />
          </motion.div>
        </motion.div>

        {/* Back to Marketplace Button */}
        <motion.button
          onClick={handleLogout}
          className="flex h-[68px] w-full items-center justify-center rounded-lg border-2 border-[#030359] bg-[#F0F2F5] transition-colors hover:bg-[#E8EAF0]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="text-[16px] font-medium leading-[24px] text-[#030359]"
            style={{
              textShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            Back To Marketplace
          </span>
        </motion.button>
      </div>
    </div>
  );
}
