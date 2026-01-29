"use client";
import { useEffect, useMemo, useRef, useState } from "react";
// import TradingViewChart from "./TradingViewChart";
// import Footer from "../shared/footer";
import MarketsModal from "../../components/MarketsDropdown";
import { BarChart3, ChevronDown, Search, SortAsc, UserCircle2, Wallet2, X } from "lucide-react";
import Header from "@/components/shared/header";
import Link from "next/link";

type OrderBookTab = "orderbook" | "trades";
type BottomTab =
  | "Balances"
  | "Positions"
  | "Open Orders"
  | "TWAP"
  | "Trade History"
  | "Funding History"
  | "Order History";
type TradeMode = "Market" | "Limit" | "Pro v";
type TradeSide = "Buy" | "Sell";

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
type TopTab = "Chart" | "Order Book" | "Trades";

const subTabs: SubTab[] = ["All", "xyz", "flx", "vntl", "hyna", "km", "cash"];

interface MarketsModalProps {
  open: boolean;
  onClose: () => void;
}

function TradingViewChart({
  symbol = "HYPEUSDC",
  interval = "60",
  height = 420,
}: {
  symbol?: string;
  interval?: string;
  height?: number;
}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let script: HTMLScriptElement | null = null;

    const init = () => {
      if (!container.current || !window.TradingView) return;

      // Clear container to avoid duplicates on re-render
      container.current.innerHTML = "";

      new window.TradingView.widget({
        autosize: true,
        symbol,
        interval, // "60" => 1h like screenshot
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#0F1A1F",
        hide_top_toolbar: false,
        hide_side_toolbar: false, // left toolbar visible (screenshot)
        withdateranges: true,
        allow_symbol_change: false,
        container_id: container.current.id,
        studies: ["Volume@tv-basicstudies"],
        backgroundColor: "#0F1A1F",
        gridColor: "rgba(255,255,255,0.08)",
        loading_screen: { backgroundColor: "#0F1A1F", foregroundColor: "#0F1A1F" },
        drawings_access: { type: "black", tools: [{ name: "Regression Trend" }] },
        disabled_features: [
          "header_settings",
          "header_compare",
          "header_fullscreen_button",
          "header_saveload",
          "save_chart_properties_to_local_storage",
          "legend_widget",
          "header_undo_redo",
        ],
        enabled_features: ["items_favoriting"],
      });
    };

    if (!window.TradingView) {
      script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = init;
      document.body.appendChild(script);
    } else {
      init();
    }

    return () => {
      if (script) script.onload = null;
    };
  }, [symbol, interval]);

  return (
    <div
      id="tv_chart_container_mobile"
      ref={container}
      style={{ width: "100%", height }}
      className="rounded-md overflow-hidden"
    />
  );
}

const sellOrders = [
  { price: "27.560", size: "0.37", total: "1,223.41", depth: 85 },
  { price: "27.557", size: "0.37", total: "1,151.04", depth: 80 },
  { price: "27.555", size: "0.37", total: "1,114.54", depth: 75 },
  { price: "27.553", size: "0.37", total: "1,077.99", depth: 70 },
  { price: "27.551", size: "0.37", total: "1,041.44", depth: 65 },
  { price: "27.549", size: "0.37", total: "1,004.89", depth: 60 },
  { price: "27.547", size: "0.37", total: "968.34", depth: 55 },
  { price: "27.545", size: "0.37", total: "931.79", depth: 50 },
  { price: "27.543", size: "0.37", total: "895.24", depth: 45 },
];

const buyOrders = [
  { price: "27.542", size: "0.37", total: "0.37", depth: 15 },
  { price: "27.540", size: "0.37", total: "104.85", depth: 25 },
  { price: "27.538", size: "0.37", total: "824.14", depth: 40 },
  { price: "27.537", size: "0.37", total: "1,709.11", depth: 55 },
  { price: "27.535", size: "0.37", total: "1,772.64", depth: 65 },
  { price: "27.533", size: "0.37", total: "1,876.75", depth: 75 },
  { price: "27.531", size: "0.37", total: "2,052.91", depth: 85 },
  { price: "27.529", size: "0.37", total: "2,255.42", depth: 90 },
];

