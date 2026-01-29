"use client";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";
import React from "react";
import { ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react";

const LeaderboardPage = () => {
  const traders = [
    { rank: 1, address: "0x393d...2109", value: "$520,536,104.95", pnl: "+$28,644,266.40", roi: "5.82%", volume: "$0.00" },
    { rank: 2, address: "0x488d...fe08", value: "$69,116,301.71", pnl: "+$4,148,334.16", roi: "6.39%", volume: "$0.00" },
    { rank: 3, address: "0xe44b...9ea8", value: "$61,649,060.18", pnl: "+$2,992,992.52", roi: "5.10%", volume: "$0.00" },
  ];

  return (
    <>
    <Header session={null} />
    <div className="min-h-screen bg-[#01221b] text-[#9ba3af] font-sans p-6 md:p-12 mt-8">
      

      <div className="max-w-[1320px] mx-auto space-y-2 mt-6">

        {/* Title */}
        <h1 className="text-[32px] font-[400] text-white mb-2">
          Leaderboard
        </h1>

        {/* Search / Filter */}
        <div className="bg-[#050f12] border border-[#050f12] rounded-t-xl p-4 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7aa6a0]" size={15} />
            <input
              placeholder="Search by wallet address..."
              className="w-full bg-[#061612] border border-[#1d2d29] rounded-md py-2 pl-10 pr-4 text-[13px] text-white placeholder-[#7aa6a0] focus:outline-none"
            />
          </div>

          <button className="flex items-center gap-2 bg-[#061612] border border-[#1d2d29] px-4 py-2 rounded-md text-[13px] text-white">
            24H <ChevronDown size={14} className="text-[#7aa6a0]" />
          </button>
        </div>

        {/* Table */}
        <div className="bg-[#050f12] border border-[#050f12] border-t-0 rounded-b-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="text-[11px] text-[#7aa6a0] uppercase border-b border-[#1d2d29]">
                  <th className="px-6 py-3 text-left">Rank</th>
                  <th className="px-6 py-3 text-left">Trader</th>
                  <th className="px-6 py-3 text-left">Account Value</th>
                  <th className="px-6 py-3 flex items-center gap-1">
                    PNL (24H) <ChevronDown size={12} />
                  </th>
                  <th className="px-6 py-3">ROI (24H)</th>
                  <th className="px-6 py-3">Volume (24H)</th>
                </tr>
              </thead>

              <tbody>
                {traders.map((t) => (
                  <tr
                    key={t.rank}
                    className="border-b border-[#1d2d29] hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-3 text-white font-semibold text-[13px]">
                      {t.rank}
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#9ba3af] hover:text-[#6efedb] cursor-pointer">
                      {t.address}
                    </td>
                    <td className="px-6 py-3 text-white font-semibold text-[13px]">
                      {t.value}
                    </td>
                    <td className="px-6 py-3 text-[#6efedb] font-semibold text-[13px]">
                      {t.pnl}
                    </td>
                    <td className="px-6 py-3 text-[#6efedb]/80 font-semibold text-[13px]">
                      {t.roi}
                    </td>
                    <td className="px-6 py-3 text-white font-semibold text-[13px]">
                      {t.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#1d2d29] flex flex-col md:flex-row justify-between gap-4 text-[11px] text-[#7aa6a0]">
            <p className="max-w-[800px]">
              Excludes accounts with less than 100k USDC account value and less than
              10M USDC trading volume.
            </p>

            <div className="flex items-center gap-5">
              <span>Rows per page: 10</span>
              <span>1–10 of 29051</span>
              <ChevronLeft size={16} className="opacity-40" />
              <ChevronRight size={16} className="cursor-pointer hover:text-[#6efedb]" />
            </div>
          </div>
        </div>
      </div>

      
    </div> 
    </>
  );
};

export default LeaderboardPage;
