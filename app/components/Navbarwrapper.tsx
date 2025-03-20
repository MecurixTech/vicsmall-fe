"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { FlagIcon, type FlagIconCode } from "react-flag-kit"
import Image from "next/image"
import Link from "next/link"
import { SearchIcon, ShoppingCart, Heart, Bell, ChevronDown, Menu, X } from "lucide-react"
import { navLinks } from "../data/dummyData"
import { isUserLoggedIn, getUserData, logoutUser } from "@/utils/auth-helpers"
import { useRouter, usePathname } from "next/navigation"
import { getCategories } from "@/lib/product-actions"
import { useCart } from "@/context/cart-context"

interface UserData {
  firstName: string
  fullName: string
  email: string
  phoneNumber: string
  countryCode: string
}

interface NavbarWrapperProps {
  pageType?: "home" | "conditionalnavbar" | "default"
}

const NavbarWrapper = ({ pageType = "default" }: NavbarWrapperProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFlagMenuOpen, setIsFlagMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [desktopSelectedCountry, setDesktopSelectedCountry] = useState<FlagIconCode>("NG")
  const [mobileSelectedCountry, setMobileSelectedCountry] = useState<FlagIconCode>("NG")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const desktopFlagRef = useRef<HTMLDivElement>(null)
  const mobileFlagRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { totalItems } = useCart()

  const desktopCountries: Array<{ code: FlagIconCode; name: string; currency: string }> = [
    { code: "NG", name: "NGN", currency: "NGN" },
    { code: "GB", name: "UK", currency: "GBP" },
    { code: "US", name: "USA", currency: "USD" },
    { code: "FR", name: "FR", currency: "FR" },
  ]

  const mobileCountries: Array<{ code: FlagIconCode; name: string; currency: string }> = [
    { code: "NG", name: "NGN", currency: "NGN" },
    { code: "GB", name: "UK", currency: "GBP" },
    { code: "US", name: "USA", currency: "USD" },
    { code: "FR", name: "FR", currency: "FR" },
  ]

  const hamburgerMenuCountries: Array<{ code: FlagIconCode; name: string; currency: string }> = [
    { code: "NG", name: "Nigerian Naira", currency: "NGN" },
    { code: "GB", name: "Pound Sterling", currency: "GBP" },
  ]

  const excludedPages = ["conditionalnavbar"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true)
        const response = await getCategories()

        if (response.success && response.data.length > 0) {

          const categoryNames = response.data.map(cat => cat.name)
          setCategories(categoryNames)

        } else {

          setCategories(navLinks)

        }
      } catch (error) {
        console.error("[Navbar] Error fetching categories:", error)
        setCategories(navLinks)
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  const checkAuthStatus = () => {
    const loggedIn = isUserLoggedIn()
    const user = getUserData()

    setIsLoggedIn(loggedIn)
    setUserData(user)
  }

  useEffect(() => {
    checkAuthStatus()

    const handleAuthChange = () => {
      checkAuthStatus()
    }

    window.addEventListener("auth-change", handleAuthChange)

    const interval = setInterval(() => {
      checkAuthStatus()
    }, 5000)

    return () => {
      window.removeEventListener("auth-change", handleAuthChange)
      clearInterval(interval)
    }
  }, [])

  const handleLogout = async () => {
    const success = await logoutUser()
    if (success) {
      setIsLoggedIn(false)
      setUserData(null)
      setIsProfileMenuOpen(false)
      window.location.href = "/login"
    }
  }

  const avatarUrl = userData
    ? `https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLDgn7BAlwWEj2NiVBQrR15bJv69SFqGxC7A4z`
    : "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLDgn7BAlwWEj2NiVBQrR15bJv69SFqGxC7A4z"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
      if (
        isFlagMenuOpen &&
        desktopFlagRef.current &&
        !desktopFlagRef.current.contains(event.target as Node) &&
        mobileFlagRef.current &&
        !mobileFlagRef.current.contains(event.target as Node)
      ) {
        setIsFlagMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen, isFlagMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  const handleCategoryClick = (category: string, e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/category-page/${encodeURIComponent(category)}`)
  }


  return (
    <>
      <nav className="sticky top-0 z-50 mb-4 w-full">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1">
            {/* Desktop: Single row with logo, search, and icons */}
            <div className="flex h-16 items-center justify-between">
              {/* Logo and mobile menu button */}
              <div className="flex items-center">
                <button
                  className="block p-2 text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <Link href="/" className="text-xl font-semibold text-gray-800 hover:text-gray-900">
                  <Image
                    className="hidden sm:block"
                    src="/vicsmall-logo.svg"
                    alt="Vicsmall Logo"
                    width={50}
                    height={50}
                  />
                  <span className="sm:hidden">VICSMALL</span>
                </Link>
              </div>

              {/* Desktop search bar - in the same row */}
              <div className="mx-4 hidden flex-1 justify-center md:flex">
                <div className="relative flex w-full max-w-md">
                  <input
                    type="text"
                    placeholder="Search for your dream Dress"
                    className="w-full rounded-lg bg-[#EFEFEF] py-2 pl-10 pr-4 focus:border-black focus:outline-none focus:ring"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-[#667479]" />
                </div>
              </div>

              {/* Right side icons */}
              <div className="flex items-center space-x-4">
                {/* Country selector - desktop */}
                <div className="relative hidden gap-4 sm:flex" ref={desktopFlagRef}>
                  <button
                    onClick={() => setIsFlagMenuOpen(!isFlagMenuOpen)}
                    className="flex items-center space-x-2 rounded-md px-3 py-2"
                  >
                    <FlagIcon code={desktopSelectedCountry} size={24} />
                    <span className="font-poppins text-base font-medium text-[#002A48]">{desktopSelectedCountry}</span>
                    <ChevronDown className="h-5 w-5 text-[#002A48]" />
                  </button>
                  {isFlagMenuOpen && (
                    <div className="absolute right-0 mt-2 w-32 rounded-md border border-gray-300 bg-white shadow-lg z-50">
                      {desktopCountries.map((country: { code: FlagIconCode; name: string; currency: string }) => (
                        <button
                          key={country.code}
                          onClick={() => {
                            setDesktopSelectedCountry(country.code)
                            setIsFlagMenuOpen(false)
                          }}
                          className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-100"
                        >
                          <FlagIcon code={country.code} size={20} />
                          <span className="ml-2">{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Logged in user - desktop */}
                {isLoggedIn && userData ? (
                  <>
                    <div className="hidden items-center space-x-4 sm:flex">
                      <div className="relative" ref={profileRef}>
                        <button
                          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                          className="flex items-center gap-3 rounded-[27px] border border-[#FF8C48] bg-[#FFECE1] px-3 py-2"
                        >
                          <Image
                            src={avatarUrl || "/placeholder.svg"}
                            alt={userData.firstName}
                            width={38}
                            height={38}
                            className="rounded-full border border-[#FF8C48]"
                          />
                          <span className="font-inter text-base font-medium text-[#002A48]">{userData.firstName}</span>
                          <ChevronDown className="h-5 w-5 text-[#002A48]" />
                        </button>
                        {isProfileMenuOpen && (
                          <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-300 bg-white shadow-lg z-50">
                            <Link
                              href="/account/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              My Account
                            </Link>
                            <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Orders
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </div>
                        )}
                      </div>

                      <Link href="/cart">
                        <button className="flex items-center gap-2 rounded-[60px] bg-[#FF8C48] px-4 py-3 text-white">
                          <ShoppingCart className="h-5 w-5" />
                          <span className="font-ubuntu text-lg font-medium">Cart</span>
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                            <span className="font-inter text-base font-medium text-[#1E1E1E]">{totalItems}</span>
                          </div>
                        </button>
                      </Link>
                      <Link href="/saved">
                        <Heart className="h-6 w-6 text-[#1E1E1E]" />
                      </Link>

                      <Bell className="h-6 w-6 text-[#292D32]" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden sm:flex space-x-2">
                      <Link href="/login" className="button button-secondary hidden px-4 py-2 sm:flex">
                        Login
                      </Link>
                    </div>
                  </>
                )}

                {/* Mobile icons */}
                <div className="flex sm:hidden">
                  {/* Flag Dropdown for Mobile - hide on contact-us page */}
                  {!excludedPages.includes(pageType) && (
                    <div className="relative mt-1" ref={mobileFlagRef}>
                      <button
                        onClick={() => setIsFlagMenuOpen(!isFlagMenuOpen)}
                        className="flex items-center space-x-2 rounded-md px-3 py-2"
                      >
                        <FlagIcon code={mobileSelectedCountry} size={24} />
                      </button>
                      {isFlagMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-300 bg-white shadow-lg z-50">
                          {mobileCountries.map((country: { code: FlagIconCode; name: string; currency: string }) => (
                            <button
                              key={country.code}
                              onClick={() => {
                                setMobileSelectedCountry(country.code)
                                setIsFlagMenuOpen(false)
                              }}
                              className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-100"
                            >
                              <FlagIcon code={country.code} size={20} />
                              <span className="ml-2">{country.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Search icon - show on contact-us page */}
                  {pageType === "conditionalnavbar" && (
                    <button
                      className="flex items-center space-x-2 rounded-md px-3 py-2"
                      onClick={() => setIsSearchVisible(!isSearchVisible)}
                    >
                      <SearchIcon className="h-5 w-5 text-[#1E1E1E]" />
                    </button>
                  )}

                  <button className="flex items-center space-x-2 rounded-md px-3 py-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 8H21"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* User profile - hide on contact-us page */}
                  {!excludedPages.includes(pageType) && (
                    isLoggedIn && userData ? (
                      <Link href="/account/profile" className="flex items-center space-x-2 rounded-md px-3 py-2">
                        <div className="h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={avatarUrl || "/placeholder.svg"}
                            alt={userData.firstName}
                            height={32}
                            width={32}
                            className="h-full w-full"
                          />
                        </div>
                      </Link>
                    ) : (
                      <Link href="/login" className="flex items-center space-x-2 rounded-md px-3 py-2 text-[#FF8C48]">
                        Login
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Mobile search bar - only visible on small screens and when search icon is clicked for contact-us page */}
            {(!excludedPages.includes(pageType) || isSearchVisible) && (
              <div className="mt-2 mb-4 w-full px-4 md:hidden">
                <div className="relative flex w-full">
                  <input
                    type="text"
                    placeholder="Search for products"
                    className="w-full rounded-lg bg-[#EFEFEF] py-2 pl-10 pr-4 text-sm focus:border-black focus:outline-none focus:ring"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-[#667479]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu with dark overlay */}
        {isMenuOpen && (
          <>
            {/* Dark overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-60" onClick={() => setIsMenuOpen(false)} />

            {/* Menu panel */}
            <div
              ref={menuRef}
              className="fixed inset-y-0 left-0 z-70 w-[80%] max-w-[300px] transform overflow-y-auto border-r bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out sm:w-[70%] md:hidden"
            >
              <div className="space-y-6">
                <button
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white transition hover:bg-red-600"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="mb-6 flex justify-center">
                  <Image src="/vicsmall-logo.svg" alt="Vicsmall Logo" width={100} height={100} />
                </div>

                <div className="rounded-2xl bg-[#1E1E1E] p-4">
                  <div className="mb-4 font-poppins text-[16px] font-medium text-white">Select Currency</div>
                  <div className="space-y-3">
                    {hamburgerMenuCountries.map((country: { code: FlagIconCode; name: string; currency: string }) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setMobileSelectedCountry(country.code)
                          setIsMenuOpen(false)
                        }}
                        className={`flex w-full items-center gap-4 rounded-md px-6 py-3 ${mobileSelectedCountry === country.code ? "bg-[#FF8C48] text-white" : "bg-[#F9F9F9] text-gray-900"
                          } whitespace-nowrap`}
                      >
                        <div className="flex h-9 items-center">
                          <FlagIcon code={country.code} />
                        </div>
                        <span className="flex-grow text-left">{country.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { href: "/notifications", label: "Notifications" },
                    { href: "/contact-us", label: "Contact Us" },
                    { href: "/order-tracking", label: "Order Tracking" },
                    { href: "/sell", label: "Sell on Vics Mall" },
                    { href: "/faq", label: "FAQs" },
                    { href: "/terms", label: "Terms of Service" },
                    { href: "/delivery", label: "Delivery, Refund and Returns" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex w-[261px] items-center justify-between border-b border-gray-300 px-6 py-3 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {isLoggedIn && (
                    <button
                      onClick={handleLogout}
                      className="flex w-[261px] items-center justify-between border-b border-gray-300 px-6 py-3 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Categories Scroller - Made sticky for both mobile and desktop */}
      {!excludedPages.includes(pageType) && (
        <div className="sticky top-[64px] md:top-16 z-40 w-full bg-black">
          <div className="scrollbar-hide flex items-center justify-start gap-6 overflow-x-auto whitespace-nowrap px-4 py-2 text-sm text-neutral-light-gray lg:justify-center">
            {isLoadingCategories ? (

              Array(6).fill(null).map((_, index) => (
                <div key={index} className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
              ))
            ) : (
              categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/category-page/${encodeURIComponent(category)}`}
                  className="text-white hover:text-gray-300"
                  onClick={(e) => handleCategoryClick(category, e)}
                >
                  {category}
                </Link>
              ))
            )}
          </div>
        </div>
      )}

      {/* Mobile bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-[94px] w-full mx-auto items-center justify-around bg-white shadow-[0px_-2px_20px_3px_rgba(0,0,0,0.11)] backdrop-blur-md sm:hidden">
        <Link href="/" className="flex flex-col items-center gap-2">
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.5123 7.99979C18.5123 7.73457 18.4069 7.48022 18.2194 7.29268C18.0319 7.10514 17.7775 6.99979 17.5123 6.99979C17.2471 6.99979 16.9927 7.10514 16.8052 7.29268C16.6176 7.48022 16.5123 7.73457 16.5123 7.99979H18.5123ZM4.51229 7.99979C4.51229 7.73457 4.40693 7.48022 4.21939 7.29268C4.03186 7.10514 3.7775 6.99979 3.51229 6.99979C3.24707 6.99979 2.99272 7.10514 2.80518 7.29268C2.61765 7.48022 2.51229 7.73457 2.51229 7.99979H4.51229ZM18.8053 10.7068C18.9939 10.8889 19.2465 10.9897 19.5087 10.9875C19.7709 10.9852 20.0217 10.88 20.2071 10.6946C20.3925 10.5092 20.4977 10.2584 20.5 9.99619C20.5022 9.73399 20.4014 9.48139 20.2193 9.29279L18.8053 10.7068ZM10.5123 0.999786L11.2193 0.292786C11.0318 0.105315 10.7775 0 10.5123 0C10.2471 0 9.99282 0.105315 9.80529 0.292786L10.5123 0.999786ZM0.805288 9.29279C0.709778 9.38503 0.633596 9.49538 0.581187 9.61738C0.528778 9.73939 0.501192 9.87061 0.500038 10.0034C0.498884 10.1362 0.524186 10.2678 0.574467 10.3907C0.624747 10.5136 0.699001 10.6253 0.792893 10.7192C0.886786 10.8131 0.998438 10.8873 1.12133 10.9376C1.24423 10.9879 1.37591 11.0132 1.50869 11.012C1.64147 11.0109 1.77269 10.9833 1.89469 10.9309C2.0167 10.8785 2.12704 10.8023 2.21929 10.7068L0.805288 9.29279ZM5.51229 19.9998H15.5123V17.9998H5.51229V19.9998ZM18.5123 16.9998V7.99979H16.5123V16.9998H18.5123ZM4.51229 16.9998V7.99979H2.51229V16.9998H4.51229ZM20.2193 9.29279L11.2193 0.292786L9.80529 1.70679L18.8053 10.7068L20.2193 9.29279ZM9.80529 0.292786L0.805288 9.29279L2.21929 10.7068L11.2193 1.70679L9.80529 0.292786ZM15.5123 19.9998C16.3079 19.9998 17.071 19.6837 17.6336 19.1211C18.1962 18.5585 18.5123 17.7954 18.5123 16.9998H16.5123C16.5123 17.265 16.4069 17.5194 16.2194 17.7069C16.0319 17.8944 15.7775 17.9998 15.5123 17.9998V19.9998ZM5.51229 17.9998C5.24707 17.9998 4.99272 17.8944 4.80518 17.7069C4.61765 17.5194 4.51229 17.265 4.51229 16.9998H2.51229C2.51229 17.7954 2.82836 18.5585 3.39097 19.1211C3.95358 19.6837 4.71664 19.9998 5.51229 19.9998V17.9998Z"
              fill={pathname === "/" ? "#030359" : "#B3B3B3"}
            />
          </svg>
          <span
            className={`font-ubuntu text-[11px] font-bold ${pathname === "/" ? "text-[#030359]" : "text-[#B3B3B3]"}`}
          >
            Home
          </span>
        </Link>

        <Link href="/category-page" className="flex flex-col items-center gap-2">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.5 1H7.5V7H1.5V1ZM11.5 1H17.5V7H11.5V1ZM1.5 11H7.5V17H1.5V11ZM11.5 14C11.5 14.7956 11.8161 15.5587 12.3787 16.1213C12.9413 16.6839 13.7044 17 14.5 17C15.2956 17 16.0587 16.6839 16.6213 16.1213C17.1839 15.5587 17.5 14.7956 17.5 14C17.5 13.2044 17.1839 12.4413 16.6213 11.8787C16.0587 11.3161 15.2956 11 14.5 11C13.7044 11 12.9413 11.3161 12.3787 11.8787C11.8161 12.4413 11.5 13.2044 11.5 14Z"
              stroke={pathname === "/category-page" || pathname.startsWith("/category-page") ? "#030359" : "#B3B3B3"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className={`font-ubuntu text-[11px] font-bold ${pathname === "/category-page" || pathname.startsWith("/category-page") ? "text-[#030359]" : "text-[#B3B3B3]"}`}
          >
            Categories
          </span>
        </Link>

        <Link href="/saved" className="flex flex-col items-center gap-2">
          <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.6 15.55L10.5 15.65L10.39 15.55C5.64 11.24 2.5 8.39 2.5 5.5C2.5 3.5 4 2 6 2C7.54 2 9.04 3 9.57 4.36H11.43C11.96 3 13.46 2 15 2C17 2 18.5 3.5 18.5 5.5C18.5 8.39 15.36 11.24 10.6 15.55ZM15 0C13.26 0 11.59 0.81 10.5 2.08C9.41 0.81 7.74 0 6 0C2.92 0 0.5 2.41 0.5 5.5C0.5 9.27 3.9 12.36 9.05 17.03L10.5 18.35L11.95 17.03C17.1 12.36 20.5 9.27 20.5 5.5C20.5 2.41 18.08 0 15 0Z"
              fill={pathname === "/saved" || pathname === "/wishlist" ? "#030359" : "#B3B3B3"}
            />
          </svg>
          <span
            className={`font-ubuntu text-[11px] font-bold ${pathname === "/saved" || pathname === "/wishlist" ? "text-[#030359]" : "text-[#B3B3B3]"}`}
          >
            Saved
          </span>
        </Link>

        <Link href="/account" className="flex flex-col items-center gap-2">
          <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.5 9C11.7091 9 13.5 7.20914 13.5 5C13.5 2.79086 11.7091 1 9.5 1C7.29086 1 5.5 2.79086 5.5 5C5.5 7.20914 7.29086 9 9.5 9Z"
              stroke={pathname === "/account" || pathname.startsWith("/account/") ? "#030359" : "#B3B3B3"}
              strokeWidth="1.5"
            />
            <path
              d="M17.5 16.5C17.5 18.985 17.5 21 9.5 21C1.5 21 1.5 18.985 1.5 16.5C1.5 14.015 5.082 12 9.5 12C13.918 12 17.5 14.015 17.5 16.5Z"
              stroke={pathname === "/account" || pathname.startsWith("/account/") ? "#030359" : "#B3B3B3"}
              strokeWidth="1.5"
            />
          </svg>
          <span
            className={`font-ubuntu text-[11px] font-bold ${pathname === "/account" || pathname.startsWith("/account/") ? "text-[#030359]" : "text-[#B3B3B3]"}`}
          >
            Account
          </span>
        </Link>

        <Link href="/contact-us" className="flex flex-col items-center gap-2">

          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.95 16C10.3 16 10.596 15.879 10.838 15.637C11.08 15.395 11.2007 15.0993 11.2 14.75C11.2 14.4 11.0793 14.104 10.838 13.862C10.5967 13.62 10.3007 13.4993 9.95 13.5C9.6 13.5 9.30433 13.621 9.063 13.863C8.82167 14.105 8.70067 14.4007 8.7 14.75C8.7 15.1 8.821 15.396 9.063 15.638C9.305 15.88 9.60067 16.0007 9.95 16ZM9.05 12.15H10.9C10.9 11.6 10.9627 11.1667 11.088 10.85C11.2133 10.5333 11.5673 10.1 12.15 9.55C12.5833 9.11667 12.925 8.704 13.175 8.312C13.425 7.92 13.55 7.44933 13.55 6.9C13.55 5.96667 13.2083 5.25 12.525 4.75C11.8417 4.25 11.0333 4 10.1 4C9.15 4 8.37933 4.25 7.788 4.75C7.19667 5.25 6.784 5.85 6.55 6.55L8.2 7.2C8.28333 6.9 8.471 6.575 8.763 6.225C9.055 5.875 9.50067 5.7 10.1 5.7C10.6333 5.7 11.0333 5.846 11.3 6.138C11.5667 6.43 11.7 6.75067 11.7 7.1C11.7 7.43333 11.6 7.746 11.4 8.038C11.2 8.33 10.95 8.60067 10.65 8.85C9.91667 9.5 9.46667 9.99167 9.3 10.325C9.13333 10.6583 9.05 11.2667 9.05 12.15ZM10 20C8.61667 20 7.31667 19.7377 6.1 19.213C4.88333 18.6883 3.825 17.9757 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
              fill={pathname === "/contact-us" ? "#030359" : "#B3B3B3"} />
          </svg>

          <span
            className={`font-ubuntu text-[11px] font-bold ${pathname === "/contact-us" ? "text-[#030359]" : "text-[#B3B3B3]"}`}
          >
            Contact
          </span>
        </Link>
      </div>
    </>
  )
}

export default NavbarWrapper

