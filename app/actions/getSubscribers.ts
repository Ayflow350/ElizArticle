import prisma from "@/app/libs/prismadb";

interface IUser {
  id: string;
  name: string | null; // Allow `name` to be nullable
  email: string;
}

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
  user: IUser | null; // Include user details here
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

    // Fetch user information for each subscription
    const formattedSubscriptions: ISubscription[] = await Promise.all(
      subscriptions.map(async (subscription) => {
        const user = await prisma.user.findUnique({
          where: { id: subscription.userId },
          select: {
            id: true,
            name: true, // Matches the nullable definition in IUser
            email: true,
          },
        });

        return {
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
          user: user || null, // Attach user info or null if not found
        };
      })
    );

    return formattedSubscriptions;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw new Error("Error fetching subscriptions data");
  }
}
