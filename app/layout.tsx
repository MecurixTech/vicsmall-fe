import type { Metadata } from "next";
// import { Ubuntu } from "next/font/google";

import "./globals.css";

// const ubuntu = Ubuntu({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700"],
// });

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
      <body>{children}</body>
    </html>
  );
}
