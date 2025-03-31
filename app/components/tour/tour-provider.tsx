"use client"

import type { ReactNode } from "react"
import { TourProvider } from "@/context/tour-context"
import { WelcomeModal } from "./welcome-modal"
import { TourGuide } from "./tour-guide"
import type { Step } from "react-joyride-react-19"
import "./tour-styles.css" 

const tourSteps: Step[] = [

  {
    target: "a[href='/']",
    title: "Welcome to VicSmall",
    content: "Click on our logo anytime to return to the homepage and discover our latest products and offers.",
    disableBeacon: true,
    placement: "bottom",
  },
  {
    target: ".categories-scroller",
    title: "Browse Categories",
    content:
      "Quickly browse through different product categories to find exactly what you're looking for. We have everything from electronics to fashion!",
    placement: "bottom",
  },
  {
    target: ".search-bar",
    title: "Search Products",
    content:
      "Looking for something specific? Use our powerful search bar to find products instantly by name, brand, or category.",
    placement: "bottom",
  },
  {
    target: "a[href='/saved']",
    title: "Your Wishlist",
    content:
      "Save items you love for later by adding them to your wishlist. Perfect for comparing products or waiting for a sale!",
    placement: "bottom",
  },
  {
    target: "a[href='/cart']",
    title: "Shopping Cart",
    content:
      "View your selected items, adjust quantities, and proceed to checkout when you're ready to complete your purchase.",
    placement: "left",
  },


  {
    target: ".flash-sales-section",
    title: "Flash Sales",
    content:
      "Don't miss out on our limited-time offers with huge discounts! These deals won't last long, so grab them while you can.",
    placement: "top",
  },
  {
    target: ".flash-sales-timer",
    title: "Sale Countdown",
    content:
      "This timer shows how much time is left before the sale ends. Hurry before it's too late to get these amazing deals!",
    placement: "bottom",
  },

  {
    target: ".categories-section",
    title: "Product Categories",
    content:
      "Browse through our wide range of product categories to find exactly what you need. We regularly update our inventory with the latest trends.",
    placement: "top",
  },
  {
    target: ".product-card",
    title: "Product Details",
    content:
      "Click on any product to see more details, available variants, customer reviews, and add it to your cart with just one click.",
    placement: "right",
  },
]

type TourProviderWrapperProps = {
  children: ReactNode
}

export function TourProviderWrapper({ children }: TourProviderWrapperProps) {
  return (
    <TourProvider steps={tourSteps}>
      {children}
      <WelcomeModal />
      <TourGuide />
    </TourProvider>
  )
}

