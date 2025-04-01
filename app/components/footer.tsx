import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral-dark-blue px-8 pt-8  sm:pb-4 pb-[110px] text-sm text-neutral-light-gray">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <Image
          src="./vicsmall-logo.svg"
          alt="Vicsmall logo"
          height={64}
          width={64}
          className=" hidden sm:block"
        />
        <Link href="/account/dashboard">My account</Link>
        <Link href="/contact-us">Contact us</Link>
        <div className="hidden sm:block">
          <Link href="/vouchers">Vouchers</Link>
          <Link href="/refund-and-returns-policy">
            Delivery, refunds and returns
          </Link>
        </div>

        <Link href="/terms-of-service">Terms of service</Link>
        <Link href="/account/orders">Track your order</Link>
        <Link href="/faq">FAQs</Link>
      </div>
      <hr className=" block sm:hidden my-4" />
      <p className="text-center text-gray-500">Vicsmall &copy;2024</p>
    </footer>
  );
};

export default Footer;
