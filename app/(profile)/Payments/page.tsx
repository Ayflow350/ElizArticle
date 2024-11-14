// import React from "react";

// function Table() {
//   return (
//     <div className="p-6 text-black rounded-lg h-full w-full mx-auto">
//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-left text-black">
//           <thead>
//             <tr className="bg-black text-white">
//               <th className="p-3">
//                 <input type="checkbox" className="h-4 w-4 text-black" />
//               </th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Plan</th>
//               <th className="p-3">Amount</th>
//               <th className="p-3">Start Date</th>
//               <th className="p-3">End Date</th>
//               <th className="p-3 text-right">Cancel</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Row 1 */}
//             <tr className="border-b border-gray-700">
//               <td className="p-3">
//                 <input type="checkbox" className="h-4 w-4 text-blue-500" />
//               </td>
//               <td className="p-3">Success</td>
//               <td className="p-3">Basic Plan</td>
//               <td className="p-3">$316.00</td>
//               <td className="p-3">01/10/2024</td>
//               <td className="p-3">01/10/2025</td>
//               <td className="p-3 text-right">
//                 <button className="px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-700  focus:outline-none">
//                   Cancel
//                 </button>
//               </td>
//             </tr>
//             {/* Row 2 */}
//             <tr className="border-b border-gray-700">
//               <td className="p-3">
//                 <input type="checkbox" className="h-4 w-4 text-blue-500" />
//               </td>
//               <td className="p-3">Success</td>
//               <td className="p-3">Pro Plan</td>
//               <td className="p-3">$242.00</td>
//               <td className="p-3">03/15/2024</td>
//               <td className="p-3">03/15/2025</td>
//               <td className="p-3 text-right">
//                 <button className="px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-700  focus:outline-none">
//                   Cancel
//                 </button>
//               </td>
//             </tr>
//             {/* Row 3 */}
//             <tr className="border-b border-gray-700">
//               <td className="p-3">
//                 <input type="checkbox" className="h-4 w-4 text-blue-500" />
//               </td>
//               <td className="p-3">Processing</td>
//               <td className="p-3">Enterprise Plan</td>
//               <td className="p-3">$837.00</td>
//               <td className="p-3">05/20/2024</td>
//               <td className="p-3">05/20/2025</td>
//               <td className="p-3 text-right">
//                 <button className="px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-700  focus:outline-none">
//                   Cancel
//                 </button>
//               </td>
//             </tr>
//             {/* Row 4 */}
//             <tr>
//               <td className="p-3">
//                 <input
//                   type="checkbox"
//                   className="h-4 w-4 text-gray-500 checked:bg-black checked:border-black"
//                 />
//               </td>
//               <td className="p-3">Failed</td>
//               <td className="p-3">Basic Plan</td>
//               <td className="p-3">$721.00</td>
//               <td className="p-3">08/10/2024</td>
//               <td className="p-3">08/10/2025</td>
//               <td className="p-3 text-right">
//                 <button className="px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-700 focus:outline-none">
//                   Cancel
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Table;

import React from "react";
import Container from "@/app/components/Container";
import Banner from "@/assets/userbanner.svg";
import Image from "next/image";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Link from "next/link";
import getSubscriptionByUserId from "@/app/actions/getSubscriptionById"; // Assuming this is the function you created for fetching subscription

export const dynamic = "force-dynamic";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string | null;
  createdAt: string;
  role: string;
  hasActiveSubscription: boolean;
}

const Account = async () => {
  const currentUser = await getCurrentUser();

  // If no user, show login prompt
  if (!currentUser) {
    return (
      <Container>
        <h2 className="mt-5 mb-2 text-center text-3xl font-bold">
          User not found. Please log in.
        </h2>
        <p className="text-center text-lg">
          Please log in to view your account details.
        </p>
        <a href="/login" className="text-blue-500 underline">
          Go to Login
        </a>
      </Container>
    );
  }

  // Fetch subscription details using the userId
  const subscription = await getSubscriptionByUserId(currentUser.id);

  // Log subscription details to the console

  // Extract and capitalize the first letter of the user's first name
  const firstInitial = currentUser.name?.charAt(0).toUpperCase();

  return (
    <Container>
      <div className="justify-center flex mt-10 relative">
        <Image src={Banner} alt="Banner" />
      </div>
      <div className="justify-center flex mt-10 relative">
        {currentUser.image ? (
          <Image
            src={currentUser.image}
            alt="User avatar"
            className="justify-center flex -mt-40 rounded-full w-24 h-24 object-cover"
            width={96}
            height={96}
          />
        ) : (
          <div className=" -mt-28 rounded-full w-32 h-32 bg-gray-500 text-white flex items-center justify-center text-5xl font-bold">
            {firstInitial}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-6">Account</h1>

        <div className="rounded-md shadow-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">Plan Id</h1>
              <p>{subscription?._id}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">Email</h1>
              <p>{currentUser.email}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">Member Since</h1>
              <p>
                {new Date(currentUser.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-start space-y-4">
            <div>
              <h1 className="font-semibold mb-2">Subscription</h1>
              {/* Display subscription status */}
              {subscription ? (
                <>
                  <div className="mb-4">
                    <p className="text-lg">
                      {subscription.status === "ACTIVE" ? "Active" : "Inactive"}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h2 className="font-semibold">Subscription Plan Type</h2>
                    <p>Plan Type: {subscription.planType}</p>
                  </div>

                  <div className="mb-4">
                    <h2 className="font-semibold">Subscription Start Date</h2>
                    <p>
                      {subscription.startDate
                        ? new Date(subscription.startDate).toLocaleDateString()
                        : "Not Available"}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-semibold">Subscription Next Payment</h2>
                    <p>
                      {subscription.nextPaymentDate
                        ? new Date(
                            subscription.nextPaymentDate
                          ).toLocaleDateString()
                        : "Not Available"}
                    </p>
                  </div>
                </>
              ) : (
                <p>No subscription found.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/Payment"
              className="text-white py-2 px-6 items-center border-black rounded-md bg-black border flex gap-x-2"
            >
              Cancel Subscription
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Account;
