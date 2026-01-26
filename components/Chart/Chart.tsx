"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../shared/header";
import Footer from "../shared/footer";
import { X, ChevronUp, ChevronDown, ArrowDown } from "lucide-react";
import TradingViewChart from "./TradingViewChart";

interface Order {
  id: number;
  symbol: string;
  amount: number;
  type: "BUY" | "SELL";
  orderType: "Limit" | "Market";
  pnl: string;
  autoSell: string;
  status: "filled" | "pending" | "cancelled";
  filledPrice?: number;
  timestamp: number;
}

interface Balance {
  [key: string]: number;
}

interface Notification {
  id: number;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
}

interface CoinData {
  symbol: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  name: string;
}

const Chart = ({ session }: { session: any }) => {
  const [activeTableTab, setActiveTableTab] = useState("Positions");
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [orderType, setOrderType] = useState<"Limit" | "Market">("Limit");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState<number | string>("");
  const [stopLoss, setStopLoss] = useState<number | string>("");
  const [leverage, setLeverage] = useState(10);
  const [showCalculator, setShowCalculator] = useState(false);
  const [autoSell, setAutoSell] = useState("OFF");
  const [mockOrders, setMockOrders] = useState<Order[]>([]);
  const [utcTime, setUtcTime] = useState("");
  const [calcTab, setCalcTab] = useState<"position" | "pnl">("position");
  const [positionType, setPositionType] = useState<"UP" | "DOWN">("UP");
  const [calcRows, setCalcRows] = useState([
    { price: "", amount: "", leverage: "" },
    { price: "", amount: "", leverage: "" },
    { price: "", amount: "", leverage: "" },
    { price: "", amount: "", leverage: "" },
    { price: "", amount: "", leverage: "" },
  ]);
  const [calcResults, setCalcResults] = useState({
    amount: 0,
    price: 0,
    leverage: 0,
    lossCut: 0,
    fee: 0,
    feePercent: 0,
  });
  const [pnlCalcData, setPnlCalcData] = useState({
    sellPrice: "",
    buyPrice: "",
    amount: "",
    leverage: "",
    pnlPercent: "",
    results: {
      pnl: 0,
      pnlPercent: 0,
      sellPrice: 0,
    },
  });
  const [open, setOpen] = useState(false);

  // ...existing code...
  const [balances, setBalances] = useState<Balance>({
    BTC: 0.5,
    ETH: 5.0,
    USDT: 1000.0,
  });

  const [coinPrices, setCoinPrices] = useState<{ [key: string]: CoinData }>({
    BTC: {
      symbol: "BTC/USDT",
      price: 108234.56,
      change24h: -2.11,
      high24h: 111290,
      low24h: 106710,
      name: "BTC"
    },
    ETH: {
      symbol: "ETH/USDT",
      price: 3456.78,
      change24h: 1.45,
      high24h: 3520,
      low24h: 3400,
      name: "ETH"
    },
    USDT: {
      symbol: "USDT/USDT",
      price: 1.0,
      change24h: 0,
      high24h: 1.01,
      low24h: 0.99,
      name: "USDT"
    },
  });

  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hoursNum = now.getUTCHours();
      const hours = hoursNum.toString().padStart(2, "0");
      const minutes = now.getUTCMinutes().toString().padStart(2, "0");
      const seconds = now.getUTCSeconds().toString().padStart(2, "0");
      const ampm = hoursNum >= 12 ? "PM" : "AM";
      const hour12 = (hoursNum % 12 || 12).toString().padStart(2, "0");

      setUtcTime(`${hour12}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simulate realistic price movements
  useEffect(() => {
    const priceInterval = setInterval(() => {
      setCoinPrices((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((coin) => {
          if (coin !== "USDT") {
            const volatility = 0.002;
            const change = (Math.random() - 0.5) * 2 * volatility;
            const newPrice = updated[coin].price * (1 + change);
            updated[coin] = {
              ...updated[coin],
              price: parseFloat(newPrice.toFixed(2)),
            };
          }
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(priceInterval);
  }, []);

  const showNotification = (
    type: "success" | "error" | "info" | "warning",
    title: string,
    message: string,
  ) => {
    const id = Date.now();
    const notification: Notification = { id, type, title, message };
    setNotifications((prev) => [...prev, notification]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getCurrentMarketPrice = (): number => {
    const basePrice = coinPrices[selectedCoin]?.price || 100000;
    const variance = basePrice * 0.0005;
    return basePrice + (Math.random() - 0.5) * variance * 2;
  };

  const handleLimitOrder = (orderData: Order) => {
    setPendingOrders((prev) => [...prev, { ...orderData, status: "pending" }]);

    setTimeout(() => {
      const currentPrice = getCurrentMarketPrice();
      const targetPrice = Number(orderData.filledPrice || orderData.amount);
      const priceRange = targetPrice * 0.02;

      const isPriceMatched =
        orderData.type === "BUY"
          ? currentPrice <= targetPrice + priceRange
          : currentPrice >= targetPrice - priceRange;

      if (isPriceMatched) {
        executeTrade(orderData, currentPrice, "filled");
        setPendingOrders((prev) => prev.filter((o) => o.id !== orderData.id));
        showNotification(
          "success",
          "Order Filled",
          `Limit order for ${
            orderData.symbol
          } filled at $${currentPrice.toFixed(2)}`,
        );
      } else {
        setPendingOrders((prev) =>
          prev.map((o) =>
            o.id === orderData.id ? { ...o, status: "pending" } : o,
          ),
        );
      }
    }, 2000);
  };

  const handleMarketOrder = (orderData: Order) => {
    const currentPrice = getCurrentMarketPrice();
    executeTrade(orderData, currentPrice, "filled");
  };

  const executeTrade = (
    orderData: Order,
    filledPrice: number,
    status: "filled" | "cancelled",
  ) => {
    const quantity = orderData.amount;
    const baseCoin = selectedCoin;
    const positionValue = quantity * filledPrice;
    const fee = positionValue * 0.001;

    setBalances((prev) => {
      const newBalances = { ...prev };

      if (orderData.type === "BUY") {
        newBalances.USDT = (newBalances.USDT || 0) - (positionValue + fee);
        newBalances[baseCoin] = (newBalances[baseCoin] || 0) + quantity;
      } else if (orderData.type === "SELL") {
        newBalances.USDT = (newBalances.USDT || 0) + (positionValue - fee);
        newBalances[baseCoin] = (newBalances[baseCoin] || 0) - quantity;
      }

      Object.keys(newBalances).forEach((key) => {
        if (newBalances[key] < 0.00001) newBalances[key] = 0;
      });

      return newBalances;
    });

    const pnlPercent = (Math.random() * 6 - 3).toFixed(2);
    const executedOrder: Order = {
      ...orderData,
      status,
      filledPrice,
      pnl: `${pnlPercent}%`,
    };

    setMockOrders((prev) => [executedOrder, ...prev]);
  };

  const validateOrder = (
    buyAmount: number,
    orderPrice: string | number,
  ): boolean => {
    if (!buyAmount || buyAmount <= 0) {
      showNotification(
        "error",
        "Invalid Amount",
        "Please enter a valid amount",
      );
      return false;
    }

    if (orderType === "Limit" && (!orderPrice || Number(orderPrice) <= 0)) {
      showNotification(
        "error",
        "Invalid Price",
        "Please enter a valid limit price",
      );
      return false;
    }

    const effectivePrice =
      orderType === "Market" ? getCurrentMarketPrice() : Number(orderPrice);
    const requiredUSDT = buyAmount * effectivePrice;

    if (selectedCoin === "USDT" && balances.USDT < buyAmount) {
      showNotification(
        "error",
        "Insufficient Balance",
        `Required: ${buyAmount.toFixed(
          2,
        )} USDT, Available: ${balances.USDT.toFixed(2)} USDT`,
      );
      return false;
    }

    if (selectedCoin !== "USDT" && balances.USDT < requiredUSDT) {
      showNotification(
        "error",
        "Insufficient Balance",
        `Required: ${requiredUSDT.toFixed(
          2,
        )} USDT, Available: ${balances.USDT.toFixed(2)} USDT`,
      );
      return false;
    }

    if (
      selectedCoin !== "USDT" &&
      buyAmount > 0 &&
      balances[selectedCoin] < buyAmount
    ) {
      showNotification(
        "error",
        "Insufficient Balance",
        `Required: ${buyAmount.toFixed(
          4,
        )} ${selectedCoin}, Available: ${balances[selectedCoin].toFixed(
          4,
        )} ${selectedCoin}`,
      );
      return false;
    }

    return true;
  };

  const handleCalculatorRowChange = (
    index: number,
    field: "price" | "amount" | "leverage",
    value: string,
  ) => {
    const newRows = [...calcRows];
    newRows[index][field] = value;
    setCalcRows(newRows);
  };

  const calculatePosition = () => {
    // Get the first row with complete data
    const dataRow = calcRows.find(
      (row) => row.price && row.amount && row.leverage,
    );
    if (!dataRow) {
      showNotification(
        "error",
        "Invalid Input",
        "Please fill in Price, Amount, and Leverage",
      );
      return;
    }

    const price = parseFloat(dataRow.price) || 0;
    const amount = parseFloat(dataRow.amount) || 0;
    const leverage = parseFloat(dataRow.leverage) || 1;

    // Calculate position details
    const positionValue = price * amount;
    const fee = positionValue * 0.001; // 0.1% fee
    const feePercent = 0.1;
    const lossCut = positionValue * (leverage / 100); // Loss cut based on leverage

    setCalcResults({
      amount: parseFloat(amount.toFixed(4)),
      price: parseFloat(price.toFixed(2)),
      leverage: parseFloat(leverage.toFixed(2)),
      lossCut: parseFloat(lossCut.toFixed(2)),
      fee: parseFloat(fee.toFixed(2)),
      feePercent: feePercent,
    });

    showNotification(
      "success",
      "Calculation Complete",
      `Position ${positionType} calculated successfully`,
    );
  };

  const calculatePNL = () => {
    const buyPrice = parseFloat(pnlCalcData.buyPrice) || 0;
    const sellPrice = parseFloat(pnlCalcData.sellPrice) || 0;
    const amount = parseFloat(pnlCalcData.amount) || 0;
    const leverage = parseFloat(pnlCalcData.leverage) || 1;
    const pnlPercent = parseFloat(pnlCalcData.pnlPercent) || 0;

    if (!buyPrice || !sellPrice) {
      showNotification(
        "error",
        "Invalid Input",
        "Please enter Buy Price and Sell Price",
      );
      return;
    }

    const priceDifference = sellPrice - buyPrice;
    const calculatedPNL = priceDifference * (amount || 1) * leverage;
    const calculatedPNLPercent = (priceDifference / buyPrice) * 100 || 0;
    const calculatedSellPrice =
      positionType === "DOWN"
        ? buyPrice - buyPrice * (pnlPercent / 100)
        : buyPrice + buyPrice * (pnlPercent / 100);

    setPnlCalcData((prev) => ({
      ...prev,
      results: {
        pnl: parseFloat(calculatedPNL.toFixed(2)),
        pnlPercent: parseFloat(calculatedPNLPercent.toFixed(2)),
        sellPrice: parseFloat(calculatedSellPrice.toFixed(2)),
      },
    }));

    showNotification(
      "success",
      "PNL Calculated",
      `PNL: $${calculatedPNL.toFixed(2)} (${calculatedPNLPercent.toFixed(2)}%)`,
    );
  };

  const handleOrderSubmit = (type: "BUY" | "SELL") => {
    if (amount <= 0) {
      showNotification(
        "error",
        "Invalid Amount",
        "Please enter an amount greater than 0",
      );
      return;
    }

    const orderPrice =
      orderType === "Market"
        ? getCurrentMarketPrice()
        : Number(price || amount);

    if (!validateOrder(amount, orderPrice)) return;

    const order: Order = {
      id: Date.now(),
      symbol: `${selectedCoin}/USDT`,
      type,
      orderType,
      amount: amount,
      filledPrice: orderPrice,
      pnl: "0%",
      autoSell,
      status: "pending",
      timestamp: Date.now(),
    };

    if (orderType === "Limit") {
      handleLimitOrder(order);
      showNotification(
        "info",
        "Limit Order Placed",
        `${type} ${amount.toFixed(4)} ${selectedCoin} at $${orderPrice.toFixed(
          2,
        )} - waiting for price match`,
      );
    } else {
      handleMarketOrder(order);
      showNotification(
        "success",
        "Market Order Executed",
        `${type} ${amount.toFixed(4)} ${selectedCoin} at $${orderPrice.toFixed(
          2,
        )}`,
      );
    }

    setAmount(0);
    setPrice("");
  };

  const increaseAmount = () => setAmount((prev) => prev + 10);
  const decreaseAmount = () =>
    setAmount((prev) => (prev - 10 >= 0 ? prev - 10 : 0));

  const handleSlider = (value: string) => {
    const percent = parseInt(value, 10);
    const maxAmount = balances[selectedCoin] || 0;
    setAmount(parseFloat(((percent / 100) * maxAmount).toFixed(4)));
  };

  const cancelPendingOrder = (orderId: number) => {
    setPendingOrders((prev) => prev.filter((o) => o.id !== orderId));
    setMockOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o)),
    );
    showNotification(
      "warning",
      "Order Cancelled",
      "Pending order has been cancelled",
    );
  };

  const renderTableRows = () => {
    const displayOrders =
      activeTableTab === "Positions"
        ? mockOrders.filter((o) => o.status === "filled")
        : mockOrders.filter((o) => o.status !== "cancelled");

    if (displayOrders.length === 0)
      return (
        <tr>
          <td colSpan={11} className="text-center py-6 text-gray-500">
            No {activeTableTab.toLowerCase()} yet
          </td>
        </tr>
      );

    return displayOrders.map((order) => (
      <tr
        key={order.id}
        className="border-b border-[#242424] hover:bg-[#2a2a2a]"
      >
        <td className="px-2 py-2">{order.symbol}</td>
        <td className="px-2 py-2">{order.amount.toFixed(4)}</td>
        <td className="px-2 py-2">{leverage}x</td>
        <td className="px-2 py-2">${(order.filledPrice || 0).toFixed(2)}</td>
        <td className="px-2 py-2">
          ${((order.filledPrice || 0) * 0.95).toFixed(2)}
        </td>
        <td className="px-2 py-2">
          ${((order.filledPrice || 0) * 0.9).toFixed(2)}
        </td>
        <td className="px-2 py-2">
          <button className="text-[#50D2C1] hover:underline text-xs">
            Limit
          </button>
        </td>
        <td className="px-2 py-2">
          <button className="text-red-400 hover:underline text-xs">
            Market
          </button>
        </td>
        <td
          className={`px-2 py-2 font-semibold ${
            order.pnl.includes("-") ? "text-red-500" : "text-green-500"
          }`}
        >
          {order.pnl}
        </td>
      </tr>
    ));
  };

  const getNotificationStyles = (type: Notification["type"]) => {
    const styles = {
      success: "bg-green-500/20 border-green-500/50 text-green-400",
      error: "bg-red-500/20 border-red-500/50 text-red-400",
      warning: "bg-[#50D2C1]/20 border-[#50D2C1]/50 text-[#50D2C1]",
      info: "bg-blue-500/20 border-blue-500/50 text-blue-400",
    };
    return styles[type];
  };

  const currentCoin = coinPrices[selectedCoin];

  return (
    <div className="text-white bg-white  dark:bg-[#1a1a1a] min-h-screen">
      <Header session={session} />

      <div className="fixed top-28 right-4 z-50 space-y-6 max-w-md">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 ${getNotificationStyles(
              notification.type,
            )}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-semibold text-sm text-white">
                  {notification.title}
                </p>
                <p className="text-xs opacity-90 mt-1 text-white">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="mt-1 hover:opacity-70 transition"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <main className="bg-white dark:bg-[#1E181D] mx-auto w-full flex flex-col mt-18 lg:flex-row  ">
        <section className="flex-1">
          {/* trade header tsx starts */}
          <div
            className="flex flex-wrap items-center gap-6 p-2 dark:border-none border-2 
           border-gray-300 dark:border-gray-600 shadow-sm  bg-white dark:bg-[#1E181D] relative"
          >
            <div
              className="flex items-center gap-2 cursor-pointer relative group"
              onClick={() => setOpen(!open)}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "translateY(2px)" }}
              >
                <g clipPath="url(#clip0_623_29714)">
                  <path
                    d="M20.4523 14.5389C20.471 16.2176 20.1196 17.8218 19.4292 19.3544C18.4434 21.5368 16.0799 23.3213 13.9218 21.4218C12.1616 19.8736 11.8351 16.7306 9.19798 16.2705C5.7088 15.8477 5.62483 19.8923 3.34536 20.3492C0.804661 20.8653 -0.0380915 16.5938 -0.000774032 14.6539C0.0365434 12.714 0.552769 9.98759 2.76072 9.98759C5.30142 9.98759 5.47245 13.8332 8.69731 13.6249C11.8911 13.4073 11.947 9.40624 14.0337 7.69329C15.8343 6.2135 17.952 7.29847 19.0125 9.07982C19.9952 10.7275 20.4274 12.6612 20.4492 14.5389H20.4523Z"
                    fill="#46c4b3"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_623_29714">
                    <rect width="32" height="32" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
              <span className="font-semibold text-[#333] dark:text-white">
                {selectedCoin} (Bitcoin) / USDT
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "rotate(180deg)" }}
              >
                <path
                  d="M1.375 7.7915L5.5 3.6665L9.625 7.7915"
                  stroke-width="0.7"
                  stroke="#fff"
                ></path>
              </svg>

              {/* Dropdown List - Dynamic Coin List */}
              {open && (
                <div className="absolute top-full left-0 mt-2 bg-[#1b1f2e] border border-gray-700 rounded-lg shadow-xl z-50 w-100 overflow-hidden">
                  {/* <div className="px-4 py-3 border-b border-gray-700 bg-[#161928]">
                    <h3 className="text-sm font-semibold text-white">All Markets</h3>
                  </div> */}
                  <div className="overflow-y-auto max-h-96">
                    <table className="w-full text-xs">
                      <thead className="bg-[#242424] border-b border-gray-700 sticky top-0">
                        <tr>
                          <th className="text-left px-3 py-2 text-gray-400 font-semibold">
                            Symbol
                          </th>
                          <th className="text-right px-3 py-2 text-gray-400 font-semibold">
                            Price
                          </th>
                          <th className="text-right px-3 py-2 text-gray-400 font-semibold">
                            24H Change
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        {Object.entries(coinPrices).map(([symbol, data]) => (
                          <tr
                            key={symbol}
                            className="border-b border-gray-800 hover:bg-[#222638] cursor-pointer transition"
                            onClick={() => {
                              setSelectedCoin(symbol);
                              setOpen(false);
                            }}
                          >
                            <td className="px-3 py-2.5 font-semibold flex items-center gap-2">
                              <span className="text-gray-400">☆</span>
                              <div>
                                <div className="font-bold">{data.symbol}</div>
                                <div className="text-gray-500 text-xs">
                                  {data?.name || "USDT"}
                                </div>
                              </div>
                            </td>
                            <td className="text-right px-3 py-2.5">
                              ${data.price.toFixed(2)}
                            </td>
                            <td
                              className={`text-right px-3 py-2.5 font-semibold ${
                                data.change24h < 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              }`}
                            >
                              {data.change24h > 0 ? "+" : ""}
                              {data.change24h.toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="text-[12px]">
              <span>Price</span>
              <span
                className={
                  currentCoin?.change24h! < 0
                    ? "font-semibold text-red-500 flex"
                    : "font-semibold text-green-500 flex"
                }
              >
                {" "}
                {(currentCoin?.price || 0).toFixed(2)}
              </span>
            </div>

            <div className="text-[12px]">
              <div className="flex flex-col">
                <div>
                  <span className="dark:text-white text-gray-600">
                    24h Change
                  </span>
                  <br />
                  <span
                    className={
                      currentCoin?.change24h! < 0
                        ? "font-semibold text-red-500 flex"
                        : "font-semibold text-green-500 flex"
                    }
                  >
                    {" "}
                    {(
                      ((currentCoin?.price || 0) *
                        (currentCoin?.change24h || 0)) /
                      100
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={
                currentCoin?.change24h! < 0
                  ? "text-red-500 font-semibold text-[12px]"
                  : "text-green-500 font-semibold text-[12px]"
              }
            >
              {currentCoin?.change24h! > 0 ? "+" : ""}
              {currentCoin?.change24h?.toFixed(2)}%
            </div>

            
              <div className="flex flex-col text-[12px]">
                <div className="text-[#333] dark:text-white">24 High:</div>
                <div className="text-green-500 font-semibold">
                  {" "}
                  {currentCoin?.high24h}
                </div>
              </div>

              <div className="flex flex-col text-[12px]">
                <div className="text-[#333] dark:text-white">24h Low:</div>
                <div className="text-red-500 font-semibold">
                  {" "}
                  {currentCoin?.low24h}
                </div>
              </div>

            <div className="flex text-[12px] gap-3 text-base items-center">
              <div className="flex flex-col">
                <div className="text-[#333] dark:text-gray-300 font-semibold">
                  FYBIT INDEX ({selectedCoin}):
                </div>
                <div className="text-red-500 font-semibold">
                  {" "}
                  ${currentCoin?.price.toFixed(2)}
                </div>
              </div>

              <div className="text-gray-300 flex flex-col text-[12px] ml-4">
                <div className="text-[#333] dark:text-white font-semibold">
                  TIME: <span className="font-semibold">{utcTime}</span>
                </div>
                <div className="font-semibold text-[#333] dark:text-white">
                  {" "}
                  (UTC)
                </div>
              </div>
            </div>
          </div>
          {/* trade header tsx ends */}
          {open && (
            <div
              className="fixed inset-0 z-30"
              onClick={() => setOpen(false)}
            ></div>
          )}
          <div className="border border-[#242424] rounded-xl  relative">
            <div>
              <TradingViewChart symbol={selectedCoin} />
            </div>
          </div>
          <div className=" rounded-xl p-4  mt-5 shadow-lg w-full">
            <div className="flex gap-1 border-b border-[#2c2c2c] pb-2 mb-4 text-sm w-full">
              {[
                "Positions",
                "Open Orders",
                "Closed Positions",
                "Realised PnL",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTableTab(tab)}
                  className={`
        flex-1
        p-4  
        rounded-t-lg 
        font-medium 
        transition-all 
        duration-200
        
       
        ${
          activeTableTab === tab
            ? "dark:bg-[#50D2C1] text-black dark:border-[#50D2C1] border-[#50D2C1] border border-l-[3px] border-r-[3px] border-t-[4px] border-b-[1px]-[#9e9e9e]"
            : "dark:bg-[#0d1117] text-[#333]  dark:text-gray-300 border border-[2px] border-[#9e9e9e] dark:border-[#1b242e] dark:hover:bg-[#16202d]"
        }
      `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {pendingOrders.length > 0 && (
              <div className="mb-4 p-3 bg-yellow-600/10 border border-yellow-600/40 rounded text-[#50D2C1] text-sm">
                {pendingOrders.length} pending limit order(s) waiting for price
                match...
                {pendingOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between mt-2 text-yellow-300"
                  >
                    <span>
                      {order.type} {order.amount.toFixed(4)} {selectedCoin} at $
                      {(order.filledPrice || 0).toFixed(2)}
                    </span>
                    <button
                      onClick={() => cancelPendingOrder(order.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="overflow-x-auto rounded-lg border-none dark:border border-[#2c2c2c]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#e4e3e3] dark:bg-[#1b1b1b] text-[#333] dark:text-[#50D2C1] border-b border-[#2c2c2c]">
                    {[
                      "Symbol",
                      "Amount",
                      "Leverage",
                      "Price",
                      "Loss Cut",
                      "Stop Loss",
                      "Sell (Limit)",
                      "Sell (Market)",
                      "Unrealised PnL (%)",
                      "Fees (%)",
                      "Expiration (UTC)",
                    ].map((th) => (
                      <th
                        key={th}
                        className="py-3 px-3 font-semibold text-left tracking-wide"
                      >
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222] text-gray-300">
                  {renderTableRows()}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE BAR */}
        <div className="w-full lg:w-[350px] ">
          <div className="bg-[#ffffff] dark:bg-[#1f1f1f] p-4 rounded-xl border-none dark:border-[#242424] shadow-sm">
            <div className="flex gap-1 ">
              {["BTC", "ETH", "USDT"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedCoin(tab)}
                  className={`flex-1 py-2 transition ${
                    selectedCoin === tab
                      ? "border-b-2 text-[12px] border-b-[#50D2C1] text-[#50D2C1]"
                      : " text-[#333] text-[12px] dark:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <form
              className="mt-2  dark:text-white text-[#333] space-y-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className=" text-[12px] text-[#333333] dark:text-gray-200 mt-3">
                <p>
                  Balance:{" "}
                  {balances[selectedCoin]?.toFixed(
                    selectedCoin === "USDT" ? 2 : 5,
                  ) || "0.00"}{" "}
                  {selectedCoin}
                </p>
                <p>
                  Available:{" "}
                  {(balances[selectedCoin] * 0.95)?.toFixed(
                    selectedCoin === "USDT" ? 2 : 5,
                  ) || "0.00"}{" "}
                  {selectedCoin}
                </p>
              </div>

              <div className="flex justify-between text-[12px] text-[ #333] dark:text-gray-200">
                <span>Min: 5.00 {selectedCoin}</span>
                <span>
                  Max: {balances[selectedCoin]?.toFixed(2) || "0.00"}{" "}
                  {selectedCoin}
                </span>
              </div>

              <div className="flex gap-2">
                {["Limit", "Market"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setOrderType(label as "Limit" | "Market")}
                    className={`flex-1 py-2 rounded transition ${
                      orderType === label
                        ? "border-b-2 text-[12px] border-b-[#50D2C1] text-[#50D2C1]"
                        : "text-[#333] text-[12px] dark:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex items-center rounded overflow-hidden gap-1 justify-around py-1">
                <div className="flex items-center gap-1">
                  <label className="text-sm text-[#333] dark:text-gray-300">
                    Amount /
                    <span className="text-[#50D2C1] dark:text-[#50D2C1]">
                      {" "}
                      All
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0"
                    value={amount || ""}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    step="0.0001"
                    className="dark:bg-[#2b2d40] border dark:border-none bg-white text-right w-[150px] text-[#333] dark:text-white px-2 py-1 rounded outline-none pr-6"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setAmount((prev) => parseFloat((prev + 0.1).toFixed(4)))
                    }
                    className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setAmount((prev) =>
                        Math.max(parseFloat((prev - 0.1).toFixed(4)), 0),
                      )
                    }
                    className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
                <div>
                  <span className="px-3 text-[#333] dark:text-gray-300 text-sm">
                    {selectedCoin}
                  </span>
                </div>
              </div>
              <input
                type="range"
                className="w-full  accent-[#50D2C1] dark:accent-[#50D2C1]"
                value={(amount / (balances[selectedCoin] || 1000)) * 100}
                onChange={(e) => handleSlider(e.target.value)}
              />
              <div className="flex justify-between text-xs text-gray-500">
                {["0%", "25%", "50%", "75%", "100%"].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>

              {orderType === "Limit" && (
                <div className="flex items-center rounded overflow-hidden gap-1 justify-around py-1">
                  <div className="flex items-center gap-1">
                    <label className="text-sm text-[#333] dark:text-gray-300">
                      Limit Price
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder={`${currentCoin?.price.toFixed(2)}`}
                      value={price || ""}
                      onChange={(e) => setPrice(e.target.value)}
                      step="0.01"
                      className="border dark:border-none bg-white dark:bg-[#2b2d40] text-right w-[150px] text-[#333] dark:text-white px-2 py-1 rounded outline-none pr-6"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPrice((prev) => (Number(prev) || 0) + 10)
                      }
                      className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPrice((prev) =>
                          Math.max((Number(prev) || 0) - 10, 0),
                        )
                      }
                      className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                  <div>
                    <span className="px-3 text-[#333] dark:text-gray-300 text-sm">
                      USDT
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-md py-2">
                  <div>
                    <label className="text-sm text-[#333] dark:text-gray-300 w-24 flex items-center">
                      Stop Loss
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter stop loss"
                      value={stopLoss || ""}
                      onChange={(e) => setStopLoss(Number(e.target.value))}
                      className="flex-1 bg-white border dark:border-none dark:bg-[#2b2d40] text-right text-[#333] dark:text-white w-[150px] px-2 py-1 rounded outline-none pr-6"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setStopLoss((prev) => Number(prev || 0) + 1)
                      }
                      className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setStopLoss((prev) =>
                          Math.max(Number(prev || 0) - 1, 0),
                        )
                      }
                      className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                  <div>
                    <span className="text-[#333] dark:text-gray-300 text-sm ml-2">
                      USDT
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between rounded-md py-2">
                    <div>
                      <label className="text-sm text-[#333] dark:text-gray-300 w-24 flex items-center">
                        Leverage
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={leverage || ""}
                        onChange={(e) => setLeverage(Number(e.target.value))}
                        className="flex-1 bg-white border dark:border-none dark:bg-[#2b2d40] text-right text-[#333] dark:text-white w-[150px] px-2 py-1 rounded outline-none pr-6"
                      />
                      <button
                        type="button"
                        onClick={() => setLeverage((prev) => (prev || 0) + 1)}
                        className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setLeverage((prev) => Math.max((prev || 1) - 1, 1))
                        }
                        className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
                      >
                        <ChevronDown size={14} />
                      </button>
                    </div>
                    <div>
                      <span className="text-[#333] dark:text-gray-300 text-sm ml-2">
                        X
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={leverage}
                    onChange={(e) => setLeverage(Number(e.target.value))}
                    className="w-full accent-[#50D2C1]  dark:accent-[#50D2C1] mt-2"
                  />

                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    {["1x", "5x", "10x", "25x", "50x", "75x", "100x"].map(
                      (v) => (
                        <span key={v}>{v}</span>
                      ),
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOrderSubmit("BUY")}
                  className="flex-1 text-[12px] text-white dark:text-[#333] bg-green-600 py-3 rounded hover:bg-green-700"
                >
                  Buy Order
                </button>
                <button
                  type="button"
                  onClick={() => handleOrderSubmit("SELL")}
                  className="flex-1 text-white dark:text-[#333] text-[12px] bg-red-600 py-3 rounded hover:bg-red-700"
                >
                  Sell Order
                </button>
              </div>

              <div>
                <h3 className="text-md mb-2">Auto-Sell Setting:</h3>
                <div className="flex gap-2">
                  {["OFF", "100%", "200%", "300%"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setAutoSell(label)}
                      className={`flex-1 py-2 rounded transition ${
                        autoSell === label
                          ? "bg-[#50D2C1] text-[#50D2C1] dark:text-white"
                          : "border-[#50D2C1] dark:border-[#50D2C1] hover:bg-blue-600/20"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowCalculator(true)}
                  className="w-full bg-[#50D2C1] hover:bg-orange-600 py-2 mt-3 rounded font-semibold"
                >
                  Calculator
                </button>

                {showCalculator && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
                    <div className="relative bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                      <button
                        className="absolute top-2.5 right-3 text-gray-400 hover:text-white text-2xl z-10"
                        onClick={() => setShowCalculator(false)}
                      >
                        ✕
                      </button>

                      {/* Tab Selection */}
                      <div className="flex border-b border-[#2a2a2a] sticky top-0 bg-[#1f1f1f]">
                        <button
                          onClick={() => setCalcTab("position")}
                          className={`flex-1 py-3 font-semibold text-sm transition ${
                            calcTab === "position"
                              ? "bg-[#50D2C1] text-black"
                              : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
                          }`}
                        >
                          Position Calculator
                        </button>
                        <button
                          onClick={() => setCalcTab("pnl")}
                          className={`flex-1 py-3 font-semibold text-sm transition ${
                            calcTab === "pnl"
                              ? "bg-[#50D2C1] text-black"
                              : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
                          }`}
                        >
                          PNL Calculator
                        </button>
                      </div>

                      <div className="flex flex-col lg:flex-row">
                        {/* Left Section - Input Fields */}
                        <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-[#2a2a2a]">
                          {calcTab === "position" ? (
                            <>
                              {/* Position Type Selection */}
                              <div className="flex gap-2 mb-4">
                                <button
                                  onClick={() => setPositionType("UP")}
                                  className={`flex-1 py-2 rounded-l font-semibold text-sm transition ${
                                    positionType === "UP"
                                      ? "bg-[#50D2C1] text-black"
                                      : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
                                  }`}
                                >
                                  Position UP
                                </button>
                                <button
                                  onClick={() => setPositionType("DOWN")}
                                  className={`flex-1 py-2 rounded-r font-semibold text-sm transition ${
                                    positionType === "DOWN"
                                      ? "bg-[#50D2C1] text-black"
                                      : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
                                  }`}
                                >
                                  Position DOWN
                                </button>
                              </div>

                              {/* Position Calculator Table */}
                              <div className="overflow-x-auto mb-4 border border-[#3a3f50] rounded">
                                <table className="w-full text-xs">
                                  <thead className="bg-[#242424] border-b border-[#3a3f50]">
                                    <tr>
                                      <th className="px-3 py-2 text-left text-[#50D2C1] font-bold">
                                        Price
                                      </th>
                                      <th className="px-3 py-2 text-left text-[#50D2C1] font-bold">
                                        Amount
                                      </th>
                                      <th className="px-3 py-2 text-left text-[#50D2C1] font-bold">
                                        Leverage
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {calcRows.map((row, index) => (
                                      <tr
                                        key={index}
                                        className="border-b border-[#50D2C1] hover:bg-[#50D2C1]"
                                      >
                                        <td className="px-3 py-2">
                                          <input
                                            type="number"
                                            placeholder="Enter price"
                                            value={row.price}
                                            onChange={(e) =>
                                              handleCalculatorRowChange(
                                                index,
                                                "price",
                                                e.target.value,
                                              )
                                            }
                                            className="w-full bg-[#50D2C1] border border-[#50D2C1] text-white px-2 py-1 rounded text-xs focus:outline-none focus:border-[#50D2C1]"
                                          />
                                        </td>
                                        <td className="px-3 py-2">
                                          <input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={row.amount}
                                            onChange={(e) =>
                                              handleCalculatorRowChange(
                                                index,
                                                "amount",
                                                e.target.value,
                                              )
                                            }
                                            className="w-full bg-[#1a1a1a] border border-[#3a3f50] text-white px-2 py-1 rounded text-xs focus:outline-none focus:border-[#50D2C1]"
                                          />
                                        </td>
                                        <td className="px-3 py-2">
                                          <input
                                            type="number"
                                            placeholder="x"
                                            value={row.leverage}
                                            onChange={(e) =>
                                              handleCalculatorRowChange(
                                                index,
                                                "leverage",
                                                e.target.value,
                                              )
                                            }
                                            className="w-full bg-[#1a1a1a] border border-[#3a3f50] text-white px-2 py-1 rounded text-xs focus:outline-none focus:border-[#50D2C1]"
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* PNL Calculator */}
                              <div className="space-y-6">
                                {/* Position Selector */}
                                <div className="flex gap-3 mb-6">
                                  <button
                                    onClick={() => setPositionType("UP")}
                                    className={`flex-1 py-2 rounded-l font-semibold text-sm transition ${
                                      positionType === "UP"
                                        ? "bg-[#50D2C1] text-black"
                                        : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
                                    }`}
                                  >
                                    Position UP
                                  </button>
                                  <button
                                    onClick={() => setPositionType("DOWN")}
                                    className={`flex-1 py-2 rounded-r font-semibold text-sm transition ${
                                      positionType === "DOWN"
                                        ? "bg-[#50D2C1] text-black"
                                        : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
                                    }`}
                                  >
                                    Position DOWN
                                  </button>
                                </div>

                                {/* Section 1: Calculation of PNL and PNL% - Table Format */}
                                <div>
                                  <h3 className="text-white font-semibold text-center mb-4 text-sm">
                                    Calculation of PNL and PNL%
                                  </h3>
                                  <div className="border border-[#3a3f50] rounded-lg overflow-hidden mb-6">
                                    <table className="w-full">
                                      <tbody className="divide-y divide-[#3a3f50]">
                                        {/* Row 1: Sell Price and Buy Price */}
                                        <tr>
                                          <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
                                            Sell Price
                                          </td>
                                          <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
                                            <input
                                              type="number"
                                              placeholder="Enter value"
                                              value={pnlCalcData.sellPrice}
                                              onChange={(e) =>
                                                setPnlCalcData((prev) => ({
                                                  ...prev,
                                                  sellPrice: e.target.value,
                                                }))
                                              }
                                              className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
                                            />
                                          </td>
                                          <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
                                            Buy Price
                                          </td>
                                          <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
                                            <input
                                              type="number"
                                              placeholder="Enter value"
                                              value={pnlCalcData.buyPrice}
                                              onChange={(e) =>
                                                setPnlCalcData((prev) => ({
                                                  ...prev,
                                                  buyPrice: e.target.value,
                                                }))
                                              }
                                              className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
                                            />
                                          </td>
                                        </tr>

                                        {/* Row 2: Amount and Leverage */}
                                        <tr>
                                          <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
                                            Amount (optional)
                                          </td>
                                          <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
                                            <input
                                              type="number"
                                              placeholder="Optional for"
                                              value={pnlCalcData.amount}
                                              onChange={(e) =>
                                                setPnlCalcData((prev) => ({
                                                  ...prev,
                                                  amount: e.target.value,
                                                }))
                                              }
                                              className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
                                            />
                                          </td>
                                          <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
                                            Leverage
                                          </td>
                                          <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
                                            <input
                                              type="number"
                                              placeholder="x"
                                              value={pnlCalcData.leverage}
                                              onChange={(e) =>
                                                setPnlCalcData((prev) => ({
                                                  ...prev,
                                                  leverage: e.target.value,
                                                }))
                                              }
                                              className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                {/* Section 2: Calculation of the SELL Price */}
                                <div>
                                  <h3 className="text-white font-semibold text-center mb-4 text-sm">
                                    Calculation of the SELL Price
                                  </h3>
                                  <div className="border border-[#3a3f50] rounded-lg overflow-hidden mb-4">
                                    <table className="w-full">
                                      <tbody className="divide-y divide-[#3a3f50]">
                                        <tr>
                                          <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-fit">
                                            Buy Price
                                          </td>
                                          <td className="px-4 py-3 bg-[#1a1a1a] w-1/3">
                                            <input
                                              type="number"
                                              placeholder="Enter value"
                                              className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
                                            />
                                          </td>
                                          <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-fit">
                                            PNL%
                                          </td>
                                          <td className="px-4 py-3 bg-[#1a1a1a] w-1/3">
                                            <input
                                              type="number"
                                              placeholder="Enter %"
                                              className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/3">
                                            Leverage
                                          </td>
                                          <td
                                            colSpan={3}
                                            className="px-4 py-3 bg-[#1a1a1a] w-2/3"
                                          >
                                            <input
                                              type="number"
                                              placeholder="Enter value"
                                              className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>

                                  {/* Calculate Button */}
                                  {/* <button 
                                    onClick={calculatePNL}
                                    className="w-full py-3 rounded border-2 border-[#50D2C1] text-[#50D2C1] font-bold text-sm hover:bg-[#50D2C1]/10 transition"
                                  >
                                    Calculate
                                  </button> */}

                                  {/* Results Table */}
                                  {/* {(pnlCalcData.results.pnl !== 0 || pnlCalcData.results.pnlPercent !== 0 || pnlCalcData.results.sellPrice !== 0) && (
                                    <div className="mt-6 border border-[#3a3f50] rounded overflow-hidden">
                                      <table className="w-full text-xs">
                                        <thead className="bg-[#242424] border-b border-[#3a3f50]">
                                          <tr>
                                            <th className="px-4 py-3 text-left text-gray-400 font-semibold">Metric</th>
                                            <th className="px-4 py-3 text-left text-gray-400 font-semibold">Value</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#3a3f50]">
                                          <tr className="hover:bg-[#1a1a1a]/50">
                                            <td className="px-4 py-3 text-gray-400">PNL</td>
                                            <td className={`px-4 py-3 font-bold ${pnlCalcData.results.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                              ${pnlCalcData.results.pnl.toFixed(2)}
                                            </td>
                                          </tr>
                                          <tr className="hover:bg-[#1a1a1a]/50">
                                            <td className="px-4 py-3 text-gray-400">PNL %</td>
                                            <td className={`px-4 py-3 font-bold ${pnlCalcData.results.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                              {pnlCalcData.results.pnlPercent.toFixed(2)}%
                                            </td>
                                          </tr>
                                          <tr className="hover:bg-[#1a1a1a]/50">
                                            <td className="px-4 py-3 text-gray-400">Calculated Sell Price</td>
                                            <td className="px-4 py-3 font-bold text-[#50D2C1]">
                                              ${pnlCalcData.results.sellPrice.toFixed(2)}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            </>
                          )}

                          {/* Calculate Button */}
                          <button
                            onClick={() =>
                              calcTab === "position"
                                ? calculatePosition()
                                : calculatePNL()
                            }
                            className="w-full border-2 border-[#50D2C1] text-[#50D2C1] py-2.5 rounded font-semibold text-sm hover:bg-[#50D2C1] hover:text-black transition"
                          >
                            Calculate
                          </button>
                        </div>

                        {/* Right Section - Results */}
                        <div className="w-full lg:w-64 p-6 bg-[#1a1a1a]">
                          <h3 className="text-[#50D2C1] font-bold mb-4 text-sm">
                            {calcTab === "pnl" ? "PNL Results" : "Results"}
                          </h3>
                          {calcTab === "pnl" ? (
                            <div className="space-y-4 text-sm">
                              <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
                                <span className="text-gray-400">PNL:</span>
                                <span
                                  className={`font-semibold text-lg ${
                                    pnlCalcData.results.pnl >= 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {pnlCalcData.results.pnl}
                                </span>
                              </div>
                              <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
                                <span className="text-gray-400">PNL%:</span>
                                <span
                                  className={`font-semibold text-lg ${
                                    pnlCalcData.results.pnlPercent >= 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {pnlCalcData.results.pnlPercent}%
                                </span>
                              </div>
                              <div className="flex justify-between items-center pt-2">
                                <span className="text-gray-400">
                                  Sell Price:
                                </span>
                                <span className="text-[#50D2C1] font-semibold">
                                  {pnlCalcData.results.sellPrice}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2.5 text-sm">
                              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                                <span className="text-gray-400">Amount:</span>
                                <span className="text-[#50D2C1] font-semibold">
                                  {calcResults.amount.toFixed(4)}
                                </span>
                              </div>
                              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                                <span className="text-gray-400">Price:</span>
                                <span className="text-[#50D2C1] font-semibold">
                                  ${calcResults.price.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                                <span className="text-gray-400">Leverage:</span>
                                <span className="text-[#50D2C1] font-semibold">
                                  {calcResults.leverage.toFixed(2)}x
                                </span>
                              </div>
                              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                                <span className="text-gray-400">Loss Cut:</span>
                                <span
                                  className={`font-semibold ${
                                    calcResults.lossCut > 0
                                      ? "text-red-400"
                                      : "text-[#50D2C1]"
                                  }`}
                                >
                                  ${Math.abs(calcResults.lossCut).toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                                <span className="text-gray-400">Fee:</span>
                                <span
                                  className={`font-semibold ${
                                    calcResults.fee > 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  ${calcResults.fee.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between pt-2">
                                <span className="text-gray-400">Fee %:</span>
                                <span
                                  className={`font-semibold ${
                                    calcResults.feePercent > 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {calcResults.feePercent.toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Pricing Sources Section */}
          <div className="bg-white dark:bg-[#1f1f1f] p-4 rounded-xl my-4 border-none dark:border border-[#242424]">
            <h4 className="text-sm mb-3 font-bold text-[#333] dark:text-gray-300">
              Pricing Sources
            </h4>
            <ul className="space-y-1 text-sm text-[#333] dark:text-gray-300">
              {[
                ["Bitfinex", (currentCoin?.price || 0) - 1],
                ["HTX", (currentCoin?.price || 0) - 0.3],
                ["Binance", currentCoin?.price],
                ["Coinbase", (currentCoin?.price || 0) + 0.5],
                ["Bybit", (currentCoin?.price || 0) + 1.2],
              ].map(([name, amount]) => (
                <li
                  key={name}
                  className="flex justify-between hover:text-orange-400 dark:hover:text-[#50D2C1] transition"
                >
                  <span>{name}</span>
                  <span className="font-mono">
                    ${(amount as number).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chart;
