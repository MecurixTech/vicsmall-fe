"use client"

import Footer from "../components/footer"
import { motion } from "framer-motion"
import NavbarWrapper from "../components/Navbarwrapper"

const RefundAndReturnsPolicyPage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.5,
      },
    }),
  }

  return (
    <>
      <NavbarWrapper pageType="conditionalnavbar" />

      <motion.h1
        className="my-8 text-center text-3xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Refund and Returns Policy
      </motion.h1>

      <motion.div
        className="mx-auto mb-8 w-[95%] rounded-xl bg-white p-2 shadow-lg sm:w-4/5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="rounded-xl bg-neutral-light-gray p-8">
          <motion.section className="mb-4" custom={0} variants={sectionVariants} initial="hidden" animate="visible">
            <h2 className="mb-1 text-base">Introduction</h2>
            <p>
              This Refund and Returns Policy outlines the conditions under which you may request a refund or return for
              products purchased from our store.
            </p>
          </motion.section>

          <motion.section className="mb-4" custom={1} variants={sectionVariants} initial="hidden" animate="visible">
            <h2 className="mb-1 text-base">Refund Eligibility</h2>
            <p>
              To be eligible for a refund, your item must be unused and in the same condition that you received it. It
              must also be in the original packaging.
            </p>
          </motion.section>

          <motion.section className="mb-4" custom={2} variants={sectionVariants} initial="hidden" animate="visible">
            <h2 className="mb-1 text-base">Non-returnable Items</h2>
            <p>
              Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers,
              or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods,
              hazardous materials, or flammable liquids or gases.
            </p>
          </motion.section>

          <motion.section className="mb-4" custom={3} variants={sectionVariants} initial="hidden" animate="visible">
            <h2 className="mb-1 text-base">Refund Process</h2>
            <p>
              Once your return is received and inspected, we will send you an email to notify you that we have received
              your returned item. We will also notify you of the approval or rejection of your refund. If you are
              approved, then your refund will be processed, and a credit will automatically be applied to your credit
              card or original method of payment, within a certain amount of days.
            </p>
          </motion.section>

          <motion.section className="mb-4" custom={4} variants={sectionVariants} initial="hidden" animate="visible">
            <h2 className="mb-1 text-base">Late or Missing Refunds</h2>
            <p>
              If you haven't received a refund yet, first check your bank account again. Then contact your credit card
              company, it may take some time before your refund is officially posted. Next, contact your bank. There is
              often some processing time before a refund is posted. If you've done all of this and you still have not
              received your refund yet, please contact us at [email protected]
            </p>
          </motion.section>

          <motion.section className="mb-4" custom={5} variants={sectionVariants} initial="hidden" animate="visible">
            <h2 className="mb-1 text-base">Exchanges</h2>
            <p>
              We only replace items if they are defective or damaged. If you need to exchange it for the same item, send
              us an email at [email protected] and send your item to: [Your Address].
            </p>
          </motion.section>

          <motion.section className="mb-4" custom={6} variants={sectionVariants} initial="hidden" animate="visible">
            <h2 className="mb-1 text-base">Shipping Returns</h2>
            <p>
              To return your product, you should mail your product to: [Your Address]. You will be responsible for
              paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you
              receive a refund, the cost of return shipping will be deducted from your refund.
            </p>
          </motion.section>

          <motion.section custom={7} variants={sectionVariants} initial="hidden" animate="visible">
            <h2 className="mb-1 text-base">Need Help?</h2>
            <p>Contact us at [email protected] for questions related to refunds and returns.</p>
          </motion.section>
        </div>
      </motion.div>

      <Footer />
    </>
  )
}

export default RefundAndReturnsPolicyPage

