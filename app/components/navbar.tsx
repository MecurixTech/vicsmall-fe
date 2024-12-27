"use client";

import React, { useEffect, useRef, useState } from "react";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import Image from "next/image";
import Link from "next/link";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { navLinks } from "../data/dummyData";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFlagMenuOpen, setIsFlagMenuOpen] = useState(false);
  const [desktopSelectedCountry, setDesktopSelectedCountry] =
    useState<FlagIconCode>("NG");
  const [mobileSelectedCountry, setMobileSelectedCountry] =
    useState<FlagIconCode>("NG");
  const menuRef = useRef<HTMLDivElement>(null);

  const desktopCountries: {
    code: FlagIconCode;
    name: string;
    currency: string;
  }[] = [
    { code: "NG", name: "NGN", currency: "NGN" },
    { code: "GB", name: "UK", currency: "GBP" },
    { code: "US", name: "USA", currency: "USD" },
    { code: "FR", name: "FR", currency: "FR" },
  ];

  const mobileCountries: {
    code: FlagIconCode;
    name: string;
    currency: string;
  }[] = [
    { code: "NG", name: "Nigerian Naira", currency: "NGN" },
    { code: "GB", name: "Pound Sterling", currency: "GBP" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 mb-4 w-full">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <button
                className="block p-2 text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              <Link
                href="/"
                className="text-xl font-semibold text-gray-800 hover:text-gray-900"
              >
                <Image
                  className="hidden sm:block"
                  src="./vicsmall-logo.svg"
                  alt="Logo"
                  width={50}
                  height={50}
                />
                <span className="sm:hidden">VICSMALL</span>
              </Link>
            </div>

            <div className="mx-4 hidden flex-1 justify-center md:flex">
              <div className="relative flex w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-black focus:outline-none focus:ring"
                />
                <SearchOutlined className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden gap-4 sm:flex">
                <button
                  onClick={() => setIsFlagMenuOpen(!isFlagMenuOpen)}
                  className="flex items-center space-x-2 rounded-md bg-gray-200 px-3 py-2 hover:bg-gray-300"
                >
                  <FlagIcon code={desktopSelectedCountry} size={20} />
                  <span>{desktopSelectedCountry}</span>
                </button>
                {isFlagMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 rounded-md border border-gray-300 bg-white shadow-lg">
                    {desktopCountries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setDesktopSelectedCountry(country.code);
                          setIsFlagMenuOpen(false);
                        }}
                        className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-100"
                      >
                        <FlagIcon code={country.code} size={20} />
                        <span>{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                <Link
                  href="/login"
                  className="button button-secondary hidden px-4 py-2 sm:flex"
                >
                  Login
                </Link>
              </div>

              <div className="relative sm:hidden">
                <button
                  onClick={() => setIsFlagMenuOpen(!isFlagMenuOpen)}
                  className="flex items-center space-x-2 rounded-md px-3 py-2"
                >
                  <div className="flex h-9 items-center">
                    <FlagIcon code={desktopSelectedCountry} />
                  </div>
                </button>
                {isFlagMenuOpen && (
                  <div className="absolute right-0 top-8 z-50 rounded-lg bg-white shadow-md">
                    <div className="space-y-2 p-2">
                      {desktopCountries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => {
                            setDesktopSelectedCountry(country.code);
                            setIsFlagMenuOpen(false);
                          }}
                          className="h-10 w-10 rounded-full p-2 hover:bg-gray-200"
                        >
                          <FlagIcon code={country.code} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative sm:hidden">
                <button className="flex items-center space-x-2 rounded-md px-3 py-2">
                  <ShoppingCartOutlined />
                </button>
              </div>

              <div className="relative sm:hidden">
                <Link
                  href="/account/profile"
                  className="flex items-center space-x-2 rounded-md px-3 py-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white">
                    <span className="text-sm">
                      <Image
                        src="https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f"
                        alt="John Doe"
                        height={32}
                        width={32}
                        className="h-full w-full rounded-full"
                      />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="fixed inset-0 w-[80%] transform overflow-y-auto border-r bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out sm:w-[70%] md:hidden"
          >
            <div className="space-y-6">
              <button
                className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white transition hover:bg-red-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="mb-6 flex justify-center">
                <Image
                  src="./vicsmall-logo.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                />
              </div>

              <div className="rounded-2xl bg-[#1E1E1E] p-4">
                <div className="font-poppins mb-4 text-[16px] font-medium text-white">
                  Select Currency
                </div>
                <div className="space-y-3">
                  {mobileCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setMobileSelectedCountry(country.code);
                        setIsMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-4 rounded-md px-6 py-3 ${
                        mobileSelectedCountry === country.code
                          ? "bg-[#FF8C48] text-white"
                          : "bg-[#F9F9F9] text-gray-900"
                      } whitespace-nowrap`}
                    >
                      <div className="flex h-9 items-center">
                        <FlagIcon code={country.code} />
                      </div>
                      <span className="flex-grow text-left">
                        {country.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Link
                  href="/notifications"
                  className="flex w-[261px] items-center justify-between border-b border-gray-300 px-6 py-3 text-sm text-gray-800 hover:bg-gray-100"
                >
                  Notifications
                </Link>
                <Link
                  href="/contact-us"
                  className="flex w-[261px] items-center justify-between border-b border-gray-300 px-6 py-3 text-sm text-gray-800 hover:bg-gray-100"
                >
                  Contact Us
                </Link>
                <Link
                  href="/order-tracking"
                  className="flex w-[261px] items-center justify-between border-b border-gray-300 px-6 py-3 text-sm text-gray-800 hover:bg-gray-100"
                >
                  Order Tracking
                </Link>
                <Link
                  href="/sell"
                  className="flex w-[261px] items-center justify-between border-b border-gray-300 px-6 py-3 text-sm text-gray-800 hover:bg-gray-100"
                >
                  Sell on Vics Mall
                </Link>
                <Link
                  href="/faq"
                  className="flex w-[261px] items-center justify-between border-b border-gray-300 px-6 py-3 text-sm text-gray-800 hover:bg-gray-100"
                >
                  FAQs
                </Link>
                <Link
                  href="/faq"
                  className="flex w-[261px] items-center justify-between border-b border-gray-300 px-6 py-3 text-sm text-gray-800 hover:bg-gray-100"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/faq"
                  className="flex w-[261px] items-center justify-between border-b border-gray-300 px-6 py-3 text-sm text-gray-800 hover:bg-gray-100"
                >
                  Delivery, Refund and Returns
                </Link>
                <Link
                  href="/faq"
                  className="flex w-[261px] items-center justify-between border-b border-gray-300 px-6 py-3 text-sm text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="scrollbar-hide flex items-center justify-start gap-6 overflow-x-auto whitespace-nowrap bg-black px-4 py-2 text-sm text-neutral-light-gray lg:justify-center">
        {navLinks.map((link, index) => (
          <Link key={index} href="/categories">
            {link}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
