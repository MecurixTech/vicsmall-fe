// app/layout.tsx
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./components/Navbarwrapper"; // Import the new wrapper

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vicsmall",
  description: "Vicsmall e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <NavbarWrapper />
        <main>{children}</main>
      </body>
    </html>
  );
}
