"use client"

import { useEffect, useState } from "react"

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const cookies = document.cookie.split(";")
    const userEmailCookie = cookies.find((cookie) => cookie.trim().startsWith("user_email="))

    if (userEmailCookie) {
      const email = userEmailCookie.split("=")[1]
      setUserEmail(email)
      setIsLoggedIn(true)
    }

    setIsLoading(false)
  }, [])

  return {
    isLoggedIn,
    userEmail,
    isLoading,
  }
}

