"use client"
import Image from "next/image"
import Link from "next/link"

export default function SignupWizard() {
  return (
    <div className="relative bg-[#F0F2F5] w-full min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="absolute left-[57px] top-[40px] w-20 h-20 text-center font-poppins font-extrabold leading-[34px] rounded-full">
        <Link href="/">
          <span className="flex items-center gap-2">
            <Image alt="logo" src="/vicsmalllogo.png" width={50} height={50} />
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-[540px] w-full flex flex-col items-center gap-8">
        {/* Title */}
        <h1
          className="text-[50px] leading-[50px] font-abril-fatface text-center text-[#1E1E1E]"
          style={{
            textShadow: "0px 4px 60px rgba(0, 0, 0, 0.43)",
          }}
        >
          Your Account is Ready
        </h1>

        {/* Success Icon */}
        <div className="relative w-[179px] h-[179px] flex items-center justify-center">
          <div className="flex items-center justify-center">
            <Image alt="check" src="/checkmark.png" width={179} height={188} />
          </div>
        </div>

        {/* Back to Marketplace Button */}
        <Link
          href="/"
          className="w-full h-[68px] flex items-center justify-center bg-[#F0F2F5] border border-[#030359] rounded-lg hover:bg-[#E8EAF0] transition-colors"
        >
          <span
            className="font-ubuntu font-medium text-[16px] leading-[24px] text-[#030359]"
            style={{
              textShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            Back To Marketplace
          </span>
        </Link>
      </div>
    </div>
  )
}

