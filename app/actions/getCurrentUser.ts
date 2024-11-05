import { getServerSession } from "next-auth/next";
import prisma from "@/app/libs/prismadb"; // Ensure this path and initialization are correct
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSession() {
  try {
    console.log("Fetching session...");
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Error fetching session: ", error);
    return null;
  }
}

export default async function getCurrentUser() {
  try {
    console.log("Getting session...");
    const session = await getSession();

    if (!session?.user?.email) {
      console.log("No session or email found.");
      return null;
    }

    console.log("Session email: ", session.user.email);

    // Safeguard against Prisma being undefined
    if (!prisma) {
      console.error("Prisma is not initialized.");
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!currentUser) {
      console.log("No user found with the provided email.");
      return null;
    }

    console.log("User found: ", currentUser);

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.error("Error fetching current user: ", error);
    return null;
  }
}
