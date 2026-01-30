// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/* ============ Icons ============ */
const XIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const SearchIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <circle cx="11" cy="11" r="7" strokeWidth="2" />
    <path strokeWidth="2" strokeLinecap="round" d="M20 20l-3.5-3.5" />
  </svg>
);
const StarIcon = ({ filled, ...p }: { filled?: boolean } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "0" : "2"}
    />
  </svg>
);

/* ============ Data Types ============ */
type Market = {
  id: string;
  base: string;
  quote: string;
  tags: string[]; // e.g. ['xyz', '20x'] or ['SPOT']
  volume: string; // big
  openInterest?: string; // small below volume
  lastPrice: string;
  changePct: number; // negative for red
  type: "perp" | "spot" | "crypto" | "tradfi" | "hip3" | "all";
};

/* ============ Demo Markets (Screenshot-like) ============ */
const DEMO_MARKETS: Market[] = [
  { id: "btc", base: "BTC", quote: "USDC", tags: ["40x"], volume: "$6.40B", openInterest: "$1.98B", lastPrice: "82,681", changePct: -6.01, type: "perp" },
  { id: "eth", base: "ETH", quote: "USDC", tags: ["25x"], volume: "$3.04B", openInterest: "$2.40B", lastPrice: "2,738.4", changePct: -7.05, type: "perp" },
  { id: "silver", base: "SILVER", quote: "USDC", tags: ["xyz", "20x"], volume: "$1.81B", openInterest: "$174M", lastPrice: "103.56", changePct: -11.52, type: "tradfi" },
  { id: "hype-perp", base: "HYPE", quote: "USDC", tags: ["10x"], volume: "$807M", openInterest: "$721M", lastPrice: "29.568", changePct: -9.13, type: "perp" },
  { id: "sol", base: "SOL", quote: "USDC", tags: [], volume: "$783M", openInterest: "$603M", lastPrice: "115.38", changePct: -6.22, type: "crypto" },
  { id: "gold", base: "GOLD", quote: "USDC", tags: ["xyz", "20x"], volume: "$611M", openInterest: "$115M", lastPrice: "5,075.6", changePct: -7.92, type: "tradfi" },
  { id: "copper", base: "COPPER", quote: "USDC", tags: [], volume: "$343M", openInterest: "$139M", lastPrice: "6.0089", changePct: -4.72, type: "tradfi" },
  { id: "xyz100", base: "XYZ100", quote: "USDC", tags: ["xyz", "25x"], volume: "$302M", openInterest: "$145M", lastPrice: "25,639", changePct: -1.92, type: "hip3" },
  { id: "hype-spot", base: "HYPE", quote: "USDC", tags: ["SPOT"], volume: "$239M", openInterest: "--", lastPrice: "29.558", changePct: -9.25, type: "spot" },
  { id: "xrp", base: "XRP", quote: "USDC", tags: [], volume: "$214M", openInterest: "$167M", lastPrice: "1.7521", changePct: -6.51, type: "crypto" },
  { id: "paxg", base: "PAXG", quote: "USDC", tags: ["10x"], volume: "$148M", openInterest: "$66.6M", lastPrice: "5,102.8", changePct: -7.81, type: "tradfi" },
];

/* ============ Segmented Toggle ============ */
function Segmented({
  value,
  onChange,
}: {
  value: "strict" | "all";
  onChange: (v: "strict" | "all") => void;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="bg-[#0d212a] border border-[#1b2b35] rounded-lg p-0.5">
        <button
          onClick={() => onChange("strict")}
          className={`px-3 py-1.5 text-sm rounded-md transition ${
            value === "strict"
              ? "bg-teal-700/40 text-white border border-teal-500/40"
              : "text-[#8b9bb5] hover:text-white"
          }`}
        >
          Strict
        </button>
        <button
          onClick={() => onChange("all")}
          className={`ml-1 px-3 py-1.5 text-sm rounded-md transition ${
            value === "all"
              ? "bg-[#0b171f] text-white border border-[#1b2b35]"
              : "text-[#8b9bb5] hover:text-white"
          }`}
        >
          All
        </button>
      </div>
    </div>
  );
}

/* ============ Tab Pills ============ */
const TABS = ["All", "Perps", "Spot", "Crypto", "Tradfi", "HIP-3"] as const;
type TabKey = typeof TABS[number];

