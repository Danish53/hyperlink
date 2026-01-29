"use client";  
import Header from "../../components/shared/header"; 
import React, { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const vaultsData = {
  protocolVaults: [
    {
      vault: "Hyperliquidity Provider (HLP)",
      leader: "0x677d...84e7",
      apr: "5.04%",
      tvl: "$267,127,336.77",
      deposit: "$0.00",
      age: 995,
      isGreen: true,
      chartPath: "M0,20 Q25,5 50,20 T100,20",
      chartColor: "stroke-pink-500",
    },
    {
      vault: "Liquidator",
      leader: "0xfc13...80c9",
      apr: "-0.00%",
      tvl: "$15,973.94",
      deposit: "$0.00",
      age: 1062,
      isGreen: false,
      chartPath: "M0,20 L100,20",
      chartColor: "stroke-cyan-400",
    },
  ],
  userVaults: [
    {
      vault: "Growi HF",
      leader: "0x7789...f60d",
      apr: "47.67%",
      tvl: "$7,460,321.74",
      deposit: "$0.00",
      age: 565,
      isGreen: true,
      chartPath: "M0,20 Q25,5 50,20 T100,20",
      chartColor: "stroke-pink-500",
    },
    {
      vault: "Ultron",
      leader: "0x8d3f...c056",
      apr: "43.64%",
      tvl: "$5,225,126.78",
      deposit: "$0.00",
      age: 52,
      isGreen: true,
      chartPath: "M0,20 Q25,5 50,20 T100,20",
      chartColor: "stroke-pink-500",
    },
    {
      vault: "Orbit Value Strategies",
      leader: "0xf292...9edf",
      apr: "-3.66%",
      tvl: "$3,093,888.29",
      deposit: "$0.00",
      age: 40,
      isGreen: false,
      chartPath: "M0,20 L50,10 L100,20",
      chartColor: "stroke-cyan-400",
    },
    {
      vault: "Bitcoin Moving Average Long/Short",
      leader: "0x1fa1...1d08",
      apr: "-10.90%",
      tvl: "$3,027,958.61",
      deposit: "$0.00",
      age: 114,
      isGreen: false,
      chartPath: "M0,20 L50,10 L100,20",
      chartColor: "stroke-cyan-400",
    },
    {
      vault: "[ Systemic Strategies ] ∞ HyperGrowth ∞",
      leader: "0x2b80...6f4b",
      apr: "4.63%",
      tvl: "$2,939,405.91",
      deposit: "$0.00",
      age: 147,
      isGreen: true,
      chartPath: "M0,10 L25,15 L50,10 L75,20 L100,10",
      chartColor: "stroke-cyan-400",
    },
    {
      vault: "AceVault Hyper01",
      leader: "0x3675...49da",
      apr: "-3.94%",
      tvl: "$2,873,280.80",
      deposit: "$0.00",
      age: 159,
      isGreen: false,
      chartPath: "M0,10 L25,15 L50,10 L75,20 L100,10",
      chartColor: "stroke-cyan-400",
    },
    {
      vault: "[ Systemic Strategies ] L/S Grids",
      leader: "0x2b80...6f4b",
      apr: "-1.90%",
      tvl: "$2,819,414.12",
      deposit: "$0.00",
      age: 366,
      isGreen: false,
      chartPath: "M0,10 L25,15 L50,10 L75,20 L100,10",
      chartColor: "stroke-cyan-400",
    },
    {
      vault: "Sifu",
      leader: "0x5dd5...5d77",
      apr: "-2.58%",
      tvl: "$2,747,330.38",
      deposit: "$0.00",
      age: 770,
      isGreen: false,
      chartPath: "M0,20 Q25,5 50,20 T100,20",
      chartColor: "stroke-pink-500",
    },
    {
      vault: "FC Genesis - Quantum",
      leader: "0x3d32...cfec",
      apr: "-1.30%",
      tvl: "$2,692,775.34",
      deposit: "$0.00",
      age: 134,
      isGreen: false,
      chartPath: "M0,20 L100,20",
      chartColor: "stroke-cyan-400",
    },
    {
      vault: "MC Recovery Fund",
      leader: "0xe41b...5891",
      apr: "95.78%",
      tvl: "$2,185,172.22",
      deposit: "$0.00",
      age: 167,
      isGreen: true,
      chartPath: "M0,20 Q25,5 50,20 T100,20",
      chartColor: "stroke-pink-500",
    },
  ],
};

const VaultsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [filter, setFilter] = useState("Leading, Deposited, Others");
  const [time, setTime] = useState("24H");

  return (
    <>
      <Header session={null} />
      <div className=" bg-[#01221b] text-[#9ba3af] font-sans p-8 mt-8">
        <div className="max-w-[1320px] mx-auto">
          {/* Header & Connect Button */}
          <div className="flex justify-between items-end mt-6">
            <h1 className="text-[34px] font-[400] text-white">Vaults</h1>
            <button className="bg-[#6efedb] text-[#061612] px-5 rounded-md text-[12px] h-[40px]">
              Connect
            </button>
          </div>

          {/* TVL card */}
          <div className="bg-[#050f12] border border-[#050f12] shadow-lg p-5 rounded-lg w-[280px] mb-2 mt-4">
            <p className="text-[#6b7280] text-sm mb-2">Total Value Locked</p>
            <p className="text-white text-3xl font-semibold">$334,447,359</p>
          </div>

          {/* Search + Filters */}
          <div className="flex justify-between items-center bg-[#050f12] border border-[#050f12] rounded-lg p-6">
            {/* Search */}
            <div className="relative w-[360px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]" />
              <input
                placeholder="Search by vault address, name or leader..."
                className="w-full bg-[#061612] border border-[#1d2d29] rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-[#4b5563]"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-3 bg-[#061612] border border-[#1d2d29] px-4 py-2 rounded-lg text-sm text-white"
                >
                  {filter} <ChevronDown size={14} />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0c1c18] border border-[#1d2d29] rounded-md z-10">
                    {["Leading, Deposited, Others", "Leading", "Deposited", "Others"].map((f) => (
                      <div
                        key={f}
                        onClick={() => {
                          setFilter(f);
                          setFilterOpen(false);
                        }}
                        className="px-4 py-2 cursor-pointer hover:text-[#6efedb]"
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setTimeOpen(!timeOpen)}
                  className="flex items-center gap-3 bg-[#050f12] border border-[#050f12] px-4 py-2 rounded-lg text-sm text-white"
                >
                  {time} <ChevronDown size={14} />
                </button>
                {timeOpen && (
                  <div className="absolute right-0 mt-2 w-28 bg-[#050f12] border border-[#050f12] rounded-md z-10">
                    {["24H", "7D", "30D"].map((t) => (
                      <div
                        key={t}
                        onClick={() => {
                          setTime(t);
                          setTimeOpen(false);
                        }}
                        className="px-4 py-2 cursor-pointer hover:text-[#6efedb]"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#050f12] border border-[#050f12] rounded-lg overflow-hidden text-sm mt-1">
            <table className="w-full border-collapse min-w-[900px] bg-[#050f12]">
              <thead>
                <tr className="">
                  <th className="px-6 py-2 text-left font-semibold">Vault</th>
                  <th className="px-6 py-2 font-semibold">Leader</th>
                  <th className="px-6 py-2 font-semibold">APR</th>
                  <th className="px-6 py-2 font-semibold">TVL</th>
                  <th className="px-6 py-2 font-semibold">Your Deposit</th>
                  <th className="px-6 py-2 font-semibold text-right">Age (days)</th>
                  <th className="px-6 py-2 font-semibold text-right">Snapshot</th>
                </tr>
              </thead>
              <tbody>
                {/* Protocol Vaults Label */}
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-2 font-semibold text-white"
                  >
                    Protocol Vaults
                  </td>
                </tr>
                {/* Protocol Vaults Rows */}
                {vaultsData.protocolVaults.map((vault, idx) => (
                  <TableRow key={`prot-${idx}`} {...vault} />
                ))}

                {/* User Vaults Label */}
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-2 font-semibold text-white"
                  >
                    User Vaults
                  </td>
                </tr>
                {/* User Vaults Rows */}
                {vaultsData.userVaults.map((vault, idx) => (
                  <TableRow key={`user-${idx}`} {...vault} />
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-6 px-6 py-4 text-xs text-[#6b7280] border-t border-[#1d2d29]">
              <div>
                Rows per page:{" "}
                <select
                  className="bg-[#061612] border border-[#1d2d29] rounded px-2 py-1 text-xs text-white outline-none"
                  defaultValue="10"
                >
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>
              <div>1-10 of 3134</div>
              <ChevronLeft className="w-4 h-4 cursor-pointer" />
              <ChevronRight className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
        </div>
      </div> 
    </>
  );
};

const TableRow = ({
  vault,
  leader,
  apr,
  tvl,
  deposit,
  age,
  isGreen,
  chartPath,
  chartColor,
}: {
  vault: string;
  leader: string;
  apr: string;
  tvl: string;
  deposit: string;
  age: number;
  isGreen: boolean;
  chartPath: string;
  chartColor: string;
}) => {
  return (
    <tr className="hover:bg-white/[0.03] border-b border-[#1d2d29]">
      <td className="px-6 py-3 font-semibold text-white">{vault}</td>
      <td className="px-6 py-3 font-mono">{leader}</td>
      <td className={`px-6 py-3 font-semibold ${isGreen ? "text-[#22c55e]" : "text-red-500"}`}>{apr}</td>
      <td className="px-6 py-3 font-mono">{tvl}</td>
      <td className="px-6 py-3">$0.00</td>
      <td className="px-6 py-3 text-right font-mono">{age}</td>
      <td className="px-6 py-3 text-right">
        <svg
          viewBox="0 0 100 40"
          className={`w-16 h-6 fill-none ${chartColor} stroke-[3]`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={chartPath} />
        </svg>
      </td>
    </tr>
    
  );
};


export default VaultsPage;
