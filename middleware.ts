import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/libs/prismadb"; // Import Prisma client

export async function middleware(request: NextRequest) {
  const sessionTokenCookie = request.cookies.get("next-auth.session-token");
  const userCookie = request.cookies.get("next-auth.user");

  const isAuthenticated = sessionTokenCookie ? sessionTokenCookie.value : null;
  let userRole = null;
  let isSubscriber = false;

  if (userCookie) {
    try {
      const userData = JSON.parse(userCookie.value);
      userRole = userData.role;

      // Ensure `userData.id` exists before querying
      if (isAuthenticated && userData.id) {
        const userId = userData.id;
        console.log("Middleware user ID:", userId);

        // Query to check for active subscriptions
        const subscriptions = await prisma.subscription.findMany({
          where: {
            userId: userId,
            status: "ACTIVE", // Make sure this status matches your schema
          },
        });

        // Log result of the subscription query
        console.log("Active subscriptions:", subscriptions);
        isSubscriber = subscriptions.length > 0;
      } else {
        console.warn("User is not authenticated or missing user ID.");
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

  // Free access for home and signup pages
  if (!isAuthenticated) {
    if (url.pathname !== "/" && url.pathname !== "/signup") {
      url.pathname = "/signup";
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users away from the login page based on role
  if (isAuthenticated && url.pathname === "/login") {
    if (userRole === "ADMIN") {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  // Restrict access to AuthorDashboard to admins only
  if (url.pathname.startsWith("/AuthorDashboard") && userRole !== "ADMIN") {
    url.pathname = "/not-authorized";
    return NextResponse.redirect(url);
  }

  // Redirect non-subscribers attempting to access articles
  if (url.pathname.startsWith("/Article") && !isSubscriber) {
    url.pathname = "/Payment";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Updated config to exclude paths like login, signup, and public resources
export const config = {
  matcher: ["/((?!login|signup|public|api|_next/static|_next/image).*)"],
};
