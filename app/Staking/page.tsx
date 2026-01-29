"use client";
import React from "react";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";

export default function PortfolioPage() {
   const session = null;
  return (
      <>
          <Header session={session} />
    <div className="min-h-screen bg-[#01221b] text-[#9ba3af] p-6 font-sans">
      <div className="max-w-[1320px] mx-auto space-y-2 mt-10">

        {/* TOP HEADER */}
        <div className="flex justify-between items-center pt-6">
          <h1 className="text-2xl font-semibold text-white">
            Staking
          </h1>
          <button className="bg-[#6efedb] text-[#061612] text-sm px-4 py-2 rounded-md font-bold">
            Connect
          </button>
        </div>

        <p className="text-sm max-w-3xl">
          The Hyperliquid L1 is a proof-of-stake blockchain where stakers delegate the native token HYPE
          to validators to earn staking rewards.
        </p>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{gap: "10px", marginTop: "30px"}}>
          <div className="bg-[#050f12] border border-[#050f12] rounded-xl p-6">
            <p className="text-sm text-[#6b7280]">Total Staked</p>
            <p className="text-2xl font-semibold text-white mt-2">
              435,624,096
            </p>
          </div>

          <div className="bg-[#050f12] border border-[#050f12] rounded-xl p-6 md:col-span-2">
            <p className="text-sm text-[#6b7280] mb-4">Staking Balance</p>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-[#6b7280]">Available to Transfer</span>
              <span className="text-right">$0.000000 HYPE</span>

              <span className="text-[#6b7280]">Available to Stake</span>
              <span className="text-right">$0.000000 HYPE</span>

              <span className="text-[#6b7280]">Total Staked</span>
              <span className="text-right">$0.000000 HYPE</span>

              <span className="text-[#6b7280]">Pending Transfers</span>
              <span className="text-right">$0.000000 HYPE</span>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#050f12] border border-[#050f12] rounded-xl p-6 overflow-x-auto">
          <div className="flex gap-6 text-sm border-b border-[#1d2d29] pb-3 mb-4">
            <button className="text-[#6efedb] font-bold">
              Validator Performance
            </button>
            <button className="text-[#9ba3af]">
              Staking Reward History
            </button>
            <button className="text-[#9ba3af]">
              Staking Action History
            </button>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#6b7280] border-b border-[#1d2d29]">
                <th className="text-left py-3">Name</th>
                <th>Description</th>
                <th>Stake</th>
                <th>Your Stake</th>
                <th>Uptime</th>
                <th>Est. APR</th>
                <th>Status</th>
                <th>Commission</th>
              </tr>
            </thead>

            <tbody>
              {[
                "Hyper Foundation",
                "Hyper Node",
                "Validator X",
                "Hyper Labs",
                "Hyper Pro",
              ].map((name, i) => (
                <tr
                  key={i}
                  className="border-b border-[#1d2d29] hover:bg-white/5"
                >
                  <td className="py-3 font-semibold text-white">{name}</td>
                  <td className="text-center text-[#9ba3af]">
                    Trusted infrastructure
                  </td>
                  <td className="text-center">$5,248,000</td>
                  <td className="text-center">$0.00</td>
                  <td className="text-center text-[#22c55e]">
                    100.00%
                  </td>
                  <td className="text-center text-[#6efedb]">
                    2.18%
                  </td>
                  <td className="text-center text-[#22c55e]">
                    Active
                  </td>
                  <td className="text-center">$3.00%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 text-xs text-[#6b7280]">
            <span>1–5 of 30</span>
            <span className="cursor-pointer hover:text-[#6efedb]">
              View All
            </span>
          </div>
        </div>

      </div>
    </div> 
          </>
  );
}
