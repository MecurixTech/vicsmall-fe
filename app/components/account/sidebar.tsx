"use client";

import { userAccountSidebarLinks } from "@/app/data/dummyData";
import { useState, useEffect, useRef } from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isUserLoggedIn, getUserData, logoutUser } from "@/utils/auth-helpers"


interface UserData {
  firstName: string
  fullName: string
  email: string
  phoneNumber: string
  countryCode: string
}

const Sidebar = () => {
  const currentPath = usePathname();
 
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)

  const handleLogout = async () => {
    const success = await logoutUser()
    if (success) {
      setIsLoggedIn(false)
      setUserData(null)
      
      window.location.href = "/login"
    }
  }

  return (
    <aside className="hidden flex-[3] rounded-xl bg-white p-4 shadow-sm md:block">
        <div className="">
        {userAccountSidebarLinks.map((link) =>
          link.label === "Logout" ? (
            <button
              key={link.id}
              onClick={handleLogout}
              className="mb-2 flex w-full items-center gap-2 rounded-xl p-3 text-left"
            >
              <link.icon fontSize="inherit" />
              <span>{link.label}</span>
            </button>
          ) : (
            <Link
              key={link.id}
              href={link.href}
              className={`${link.href === currentPath && "bg-accent-100 text-accent-900"} mb-2 flex items-center gap-2 rounded-xl p-3`}
            >
              <link.icon fontSize="inherit" />
              <span>{link.label}</span>
            </Link>
          ),
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
