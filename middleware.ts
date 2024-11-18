import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware function to handle routing and access control
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/signup"];

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users trying to access protected routes
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user is authenticated, extract details
  const user = token as {
    hasActiveSubscription?: boolean;
    role?: "USER" | "ADMIN";
  };

  // Redirect authenticated users away from signup
  if (pathname === "/signup" && token) {
    if (user.role === "ADMIN") {
      return NextResponse.redirect(
        new URL("/AuthorDashboard/Article", req.url)
      );
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Restrict access to article pages for unsubscribed users
  if (pathname.startsWith("/Article") && !user?.hasActiveSubscription) {
    return NextResponse.redirect(new URL("/Payment", req.url));
  }

  // Restrict access to AuthorDashboard for non-admin users
  if (pathname.startsWith("/AuthorDashboard") && user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow all other cases to proceed
  return NextResponse.next();
}

// Define the paths the middleware should match
export const config = {
  matcher: ["/signup", "/Article/:path*", "/AuthorDashboard/:path*"], // Apply to these paths
};
