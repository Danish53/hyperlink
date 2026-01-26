'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNav } from '@/components/AdminNav';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export default function AdminUsersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      router.push('/admin/login');
    }
  }, [router]);

  const users = [
    {
      id: 1,
      email: 'user1@example.com',
      name: 'John Doe',
      status: 'active',
      kyc: 'verified',
      balance: '5,234.50',
      joined: '2024-01-15',
    },
    {
      id: 2,
      email: 'user2@example.com',
      name: 'Jane Smith',
      status: 'active',
      kyc: 'verified',
      balance: '12,890.00',
      joined: '2024-02-20',
    },
    {
      id: 3,
      email: 'user3@example.com',
      name: 'Bob Wilson',
      status: 'suspended',
      kyc: 'verified',
      balance: '850.25',
      joined: '2024-03-10',
    },
    {
      id: 4,
      email: 'user4@example.com',
      name: 'Alice Brown',
      status: 'active',
      kyc: 'pending',
      balance: '3,120.00',
      joined: '2024-04-05',
    },
    {
      id: 5,
      email: 'user5@example.com',
      name: 'Charlie Davis',
      status: 'active',
      kyc: 'rejected',
      balance: '0.00',
      joined: '2024-05-12',
    },
    {
      id: 6,
      email: 'user6@example.com',
      name: 'Eva Martinez',
      status: 'active',
      kyc: 'verified',
      balance: '25,400.75',
      joined: '2024-06-18',
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">Manage and monitor all platform users</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl hover:shadow-lg hover:shadow-[#50D2C1]/10 transition-all">
            <p className="text-sm text-gray-400 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-white">12,543</p>
          </Card>
          <Card className="p-6 bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl hover:shadow-lg hover:shadow-[#50D2C1]/10 transition-all">
            <p className="text-sm text-gray-400 mb-1">Active Users</p>
            <p className="text-3xl font-bold text-green-500">11,892</p>
          </Card>
          <Card className="p-6 bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl hover:shadow-lg hover:shadow-[#50D2C1]/10 transition-all">
            <p className="text-sm text-gray-400 mb-1">Suspended</p>
            <p className="text-3xl font-bold text-red-500">651</p>
          </Card>
          <Card className="p-6 bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl hover:shadow-lg hover:shadow-[#50D2C1]/10 transition-all">
            <p className="text-sm text-gray-400 mb-1">New (7 days)</p>
            <p className="text-3xl font-bold text-[#50D2C1]">234</p>
          </Card>
        </div>

        {/* Users Table Section */}
        <Card className="p-6 bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#242424] border border-[#2a2a2a] text-white placeholder-gray-400 rounded-lg px-4 py-2 w-full"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-[#2a2a2a] rounded-lg bg-[#242424] text-white focus:outline-none focus:ring-1 focus:ring-[#50D2C1]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
              <Button className="bg-[#50D2C1] hover:bg-[#50D2C1] text-black font-semibold px-4 py-2 rounded-lg">
                Export CSV
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#2a2a2a]">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">User</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">KYC</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Balance (USDT)
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Joined
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#2a2a2a] hover:bg-[#242424] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-900/20 text-green-400'
                            : 'bg-red-900/20 text-red-400'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.kyc === 'verified'
                            ? 'bg-green-900/20 text-green-400'
                            : user.kyc === 'pending'
                            ? 'bg-yellow-900/20 text-[#50D2C1]'
                            : 'bg-red-900/20 text-red-400'
                        }`}
                      >
                        {user.kyc}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-[#50D2C1]">
                      ${user.balance}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400">{user.joined}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="text-[#50D2C1] hover:text-[#50D2C1] text-sm font-medium">
                          View
                        </button>
                        <button className="text-gray-400 hover:text-gray-300 text-sm font-medium">
                          Edit
                        </button>
                        {user.status === 'active' ? (
                          <button className="text-red-500 hover:text-red-400 text-sm font-medium">
                            Suspend
                          </button>
                        ) : (
                          <button className="text-green-500 hover:text-green-400 text-sm font-medium">
                            Activate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-400">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-[#2a2a2a] rounded hover:bg-[#242424] text-sm text-gray-300">
                Previous
              </button>
              <button className="px-3 py-1 bg-[#50D2C1] text-black rounded text-sm font-medium">
                1
              </button>
              <button className="px-3 py-1 border border-[#2a2a2a] rounded hover:bg-[#242424] text-sm text-gray-300">
                2
              </button>
              <button className="px-3 py-1 border border-[#2a2a2a] rounded hover:bg-[#242424] text-sm text-gray-300">
                3
              </button>
              <button className="px-3 py-1 border border-[#2a2a2a] rounded hover:bg-[#242424] text-sm text-gray-300">
                Next
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
