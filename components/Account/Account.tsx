'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../shared/footer';
import Header from '../shared/header';

const Account = ({ session }: { session: any }) => {
  const [fullName, setFullName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Just a frontend-only flow: simulate a success message
    setSuccessMessage('✅ Info changed successfully.');
    // Clear inputs after a short delay
    setTimeout(() => {
      setFullName('');
      setOldPassword('');
      setNewPassword('');
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div>
      <Header session={session} />

      <main className="deposit-container flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="sidebar w-full md:w-1/4 p-6 border-r border-gray-700">
          <h3 className="text-xl font-semibold mb-3">Available Balance</h3>
          <p>BTC: 0</p>
          <p>ETH: 0</p>
          <p>USDT: 0</p>

          <div className="border border-gray-500 my-4" />
          <h3 className="text-xl font-semibold mb-2">Account & Preferences</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/Account">
                <span className="text-gray-200 font-normal hover:text-[#50D2C1]">Account</span>
              </Link>
            </li>
            <li>
              <Link href="/Account/Preferences">
                <span className="text-gray-200 font-normal hover:text-[#50D2C1]">Preferences</span>
              </Link>
            </li>
            <li>
              <Link href="/Account/Google2Fa">
                <span className="text-gray-200 font-normal hover:text-[#50D2C1]">
                  Account Security
                </span>
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main content */}
        <div className="faq-content flex-1 px-6 py-10 text-white">
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-[#1c1c1c] p-8 rounded-2xl border border-gray-700 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#50D2C1]">Change Account Details</h2>

            <div className="mb-4">
              <label htmlFor="fullname" className="block text-sm font-medium mb-2 text-gray-300">
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                name="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#50D2C1]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={session?.user?.email || 'user@example.com'}
                disabled
                className="w-full bg-gray-800 text-gray-400 border border-gray-600 rounded-lg px-4 py-2 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="oldpassword" className="block text-sm font-medium mb-2 text-gray-300">
                Old Password
              </label>
              <input
                id="oldpassword"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#50D2C1]"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="newpassword" className="block text-sm font-medium mb-2 text-gray-300">
                New Password
              </label>
              <input
                id="newpassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#50D2C1]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#50D2C1] hover:bg-yellow-600 text-white font-medium rounded-lg py-2 transition"
            >
              Change
            </button>

            {successMessage && (
              <p className="text-green-400 text-sm text-center mt-4">{successMessage}</p>
            )}

            <p className="text-gray-400 text-xs mt-6 leading-relaxed">
              You cannot change the email address because it is the login name of your account.
              <br />
              To use a new email, please register a new account.
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
