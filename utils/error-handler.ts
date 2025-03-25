import toast from "react-hot-toast"

type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    
    return new Error(String(maybeError))
  }
}

export function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message
}

export function handleError(error: unknown, fallbackMessage = "An unexpected error occurred") {
  const message = getErrorMessage(error)
  console.error(message)
  toast.error(message || fallbackMessage)
  return message
}

export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  onError?: (error: unknown) => void,
  fallbackValue?: T,
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (onError) {
      onError(error)
    } else {
      const errorMessage = getErrorMessage(error)
      console.error("Error caught by withErrorHandling:", errorMessage)
      toast.error(errorMessage || "An unexpected error occurred")
    }

    if (fallbackValue !== undefined) {
      return fallbackValue
    }

    throw error
  }
}

