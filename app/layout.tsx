import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

import "./globals.css";
import Navbar from "./components/navbar";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Vicsmall",
  description: "Vicsmall e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
