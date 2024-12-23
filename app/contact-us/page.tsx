import Image from "next/image";
import Footer from "../components/footer";
import Link from "next/link";
import { CallOutlined } from "@mui/icons-material";
import FAQList from "./faqs/faqList";

const ContactUsPage = () => {
  return (
    <>
      <div className="mx-auto mb-16 block w-[95%] overflow-hidden rounded-xl bg-white shadow-lg sm:flex lg:w-4/5">
        <div className="h-[40vh] flex-1 sm:h-auto">
          <Image
            src="https://utfs.io/f/wLDjZbdcJHpRbWWwvMrydGZHiMRNA7cpC8xfEeqXw9yQuT6o"
            height={500}
            width={500}
            alt="Woman on call"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-[2] p-8">
          <section className="mb-8">
            <h1 className="mb-4 text-3xl">Contact us</h1>
            <p className="mb-4">
              If you have any questions or need assistance, please feel free to
              reach out to us. Our team is here to help you with any inquiries
              you may have. We look forward to hearing from you!
            </p>
            <Link
              href="tel:+1234567890"
              className="button button-accent flex w-fit items-center gap-2 px-4 py-2"
            >
              <span>Call us</span>
              <CallOutlined fontSize="inherit" />
            </Link>
          </section>

          <section>
            <h2 className="mb-4 text-2xl">Frequently Asked Questions</h2>

            <FAQList />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUsPage;
