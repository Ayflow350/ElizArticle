// lib/getSubscriptions.ts
import prisma from "../libs/prismadb";

export interface ISubscriptionParams {
  userId?: string;
  status?: string; // You might want to filter by subscription status
  planType?: string; // e.g., "monthly" or "yearly"
}

// Utility to format date
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default async function getSubscriptions(params: ISubscriptionParams) {
  try {
    const { userId, status, planType } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId; // Filter by user ID
    }
    if (status) {
      query.status = status; // Filter by subscription status
    }
    if (planType) {
      query.planType = planType; // Filter by plan type
    }

    const subscriptions = await prisma.subscription.findMany({
      where: query,
      orderBy: {
        startDate: "desc", // Sort by start date (or modify as needed)
      },
    });

    // Map to format date fields if needed (e.g., startDate, endDate)
    const safeSubscriptions = subscriptions.map((subscription) => ({
      ...subscription,
      startDate: formatDate(subscription.startDate), // Format start date here
      endDate: subscription.endDate ? formatDate(subscription.endDate) : null, // Format end date if it exists
    }));

    // Log the subscriptions to the console
    console.log("Fetched Subscriptions:", safeSubscriptions);

    return safeSubscriptions;
  } catch (error: any) {
    throw new Error(error.message || "Error fetching subscriptions");
  }
}
