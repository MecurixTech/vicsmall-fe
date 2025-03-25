"use client"

import type React from "react"

import Image from "next/image"
import Footer from "../components/footer"
import Link from "next/link"
import { CallOutlined } from "@mui/icons-material"
import FAQList from "./faqs/faqList"
import NavbarWrapper from "../components/Navbarwrapper"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"

const ContactUsPage = () => {
  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toast.success("Calling our customer service...")
    window.location.href = "tel:+1234567890"
  }

  return (
    <>
      <NavbarWrapper pageType="conditionalnavbar" />

      <motion.div
        className="mx-auto mb-16 block w-[95%] overflow-hidden rounded-xl bg-white shadow-lg sm:flex lg:w-4/5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
        }}
      >
        <motion.div className="h-[40vh] flex-1 sm:h-auto relative overflow-hidden" whileHover={{ scale: 1.03 }}>
          <Image
            src="https://utfs.io/f/wLDjZbdcJHpRbWWwvMrydGZHiMRNA7cpC8xfEeqXw9yQuT6o"
            height={500}
            width={500}
            alt="Woman on call"
            className="h-full w-full object-cover transition-transform duration-700"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="flex-[2] p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.section
            className="mb-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <motion.h1
              className="mb-4 text-3xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Contact us
            </motion.h1>
            <motion.p className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              If you have any questions or need assistance, please feel free to reach out to us. Our team is here to
              help you with any inquiries you may have. We look forward to hearing from you!
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="tel:+1234567890"
                className="button button-accent flex w-fit items-center gap-2 px-4 py-2"
                onClick={handleCallClick}
              >
                <span>Call us</span>
                <CallOutlined fontSize="inherit" />
              </Link>
            </motion.div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            <motion.h2
              className="mb-4 text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Frequently Asked Questions
            </motion.h2>

            <FAQList />
          </motion.section>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  )
}

export default ContactUsPage

