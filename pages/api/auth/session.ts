import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { hasActiveSubscription, role } = session.user as {
    hasActiveSubscription: boolean;
    role: "USER" | "ADMIN";
  };

  if (!hasActiveSubscription) {
    return res
      .status(403)
      .json({ message: "You need an active subscription to access this page" });
  }

  if (role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied. Admins only" });
  }

  return res.status(200).json({ message: "Authorized" });
}
