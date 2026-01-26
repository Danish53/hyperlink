'use client';

import { useState } from 'react';
import { CalendarDays, Search } from 'lucide-react';

const WithdrawalHistory = ({ session }: { session: any }) => {
  const [startDate, setStartDate] = useState('10/05/2025');
  const [endDate, setEndDate] = useState('11/06/2025');

  const handleSearch = () => {
    console.log('Search between:', startDate, 'and', endDate);
  };

  return (
    <div className="text-gray-200">
      {/* === Header === */}
      <h1 className="text-3xl font-bold text-[#50D2C1] mb-2">Withdrawal History</h1>
      <p className="text-gray-400 mb-6">Only the past 6 months of details are available</p>

      {/* === Date Filter === */}
      <div className="bg-[#0d0d0d] p-6 rounded-lg flex flex-col md:flex-row items-center gap-4 mb-6 border border-gray-800">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-lg font-semibold">Date</span>
          <div className="flex items-center bg-black border border-gray-700 rounded-lg">
            <input
              type="text"
              className="bg-transparent p-2 px-3 text-sm focus:outline-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <CalendarDays className="w-4 h-4 text-gray-400 mr-2" />
          </div>
          <span className="text-gray-400">-</span>
          <div className="flex items-center bg-black border border-gray-700 rounded-lg">
            <input
              type="text"
              className="bg-transparent p-2 px-3 text-sm focus:outline-none"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <CalendarDays className="w-4 h-4 text-gray-400 mr-2" />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-[#50D2C1] hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition"
        >
          <Search className="w-4 h-4" /> Search
        </button>
      </div>

      {/* === Table === */}
      <div className="overflow-x-auto border border-gray-800 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#1b1b1b] border-b border-gray-800 text-gray-200">
            <tr>
              <th className="px-6 py-3 font-semibold">Date (UTC)</th>
              <th className="px-6 py-3 font-semibold">Amount</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Wallet</th>
              <th className="px-6 py-3 font-semibold">TXId</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty state */}
            <tr>
              <td colSpan={5} className="text-center py-10 text-gray-400">
                No withdrawal history found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalHistory;
