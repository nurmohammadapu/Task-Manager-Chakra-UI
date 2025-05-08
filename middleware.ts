import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/signup"

  // Get the token from localStorage (client-side only)
  // For middleware, we need to check cookies instead
  const token = request.cookies.get("token")?.value || ""

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
  matcher: ["/profile/:path*"],
}
