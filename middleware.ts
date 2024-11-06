import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/libs/prismadb";

// Logging function to debug requests
function logRequestDetails(request: NextRequest, message: string) {
  const method = request.method;
  const url = request.nextUrl.pathname;
  const query = request.nextUrl.searchParams.toString();
  const timestamp = new Date().toISOString();

  console.log(
    `[${timestamp}] ${method} ${url}${query ? "?" + query : ""} - ${message}`
  );
}

export async function middleware(request: NextRequest) {
  logRequestDetails(request, "Middleware initiated");

  const sessionTokenCookie = request.cookies.get("next-auth.session-token");
  const userCookie = request.cookies.get("next-auth.user");

  const isAuthenticated = sessionTokenCookie ? sessionTokenCookie.value : null;
  let userRole = null;
  let isSubscriber = false;

  if (userCookie) {
    try {
      const userData = JSON.parse(userCookie.value);
      userRole = userData.role;

      logRequestDetails(request, `User role: ${userRole}`);

      if (isAuthenticated && userData.id) {
        const userId = userData.id;
        console.log("Middleware user ID:", userId);

        // Query for active subscriptions
        const subscriptions = await prisma.subscription.findMany({
          where: {
            userId: userId,
            status: "ACTIVE",
          },
        });

        logRequestDetails(
          request,
          `Active subscriptions: ${subscriptions.length}`
        );
        isSubscriber = subscriptions.length > 0;
      }
    } catch (error) {
      console.error(
        "Failed to parse user cookie or fetch subscriptions:",
        error
      );
      userRole = null;
      isSubscriber = false;
    }
  }

  const url = request.nextUrl.clone();

  // Redirect unauthenticated users on protected routes only
  if (!isAuthenticated) {
    const isProtectedRoute =
      !url.pathname.startsWith("/login") &&
      !url.pathname.startsWith("/signup") &&
      !url.pathname.startsWith("/public");

    if (isProtectedRoute) {
      logRequestDetails(
        request,
        "Redirecting unauthenticated user to signup page"
      );
      url.pathname = "/signup";
      return NextResponse.redirect(url);
    }
  }

  // Redirect authenticated users away from login/signup pages
  if (
    isAuthenticated &&
    (url.pathname === "/login" || url.pathname === "/signup")
  ) {
    if (userRole === "ADMIN") {
      logRequestDetails(request, "Redirecting ADMIN user to /admin page");
      url.pathname = "/admin";
    } else {
      logRequestDetails(
        request,
        "Redirecting authenticated user to /home page"
      );
      url.pathname = "/home"; // Redirect non-admin users to home or dashboard
    }
    return NextResponse.redirect(url);
  }

  // Check admin-only access for certain routes
  if (url.pathname.startsWith("/AuthorDashboard") && userRole !== "ADMIN") {
    logRequestDetails(
      request,
      "Non-admin attempting to access /AuthorDashboard, redirecting to /not-authorized"
    );
    url.pathname = "/not-authorized";
    return NextResponse.redirect(url);
  }

  // Check subscriber-only access for certain routes
  if (url.pathname.startsWith("/Article") && !isSubscriber) {
    logRequestDetails(
      request,
      "Non-subscriber attempting to access /Article, redirecting to /Payment"
    );
    url.pathname = "/Payment";
    return NextResponse.redirect(url);
  }

  logRequestDetails(request, "Proceeding with the request");
  return NextResponse.next();
}

// Middleware configuration to exclude specific paths
export const config = {
  matcher: ["/((?!login|signup|public|api|_next/static|_next/image).*)"],
};
