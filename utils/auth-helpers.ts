"use client"

export const isUserLoggedIn = (): boolean => {

  const hasAuthCookie = document.cookie.includes("auth_status=logged_in")

  const hasUserData = !!localStorage.getItem("user_data")


  return hasAuthCookie && hasUserData
}

export const getUserData = () => {
  try {
    const userData = localStorage.getItem("user_data")
    if (!userData) {
      return null
    }

    const parsedData = JSON.parse(userData)
    return parsedData
  } catch (error) {
    return null
  }
}

export const logoutUser = async (): Promise<boolean> => {
  try {

    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to logout on server")
    }

    localStorage.removeItem("user_data")

    document.cookie = "auth_status=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"

    window.dispatchEvent(new Event("auth-change"))

    return true
  } catch (error) {
    return false
  }
}

export const refreshAuthState = () => {
  window.dispatchEvent(new Event("auth-change"))
}

