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
      <p className="mb-4 text-3xl font-bold text-gray-800">Account</p>
      <div className="flex items-start gap-6">
        <Sidebar />
        <div className="flex-[9] rounded-xl bg-white p-4 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
