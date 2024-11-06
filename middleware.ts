import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/libs/prismadb"; // Import Prisma client

// Custom logging function
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

  // Check authentication status
  const isAuthenticated = sessionTokenCookie ? sessionTokenCookie.value : null;
  let userRole = null;
  let isSubscriber = false;

  if (userCookie) {
    try {
      // Parse user cookie
      const userData = JSON.parse(userCookie.value);
      userRole = userData.role;

      logRequestDetails(request, `User role: ${userRole}`);

      if (isAuthenticated && userData.id) {
        const userId = userData.id;
        logRequestDetails(request, `Authenticated user ID: ${userId}`);

        // Query active subscriptions only if the user is authenticated
        const subscriptions = await prisma.subscription.findMany({
          where: { userId, status: "ACTIVE" },
        });

        logRequestDetails(
          request,
          `Active subscriptions count: ${subscriptions.length}`
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

  // Redirect unauthenticated users to signup
  if (!isAuthenticated && url.pathname !== "/" && url.pathname !== "/signup") {
    logRequestDetails(
      request,
      "Redirecting unauthenticated user to signup page"
    );
    url.pathname = "/signup";
    return NextResponse.redirect(url);
  }

  // Prevent authenticated users from accessing the login page
  if (isAuthenticated && url.pathname === "/login") {
    if (userRole === "ADMIN") {
      logRequestDetails(request, "Redirecting ADMIN user to /admin page");
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  // Restrict non-admins from accessing admin-specific routes
  if (url.pathname.startsWith("/AuthorDashboard") && userRole !== "ADMIN") {
    logRequestDetails(
      request,
      "Non-admin attempting to access /AuthorDashboard, redirecting to /not-authorized"
    );
    url.pathname = "/not-authorized";
    return NextResponse.redirect(url);
  }

  // Restrict non-subscribers from accessing subscriber-only content
  if (url.pathname.startsWith("/Article") && !isSubscriber) {
    logRequestDetails(
      request,
      "Non-subscriber attempting to access /Article, redirecting to /Payment"
    );
    url.pathname = "https://eliz-article-k6zq.vercel.app/Payment";
    return NextResponse.redirect(url);
  }

  logRequestDetails(request, "Request passed all checks, proceeding");
  return NextResponse.next();
}

// Config to exclude specific paths from middleware
export const config = {
  matcher: ["/((?!login|signup|public|api|_next/static|_next/image).*)"],
};
