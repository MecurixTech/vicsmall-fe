import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral-dark-blue p-8 text-sm text-neutral-light-gray">
      <div className="flex items-center justify-center gap-8">
        <Image
          src="./vicsmall-logo.svg"
          alt="Vicsmall logo"
          height={64}
          width={64}
        />
        <Link href="/my-account">My account</Link>
        <Link href="/contact-us">Contact us</Link>
        <Link href="/vouchers">Vouchers</Link>
        <Link href="/delivery-refunds-returns">
          Delivery, refunds and returns
        </Link>
        <Link href="/terms-of-service">Terms of service</Link>
        <Link href="/track-order">Track your order</Link>
        <Link href="/faqs">FAQs</Link>
      </div>
      <p className="text-center">Vicsmall &copy;2024</p>
    </footer>
  );
};

export default Footer;
