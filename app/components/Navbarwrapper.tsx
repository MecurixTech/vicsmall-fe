"use client"

import { useState, useEffect, useRef } from "react"
import { FlagIcon, type FlagIconCode } from "react-flag-kit"
import Image from "next/image"
import Link from "next/link"
import { SearchIcon, ShoppingCart, Heart, Bell, ChevronDown, Menu, X } from "lucide-react"
import { navLinks } from "../data/dummyData"
import { isUserLoggedIn, getUserData, logoutUser } from "@/utils/auth-helpers"

interface UserData {
  firstName: string
  fullName: string
  email: string
  phoneNumber: string
  countryCode: string
}

const NavbarWrapper = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFlagMenuOpen, setIsFlagMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [desktopSelectedCountry, setDesktopSelectedCountry] = useState<FlagIconCode>("NG")
  const [mobileSelectedCountry, setMobileSelectedCountry] = useState<FlagIconCode>("NG")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const desktopCountries: { code: FlagIconCode; name: string; currency: string }[] = [
    { code: "NG", name: "NGN", currency: "NGN" },
    { code: "GB", name: "UK", currency: "GBP" },
    { code: "US", name: "USA", currency: "USD" },
    { code: "FR", name: "FR", currency: "FR" },
  ]

  const mobileCountries: { code: FlagIconCode; name: string; currency: string }[] = [
    { code: "NG", name: "Nigerian Naira", currency: "NGN" },
    { code: "GB", name: "Pound Sterling", currency: "GBP" },
  ]

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

  useEffect(() => {
  
  }, [isLoggedIn, userData])

  const handleLogout = async () => {


    const success = await logoutUser()
    if (success) {
      setIsLoggedIn(false)
      setUserData(null)
      setIsProfileMenuOpen(false)
  
      window.location.href = "/login"
    } else {
   
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
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 mb-4 w-full">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
          
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

            <div className="flex items-center space-x-4">

              <div className="relative hidden gap-4 sm:flex">
                <button
                  onClick={() => setIsFlagMenuOpen(!isFlagMenuOpen)}
                  className="flex items-center space-x-2 rounded-md px-3 py-2"
                >
                  <FlagIcon code={desktopSelectedCountry} size={24} />
                  <span className="font-poppins text-base font-medium text-[#002A48]">{desktopSelectedCountry}</span>
                  <ChevronDown className="h-5 w-5 text-[#002A48]" />
                </button>
                {isFlagMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 rounded-md border border-gray-300 bg-white shadow-lg">
                    {desktopCountries.map((country) => (
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
                        <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-300 bg-white shadow-lg">
                          <Link href="/account/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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

                    <button className="flex items-center gap-2 rounded-[60px] bg-[#FF8C48] px-4 py-3 text-white">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="font-ubuntu text-lg font-medium">Cart</span>
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                        <span className="font-inter text-base font-medium text-[#1E1E1E]">0</span>
                      </div>
                    </button>

                    <Heart className="h-6 w-6 text-[#1E1E1E]" />

                    <Bell className="h-6 w-6 text-[#292D32]" />
                  </div>
                </>
              ) : (
                <>
                  <div className="hidden sm:flex space-x-2">
                  <Link
                  href="/login"
                  className="button button-secondary hidden px-4 py-2 sm:flex"
                >
                  Login
                </Link>
                  </div>
                </>
              )}

              <div className="flex sm:hidden">
                <button className="flex items-center space-x-2 rounded-md px-3 py-2">
                  <FlagIcon code={mobileSelectedCountry} />
                </button>
                <button className="flex items-center space-x-2 rounded-md px-3 py-2">
                  <ShoppingCart />
                </button>
                {isLoggedIn && userData ? (
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
                )}
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
                  {mobileCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setMobileSelectedCountry(country.code)
                        setIsMenuOpen(false)
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
        )}
      </div>

      <div className="scrollbar-hide flex items-center justify-start gap-6 overflow-x-auto whitespace-nowrap bg-black px-4 py-2 text-sm text-neutral-light-gray lg:justify-center">
        {navLinks.map((link, index) => (
          <Link key={index} href="/components" className="text-white hover:text-gray-300">
            {link}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default NavbarWrapper

