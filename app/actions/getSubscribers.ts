import prisma from "@/app/libs/prismadb";

interface ISubscription {
  _id: string;
  userId: string;
  paypalPlanId: string;
  paypalSubscriptionId: string;
  planType: string;
  startDate: Date;
  status: string;
  lastPaymentDate: Date | null;
  nextPaymentDate: Date | null; // Make this nullable
  autoRenew: boolean;
}

export default async function getAllSubscribers(): Promise<ISubscription[]> {
  if (typeof window !== "undefined") {
    throw new Error(
      "getAllSubscribers should only be called on the server side"
    );
  }

  try {
    const subscriptions = await prisma.subscription.findMany();

    if (!subscriptions || subscriptions.length === 0) {
      return [];
    }

    // Format each subscription to match the ISubscription interface
    const formattedSubscriptions: ISubscription[] = subscriptions.map(
      (subscription) => ({
        _id: subscription.id, // Renamed here
        userId: subscription.userId,
        paypalPlanId: subscription.paypalPlanId,
        paypalSubscriptionId: subscription.paypalSubscriptionId,
        planType: subscription.planType,
        startDate: subscription.startDate,
        status: subscription.status,
        lastPaymentDate: subscription.lastPaymentDate,
        nextPaymentDate: subscription.nextPaymentDate,
        autoRenew: subscription.autoRenew,
      })
    );

    return formattedSubscriptions;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw new Error("Error fetching subscriptions data");
  }
}
