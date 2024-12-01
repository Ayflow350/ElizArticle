import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import morganMiddleware from "@/app/libs/morgan"; // Adjust the path as needed

// Handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Apply Morgan to log request details
  morganMiddleware(req as any, res as any, () => {});

  // Log incoming request data
  console.log(`[API Request] ${req.method} ${req.url}`);

  const session = await getSession({ req });

  if (!session) {
    console.log("[API Response] User not authenticated");
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { hasActiveSubscription, role } = session.user as {
    hasActiveSubscription: boolean;
    role: "USER" | "ADMIN";
  };

  console.log("[API] User Info:", {
    email: session.user.email,
    role,
    hasActiveSubscription,
  });

  if (!hasActiveSubscription) {
    console.log("[API Response] Subscription inactive");
    return res
      .status(403)
      .json({ message: "You need an active subscription to access this page" });
  }

  if (role !== "ADMIN") {
    console.log("[API Response] Access denied. Non-admin user");
    return res.status(403).json({ message: "Access denied. Admins only" });
  }

  console.log("[API Response] User authorized");
  return res.status(200).json({ message: "Authorized" });
}
