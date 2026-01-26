import { useState } from 'react';
import { CalendarDays } from 'lucide-react';

const OrdersHistory = ({ session }: { session: any }) => {
  const [activeTab, setActiveTab] = useState<'executed' | 'canceled' | 'closed'>('executed');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [symbol, setSymbol] = useState('Any');
  const [direction, setDirection] = useState('Any');
  const [type, setType] = useState('Any');
  const [classification, setClassification] = useState('Any');

  const handleSearch = () => {
    console.log('Search', { startDate, endDate, symbol, direction, type, classification });
  };

  return (
    <div className="text-gray-200">
      {/* === Header === */}
      <h1 className="text-3xl font-bold text-[#50D2C1] mb-2">Order History</h1>
      <p className="text-gray-400 mb-6 text-sm">Only the past 6 months of details are available</p>

      {/* === Tabs === */}
      <div className="flex space-x-4 border-b border-gray-700 mb-6">
        {[
          { key: 'executed', label: 'Executed History' },
          { key: 'canceled', label: 'Canceled History' },
          { key: 'closed', label: 'Position Closed History' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-3 px-3 font-medium border-b-2 ${
              activeTab === tab.key
                ? 'border-[#50D2C1] text-[#50D2C1]'
                : 'border-transparent text-gray-400 hover:text-[#50D2C1]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* === Filters === */}
      <div className="bg-[#1b1b1b] border border-gray-800 rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Date Range */}
        <div className="col-span-2 flex items-center gap-2">
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

        {/* Symbol */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Symbol</label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-gray-200 outline-none"
          >
            <option>Any</option>
            <option>BTC/USDT</option>
            <option>ETH/USDT</option>
            <option>SOL/USDT</option>
          </select>
        </div>

        {/* Direction */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Direction</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-gray-200 outline-none"
          >
            <option>Any</option>
            <option>Buy</option>
            <option>Sell</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-gray-200 outline-none"
          >
            <option>Any</option>
            <option>Limit</option>
            <option>Market</option>
          </select>
        </div>

        {/* Classification */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Classification</label>
          <select
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-gray-200 outline-none"
          >
            <option>Any</option>
            <option>Spot</option>
            <option>Futures</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="bg-[#50D2C1] text-black font-semibold w-full py-2 rounded-lg hover:bg-[#50D2C1] transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* === Table === */}
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#2a2a2a] text-gray-300">
            <tr>
              <th className="px-6 py-3 font-semibold">Order No</th>
              <th className="px-6 py-3 font-semibold">Symbol</th>
              <th className="px-6 py-3 font-semibold">Type</th>
              <th className="px-6 py-3 font-semibold">Classification</th>
              <th className="px-6 py-3 font-semibold">Order Amount</th>
              <th className="px-6 py-3 font-semibold">Order Price</th>
              <th className="px-6 py-3 font-semibold">Order Date (UTC)</th>
              <th className="px-6 py-3 font-semibold">Leverage</th>
            </tr>
          </thead>
          <tbody className="bg-[#1b1b1b] text-gray-400">
            <tr>
              <td colSpan={8} className="text-center py-8">
                No data available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersHistory;
