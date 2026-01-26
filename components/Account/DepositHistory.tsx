import { useState } from 'react';
import { CalendarDays } from 'lucide-react';

const DepositHistory = ({ session }: { session: any }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {
    console.log('Searching deposits from', startDate, 'to', endDate);
  };

  return (
    <div className="text-gray-200">
      <h1 className="text-3xl font-bold text-[#50D2C1] mb-2">Deposit History</h1>
      <p className="text-gray-400 mb-6 text-sm">Only the past 6 months of details are available</p>

      {/* === Date Range + Search === */}
      <div className="bg-[#1b1b1b] border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-400">Date</label>
          <div className="flex items-center bg-black border border-gray-700 rounded-lg px-3 py-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-gray-200 outline-none"
            />
            <CalendarDays className="w-4 h-4 text-gray-400 ml-2" />
          </div>
          <span className="text-gray-400">-</span>
          <div className="flex items-center bg-black border border-gray-700 rounded-lg px-3 py-2">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-gray-200 outline-none"
            />
            <CalendarDays className="w-4 h-4 text-gray-400 ml-2" />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="bg-[#50D2C1] text-black font-semibold px-6 py-2 rounded-lg hover:bg-[#50D2C1] transition w-full md:w-auto"
        >
          Search
        </button>
      </div>

      {/* === History Table === */}
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#2a2a2a] text-gray-300">
            <tr>
              <th className="px-6 py-3 font-semibold">Date (UTC)</th>
              <th className="px-6 py-3 font-semibold">Amount</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">TXId</th>
            </tr>
          </thead>
          <tbody className="bg-[#1b1b1b] text-gray-400">
            <tr>
              <td colSpan={4} className="text-center py-8">
                No deposit history found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepositHistory;
