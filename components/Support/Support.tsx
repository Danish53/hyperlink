import React from 'react';
import Header from '../shared/header';
import Footer from '../shared/footer';
import Link from 'next/link';
const Support = ({ session }: { session: any }) => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
      <Header session={session} />

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8 pt-22">
        {/* LEFT SECTION - NEW REQUEST */}
        <div className="flex-1 bg-[#1f1f1f] rounded-lg p-6 shadow-lg border border-[#2a2a2a]">
          <h2 className="text-3xl font-bold text-[#50D2C1] mb-4">New Request</h2>
          <p className="text-gray-300 mb-2">Choose the theme of the request</p>

          <div className="flex flex-col gap-4">
            <select className="bg-[#242424] text-white border border-gray-700 rounded-md p-3 outline-none focus:border-[#50D2C1]">
              <option>Withdrawal</option>
              <option>Deposit</option>
              <option>Trade</option>
              <option>Referral program</option>
              <option>General</option>
            </select>

            <input
              type="text"
              placeholder="TxId"
              className="bg-[#242424] text-white border border-gray-700 rounded-md p-3 outline-none focus:border-[#50D2C1]"
            />

            <textarea
              placeholder="Write your request"
              rows={5}
              className="bg-[#242424] text-white border border-gray-700 rounded-md p-3 outline-none focus:border-[#50D2C1] resize-none"
            />

            <button className="bg-[#50D2C1] hover:bg-[#50D2C1] text-black font-semibold py-2 rounded-md transition-all">
              Submit
            </button>

            <div className="text-sm text-gray-300 mt-4 space-y-2">
              <p>
                ⚠️ If we have a large volume of support requests or if we need confirmation
                regarding your issue, the response time may be delayed.
              </p>
              <p>
                📧 You can also send us a request by{' '}
                <Link href="mailto:support@fybit.com" className="text-[#50D2C1] underline">
                  email
                </Link>
                , in addition, you can attach a file to the letter.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-[45%] flex flex-col gap-8">
          {/* LATEST REQUESTS */}
          <div className="bg-[#1f1f1f] rounded-lg p-6 shadow-lg border border-[#2a2a2a]">
            <h2 className="text-3xl font-bold text-[#50D2C1] mb-4">Latest Requests</h2>
            <table className="w-full border border-gray-700 text-left text-sm">
              <thead>
                <tr className="bg-[#242424] text-gray-300">
                  <th className="p-3 border-b border-gray-700">Ticket</th>
                  <th className="p-3 border-b border-gray-700">Date (UTC)</th>
                  <th className="p-3 border-b border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3} className="p-3 text-center text-gray-400">
                    No requests found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* LATEST NOTICE */}
          <div className="bg-[#1f1f1f] rounded-lg p-6 shadow-lg border border-[#2a2a2a]">
            <h2 className="text-3xl font-bold text-[#50D2C1] mb-4">Latest Notice</h2>
            <table className="w-full border border-gray-700 text-left text-sm">
              <thead>
                <tr className="bg-[#242424] text-gray-300">
                  <th className="p-3 border-b border-gray-700">Ticket</th>
                  <th className="p-3 border-b border-gray-700">Date (UTC)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2} className="p-3 text-center text-gray-400">
                    No notices found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
