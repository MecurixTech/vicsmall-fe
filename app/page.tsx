"use client"

import Banner from "./components/home/banner"
import Link from "next/link"
import { ArrowForwardOutlined } from "@mui/icons-material"
import CountdownTimer from "./components/home/countdown-timer"
import { categories, vendorDetails } from "./data/dummyData"
import CategoryCard from "./components/home/category-card"
import VendorCard from "./components/home/vendors"
import Footer from "./components/footer"
import DescriptionSection from "./components/home/description"
import { useEffect, useState } from "react"
import NavbarWrapper from "./components/Navbarwrapper"
import { isUserLoggedIn, getUserData } from "@/utils/auth-helpers"
import CategorySection from "./components/home/category-section"

interface UserData {
  firstName: string
  image: string
}

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isUserLoggedIn()
      const user = getUserData()

      setIsLoggedIn(loggedIn)
      setUserData(user)
    }
    checkAuth()

    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener("auth-change", handleAuthChange)

    return () => {
      window.removeEventListener("auth-change", handleAuthChange)
    }
  }, [])

  return (
    <>
      <NavbarWrapper />
      <Banner />
      <section className="mx-auto my-12 block w-[90%] sm:hidden">
        <h2 className="mb-12 text-center text-xl font-medium text-black">Explore our Top Categories</h2>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section
        style={{
          backgroundImage:
            "linear-gradient(to right, #FF4040, #FF0202), url('https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP')",
        }}
        className="relative my-12 block w-full overflow-hidden sm:hidden"
      >
        <div className="relative z-10 flex flex-col items-center justify-evenly px-4 py-8 lg:flex-row lg:items-center lg:py-12">
          <div className="flex flex-col items-center text-center lg:items-center lg:text-left">
            <h2 className="text-[32px] font-black leading-[47px] text-neutral-light-gray lg:text-[47px]">
              Flash Sales
            </h2>

            <p className="mt-4 max-w-[500px] text-[16px] font-normal leading-[23px] text-neutral-light-gray lg:text-[18px]">
              Use coupon code <span className="font-bold">#VICSMALLSHIP</span> to get up to 90% off!!
            </p>
          </div>

          <CountdownTimer hours={3} minutes={36} seconds={14} />
        </div>

        <CategorySection title="Flash Sales" category="Flash Sale" viewMoreLink="/flash-sales" />
      </section>
      <div className="block sm:hidden">
        <Banner />
      </div>

      <section
        style={{
          backgroundImage:
            "linear-gradient(to right, #FF4040, #FF0202), url('https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP')",
        }}
        className="relative my-12 hidden w-full overflow-hidden sm:block"
      >
        <div className="relative z-10 flex flex-col items-center justify-evenly px-4 py-8 lg:flex-row lg:items-center lg:py-12">
          <div className="flex flex-col items-center text-center lg:items-center lg:text-left">
            <h2 className="text-[32px] font-black leading-[47px] text-neutral-light-gray lg:text-[47px]">
              Flash Sales
            </h2>

            <p className="mt-4 max-w-[500px] text-[16px] font-normal leading-[23px] text-neutral-light-gray lg:text-[18px]">
              Use coupon code <span className="font-bold">#VICSMALLSHIP</span> to get up to 90% off!!
            </p>
          </div>

          <CountdownTimer hours={3} minutes={36} seconds={14} />
        </div>

        <CategorySection title="Flash Sales" category="Flash Sale" viewMoreLink="/flash-sales" />
      </section>

      {/* Male Shirts Section */}
      <CategorySection title="Electronics" category="Electronics" viewMoreLink="category-page/electronics" />

      {/* Watches Section */}
      <CategorySection title="Watches" category="Watches" viewMoreLink="/watches" />

      {/* For the Ladies Section */}
      <section className="my-12 w-full overflow-hidden bg-[#1E1E1E] py-16">
        <h2 className="mb-12 text-center text-neutral-light-gray">For the Ladies</h2>
        <div>
          <CategorySection
            title="For the Ladies"
            category="Female Wears"
            viewMoreLink="/female-wears"
            darkMode={true}
          />
          <div className="flex justify-center">
            <Link
              href="/female-wears"
              className="mt-6 flex items-center rounded-[8px] border border-white px-8 py-3 text-[16px] font-medium text-white transition-all hover:bg-opacity-90 sm:text-[18px]"
            >
              View more{"  "}
              <ArrowForwardOutlined fontSize="inherit" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto my-12 block w-[90%] sm:hidden">
        <div className="flex justify-between">
          <h2 className="mb-12 text-left text-xl font-medium text-black">Vendors</h2>
          <Link href="/vendors" className="items-right justify-end gap-1 text-right font-medium text-neutral-dark-blue">
            <span>View more</span>
            <ArrowForwardOutlined fontSize="inherit" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendorDetails.map((vendor) => (
            <VendorCard key={vendor.name} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* Male Shoes Section */}
      <CategorySection title="Male Shoes" category="Shoes" viewMoreLink="/mens-shoes" />

      {/* Recommended Items Section */}
      <CategorySection title="Recommended items" category="Recommended" viewMoreLink="/recommended" />

      <div className="block sm:hidden">
        <DescriptionSection />
      </div>

      <Footer />
    </>
  )
}

export default Home