const TradeDrawer = ({ session }: { session: any }) => {
  const [orderBookTab, setOrderBookTab] = useState<OrderBookTab>("orderbook");
  const [bottomTab, setBottomTab] = useState<BottomTab>("Balances");
  const [tradeMode, setTradeMode] = useState<TradeMode>("Market");
  const [tradeSide, setTradeSide] = useState<TradeSide>("Buy");
  const [sizePercent, setSizePercent] = useState(0);
  const [isTradeOpen, setIsTradeOpen] = useState(false);

  const [moreOpen, setMoreOpen] = useState(false);

  const [mainTab, setMainTab] = useState<MainTab>("HIP-3");
  const [subTab, setSubTab] = useState<SubTab>("All");
  const [search, setSearch] = useState("");
  const [topTab, setTopTab] = useState<TopTab>("Chart");
  // const [bottomTab, setBottomTab] = useState<BottomTab>("Balances");
  const [hideSmall, setHideSmall] = useState(true);

  const price = useMemo(
    () => ({
      last: "32.500",
      changeAbs: "-0.569",
      changePct: "-1.72%",
      isUp: false,
    }),
    []
  );

  if (!open) return null;

  const filteredMarkets = MARKETS.filter((m) => {
    const matchesSub = subTab === "All" ? true : m.tag === subTab;
    const matchesSearch = m.symbol.toLowerCase().includes(search.toLowerCase());
    return matchesSub && matchesSearch;
  });

  const recentTrades = [
  { time: "20:08:21", price: "32.520", size: "0.42", side: "sell" as const },
  { time: "20:08:17", price: "32.535", size: "1.02", side: "buy" as const },
  { time: "20:08:11", price: "32.500", size: "0.13", side: "sell" as const },
  { time: "20:08:08", price: "32.495", size: "0.77", side: "sell" as const },
];

  return (
    <>
    <div className="all_trade_mobile min-h-screen w-full bg-[#0B1518] text-white flex flex-col items-center">
      <Header session={session} />
      <div className="flex mt-3">
      <div className="w-[50%] set_width flex flex-col p-2 m-1 rounded-md pb-12">
          {/* Trade mode tabs */}
          <div className="flex border-b border-[#111827] text-sm">
            {(["Market", "Limit", "Pro"] as TradeMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setTradeMode(mode)}
                className={`flex-1 text-[12px] py-2 cursor-pointer font-medium ${
                  tradeMode === mode
                    ? "text-teal-300 border-b-2 border-teal-400"
                    : "text-[#8b9bb5]"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col gap-4 text-xs">
            {/* Buy / Sell toggle */}
            <div className="flex rounded-lg bg-[#273035] text-sm">
              <button
                onClick={() => setTradeSide("Buy")}
                className={`flex-1 text-[12px] py-2 rounded-lg ${
                  tradeSide === "Buy"
                    ? "bg-teal-400 text-black"
                    : "text-[#8b9bb5]"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeSide("Sell")}
                className={`flex-1 text-[12px] py-2 rounded-lg ${
                  tradeSide === "Sell"
                    ? "bg-teal-400 text-black"
                    : "text-[#8b9bb5]"
                }`}
              >
                Sell
              </button>
            </div>

            {/* Available to trade */}
            <div className="flex justify-between text-[11px] text-[#8b9bb5]">
              <span className="underline">Available to Trade</span>
              <span className="text-white">0.00 USDC</span>
            </div>

            {/* Size + slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] text-[#8b9bb5] p-2 border border-gray-700 rounded-lg">
                <span>Size</span>
                <span>HYPE</span>
              </div>
              {/* <input
                type="range"
                min={0}
                max={100}
                value={sizePercent}
                onChange={(e) => setSizePercent(Number(e.target.value))}
                className="w-full accent-teal-400"
              /> */}
              {/* <div className="flex justify-between text-[11px] text-[#8b9bb5]">
                <span>0%</span>
                <span>{sizePercent}%</span>
              </div> */}
            </div>

            
          </div>
        </div>
        <div className="w-[50%] set_width flex flex-col p-2 m-1 rounded-md pb-12">
        {sellOrders.map((row, idx) => (
                    <div
                      key={`sell-${idx}`}
                      className="relative flex justify-between px-3 py-[4px]"
                    >
                      <div
                        className="absolute inset-y-0 right-0 bg-red-500/15"
                        style={{ width: `${row.depth}%` }}
                      />
                      <span className="text-red-400 z-10">{row.price}</span>
                      <span className="text-right z-10">{row.size}</span>
                      <span className="text-right z-10">{row.total}</span>
                    </div>
                  ))}

                  {/* Spread */}
                  <div className="flex justify-between px-3 py-2 bg-[#07121b] text-[11px] text-[#8b9bb5]">
                    <span>Spread</span>
                    <span>0.000</span>
                    <span>0.022%</span>
                  </div>

                  </div>
                  </div>

      {/* Sticky bottom nav (like the screenshot) */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#0F1A1F] border-t border-[#142028]">
                <div className="mx-auto w-[355px] max-w-[355px] min-w-[355px] flex items-center justify-around py-2">
                  <Link href={"/"}>
                  <button className="flex flex-col items-center gap-1 text-[11px] text-[#cdd5db]">
                    <BarChart3 className="w-5 h-5 text-[#7ce0d5]" />
                    Markets
                  </button>
                  </Link>
      
                  <Link href={"/tradeTab"}>
                    <button
                      onClick={() => setIsTradeOpen(true)}
                      className="flex flex-col items-center gap-1 text-[11px] text-[#cdd5db]"
                    >
                      <Wallet2 className="w-5 h-5 text-[#7ce0d5]" />
                      Trade
                    </button>
                  </Link>
      
      <Link href={"/AccountTab"}>
                  <button className="flex flex-col items-center gap-1 text-[11px] text-[#cdd5db]">
                    <UserCircle2 className="w-5 h-5 text-[#7ce0d5]" />
                    Account
                  </button>
                  </Link>
                </div>
              </nav>

      </div>
    </>
  );
};

export default TradeDrawer;

