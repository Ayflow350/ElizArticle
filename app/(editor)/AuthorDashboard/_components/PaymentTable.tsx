import React from "react";

// Interface for User

interface IUser {
  id: string;

  name: string | null; // Nullable name

  email: string;
}

// Interface for Subscription

interface ISubscription {
  _id: string;

  userId: string;

  paypalPlanId: string;

  paypalSubscriptionId: string;

  planType: string;

  startDate: Date;

  status: string;

  lastPaymentDate: Date | null;

  nextPaymentDate: Date | null;

  autoRenew: boolean;

  user: IUser | null; // Nullable user
}

// Props interface for PaymentTable component

interface Props {
  subscribers: ISubscription[];
}

// Function to format dates

const formatDate = (date: Date | null): string =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        day: "numeric",

        month: "long",

        year: "numeric",
      })
    : "N/A";

// PaymentTable component

const PaymentTable: React.FC<Props> = ({ subscribers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-black">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-3">#</th> {/* Add numbering column */}
            <th className="p-3">Subscriber</th>
            <th className="p-3">Plan</th>
            <th className="p-3">Status</th>
            <th className="p-3">Start Date</th>
            <th className="p-3">Next Payment Date</th>
            <th className="p-3">Email</th> {/* Email column */}
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {subscribers.map((subscriber, index) => (
            <tr key={subscriber._id} className="border-b border-gray-700">
              <td className="p-3">{index + 1}</td> {/* Render numbering */}
              <td className="p-3">
                {/* Display user's name */}
                {subscriber.user
                  ? subscriber.user.name || "Unknown"
                  : "No User"}
              </td>
              <td className="p-3">{subscriber.planType}</td>
              <td className="p-3">{subscriber.status}</td>
              <td className="p-3">{formatDate(subscriber.startDate)}</td>
              <td className="p-3">{formatDate(subscriber.nextPaymentDate)}</td>
              <td className="p-3">
                {/* Display user's email */}
                {subscriber.user
                  ? subscriber.user.email || "No Email"
                  : "No Email"}
              </td>
              <td className="p-3 text-right">
                <button className="px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-700">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
