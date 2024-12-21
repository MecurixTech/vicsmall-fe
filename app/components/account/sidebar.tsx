"use client";

import { userAccountSidebarLinks } from "@/app/data/dummyData";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const currentPath = usePathname();

  return (
    <aside className="flex-[3] rounded-xl bg-white p-4 shadow-sm">
      {userAccountSidebarLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={`${link.href === currentPath && "bg-accent-100 text-accent-900"} mb-2 flex items-center gap-2 rounded-xl p-3`}
        >
          <link.icon />
          <span>{link.label}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
