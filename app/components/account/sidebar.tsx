"use client"

import { userAccountSidebarLinks } from "@/app/data/dummyData"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { logoutUser } from "@/utils/auth-helpers"
import { TourButton } from "../tour/tour-button"


const Sidebar = () => {
  const currentPath = usePathname()

  const handleLogout = async () => {
    const success = await logoutUser()
    if (success) {
      window.location.href = "/login"
    }
  }

  return (
    <aside className="hidden flex-[3] rounded-xl bg-white p-4 shadow-sm md:block account-sidebar">
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
              className={`${
                link.href === currentPath && "bg-accent-100 text-accent-900"
              } mb-2 flex items-center gap-2 rounded-xl p-3 ${
                link.href.includes("/dashboard")
                  ? "dashboard-link"
                  : link.href.includes("/orders")
                    ? "orders-link"
                    : link.href.includes("/addresses")
                      ? "addresses-link"
                      : link.href.includes("/payment-methods")
                        ? "payment-methods-link"
                        : link.href.includes("/vouchers")
                          ? "vouchers-link"
                          : link.href.includes("/part-payment")
                            ? "part-payment-link"
                            : link.href.includes("/settings")
                              ? "settings-link"
                              : ""
              }`}
            >
              <link.icon fontSize="inherit" />
              <span>{link.label}</span>
            </Link>
          ),
        )}

        {/* Tour Button */}
        <div className="mt-4 pt-4 border-t">
          <TourButton className="w-full justify-center" />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

