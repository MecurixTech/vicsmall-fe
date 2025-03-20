import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value
  const { pathname } = request.nextUrl
  const publicRoutes = ["/", "/login", "/signup"]
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/api/") || pathname.includes("."),
  )

  const authRoutes = ["/login", "/signup"]
  const isAuthRoute = authRoutes.some((route) => pathname === route)

  if (!isPublicRoute && !accessToken) {
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
}

