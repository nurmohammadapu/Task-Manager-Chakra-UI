import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Utility to fetch token from cookies, then fallback to localStorage
const getTokenFromRequest = (request: NextRequest): string | null => {
  // First check for token in cookies (server-side)
  let token = request.cookies.get("token")?.value || ""

  // If not found in cookies, fallback to localStorage (client-side)
  if (!token && typeof window !== "undefined") {
    token = localStorage.getItem("token") || ""
  }

  return token
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/signup"

  // Get the token from cookies or localStorage
  const token = getTokenFromRequest(request)

  // Check for Authorization header in case token is passed that way
  const authHeader = request.headers.get("authorization")
  const hasAuthHeader = authHeader && authHeader.startsWith("Bearer ")

  // Redirect logic
  if (isPublicPath && (token || hasAuthHeader)) {
    // If user is logged in and tries to access login/signup page, redirect to tasks
    return NextResponse.redirect(new URL("/tasks", request.url))
  }

  if (!isPublicPath && !token && !hasAuthHeader) {
    // If user is not logged in and tries to access protected route, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Configure the paths that should be checked by the middleware "/tasks/:path*", 
export const config = {
  matcher: ["/tasks/:path*", "/login", "/signup"],
}
