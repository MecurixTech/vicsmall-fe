"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();

  const hiddenNavbarRoutes = ["/faq", "/login", "/signup"];

  if (hiddenNavbarRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
};

export default NavbarWrapper;
