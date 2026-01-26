'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNav } from '@/components/AdminNav';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export default function AdminTradesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPair, setFilterPair] = useState('all');

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      router.push('/admin/login');
    }
  }, [router]);

  const trades = [
    {
      id: 1,
      user: 'user1@example.com',
      pair: 'BTC/USDT',
      type: 'long',
      leverage: '10x',
      entry: '42,500',
      current: '43,200',
      size: '1,000',
      pnl: '+164.70',
      status: 'open',
    },
    {
      id: 2,
      user: 'user2@example.com',
      pair: 'ETH/USDT',
      type: 'short',
      leverage: '5x',
      entry: '2,250',
      current: '2,200',
      size: '5,000',
      pnl: '+111.11',
      status: 'open',
    },
    {
      id: 3,
      user: 'user3@example.com',
      pair: 'BTC/USDT',
      type: 'long',
      leverage: '20x',
      entry: '41,800',
      current: '43,200',
      size: '2,500',
      pnl: '+837.32',
      status: 'open',
    },
    {
      id: 4,
      user: 'user4@example.com',
      pair: 'SOL/USDT',
      type: 'short',
      leverage: '15x',
      entry: '125',
      current: '128',
      size: '800',
      pnl: '-36.00',
      status: 'open',
    },
    {
      id: 5,
      user: 'user5@example.com',
      pair: 'ETH/USDT',
      type: 'long',
      leverage: '10x',
      entry: '2,180',
      current: '2,200',
      size: '3,000',
      pnl: '+27.52',
      status: 'open',
    },
    {
      id: 6,
      user: 'user6@example.com',
      pair: 'BTC/USDT',
      type: 'short',
      leverage: '25x',
      entry: '43,500',
      current: '43,200',
      size: '1,500',
      pnl: '+103.45',
      status: 'closed',
    },
  ];

  const filteredTrades = trades.filter((trade) => {
    const matchesSearch =
      trade.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.pair.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPair === 'all' || trade.pair === filterPair;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen ">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Trade Monitoring</h1>
          <p className="text-gray-400 mt-1">Monitor all active and closed trades</p>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-[#50D2C1]/10 transition-all">
            <p className="text-sm text-gray-400 mb-1">Active Trades</p>
            <p className="text-3xl font-bold text-green-500">3,421</p>
            <p className="text-sm text-gray-400 mt-1">+234 today</p>
          </Card>
          <Card className="p-6 bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-[#50D2C1]/10 transition-all">
            <p className="text-sm text-gray-400 mb-1">Total Volume (24h)</p>
            <p className="text-3xl font-bold text-white">$45.2M</p>
            <p className="text-sm text-[#50D2C1] mt-1">+23% from yesterday</p>
          </Card>
          <Card className="p-6 bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-[#50D2C1]/10 transition-all">
            <p className="text-sm text-gray-400 mb-1">Open Interest</p>
            <p className="text-3xl font-bold text-white">$12.8M</p>
            <p className="text-sm text-blue-500 mt-1">Stable</p>
          </Card>
          <Card className="p-6 bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-[#50D2C1]/10 transition-all">
            <p className="text-sm text-gray-400 mb-1">Liquidations (24h)</p>
            <p className="text-3xl font-bold text-red-500">$892K</p>
            <p className="text-sm text-gray-400 mt-1">45 positions</p>
          </Card>
        </div>

        {/* Top Trading Pairs */}
        <Card className="p-6 bg-gray-800 border-gray-700 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Top Trading Pairs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { pair: 'BTC/USDT', volume: '$24.5M', change: '+2.4%', trend: 'up' },
              { pair: 'ETH/USDT', volume: '$12.8M', change: '+1.8%', trend: 'up' },
              { pair: 'SOL/USDT', volume: '$4.2M', change: '-0.5%', trend: 'down' },
            ].map((item) => (
              <div
                key={item.pair}
                className="p-4 bg-gray-700 border border-gray-600 rounded-lg hover:shadow-lg hover:shadow-[#50D2C1]/10 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-white">{item.pair}</span>
                  <span
                    className={`text-sm font-medium ${
                      item.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {item.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{item.volume}</p>
                <p className="text-sm text-gray-400 mt-1">24h Volume</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Trades Table */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search by user or trading pair..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filterPair}
                onChange={(e) => setFilterPair(e.target.value)}
                className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              >
                <option value="all">All Pairs</option>
                <option value="BTC/USDT">BTC/USDT</option>
                <option value="ETH/USDT">ETH/USDT</option>
                <option value="SOL/USDT">SOL/USDT</option>
              </select>
              <Button>Refresh</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-700">
                <tr>
                  {[
                    'User',
                    'Pair',
                    'Type',
                    'Leverage',
                    'Entry',
                    'Current',
                    'Size (USDT)',
                    'PnL',
                    'Status',
                  ].map((head) => (
                    <th
                      key={head}
                      className="text-left py-3 px-4 text-sm font-semibold text-gray-300"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTrades.map((trade) => (
                  <tr
                    key={trade.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-white">{trade.user}</td>
                    <td className="py-3 px-4 text-sm font-medium text-white">{trade.pair}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          trade.type === 'long'
                            ? 'bg-green-900/20 text-green-400'
                            : 'bg-red-900/20 text-red-400'
                        }`}
                      >
                        {trade.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-300">{trade.leverage}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">${trade.entry}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">${trade.current}</td>
                    <td className="py-3 px-4 text-sm text-[#50D2C1]">${trade.size}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-sm font-medium ${
                          trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {trade.pnl}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          trade.status === 'open'
                            ? 'bg-blue-900/20 text-blue-400'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {trade.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-400">Showing {filteredTrades.length} trades</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
