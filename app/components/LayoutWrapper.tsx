"use client"; // ✅ Mark this as a client component

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/faq"];

  return (
    <>
      {!hideNavbarRoutes.includes(pathname) && <Navbar />} {/* ✅ Hide on /login & /faq */}
      <main>{children}</main>
    </>
  );
}
