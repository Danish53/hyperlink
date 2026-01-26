'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNav } from '@/components/AdminNav';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

export default function AdminKYCPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [selectedKYC, setSelectedKYC] = useState<{
    id: number;
    user: string;
    name: string;
    country: string;
    docType: string;
    submitted: string;
    status: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      router.push('/admin/login');
    }
  }, [router]);

  const kycApplications = [
    {
      id: 1,
      user: 'user4@example.com',
      name: 'Alice Brown',
      country: 'United States',
      docType: 'Passport',
      submitted: '2024-10-15',
      status: 'pending',
    },
    {
      id: 2,
      user: 'user7@example.com',
      name: 'David Lee',
      country: 'Canada',
      docType: 'Driver License',
      submitted: '2024-10-14',
      status: 'pending',
    },
    {
      id: 3,
      user: 'user8@example.com',
      name: 'Emma Wilson',
      country: 'United Kingdom',
      docType: 'Passport',
      submitted: '2024-10-13',
      status: 'pending',
    },
    {
      id: 4,
      user: 'user9@example.com',
      name: 'Frank Chen',
      country: 'Singapore',
      docType: 'National ID',
      submitted: '2024-10-12',
      status: 'under_review',
    },
    {
      id: 5,
      user: 'user10@example.com',
      name: 'Grace Park',
      country: 'South Korea',
      docType: 'Passport',
      submitted: '2024-10-11',
      status: 'under_review',
    },
    {
      id: 6,
      user: 'user5@example.com',
      name: 'Charlie Davis',
      country: 'Australia',
      docType: 'Driver License',
      submitted: '2024-10-10',
      status: 'rejected',
    },
  ];

  const filteredApplications = kycApplications.filter((app) => {
    const matchesSearch =
      app.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (kyc: {
    id: number;
    user: string;
    name: string;
    country: string;
    docType: string;
    submitted: string;
    status: string;
  }) => {
    setSelectedKYC(kyc);
    setShowModal(true);
  };

  const handleApprove = (id: number) => {
    alert(`KYC application #${id} approved`);
    setShowModal(false);
  };

  const handleReject = (id: number) => {
    alert(`KYC application #${id} rejected`);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-gray-200">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">KYC Management</h1>
          <p className="text-gray-400 mt-1">Review and approve user verification documents</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-[#242424] border border-[#2a2a2a] rounded-2xl">
            <p className="text-sm text-gray-400 mb-1">Pending</p>
            <p className="text-3xl font-bold text-[#50D2C1]">89</p>
          </Card>
          <Card className="p-6 bg-[#242424] border border-[#2a2a2a] rounded-2xl">
            <p className="text-sm text-gray-400 mb-1">Under Review</p>
            <p className="text-3xl font-bold text-blue-400">45</p>
          </Card>
          <Card className="p-6 bg-[#242424] border border-[#2a2a2a] rounded-2xl">
            <p className="text-sm text-gray-400 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-400">9,834</p>
          </Card>
          <Card className="p-6 bg-[#242424] border border-[#2a2a2a] rounded-2xl">
            <p className="text-sm text-gray-400 mb-1">Rejected</p>
            <p className="text-3xl font-bold text-red-400">234</p>
          </Card>
        </div>

        {/* Table Section */}
        <Card className="p-6 bg-[#242424] border border-[#2a2a2a] rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search by user or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#1f1f1f] border border-[#2a2a2a] text-gray-200 placeholder-gray-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-[#2a2a2a] rounded-lg bg-[#1f1f1f] text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#2a2a2a]">
                <tr>
                  {['User', 'Country', 'Document Type', 'Submitted', 'Status', 'Actions'].map(
                    (title) => (
                      <th
                        key={title}
                        className="text-left py-3 px-4 text-sm font-semibold text-gray-400"
                      >
                        {title}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-[#2a2a2a] hover:bg-[#1f1f1f]/70 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-white">{app.name}</p>
                        <p className="text-sm text-gray-400">{app.user}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-300">{app.country}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">{app.docType}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{app.submitted}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          app.status === 'pending'
                            ? 'bg-yellow-900/30 text-[#50D2C1]'
                            : app.status === 'under_review'
                            ? 'bg-blue-900/30 text-blue-400'
                            : 'bg-red-900/30 text-red-400'
                        }`}
                      >
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        onClick={() => handleViewDetails(app)}
                        className="text-sm bg-blue-600 hover:bg-blue-700"
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-400">
              Showing {filteredApplications.length} applications
            </p>
          </div>
        </Card>
      </div>

      {/* Modal */}
      {showModal && selectedKYC && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="KYC Application Review"
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">User Information</h3>
              <div className="bg-[#1f1f1f] border border-[#2a2a2a] p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Name:</span>
                  <span className="font-medium text-white">{selectedKYC.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Email:</span>
                  <span className="font-medium text-white">{selectedKYC.user}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Country:</span>
                  <span className="font-medium text-white">{selectedKYC.country}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Document Type:</span>
                  <span className="font-medium text-white">{selectedKYC.docType}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Submitted Documents</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f1f1f] border border-[#2a2a2a] h-40 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Document Front</span>
                </div>
                <div className="bg-[#1f1f1f] border border-[#2a2a2a] h-40 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Document Back</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                onClick={() => handleReject(selectedKYC.id)}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Reject
              </Button>
              <Button
                onClick={() => handleApprove(selectedKYC.id)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Approve
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
