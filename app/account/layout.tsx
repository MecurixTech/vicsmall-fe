import { Metadata } from "next";
import Sidebar from "../components/account/sidebar";

export const metadata: Metadata = {
  title: "User Account | Vicsmall",
  description: "User account management on the Vicsmall e-commerce platform",
};

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-8">
      <p className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">
        Account
      </p>
      <div className="flex flex-col items-start gap-6 md:flex-row">
        <Sidebar />
        <div className="w-full flex-[9] rounded-xl bg-white p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
