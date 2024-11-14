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

export default async function getSubscriptionByUserId(
  userId: string
): Promise<ISubscription | null> {
  if (typeof window !== "undefined") {
    throw new Error(
      "getSubscriptionByUserId should only be called on the server side"
    );
  }

  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!subscription) {
      return null;
    }

    // Rename 'id' to '_id' to match the ISubscription interface
    const formattedSubscription: ISubscription = {
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
    };

    return formattedSubscription;
  } catch (error) {
    console.error("Error fetching subscription:", error);
    throw new Error("Error fetching subscription data");
  }
}
