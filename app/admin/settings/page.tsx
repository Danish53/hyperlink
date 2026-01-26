'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNav } from '@/components/AdminNav';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [platformFee, setPlatformFee] = useState('0.05');
  const [maxLeverage, setMaxLeverage] = useState('100');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowNewRegistrations, setAllowNewRegistrations] = useState(true);
  const [minWithdrawal, setMinWithdrawal] = useState('10');
  const [withdrawalFee, setWithdrawalFee] = useState('2.5');

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-[#1f1f1f]">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Platform Settings</h1>
          <p className="text-gray-400 mt-1">Configure platform parameters and features</p>
        </div>

        {/* SETTINGS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TRADING SETTINGS */}
          <Card className="p-6 bg-[#242424] border border-[#2a2a2a] hover:shadow-xl hover:shadow-[#50D2C1]/10 transition-all">
            <h2 className="text-lg font-semibold text-white mb-4">Trading Settings</h2>
            <div className="space-y-4">
              {/* Platform Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Platform Fee (%)
                </label>
                <Input
                  type="number"
                  value={platformFee}
                  onChange={(e) => setPlatformFee(e.target.value)}
                  step="0.01"
                  className="bg-[#1f1f1f] border-[#2a2a2a] text-white"
                />
                <p className="text-xs text-gray-500 mt-1">Fee charged on each trade</p>
              </div>

              {/* Max Leverage */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Maximum Leverage
                </label>
                <Input
                  type="number"
                  value={maxLeverage}
                  onChange={(e) => setMaxLeverage(e.target.value)}
                  className="bg-[#1f1f1f] border-[#2a2a2a] text-white"
                />
                <p className="text-xs text-gray-500 mt-1">Maximum leverage allowed for trades</p>
              </div>

              {/* Minimum Withdrawal */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Minimum Withdrawal (USDT)
                </label>
                <Input
                  type="number"
                  value={minWithdrawal}
                  onChange={(e) => setMinWithdrawal(e.target.value)}
                  className="bg-[#1f1f1f] border-[#2a2a2a] text-white"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum amount users can withdraw</p>
              </div>

              {/* Withdrawal Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Withdrawal Fee (USDT)
                </label>
                <Input
                  type="number"
                  value={withdrawalFee}
                  onChange={(e) => setWithdrawalFee(e.target.value)}
                  step="0.1"
                  className="bg-[#1f1f1f] border-[#2a2a2a] text-white"
                />
                <p className="text-xs text-gray-500 mt-1">Fixed fee for withdrawals</p>
              </div>
            </div>
          </Card>

          {/* PLATFORM CONTROL */}
          <Card className="p-6 bg-[#242424] border border-[#2a2a2a] hover:shadow-xl hover:shadow-[#50D2C1]/10 transition-all">
            <h2 className="text-lg font-semibold text-white mb-4">Platform Control</h2>
            <div className="space-y-6">
              {/* Maintenance Mode */}
              <div className="flex items-center justify-between p-4 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg">
                <div>
                  <p className="font-medium text-white">Maintenance Mode</p>
                  <p className="text-sm text-gray-400">Disable trading temporarily</p>
                </div>
                <button
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    maintenanceMode ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* New Registrations */}
              <div className="flex items-center justify-between p-4 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg">
                <div>
                  <p className="font-medium text-white">New Registrations</p>
                  <p className="text-sm text-gray-400">Allow new users to sign up</p>
                </div>
                <button
                  onClick={() => setAllowNewRegistrations(!allowNewRegistrations)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    allowNewRegistrations ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      allowNewRegistrations ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Warning */}
              <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                <p className="text-sm font-medium text-[#50D2C1] mb-1">⚠️ Warning</p>
                <p className="text-sm text-[#50D2C1]">
                  Changes to platform settings will affect all users immediately. Review carefully
                  before saving.
                </p>
              </div>
            </div>
          </Card>

          {/* TRADING PAIRS */}
          <Card className="p-6 bg-[#242424] border border-[#2a2a2a] hover:shadow-xl hover:shadow-[#50D2C1]/10 transition-all">
            <h2 className="text-lg font-semibold text-white mb-4">Trading Pairs</h2>
            <div className="space-y-3">
              {[
                { pair: 'BTC/USDT', enabled: true, minSize: '10' },
                { pair: 'ETH/USDT', enabled: true, minSize: '10' },
                { pair: 'SOL/USDT', enabled: true, minSize: '5' },
                { pair: 'BNB/USDT', enabled: false, minSize: '10' },
                { pair: 'XRP/USDT', enabled: false, minSize: '5' },
              ].map((pair) => (
                <div
                  key={pair.pair}
                  className="flex items-center justify-between p-3 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg"
                >
                  <div>
                    <p className="font-medium text-white">{pair.pair}</p>
                    <p className="text-xs text-gray-400">Min size: ${pair.minSize}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      pair.enabled ? 'bg-green-900/20 text-green-400' : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {pair.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">Manage Trading Pairs</Button>
          </Card>

          {/* SYSTEM STATUS */}
          <Card className="p-6 bg-[#242424] border border-[#2a2a2a] hover:shadow-xl hover:shadow-[#50D2C1]/10 transition-all">
            <h2 className="text-lg font-semibold text-white mb-4">System Status</h2>
            <div className="space-y-4 text-sm">
              {[
                { label: 'Server Status', status: 'Online' },
                { label: 'Database', status: 'Connected' },
                { label: 'Price Feed', status: 'Active' },
                { label: 'Trading Engine', status: 'Running' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="flex items-center text-green-500 font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    {item.status}
                  </span>
                </div>
              ))}

              <div className="pt-4 border-t border-[#2a2a2a]">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Server Load</span>
                  <span className="text-white">45%</span>
                </div>
                <div className="w-full bg-[#1f1f1f] rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Memory Usage</span>
                  <span className="text-white">62%</span>
                </div>
                <div className="w-full bg-[#1f1f1f] rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* SAVE BUTTON */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSaveSettings}
            className="px-8 bg-[#50D2C1] text-black hover:bg-[#50D2C1] transition"
          >
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
