"use client"; 

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/faq"];

  return (
    <>
      {!hideNavbarRoutes.includes(pathname) && <Navbar />}
      <main>{children}</main>
    </>
  );
}
