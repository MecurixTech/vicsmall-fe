"use client"

import type React from "react"
import { interests } from "@/app/data/dummyData"
import { SearchOutlined } from "@mui/icons-material"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

interface StepTwoProps {
  onSubmit: (categories: string[]) => Promise<void>
}

const StepTwo: React.FC<StepTwoProps> = ({ onSubmit }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleInterestSelection = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest)
      }
      return [...prev, interest]
    })
  }

  const handleSubmit = async () => {
    if (selectedInterests.length < 5 || selectedInterests.length > 7) {
      toast.error("Please select between 5 to 7 interests.")
      return
    }

    await onSubmit(selectedInterests)
  }

  const filteredInterests = interests.filter((interest) =>
    interest.value.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <h1 className="mb-2 text-center text-2xl">Select your Areas of Interest</h1>
      <p className="mx-auto mb-4 max-w-[40ch] text-center text-gray-400">
        Select a minimum of five (5) and maximum of seven (7) wear types you are interested in to help VicsMall
        personalize your experience.
      </p>

      <div className="relative mx-auto mb-8 w-3/5">
        <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filteredInterests.map((interest) => (
          <button
            key={interest.id}
            onClick={() => handleInterestSelection(interest.value)}
            className={`rounded-full border px-6 py-3 font-medium ${
              selectedInterests.includes(interest.value)
                ? "bg-orange-500 text-white"
                : "border-gray-400 hover:bg-gray-100"
            }`}
          >
            {interest.value}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className={`button w-full py-3 ${
          selectedInterests.length >= 5 && selectedInterests.length <= 7
            ? "button-accent"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={selectedInterests.length < 5 || selectedInterests.length > 7}
      >
        Continue
      </button>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-blue-800">
          Sign in
        </Link>
      </p>
    </>
  )
}

export default StepTwo