function Tabs({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  return (
    <div className="mt-2 flex items-center gap-5 text-[13px]">
      {TABS.map((t) => {
        const isActive = t === active;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`pb-2 transition border-b-2 ${
              isActive
                ? "border-teal-400 text-teal-300"
                : "border-transparent text-[#8b9bb5] hover:text-white"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

/* ============ Market Row ============ */
function MarketRow({
  m,
  onClick,
}: {
  m: Market & { favorite?: boolean };
  onClick?: () => void;
}) {
  const [fav, setFav] = useState(false);
  return (
    <button
      onClick={onClick}
      className="w-full text-left border-b border-[#142028] hover:bg-[#0d212a] transition"
    >
      <div className="px-3 py-3 flex justify-between items-center">
        {/* Symbol + tags */}
        <div className="flex items-start gap-2 min-w-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFav((f) => !f);
            }}
            aria-label="favorite"
            className={`mt-0.5 text-[#8b9bb5] hover:text-yellow-400`}
          >
            <StarIcon className={`w-4 h-4 ${fav ? "text-yellow-400" : ""}`} filled={fav} />
          </button>
          <div className="min-w-0">
            <div className="text-[13px] text-white font-medium truncate">
              {m.base}
              {m.type === "spot" ? "/" : "-"}
              {m.quote}
            </div>
            <div className="mt-1 flex flex-wrap gap-1">
              {m.tags.map((t) => (
                <span
                  key={t}
                  className={`px-1.5 py-0.5 rounded text-[10px] border ${
                    t === "SPOT"
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-600/40"
                      : "bg-[#0b2027] text-teal-300 border-[#11343f]"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Volume / OI */}
        <div className="text-right">
          <div className="text-[13px] text-[#cfe3ef]">{m.volume}</div>
          <div className="text-[11px] text-[#8b9bb5]">{m.openInterest ? m.openInterest : "--"}</div>
        </div>

        {/* Last / Change */}
        <div className="text-right">
          <div className="text-[13px] text-emerald-400">{m.lastPrice}</div>
          <div
            className={`text-[11px] ${
              m.changePct >= 0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {m.changePct >= 0 ? "+" : ""}
            {m.changePct.toFixed(2)}%
          </div>
        </div>
      </div>
    </button>
  );
}

/* ============ Modal ============ */
function MarketsModel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [seg, setSeg] = useState<"strict" | "all">("strict");
  const [tab, setTab] = useState<TabKey>("All");
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = DEMO_MARKETS;
    // Example behavior for "Strict": only show Perps + explicit tags; adjust as needed
    if (seg === "strict") {
      arr = arr.filter((m) => m.type === "perp" || m.tags.includes("SPOT"));
    }
    if (tab !== "All") {
      const map: Record<TabKey, Market["type"] | "all"> = {
        All: "all",
        Perps: "perp",
        Spot: "spot",
        Crypto: "crypto",
        Tradfi: "tradfi",
        "HIP-3": "hip3",
      };
      const t = map[tab];
      if (t !== "all") arr = arr.filter((m) => m.type === t);
    }
    if (q) {
      arr = arr.filter(
        (m) =>
          m.base.toLowerCase().includes(q) ||
          m.quote.toLowerCase().includes(q) ||
          `${m.base}${m.quote}`.toLowerCase().includes(q)
      );
    }
    return arr;
  }, [query, seg, tab]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999]"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-100 animate-[fadeIn_200ms_ease-out]"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="absolute inset-0 sm:inset-y-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-[420px] sm:rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={containerRef}
          className="h-full w-full bg-[#0b171f] text-white border border-[#142028] sm:shadow-xl
                     pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]
                     translate-y-0 sm:translate-y-0 animate-[slideUp_250ms_ease-out]"
        >
          {/* Header */}
          <div className="px-3 py-3 flex items-center justify-between border-b border-[#142028]">
            <div className="text-[15px] font-semibold">Markets</div>
            <button
              onClick={onClose}
              aria-label="Close"
              type="button"
              className="w-8 h-8 grid place-items-center rounded-md border border-[#1b2b35] bg-[#0d212a] text-[#8b9bb5] hover:text-white"
            >
              <X size={12} className="stroke-[#8b9bb5]"  />
            </button>
          </div>

          {/* Search + Segmented */}
          <div className="px-3 pt-3 flex items-center gap-2">
            <div className="relative flex-1">
              <SearchIcon className="w-4 h-4 text-[#8b9bb5] absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={inputRef}
                placeholder="Search"
                className="w-full pl-8 pr-3 py-2 rounded-md bg-[#0d212a] border border-[#1b2b35] text-sm text-white placeholder-[#8b9bb5] focus:outline-none focus:border-teal-500/40"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Segmented value={seg} onChange={setSeg} />
          </div>

          {/* Tabs */}
          <div className="px-3">
            <Tabs active={tab} onChange={setTab} />
          </div>

          {/* Table Header */}
          <div className="mt-2 px-3 flex justify-between items-center pt-1 pb-2 text-[11px] text-[#8b9bb5]">
            <div>Symbol</div>
            <div className="text-right flex gap-1 items-center">
              <div>Volume</div>
              <div className="-mt-0.5">Open Interest</div>
            </div>
            <div className="text-right flex gap-1 items-center">
              <div>Last Price</div>
              <div className="-mt-0.5">24H Change</div>
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto max-h-[calc(100%-190px)] sm:max-h-[calc(100%-180px)]">
            {filtered.map((m) => (
              <MarketRow key={m.id} m={m} onClick={() => { /* choose market */ }} />
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-8 text-center text-[#8b9bb5]">No markets</div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default MarketsModel;