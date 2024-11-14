import React from "react";

function Table() {
  return (
    <div className="p-6 text-black rounded-lg h-full w-full mx-auto">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-black">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-3">
                <input type="checkbox" className="h-4 w-4 text-black" />
              </th>
              <th className="p-3">Status</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3 text-right">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr className="border-b border-gray-700">
              <td className="p-3">
                <input type="checkbox" className="h-4 w-4 text-blue-500" />
              </td>
              <td className="p-3">Success</td>
              <td className="p-3">Basic Plan</td>
              <td className="p-3">$316.00</td>
              <td className="p-3">01/10/2024</td>
              <td className="p-3">01/10/2025</td>
              <td className="p-3 text-right">
                <button className="px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-700  focus:outline-none">
                  Cancel
                </button>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="border-b border-gray-700">
              <td className="p-3">
                <input type="checkbox" className="h-4 w-4 text-blue-500" />
              </td>
              <td className="p-3">Success</td>
              <td className="p-3">Pro Plan</td>
              <td className="p-3">$242.00</td>
              <td className="p-3">03/15/2024</td>
              <td className="p-3">03/15/2025</td>
              <td className="p-3 text-right">
                <button className="px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-700  focus:outline-none">
                  Cancel
                </button>
              </td>
            </tr>
            {/* Row 3 */}
            <tr className="border-b border-gray-700">
              <td className="p-3">
                <input type="checkbox" className="h-4 w-4 text-blue-500" />
              </td>
              <td className="p-3">Processing</td>
              <td className="p-3">Enterprise Plan</td>
              <td className="p-3">$837.00</td>
              <td className="p-3">05/20/2024</td>
              <td className="p-3">05/20/2025</td>
              <td className="p-3 text-right">
                <button className="px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-700  focus:outline-none">
                  Cancel
                </button>
              </td>
            </tr>
            {/* Row 4 */}
            <tr>
              <td className="p-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-gray-500 checked:bg-black checked:border-black"
                />
              </td>
              <td className="p-3">Failed</td>
              <td className="p-3">Basic Plan</td>
              <td className="p-3">$721.00</td>
              <td className="p-3">08/10/2024</td>
              <td className="p-3">08/10/2025</td>
              <td className="p-3 text-right">
                <button className="px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-700 focus:outline-none">
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
