"use client";

import React, { useState } from "react";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";

import {
  ChevronDown,
  X,
  ArrowRightLeft,
  Link as LinkIcon,
  Send,
  Download,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";

/* ---------- Top Nav Button ---------- */
const NavButton = ({
  children,
  icon: Icon,
  filled = false,
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
  filled?: boolean;
}) => (
  <button
    type="button"
    className={`flex items-center gap-1.5 px-3 rounded-md text-[12px] font-[400] h-[40px]
      border border-[#1c3a34]
      ${
        filled
          ? "bg-[#2dd4bf] text-[#02201a]"
          : "bg-[rgba(2,46,37,0.8)] text-gray-100 hover:bg-[#05332a]"
      }`}
  >
    {Icon && <Icon size={12} />}
    <span className="whitespace-nowrap">{children}</span>
  </button>
);

const CryptoDashboard = () => {
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Balances");
  const [chartTab, setChartTab] = useState<"Account" | "PNL">("PNL");

  const data = [
    { name: "1", val: 0 },
    { name: "2", val: 0 },
    { name: "3", val: 0 },
    { name: "4", val: 0 },
    { name: "5", val: 0 },
  ];

  const session = null; // yahan apna real session pass kar sakte ho

  return (
    <>
      <Header session={session} />

      {/* PAGE BACKGROUND – dark green + radial pattern jaisa screenshot */}
      <div className="min-h-screen bg-[#01221b] bg-[radial-gradient(circle_at_top_right,#064e3b44,transparent_65%)] text-gray-200 font-sans pt-16 pb-8">
        <div className="max-w-[1312px] mx-auto px-4 sm:px-4">
          {/* ===== TOP TITLE + ACTION BUTTONS ===== */}
          <div className="flex flex-col lg:flex-row justify-between gap-4 mt-6">
            <h1 className="text-[34px] font-[400] text-white">Portfolio</h1>

            <div className="flex flex-wrap gap-2">
              <NavButton icon={LinkIcon}>Link Staking</NavButton>
              <NavButton>Swap Stablecoins</NavButton>
              <NavButton icon={ArrowRightLeft}>Perps ↔ Spot</NavButton>
              <NavButton>EVM ↔ Core</NavButton>
              <NavButton>Portfolio Margin</NavButton>
              <NavButton icon={Send}>Send</NavButton>
              <NavButton icon={Download}>Withdraw</NavButton>
              <NavButton filled>Deposit</NavButton>
            </div>
          </div>

          {/* ===== TOP STATS + CHART ROW ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mb-6" style={{gap: "10px", marginTop: "30px"}}>
            {/* LEFT COLUMN : 14D Volume + Fees  ------------------- */}
            <div className="lg:col-span-1 space-y-2">
              {/* 14 Day Volume card */}
              <div className="bg-[#050f12] border border-[#050f12] shadow-md p-5 rounded-xl">
                <p className="text-[11px] text-gray-400 uppercase mb-2 tracking-wide">
                  14 Day Volume
                </p>
                <h2 className="text-3xl text-white">$0</h2>
                <button className="mt-3 text-[#2dd4bf] text-[11px] hover:underline">
                  View Volume
                </button>
              </div>

              {/* Fees card */}
              <div className="bg-[#050f12] border border-[#050f12] p-5 rounded-xl">
                <div className="flex justify-between items-center text-[11px] text-gray-400 mb-2">
                  <span>Fees (Taker / Maker)</span>
                  <button className="flex items-center gap-1 text-gray-200">
                    Perps <ChevronDown size={12} />
                  </button>
                </div>
                <h2 className="text-[22px] text-white">
                  0.0450% / 0.0150%
                </h2>
                <button
                  onClick={() => setShowFeeModal(true)}
                  className="text-[#2dd4bf] text-[11px] mt-3 hover:underline"
                >
                  View Fee Schedule
                </button>
              </div>
            </div>

            {/* MIDDLE COLUMN : Perps + Spot + Vaults stats ---------- */}
            <div className="lg:col-span-1 bg-[#050f12] border border-[#050f12] p-5 rounded-xl h-[280px]">
              <div className="flex justify-between items-center border-b border-[#15413a] pb-3 mb-4 text-[12px]">
                <button className="flex items-center gap-1 text-white">
                  Perps + Spot + Vaults <ChevronDown size={12} />
                </button>
                <button className="flex items-center gap-1 text-gray-400">
                  30D <ChevronDown size={12} />
                </button>
              </div>

              <div className="space-y-2 text-[11px]">
                {[
                  ["PNL", "$0.00"],
                  ["Volume", "$0.00"],
                  ["Max Drawdown", "0.00%"],
                  ["Total Equity", "$0.00"],
                  ["Perps Account Equity", "$0.00"],
                  ["Spot Account Equity", "$0.00"],
                  ["Earn Balance", "$0.00"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN : CHART --------------------------------- */}
            <div className="lg:col-span-2 bg-[#050f12] border border-[#050f12] p-5 rounded-xl  h-[280px]">
              <div className="flex gap-6 border-b border-[#15413a] mb-4 text-[12px]">
                {["Account", "PNL"].map((t) => {
                  const key = t as "Account" | "PNL";
                  const selected = chartTab === key;
                  return (
                    <button
                      key={t}
                      onClick={() => setChartTab(key)}
                      className={`pb-2 ${
                        selected
                          ? "border-b-2 border-[#2dd4bf] text-white"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      {key === "Account" ? "Account Value" : "PNL"}
                    </button>
                  );
                })}
              </div>

              <div className="h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <Line
                      type="monotone"
                      dataKey="val"
                      stroke="#2dd4bf"
                      strokeWidth={2}
                      dot={false}
                    />
                    <XAxis hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#050f12",
                        border: "1px solid #134e4a",
                        borderRadius: "6px",
                        fontSize: 11,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ===== TABLE (Balances / Positions / ... ) ===== */}
          <div className="bg-[#050f12] border border-[#050f12] rounded-xl overflow-hidden">
            {/* Tabs + Filter row */}
            <div className="flex flex-col lg:flex-row justify-between px-6 bg-[#050f12] border-b border-[#134e4a]">
              {/* Tabs left */}
              <div className="flex gap-6 overflow-x-auto text-[12px]">
                {[
                  "Balances",
                  "Positions",
                  "Open Orders",
                  "TWAP",
                  "Trade History",
                  "Funding History",
                  "Order History",
                  "Interest",
                  "Deposits and Withdrawals",
                ].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`py-4 whitespace-nowrap border-b-2 ${
                      activeTab === t
                        ? "text-white border-[#2dd4bf]"
                        : "text-gray-400 border-transparent hover:text-gray-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Right: Filter + Hide Small Balances */}
              <div className="flex items-center gap-4 py-3 text-[11px] text-gray-300">
                <button className="inline-flex items-center gap-1 hover:text-white">
                  Filter <ChevronDown size={12} />
                </button>

                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-[#22c55e] bg-[#011d16]">
                    <span className="h-2.5 w-2.5 rounded-[3px] bg-[#22c55e]" />
                  </span>
                  <span>Hide Small Balances</span>
                </label>
              </div>
            </div>

            {/* Column headers */}
            <div className="hidden md:grid grid-cols-6 px-6 py-4 text-[11px] text-gray-400 border-b border-[#134e4a]">
              <span>Coin</span>
              <span>Total Balance</span>
              <span>Available Balance</span>
              <span className="flex items-center gap-1">
                USDC Value
                <ChevronDown size={10} className="opacity-70" />
              </span>
              <span className="underline underline-offset-4 decoration-dotted">
                PNL (ROE %)
              </span>
              <span className="text-right">Contract</span>
            </div>

            {/* Empty state row */}
            <div className="py-16 text-center text-gray-500 text-sm">
              No {activeTab.toLowerCase()} yet
            </div>
          </div>

          {/* ===== BOTTOM STATUS BAR (Online + Docs / Support / Terms / Privacy) ===== */}
          <div className="mt-8 pb-4 flex items-center justify-between text-[11px] text-gray-300">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22c55e] bg-[#050f12]">
              <span className="h-2 w-2 rounded-full bg-[#050f12]" />
              <span>Online</span>
            </div>

            <div className="flex gap-6">
              <button className="hover:text-white">Docs</button>
              <button className="hover:text-white">Support</button>
              <button className="hover:text-white">Terms</button>
              <button className="hover:text-white">Privacy Policy</button>
            </div>
          </div>

          {/* Agar tum apna global footer rakhna chahte ho to yahan use karo */}
          {/* <div className="mt-6">
            <Footer />
          </div> */}
        </div>
      </div>

      {/* ===== FEE MODAL (CENTER POPUP) ===== */}
      {showFeeModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
          <div className="bg-[#071f1c] border border-[#134e4a] rounded-xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowFeeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
            <h2 className="text-xl text-white mb-6 text-center">
              Fee Schedule
            </h2>
            <p className="text-gray-400 text-sm text-center">
              Your fee tier is calculated based on your 14D volume.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CryptoDashboard;