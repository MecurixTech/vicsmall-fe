"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useTour } from "@/context/tour-context"
import { ShoppingBag, Navigation, Tag, ShoppingCart, User } from "lucide-react"

export function WelcomeModal() {
  const { isAuthenticated, showWelcomeModal, setShowWelcomeModal, startTour, setUserDeclinedTour } = useTour()

  if (!isAuthenticated || !showWelcomeModal) return null

  const handleStartTour = () => {
    setShowWelcomeModal(false)
    startTour()
  }

  const handleSkipTour = () => {
    setShowWelcomeModal(false)
    setUserDeclinedTour(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const featureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="mx-4 max-w-lg rounded-xl bg-white p-8 shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="mb-6 flex justify-center" variants={itemVariants}>
            <motion.div
              className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center"
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <ShoppingBag size={48} className="text-[#FF8C48]" />
            </motion.div>
          </motion.div>

          <motion.h2 className="mb-4 text-center text-2xl font-bold text-gray-900" variants={itemVariants}>
            Welcome to VicSmall!
          </motion.h2>

          <motion.p className="mb-6 text-center text-gray-600" variants={itemVariants}>
            Would you like a guided tour to discover all the amazing features our platform offers?
          </motion.p>

          <motion.div className="mb-8 grid grid-cols-2 gap-4" variants={itemVariants}>
            <motion.div
              className="flex flex-col items-center p-4 rounded-lg border border-gray-100 bg-gray-50"
              variants={featureVariants}
              whileHover="hover"
            >
              <Navigation className="mb-2 text-[#FF8C48]" size={28} />
              <span className="text-sm font-medium">Easy Navigation</span>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-4 rounded-lg border border-gray-100 bg-gray-50"
              variants={featureVariants}
              whileHover="hover"
            >
              <Tag className="mb-2 text-[#FF8C48]" size={28} />
              <span className="text-sm font-medium">Flash Sales</span>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-4 rounded-lg border border-gray-100 bg-gray-50"
              variants={featureVariants}
              whileHover="hover"
            >
              <ShoppingCart className="mb-2 text-[#FF8C48]" size={28} />
              <span className="text-sm font-medium">Cart Features</span>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-4 rounded-lg border border-gray-100 bg-gray-50"
              variants={featureVariants}
              whileHover="hover"
            >
              <User className="mb-2 text-[#FF8C48]" size={28} />
              <span className="text-sm font-medium">Account</span>
            </motion.div>
          </motion.div>

          <motion.div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0" variants={itemVariants}>
            <motion.button
              onClick={handleSkipTour}
              className="rounded-md border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50 sm:flex-1"
              whileHover={{ backgroundColor: "#f5f5f5" }}
              whileTap={{ scale: 0.98 }}
            >
              Skip for now
            </motion.button>
            <motion.button
              onClick={handleStartTour}
              className="rounded-md bg-[#FF8C48] px-4 py-3 text-white hover:bg-orange-500 sm:flex-1"
              whileHover={{ backgroundColor: "#ff7a30", boxShadow: "0 4px 12px rgba(255, 140, 72, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              Start the tour
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

