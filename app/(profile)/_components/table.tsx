import React from "react";

function Table() {
  return (
    <div className="p-6 text-black rounded-lg h-full w-full mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-1">Payments</h2>
      <p className="text-black  mb-4">Manage your payments.</p>

      {/* Filter Input and Column Button */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Filter emails..."
          className="p-2 bg-gray-800 text-gray-200 rounded-lg w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-gray-700"
        />
        <button className="p-2 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700">
          Columns
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-gray-300">
          <thead>
            <tr className="bg-gray-800 text-gray-500">
              <th className="p-3">
                <input type="checkbox" className="h-4 w-4 text-blue-500" />
              </th>
              <th className="p-3">Status</th>
              <th className="p-3">Email</th>
              <th className="p-3">Amount</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr className="border-b border-gray-700">
              <td className="p-3">
                <input type="checkbox" className="h-4 w-4 text-blue-500" />
              </td>
              <td className="p-3">Success</td>
              <td className="p-3">ken99@yahoo.com</td>
              <td className="p-3">$316.00</td>
              <td className="p-3 text-right">
                <button className="text-gray-400">•••</button>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="border-b border-gray-700">
              <td className="p-3">
                <input type="checkbox" className="h-4 w-4 text-blue-500" />
              </td>
              <td className="p-3">Success</td>
              <td className="p-3">abe45@gmail.com</td>
              <td className="p-3">$242.00</td>
              <td className="p-3 text-right">
                <button className="text-gray-400">•••</button>
              </td>
            </tr>
            {/* Row 3 */}
            <tr className="border-b border-gray-700">
              <td className="p-3">
                <input type="checkbox" className="h-4 w-4 text-blue-500" />
              </td>
              <td className="p-3">Processing</td>
              <td className="p-3">monserrat44@gmail.com</td>
              <td className="p-3">$837.00</td>
              <td className="p-3 text-right">
                <button className="text-gray-400">•••</button>
              </td>
            </tr>
            {/* Row 4 */}
            <tr>
              <td className="p-3">
                <input type="checkbox" className="h-4 w-4 text-blue-500" />
              </td>
              <td className="p-3">Failed</td>
              <td className="p-3">carmella@hotmail.com</td>
              <td className="p-3">$721.00</td>
              <td className="p-3 text-right">
                <button className="text-gray-400">•••</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-gray-400">
        <p>0 of 4 row(s) selected.</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-gray-800">Previous</button>
          <button className="px-3 py-1 rounded bg-gray-800">Next</button>
        </div>
      </div>
    </div>
  );
}

export default Table;
