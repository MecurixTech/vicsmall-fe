import type React from "react"
import type { Metadata } from "next"
import { Ubuntu } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from "react-hot-toast"
import PageTransition from "./components/page-transition"
import { TourProviderWrapper } from "./components/tour/tour-provider"

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vicsmall",
  description: "Vicsmall e-commerce platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
      <Providers>
      <PageTransition>
      <TourProviderWrapper>
        <main>{children}</main>
        <Toaster />
        </TourProviderWrapper>
        </PageTransition>
        </Providers>
      </body>
    </html>
  )
}

