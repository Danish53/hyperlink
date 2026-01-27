"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

type SubTab = "All" | "xyz" | "flx" | "vntl" | "hyna" | "km" | "cash";

interface MarketRow {
  symbol: string;
  leverage: string;
  tag: SubTab;
  lastPrice: string;
  change: string;
  changePct: string;
  isUp: boolean;
  funding: string;
  volume: string;
  openInterest: string;
  highlight?: boolean;
}

const MARKETS: MarketRow[] = [
  {
    symbol: "SILVER-USDC",
    leverage: "20x",
    tag: "xyz",
    lastPrice: "111.96",
    change: "+2.00",
    changePct: "+1.82%",
    isUp: true,
    funding: "0.0032%",
    volume: "$1,225,039,553",
    openInterest: "$166,066,143",
    highlight: true,
  },
  {
    symbol: "XYZ100-USDC",
    leverage: "25x",
    tag: "xyz",
    lastPrice: "25,869",
    change: "+313",
    changePct: "+1.22%",
    isUp: true,
    funding: "0.0050%",
    volume: "$167,121,987",
    openInterest: "$168,009,178",
  },
  // باقی rows چاہو تو یہاں add کر لو
];

const mainTabs = [
  "All",
  "Perps",
  "Spot",
  "Crypto",
  "Tradfi",
  "HIP-3",
  "Trending",
  "Pre-launch",
] as const;

type MainTab = (typeof mainTabs)[number];

const subTabs: SubTab[] = ["All", "xyz", "flx", "vntl", "hyna", "km", "cash"];

interface MarketsModalProps {
  open: boolean;
  onClose: () => void;
}

const MarketsModal: React.FC<MarketsModalProps> = ({ open, onClose }) => {
  const [mainTab, setMainTab] = useState<MainTab>("HIP-3");
  const [subTab, setSubTab] = useState<SubTab>("All");
  const [search, setSearch] = useState("");

  if (!open) return null;

  const filteredMarkets = MARKETS.filter((m) => {
    const matchesSub = subTab === "All" ? true : m.tag === subTab;
    const matchesSearch = m.symbol
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSub && matchesSearch;
  });

  // یہ اندر کا پورا UI ہے (search, tabs, table, bottom bar)
  const panel = (
    <div className="flex flex-col bg-[#050B11] text-white">
      {/* Search + Strict/All + Close */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#111827]">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#020915] border border-[#1f2933] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-teal-400"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button className="px-4 py-1.5 rounded bg-teal-400 text-black text-xs font-semibold">
            Strict
          </button>
          <button className="px-4 py-1.5 rounded bg-[#020915] border border-[#1f2933] text-xs text-[#cbd5f5]">
            All
          </button>
        </div>

        <button
          onClick={onClose}
          className="ml-auto sm:ml-0 p-1 rounded hover:bg-[#111827]"
        >
          <X className="h-4 w-4 text-[#9ca3af]" />
        </button>
      </div>

      {/* Main tabs */}
      <div className="flex items-center gap-4 px-4 pt-2 text-[12px] text-[#9ca3af] border-b border-[#111827] overflow-x-auto">
        {mainTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={`pb-2 border-b-2 whitespace-nowrap ${
              mainTab === tab
                ? "border-teal-400 text-teal-300"
                : "border-transparent hover:text-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sub tabs */}
      <div className="flex items-center gap-4 px-4 py-2 text-[11px] text-[#9ca3af] border-b border-[#111827] overflow-x-auto">
        {subTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`pb-1 border-b-2 uppercase whitespace-nowrap ${
              subTab === tab
                ? "border-teal-400 text-teal-300"
                : "border-transparent hover:text-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="min-w-full text-xs">
          <thead className="bg-[#050B11] sticky top-0 z-10 border-b border-[#111827]">
            <tr className="text-[#9ca3af] text-[11px]">
              <th className="px-4 py-2 text-left font-normal">Symbol</th>
              <th className="px-2 py-2 text-right font-normal">Last Price</th>
              <th className="px-2 py-2 text-right font-normal">24H Change</th>
              <th className="px-2 py-2 text-right font-normal">8H Funding</th>
              <th className="px-2 py-2 text-right font-normal">Volume</th>
              <th className="px-4 py-2 text-right font-normal">
                Open Interest
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMarkets.map((row, idx) => (
              <tr
                key={row.symbol + idx}
                className={`border-b border-[#111827] hover:bg-[#07121b] ${
                  row.highlight ? "bg-[#0b1625]" : ""
                }`}
              >
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-[13px]">{row.symbol}</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#0b2730] text-teal-300 text-[11px]">
                      {row.leverage}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#0b2730] text-teal-300 text-[11px] uppercase">
                      {row.tag}
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2 text-right text-[13px]">
                  {row.lastPrice}
                </td>
                <td
                  className={`px-2 py-2 text-right text-[13px] ${
                    row.isUp ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {row.change}{" "}
                  <span className="text-[11px]">{row.changePct}</span>
                </td>
                <td className="px-2 py-2 text-right text-[13px] text-[#9ca3af]">
                  {row.funding}
                </td>
                <td className="px-2 py-2 text-right text-[13px] text-[#cbd5f5]">
                  {row.volume}
                </td>
                <td className="px-4 py-2 text-right text-[13px] text-[#cbd5f5] whitespace-nowrap">
                  {row.openInterest}
                </td>
              </tr>
            ))}

            {filteredMarkets.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-[#6b7280]"
                >
                  No markets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom hotkey bar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2 border-t border-[#111827] bg-[#020915] text-[11px] text-[#9ca3af]">
        <span>
          <span className="px-1.5 py-0.5 rounded bg-[#111827] mr-1">⌘K</span>
          Open
        </span>
        <span>
          <span className="px-1.5 py-0.5 rounded bg-[#111827] mr-1">→</span>
          Navigate
        </span>
        <span>
          <span className="px-1.5 py-0.5 rounded bg-[#111827] mr-1">
            Enter
          </span>
          Select
        </span>
        <span>
          <span className="px-1.5 py-0.5 rounded bg-[#111827] mr-1">★</span>
          Favorite
        </span>
        <span className="ml-auto">
          <span className="px-1.5 py-0.5 rounded bg-[#111827] mr-1">Esc</span>
          Close
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: پورا اسکرین */}
      <div
        className="fixed inset-0 z-40 flex flex-col bg-black/60 md:hidden"
        onClick={onClose}
      >
        <div
          className="flex-1"
          onClick={(e) => e.stopPropagation()} // اندر click پر close نہ ہو
        >
          {panel}
        </div>
      </div>

      {/* Desktop: dropdown, button کے نیچے (parent کو relative بنانا ضروری) */}
      <div className="absolute left-0 top-full mt-2 z-40 hidden md:block">
        <div className="w-[960px] h-[560px] rounded-xl border border-[#111827] shadow-xl overflow-hidden">
          {panel}
        </div>
      </div>
    </>
  );
};

export default MarketsModal;