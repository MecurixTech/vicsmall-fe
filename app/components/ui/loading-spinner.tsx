"use client"

import type React from "react"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "secondary" | "white"
  className?: string
}

export function LoadingSpinner({ size = "md", color = "primary", className = "" }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  }

  const colorMap = {
    primary: "border-blue-600",
    secondary: "border-gray-600",
    white: "border-white",
  }

  return (
    <motion.div
      className={`inline-block rounded-full border-t-transparent ${sizeMap[size]} ${colorMap[color]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      aria-label="Loading"
    />
  )
}

export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingSpinner size="lg" color="white" />
      <p className="mt-4 text-lg font-medium text-white">{message}</p>
    </motion.div>
  )
}

export function LoadingButton({
  loading,
  children,
  disabled,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading: boolean }) {
  return (
    <button
      className={`relative inline-flex items-center justify-center rounded-md ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" color="white" />
        </span>
      )}
      <span className={loading ? "invisible" : ""}>{children}</span>
    </button>
  )
}

