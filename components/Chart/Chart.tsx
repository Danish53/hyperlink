// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Header from "../shared/header";
// import Footer from "../shared/footer";
// import { X, ChevronUp, ChevronDown, ArrowDown } from "lucide-react";
// import TradingViewChart from "./TradingViewChart";

// interface Order {
//   id: number;
//   symbol: string;
//   amount: number;
//   type: "BUY" | "SELL";
//   orderType: "Limit" | "Market";
//   pnl: string;
//   autoSell: string;
//   status: "filled" | "pending" | "cancelled";
//   filledPrice?: number;
//   timestamp: number;
// }

// interface Balance {
//   [key: string]: number;
// }

// interface Notification {
//   id: number;
//   type: "success" | "error" | "info" | "warning";
//   title: string;
//   message: string;
// }

// interface CoinData {
//   symbol: string;
//   price: number;
//   change24h: number;
//   high24h: number;
//   low24h: number;
//   name: string;
// }

// const Chart = ({ session }: { session: any }) => {
//   const [activeTableTab, setActiveTableTab] = useState("Positions");
//   const [selectedCoin, setSelectedCoin] = useState("BTC");
//   const [orderType, setOrderType] = useState<"Limit" | "Market">("Limit");
//   const [amount, setAmount] = useState(0);
//   const [price, setPrice] = useState<number | string>("");
//   const [stopLoss, setStopLoss] = useState<number | string>("");
//   const [leverage, setLeverage] = useState(10);
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [autoSell, setAutoSell] = useState("OFF");
//   const [mockOrders, setMockOrders] = useState<Order[]>([]);
//   const [utcTime, setUtcTime] = useState("");
//   const [calcTab, setCalcTab] = useState<"position" | "pnl">("position");
//   const [positionType, setPositionType] = useState<"UP" | "DOWN">("UP");
//   const [calcRows, setCalcRows] = useState([
//     { price: "", amount: "", leverage: "" },
//     { price: "", amount: "", leverage: "" },
//     { price: "", amount: "", leverage: "" },
//     { price: "", amount: "", leverage: "" },
//     { price: "", amount: "", leverage: "" },
//   ]);
//   const [calcResults, setCalcResults] = useState({
//     amount: 0,
//     price: 0,
//     leverage: 0,
//     lossCut: 0,
//     fee: 0,
//     feePercent: 0,
//   });
//   const [pnlCalcData, setPnlCalcData] = useState({
//     sellPrice: "",
//     buyPrice: "",
//     amount: "",
//     leverage: "",
//     pnlPercent: "",
//     results: {
//       pnl: 0,
//       pnlPercent: 0,
//       sellPrice: 0,
//     },
//   });
//   const [open, setOpen] = useState(false);

//   // ...existing code...
//   const [balances, setBalances] = useState<Balance>({
//     BTC: 0.5,
//     ETH: 5.0,
//     USDT: 1000.0,
//   });

//   const [coinPrices, setCoinPrices] = useState<{ [key: string]: CoinData }>({
//     BTC: {
//       symbol: "BTC/USDT",
//       price: 108234.56,
//       change24h: -2.11,
//       high24h: 111290,
//       low24h: 106710,
//       name: "BTC"
//     },
//     ETH: {
//       symbol: "ETH/USDT",
//       price: 3456.78,
//       change24h: 1.45,
//       high24h: 3520,
//       low24h: 3400,
//       name: "ETH"
//     },
//     USDT: {
//       symbol: "USDT/USDT",
//       price: 1.0,
//       change24h: 0,
//       high24h: 1.01,
//       low24h: 0.99,
//       name: "USDT"
//     },
//   });

//   const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       const hoursNum = now.getUTCHours();
//       const hours = hoursNum.toString().padStart(2, "0");
//       const minutes = now.getUTCMinutes().toString().padStart(2, "0");
//       const seconds = now.getUTCSeconds().toString().padStart(2, "0");
//       const ampm = hoursNum >= 12 ? "PM" : "AM";
//       const hour12 = (hoursNum % 12 || 12).toString().padStart(2, "0");

//       setUtcTime(`${hour12}:${minutes}:${seconds} ${ampm}`);
//     };

//     updateTime();
//     const interval = setInterval(updateTime, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // Simulate realistic price movements
//   useEffect(() => {
//     const priceInterval = setInterval(() => {
//       setCoinPrices((prev) => {
//         const updated = { ...prev };
//         Object.keys(updated).forEach((coin) => {
//           if (coin !== "USDT") {
//             const volatility = 0.002;
//             const change = (Math.random() - 0.5) * 2 * volatility;
//             const newPrice = updated[coin].price * (1 + change);
//             updated[coin] = {
//               ...updated[coin],
//               price: parseFloat(newPrice.toFixed(2)),
//             };
//           }
//         });
//         return updated;
//       });
//     }, 3000);

//     return () => clearInterval(priceInterval);
//   }, []);

//   const showNotification = (
//     type: "success" | "error" | "info" | "warning",
//     title: string,
//     message: string,
//   ) => {
//     const id = Date.now();
//     const notification: Notification = { id, type, title, message };
//     setNotifications((prev) => [...prev, notification]);

//     setTimeout(() => {
//       setNotifications((prev) => prev.filter((n) => n.id !== id));
//     }, 5000);
//   };

//   const removeNotification = (id: number) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   const getCurrentMarketPrice = (): number => {
//     const basePrice = coinPrices[selectedCoin]?.price || 100000;
//     const variance = basePrice * 0.0005;
//     return basePrice + (Math.random() - 0.5) * variance * 2;
//   };

//   const handleLimitOrder = (orderData: Order) => {
//     setPendingOrders((prev) => [...prev, { ...orderData, status: "pending" }]);

//     setTimeout(() => {
//       const currentPrice = getCurrentMarketPrice();
//       const targetPrice = Number(orderData.filledPrice || orderData.amount);
//       const priceRange = targetPrice * 0.02;

//       const isPriceMatched =
//         orderData.type === "BUY"
//           ? currentPrice <= targetPrice + priceRange
//           : currentPrice >= targetPrice - priceRange;

//       if (isPriceMatched) {
//         executeTrade(orderData, currentPrice, "filled");
//         setPendingOrders((prev) => prev.filter((o) => o.id !== orderData.id));
//         showNotification(
//           "success",
//           "Order Filled",
//           `Limit order for ${
//             orderData.symbol
//           } filled at $${currentPrice.toFixed(2)}`,
//         );
//       } else {
//         setPendingOrders((prev) =>
//           prev.map((o) =>
//             o.id === orderData.id ? { ...o, status: "pending" } : o,
//           ),
//         );
//       }
//     }, 2000);
//   };

//   const handleMarketOrder = (orderData: Order) => {
//     const currentPrice = getCurrentMarketPrice();
//     executeTrade(orderData, currentPrice, "filled");
//   };

//   const executeTrade = (
//     orderData: Order,
//     filledPrice: number,
//     status: "filled" | "cancelled",
//   ) => {
//     const quantity = orderData.amount;
//     const baseCoin = selectedCoin;
//     const positionValue = quantity * filledPrice;
//     const fee = positionValue * 0.001;

//     setBalances((prev) => {
//       const newBalances = { ...prev };

//       if (orderData.type === "BUY") {
//         newBalances.USDT = (newBalances.USDT || 0) - (positionValue + fee);
//         newBalances[baseCoin] = (newBalances[baseCoin] || 0) + quantity;
//       } else if (orderData.type === "SELL") {
//         newBalances.USDT = (newBalances.USDT || 0) + (positionValue - fee);
//         newBalances[baseCoin] = (newBalances[baseCoin] || 0) - quantity;
//       }

//       Object.keys(newBalances).forEach((key) => {
//         if (newBalances[key] < 0.00001) newBalances[key] = 0;
//       });

//       return newBalances;
//     });

//     const pnlPercent = (Math.random() * 6 - 3).toFixed(2);
//     const executedOrder: Order = {
//       ...orderData,
//       status,
//       filledPrice,
//       pnl: `${pnlPercent}%`,
//     };

//     setMockOrders((prev) => [executedOrder, ...prev]);
//   };

//   const validateOrder = (
//     buyAmount: number,
//     orderPrice: string | number,
//   ): boolean => {
//     if (!buyAmount || buyAmount <= 0) {
//       showNotification(
//         "error",
//         "Invalid Amount",
//         "Please enter a valid amount",
//       );
//       return false;
//     }

//     if (orderType === "Limit" && (!orderPrice || Number(orderPrice) <= 0)) {
//       showNotification(
//         "error",
//         "Invalid Price",
//         "Please enter a valid limit price",
//       );
//       return false;
//     }

//     const effectivePrice =
//       orderType === "Market" ? getCurrentMarketPrice() : Number(orderPrice);
//     const requiredUSDT = buyAmount * effectivePrice;

//     if (selectedCoin === "USDT" && balances.USDT < buyAmount) {
//       showNotification(
//         "error",
//         "Insufficient Balance",
//         `Required: ${buyAmount.toFixed(
//           2,
//         )} USDT, Available: ${balances.USDT.toFixed(2)} USDT`,
//       );
//       return false;
//     }

//     if (selectedCoin !== "USDT" && balances.USDT < requiredUSDT) {
//       showNotification(
//         "error",
//         "Insufficient Balance",
//         `Required: ${requiredUSDT.toFixed(
//           2,
//         )} USDT, Available: ${balances.USDT.toFixed(2)} USDT`,
//       );
//       return false;
//     }

//     if (
//       selectedCoin !== "USDT" &&
//       buyAmount > 0 &&
//       balances[selectedCoin] < buyAmount
//     ) {
//       showNotification(
//         "error",
//         "Insufficient Balance",
//         `Required: ${buyAmount.toFixed(
//           4,
//         )} ${selectedCoin}, Available: ${balances[selectedCoin].toFixed(
//           4,
//         )} ${selectedCoin}`,
//       );
//       return false;
//     }

//     return true;
//   };

//   const handleCalculatorRowChange = (
//     index: number,
//     field: "price" | "amount" | "leverage",
//     value: string,
//   ) => {
//     const newRows = [...calcRows];
//     newRows[index][field] = value;
//     setCalcRows(newRows);
//   };

//   const calculatePosition = () => {
//     // Get the first row with complete data
//     const dataRow = calcRows.find(
//       (row) => row.price && row.amount && row.leverage,
//     );
//     if (!dataRow) {
//       showNotification(
//         "error",
//         "Invalid Input",
//         "Please fill in Price, Amount, and Leverage",
//       );
//       return;
//     }

//     const price = parseFloat(dataRow.price) || 0;
//     const amount = parseFloat(dataRow.amount) || 0;
//     const leverage = parseFloat(dataRow.leverage) || 1;

//     // Calculate position details
//     const positionValue = price * amount;
//     const fee = positionValue * 0.001; // 0.1% fee
//     const feePercent = 0.1;
//     const lossCut = positionValue * (leverage / 100); // Loss cut based on leverage

//     setCalcResults({
//       amount: parseFloat(amount.toFixed(4)),
//       price: parseFloat(price.toFixed(2)),
//       leverage: parseFloat(leverage.toFixed(2)),
//       lossCut: parseFloat(lossCut.toFixed(2)),
//       fee: parseFloat(fee.toFixed(2)),
//       feePercent: feePercent,
//     });

//     showNotification(
//       "success",
//       "Calculation Complete",
//       `Position ${positionType} calculated successfully`,
//     );
//   };

//   const calculatePNL = () => {
//     const buyPrice = parseFloat(pnlCalcData.buyPrice) || 0;
//     const sellPrice = parseFloat(pnlCalcData.sellPrice) || 0;
//     const amount = parseFloat(pnlCalcData.amount) || 0;
//     const leverage = parseFloat(pnlCalcData.leverage) || 1;
//     const pnlPercent = parseFloat(pnlCalcData.pnlPercent) || 0;

//     if (!buyPrice || !sellPrice) {
//       showNotification(
//         "error",
//         "Invalid Input",
//         "Please enter Buy Price and Sell Price",
//       );
//       return;
//     }

//     const priceDifference = sellPrice - buyPrice;
//     const calculatedPNL = priceDifference * (amount || 1) * leverage;
//     const calculatedPNLPercent = (priceDifference / buyPrice) * 100 || 0;
//     const calculatedSellPrice =
//       positionType === "DOWN"
//         ? buyPrice - buyPrice * (pnlPercent / 100)
//         : buyPrice + buyPrice * (pnlPercent / 100);

//     setPnlCalcData((prev) => ({
//       ...prev,
//       results: {
//         pnl: parseFloat(calculatedPNL.toFixed(2)),
//         pnlPercent: parseFloat(calculatedPNLPercent.toFixed(2)),
//         sellPrice: parseFloat(calculatedSellPrice.toFixed(2)),
//       },
//     }));

//     showNotification(
//       "success",
//       "PNL Calculated",
//       `PNL: $${calculatedPNL.toFixed(2)} (${calculatedPNLPercent.toFixed(2)}%)`,
//     );
//   };

//   const handleOrderSubmit = (type: "BUY" | "SELL") => {
//     if (amount <= 0) {
//       showNotification(
//         "error",
//         "Invalid Amount",
//         "Please enter an amount greater than 0",
//       );
//       return;
//     }

//     const orderPrice =
//       orderType === "Market"
//         ? getCurrentMarketPrice()
//         : Number(price || amount);

//     if (!validateOrder(amount, orderPrice)) return;

//     const order: Order = {
//       id: Date.now(),
//       symbol: `${selectedCoin}/USDT`,
//       type,
//       orderType,
//       amount: amount,
//       filledPrice: orderPrice,
//       pnl: "0%",
//       autoSell,
//       status: "pending",
//       timestamp: Date.now(),
//     };

//     if (orderType === "Limit") {
//       handleLimitOrder(order);
//       showNotification(
//         "info",
//         "Limit Order Placed",
//         `${type} ${amount.toFixed(4)} ${selectedCoin} at $${orderPrice.toFixed(
//           2,
//         )} - waiting for price match`,
//       );
//     } else {
//       handleMarketOrder(order);
//       showNotification(
//         "success",
//         "Market Order Executed",
//         `${type} ${amount.toFixed(4)} ${selectedCoin} at $${orderPrice.toFixed(
//           2,
//         )}`,
//       );
//     }

//     setAmount(0);
//     setPrice("");
//   };

//   const increaseAmount = () => setAmount((prev) => prev + 10);
//   const decreaseAmount = () =>
//     setAmount((prev) => (prev - 10 >= 0 ? prev - 10 : 0));

//   const handleSlider = (value: string) => {
//     const percent = parseInt(value, 10);
//     const maxAmount = balances[selectedCoin] || 0;
//     setAmount(parseFloat(((percent / 100) * maxAmount).toFixed(4)));
//   };

//   const cancelPendingOrder = (orderId: number) => {
//     setPendingOrders((prev) => prev.filter((o) => o.id !== orderId));
//     setMockOrders((prev) =>
//       prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o)),
//     );
//     showNotification(
//       "warning",
//       "Order Cancelled",
//       "Pending order has been cancelled",
//     );
//   };

//   const renderTableRows = () => {
//     const displayOrders =
//       activeTableTab === "Positions"
//         ? mockOrders.filter((o) => o.status === "filled")
//         : mockOrders.filter((o) => o.status !== "cancelled");

//     if (displayOrders.length === 0)
//       return (
//         <tr>
//           <td colSpan={11} className="text-center py-6 text-gray-500">
//             No {activeTableTab.toLowerCase()} yet
//           </td>
//         </tr>
//       );

//     return displayOrders.map((order) => (
//       <tr
//         key={order.id}
//         className="border-b border-[#242424] hover:bg-[#2a2a2a]"
//       >
//         <td className="px-2 py-2">{order.symbol}</td>
//         <td className="px-2 py-2">{order.amount.toFixed(4)}</td>
//         <td className="px-2 py-2">{leverage}x</td>
//         <td className="px-2 py-2">${(order.filledPrice || 0).toFixed(2)}</td>
//         <td className="px-2 py-2">
//           ${((order.filledPrice || 0) * 0.95).toFixed(2)}
//         </td>
//         <td className="px-2 py-2">
//           ${((order.filledPrice || 0) * 0.9).toFixed(2)}
//         </td>
//         <td className="px-2 py-2">
//           <button className="text-[#50D2C1] hover:underline text-xs">
//             Limit
//           </button>
//         </td>
//         <td className="px-2 py-2">
//           <button className="text-red-400 hover:underline text-xs">
//             Market
//           </button>
//         </td>
//         <td
//           className={`px-2 py-2 font-semibold ${
//             order.pnl.includes("-") ? "text-red-500" : "text-green-500"
//           }`}
//         >
//           {order.pnl}
//         </td>
//       </tr>
//     ));
//   };

//   const getNotificationStyles = (type: Notification["type"]) => {
//     const styles = {
//       success: "bg-green-500/20 border-green-500/50 text-green-400",
//       error: "bg-red-500/20 border-red-500/50 text-red-400",
//       warning: "bg-[#50D2C1]/20 border-[#50D2C1]/50 text-[#50D2C1]",
//       info: "bg-blue-500/20 border-blue-500/50 text-blue-400",
//     };
//     return styles[type];
//   };

//   const currentCoin = coinPrices[selectedCoin];

//   return (
//     <div className="text-white bg-white dark:bg-[#0F1A1F] min-h-screen">
//       <Header session={session} />

//       <div className="fixed top-28 right-4 z-50 space-y-6 max-w-md">
//         {notifications.map((notification) => (
//           <div
//             key={notification.id}
//             className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 ${getNotificationStyles(
//               notification.type,
//             )}`}
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex-1">
//                 <p className="font-semibold text-sm text-white">
//                   {notification.title}
//                 </p>
//                 <p className="text-xs opacity-90 mt-1 text-white">
//                   {notification.message}
//                 </p>
//               </div>
//               <button
//                 onClick={() => removeNotification(notification.id)}
//                 className="mt-1 hover:opacity-70 transition"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <main className="bg-white dark:bg-[#0F1A1F] mx-auto w-full flex flex-col mt-18 lg:flex-row  ">
//         <section className="flex-1">
//           {/* trade header tsx starts */}
//           <div
//             className="flex flex-wrap items-center gap-6 p-2 dark:border-none border-2
//            border-gray-300 dark:border-gray-600 shadow-sm  bg-white dark:bg-[#0F1A1F] relative"
//           >
//             <div
//               className="flex items-center gap-2 cursor-pointer relative group"
//               onClick={() => setOpen(!open)}
//             >
//               <svg
//                 width="32"
//                 height="32"
//                 viewBox="0 0 32 32"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={{ transform: "translateY(2px)" }}
//               >
//                 <g clipPath="url(#clip0_623_29714)">
//                   <path
//                     d="M20.4523 14.5389C20.471 16.2176 20.1196 17.8218 19.4292 19.3544C18.4434 21.5368 16.0799 23.3213 13.9218 21.4218C12.1616 19.8736 11.8351 16.7306 9.19798 16.2705C5.7088 15.8477 5.62483 19.8923 3.34536 20.3492C0.804661 20.8653 -0.0380915 16.5938 -0.000774032 14.6539C0.0365434 12.714 0.552769 9.98759 2.76072 9.98759C5.30142 9.98759 5.47245 13.8332 8.69731 13.6249C11.8911 13.4073 11.947 9.40624 14.0337 7.69329C15.8343 6.2135 17.952 7.29847 19.0125 9.07982C19.9952 10.7275 20.4274 12.6612 20.4492 14.5389H20.4523Z"
//                     fill="#46c4b3"
//                   ></path>
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_623_29714">
//                     <rect width="32" height="32" fill="white"></rect>
//                   </clipPath>
//                 </defs>
//               </svg>
//               <span className="font-semibold text-[#333] dark:text-white">
//                 {selectedCoin} (Bitcoin) / USDT
//               </span>
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 11 11"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={{ transform: "rotate(180deg)" }}
//               >
//                 <path
//                   d="M1.375 7.7915L5.5 3.6665L9.625 7.7915"
//                   stroke-width="0.7"
//                   stroke="#fff"
//                 ></path>
//               </svg>

//               {/* Dropdown List - Dynamic Coin List */}
//               {open && (
//                 <div className="absolute top-full left-0 mt-2 bg-[#1b1f2e] border border-gray-700 rounded-lg shadow-xl z-50 w-100 overflow-hidden">
//                   {/* <div className="px-4 py-3 border-b border-gray-700 bg-[#161928]">
//                     <h3 className="text-sm font-semibold text-white">All Markets</h3>
//                   </div> */}
//                   <div className="overflow-y-auto max-h-96">
//                     <table className="w-full text-xs">
//                       <thead className="bg-[#242424] border-b border-gray-700 sticky top-0">
//                         <tr>
//                           <th className="text-left px-3 py-2 text-gray-400 font-semibold">
//                             Symbol
//                           </th>
//                           <th className="text-right px-3 py-2 text-gray-400 font-semibold">
//                             Price
//                           </th>
//                           <th className="text-right px-3 py-2 text-gray-400 font-semibold">
//                             24H Change
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="text-white">
//                         {Object.entries(coinPrices).map(([symbol, data]) => (
//                           <tr
//                             key={symbol}
//                             className="border-b border-gray-800 hover:bg-[#222638] cursor-pointer transition"
//                             onClick={() => {
//                               setSelectedCoin(symbol);
//                               setOpen(false);
//                             }}
//                           >
//                             <td className="px-3 py-2.5 font-semibold flex items-center gap-2">
//                               <span className="text-gray-400">☆</span>
//                               <div>
//                                 <div className="font-bold">{data.symbol}</div>
//                                 <div className="text-gray-500 text-xs">
//                                   {data?.name || "USDT"}
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="text-right px-3 py-2.5">
//                               ${data.price.toFixed(2)}
//                             </td>
//                             <td
//                               className={`text-right px-3 py-2.5 font-semibold ${
//                                 data.change24h < 0
//                                   ? "text-red-500"
//                                   : "text-green-500"
//                               }`}
//                             >
//                               {data.change24h > 0 ? "+" : ""}
//                               {data.change24h.toFixed(2)}%
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="text-[12px]">
//               <span>Price</span>
//               <span
//                 className={
//                   currentCoin?.change24h! < 0
//                     ? "font-semibold text-red-500 flex"
//                     : "font-semibold text-green-500 flex"
//                 }
//               >
//                 {" "}
//                 {(currentCoin?.price || 0).toFixed(2)}
//               </span>
//             </div>

//             <div className="text-[12px]">
//               <div className="flex flex-col">
//                 <div>
//                   <span className="dark:text-white text-gray-600">
//                     24h Change
//                   </span>
//                   <br />
//                   <span
//                     className={
//                       currentCoin?.change24h! < 0
//                         ? "font-semibold text-red-500 flex"
//                         : "font-semibold text-green-500 flex"
//                     }
//                   >
//                     {" "}
//                     {(
//                       ((currentCoin?.price || 0) *
//                         (currentCoin?.change24h || 0)) /
//                       100
//                     ).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={
//                 currentCoin?.change24h! < 0
//                   ? "text-red-500 font-semibold text-[12px]"
//                   : "text-green-500 font-semibold text-[12px]"
//               }
//             >
//               {currentCoin?.change24h! > 0 ? "+" : ""}
//               {currentCoin?.change24h?.toFixed(2)}%
//             </div>

//               <div className="flex flex-col text-[12px]">
//                 <div className="text-[#333] dark:text-white">24 High:</div>
//                 <div className="text-green-500 font-semibold">
//                   {" "}
//                   {currentCoin?.high24h}
//                 </div>
//               </div>

//               <div className="flex flex-col text-[12px]">
//                 <div className="text-[#333] dark:text-white">24h Low:</div>
//                 <div className="text-red-500 font-semibold">
//                   {" "}
//                   {currentCoin?.low24h}
//                 </div>
//               </div>

//             <div className="flex text-[12px] gap-3 text-base items-center">
//               <div className="flex flex-col">
//                 <div className="text-[#333] dark:text-gray-300 font-semibold">
//                   FYBIT INDEX ({selectedCoin}):
//                 </div>
//                 <div className="text-red-500 font-semibold">
//                   {" "}
//                   ${currentCoin?.price.toFixed(2)}
//                 </div>
//               </div>

//               <div className="text-gray-300 flex flex-col text-[12px] ml-4">
//                 <div className="text-[#333] dark:text-white font-semibold">
//                   TIME: <span className="font-semibold">{utcTime}</span>
//                 </div>
//                 <div className="font-semibold text-[#333] dark:text-white">
//                   {" "}
//                   (UTC)
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* trade header tsx ends */}
//           {open && (
//             <div
//               className="fixed inset-0 z-30"
//               onClick={() => setOpen(false)}
//             ></div>
//           )}
//           <div className="border border-[#242424] rounded-xl relative">
//             <div>
//               <TradingViewChart symbol={selectedCoin} />
//             </div>
//           </div>
//           <div className=" rounded-xl p-4  mt-5 shadow-lg w-full">
//             <div className="flex gap-1 border-b border-[#2c2c2c] pb-2 mb-4 text-sm w-full">
//               {[
//                 "Positions",
//                 "Open Orders",
//                 "Closed Positions",
//                 "Realised PnL",
//               ].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTableTab(tab)}
//                   className={`
//         flex-1
//         p-4
//         rounded-t-lg
//         font-medium
//         transition-all
//         duration-200

//         ${
//           activeTableTab === tab
//             ? "dark:bg-[#50D2C1] text-black dark:border-[#50D2C1] border-[#50D2C1] border border-l-[3px] border-r-[3px] border-t-[4px] border-b-[1px]-[#9e9e9e]"
//             : "dark:bg-[#0d1117] text-[#333]  dark:text-gray-300 border border-[2px] border-[#9e9e9e] dark:border-[#1b242e] dark:hover:bg-[#16202d]"
//         }
//       `}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {pendingOrders.length > 0 && (
//               <div className="mb-4 p-3 bg-yellow-600/10 border border-yellow-600/40 rounded text-[#50D2C1] text-sm">
//                 {pendingOrders.length} pending limit order(s) waiting for price
//                 match...
//                 {pendingOrders.map((order) => (
//                   <div
//                     key={order.id}
//                     className="flex justify-between mt-2 text-yellow-300"
//                   >
//                     <span>
//                       {order.type} {order.amount.toFixed(4)} {selectedCoin} at $
//                       {(order.filledPrice || 0).toFixed(2)}
//                     </span>
//                     <button
//                       onClick={() => cancelPendingOrder(order.id)}
//                       className="text-red-400 hover:text-red-300"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//             <div className="overflow-x-auto rounded-lg border-none dark:border border-[#2c2c2c]">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="bg-[#e4e3e3] dark:bg-[#1b1b1b] text-[#333] dark:text-[#50D2C1] border-b border-[#2c2c2c]">
//                     {[
//                       "Symbol",
//                       "Amount",
//                       "Leverage",
//                       "Price",
//                       "Loss Cut",
//                       "Stop Loss",
//                       "Sell (Limit)",
//                       "Sell (Market)",
//                       "Unrealised PnL (%)",
//                       "Fees (%)",
//                       "Expiration (UTC)",
//                     ].map((th) => (
//                       <th
//                         key={th}
//                         className="py-3 px-3 font-semibold text-left tracking-wide"
//                       >
//                         {th}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-[#222] text-gray-300">
//                   {renderTableRows()}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </section>

//         {/* RIGHT SIDE BAR */}
//         <div className="w-full lg:w-[350px] ">
//           <div className="bg-[#ffffff] dark:bg-[#0F1A1F] p-4 rounded-xl border-none dark:border-[#242424] shadow-sm">
//             <div className="flex gap-1 ">
//               {["BTC", "ETH", "USDT"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setSelectedCoin(tab)}
//                   className={`flex-1 py-2 transition ${
//                     selectedCoin === tab
//                       ? "border-b-2 text-[12px] border-b-[#50D2C1] text-[#50D2C1]"
//                       : " text-[#333] text-[12px] dark:text-white"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//             <form
//               className="mt-2  dark:text-white text-[#333] space-y-2"
//               onSubmit={(e) => e.preventDefault()}
//             >
//               <div className=" text-[12px] text-[#333333] dark:text-gray-200 mt-3">
//                 <p>
//                   Balance:{" "}
//                   {balances[selectedCoin]?.toFixed(
//                     selectedCoin === "USDT" ? 2 : 5,
//                   ) || "0.00"}{" "}
//                   {selectedCoin}
//                 </p>
//                 <p>
//                   Available:{" "}
//                   {(balances[selectedCoin] * 0.95)?.toFixed(
//                     selectedCoin === "USDT" ? 2 : 5,
//                   ) || "0.00"}{" "}
//                   {selectedCoin}
//                 </p>
//               </div>

//               <div className="flex justify-between text-[12px] text-[ #333] dark:text-gray-200">
//                 <span>Min: 5.00 {selectedCoin}</span>
//                 <span>
//                   Max: {balances[selectedCoin]?.toFixed(2) || "0.00"}{" "}
//                   {selectedCoin}
//                 </span>
//               </div>

//               <div className="flex gap-2">
//                 {["Limit", "Market"].map((label) => (
//                   <button
//                     key={label}
//                     type="button"
//                     onClick={() => setOrderType(label as "Limit" | "Market")}
//                     className={`flex-1 py-2 rounded transition ${
//                       orderType === label
//                         ? "border-b-2 text-[12px] border-b-[#50D2C1] text-[#50D2C1]"
//                         : "text-[#333] text-[12px] dark:text-white"
//                     }`}
//                   >
//                     {label}
//                   </button>
//                 ))}
//               </div>

//               <div className="flex items-center rounded overflow-hidden gap-1 justify-around py-1">
//                 <div className="flex items-center gap-1">
//                   <label className="text-sm text-[#333] dark:text-gray-300">
//                     Amount /
//                     <span className="text-[#50D2C1] dark:text-[#50D2C1]">
//                       {" "}
//                       All
//                     </span>
//                   </label>
//                 </div>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     placeholder="0"
//                     value={amount || ""}
//                     onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
//                     step="0.0001"
//                     className="dark:bg-[#2b2d40] border dark:border-none bg-white text-right w-[150px] text-[#333] dark:text-white px-2 py-1 rounded outline-none pr-6"
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setAmount((prev) => parseFloat((prev + 0.1).toFixed(4)))
//                     }
//                     className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
//                   >
//                     <ChevronUp size={14} />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setAmount((prev) =>
//                         Math.max(parseFloat((prev - 0.1).toFixed(4)), 0),
//                       )
//                     }
//                     className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
//                   >
//                     <ChevronDown size={14} />
//                   </button>
//                 </div>
//                 <div>
//                   <span className="px-3 text-[#333] dark:text-gray-300 text-sm">
//                     {selectedCoin}
//                   </span>
//                 </div>
//               </div>
//               <input
//                 type="range"
//                 className="w-full  accent-[#50D2C1] dark:accent-[#50D2C1]"
//                 value={(amount / (balances[selectedCoin] || 1000)) * 100}
//                 onChange={(e) => handleSlider(e.target.value)}
//               />
//               <div className="flex justify-between text-xs text-gray-500">
//                 {["0%", "25%", "50%", "75%", "100%"].map((v) => (
//                   <span key={v}>{v}</span>
//                 ))}
//               </div>

//               {orderType === "Limit" && (
//                 <div className="flex items-center rounded overflow-hidden gap-1 justify-around py-1">
//                   <div className="flex items-center gap-1">
//                     <label className="text-sm text-[#333] dark:text-gray-300">
//                       Limit Price
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       placeholder={`${currentCoin?.price.toFixed(2)}`}
//                       value={price || ""}
//                       onChange={(e) => setPrice(e.target.value)}
//                       step="0.01"
//                       className="border dark:border-none bg-white dark:bg-[#2b2d40] text-right w-[150px] text-[#333] dark:text-white px-2 py-1 rounded outline-none pr-6"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setPrice((prev) => (Number(prev) || 0) + 10)
//                       }
//                       className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
//                     >
//                       <ChevronUp size={14} />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setPrice((prev) =>
//                           Math.max((Number(prev) || 0) - 10, 0),
//                         )
//                       }
//                       className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
//                     >
//                       <ChevronDown size={14} />
//                     </button>
//                   </div>
//                   <div>
//                     <span className="px-3 text-[#333] dark:text-gray-300 text-sm">
//                       USDT
//                     </span>
//                   </div>
//                 </div>
//               )}

//               <div className="space-y-3">
//                 <div className="flex items-center justify-between rounded-md py-2">
//                   <div>
//                     <label className="text-sm text-[#333] dark:text-gray-300 w-24 flex items-center">
//                       Stop Loss
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       placeholder="Enter stop loss"
//                       value={stopLoss || ""}
//                       onChange={(e) => setStopLoss(Number(e.target.value))}
//                       className="flex-1 bg-white border dark:border-none dark:bg-[#2b2d40] text-right text-[#333] dark:text-white w-[150px] px-2 py-1 rounded outline-none pr-6"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setStopLoss((prev) => Number(prev || 0) + 1)
//                       }
//                       className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
//                     >
//                       <ChevronUp size={14} />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setStopLoss((prev) =>
//                           Math.max(Number(prev || 0) - 1, 0),
//                         )
//                       }
//                       className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
//                     >
//                       <ChevronDown size={14} />
//                     </button>
//                   </div>
//                   <div>
//                     <span className="text-[#333] dark:text-gray-300 text-sm ml-2">
//                       USDT
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between rounded-md py-2">
//                     <div>
//                       <label className="text-sm text-[#333] dark:text-gray-300 w-24 flex items-center">
//                         Leverage
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="number"
//                         value={leverage || ""}
//                         onChange={(e) => setLeverage(Number(e.target.value))}
//                         className="flex-1 bg-white border dark:border-none dark:bg-[#2b2d40] text-right text-[#333] dark:text-white w-[150px] px-2 py-1 rounded outline-none pr-6"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setLeverage((prev) => (prev || 0) + 1)}
//                         className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
//                       >
//                         <ChevronUp size={14} />
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setLeverage((prev) => Math.max((prev || 1) - 1, 1))
//                         }
//                         className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
//                       >
//                         <ChevronDown size={14} />
//                       </button>
//                     </div>
//                     <div>
//                       <span className="text-[#333] dark:text-gray-300 text-sm ml-2">
//                         X
//                       </span>
//                     </div>
//                   </div>
//                   <input
//                     type="range"
//                     min={1}
//                     max={100}
//                     value={leverage}
//                     onChange={(e) => setLeverage(Number(e.target.value))}
//                     className="w-full accent-[#50D2C1]  dark:accent-[#50D2C1] mt-2"
//                   />

//                   <div className="flex justify-between text-xs text-gray-500 mt-1">
//                     {["1x", "5x", "10x", "25x", "50x", "75x", "100x"].map(
//                       (v) => (
//                         <span key={v}>{v}</span>
//                       ),
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   type="button"
//                   onClick={() => handleOrderSubmit("BUY")}
//                   className="flex-1 text-[12px] text-white dark:text-[#333] bg-green-600 py-3 rounded hover:bg-green-700"
//                 >
//                   Buy Order
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => handleOrderSubmit("SELL")}
//                   className="flex-1 text-white dark:text-[#333] text-[12px] bg-red-600 py-3 rounded hover:bg-red-700"
//                 >
//                   Sell Order
//                 </button>
//               </div>

//               <div>
//                 <h3 className="text-md mb-2">Auto-Sell Setting:</h3>
//                 <div className="flex gap-2">
//                   {["OFF", "100%", "200%", "300%"].map((label) => (
//                     <button
//                       key={label}
//                       type="button"
//                       onClick={() => setAutoSell(label)}
//                       className={`flex-1 py-2 rounded transition ${
//                         autoSell === label
//                           ? "bg-[#50D2C1] text-[#50D2C1] dark:text-white"
//                           : "border-[#50D2C1] dark:border-[#50D2C1] hover:bg-blue-600/20"
//                       }`}
//                     >
//                       {label}
//                     </button>
//                   ))}
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setShowCalculator(true)}
//                   className="w-full bg-[#50D2C1] hover:bg-orange-600 py-2 mt-3 rounded font-semibold"
//                 >
//                   Calculator
//                 </button>

//                 {showCalculator && (
//                   <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
//                     <div className="relative bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
//                       <button
//                         className="absolute top-2.5 right-3 text-gray-400 hover:text-white text-2xl z-10"
//                         onClick={() => setShowCalculator(false)}
//                       >
//                         ✕
//                       </button>

//                       {/* Tab Selection */}
//                       <div className="flex border-b border-[#2a2a2a] sticky top-0 bg-[#1f1f1f]">
//                         <button
//                           onClick={() => setCalcTab("position")}
//                           className={`flex-1 py-3 font-semibold text-sm transition ${
//                             calcTab === "position"
//                               ? "bg-[#50D2C1] text-black"
//                               : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                           }`}
//                         >
//                           Position Calculator
//                         </button>
//                         <button
//                           onClick={() => setCalcTab("pnl")}
//                           className={`flex-1 py-3 font-semibold text-sm transition ${
//                             calcTab === "pnl"
//                               ? "bg-[#50D2C1] text-black"
//                               : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                           }`}
//                         >
//                           PNL Calculator
//                         </button>
//                       </div>

//                       <div className="flex flex-col lg:flex-row">
//                         {/* Left Section - Input Fields */}
//                         <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-[#2a2a2a]">
//                           {calcTab === "position" ? (
//                             <>
//                               {/* Position Type Selection */}
//                               <div className="flex gap-2 mb-4">
//                                 <button
//                                   onClick={() => setPositionType("UP")}
//                                   className={`flex-1 py-2 rounded-l font-semibold text-sm transition ${
//                                     positionType === "UP"
//                                       ? "bg-[#50D2C1] text-black"
//                                       : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                                   }`}
//                                 >
//                                   Position UP
//                                 </button>
//                                 <button
//                                   onClick={() => setPositionType("DOWN")}
//                                   className={`flex-1 py-2 rounded-r font-semibold text-sm transition ${
//                                     positionType === "DOWN"
//                                       ? "bg-[#50D2C1] text-black"
//                                       : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                                   }`}
//                                 >
//                                   Position DOWN
//                                 </button>
//                               </div>

//                               {/* Position Calculator Table */}
//                               <div className="overflow-x-auto mb-4 border border-[#3a3f50] rounded">
//                                 <table className="w-full text-xs">
//                                   <thead className="bg-[#242424] border-b border-[#3a3f50]">
//                                     <tr>
//                                       <th className="px-3 py-2 text-left text-[#50D2C1] font-bold">
//                                         Price
//                                       </th>
//                                       <th className="px-3 py-2 text-left text-[#50D2C1] font-bold">
//                                         Amount
//                                       </th>
//                                       <th className="px-3 py-2 text-left text-[#50D2C1] font-bold">
//                                         Leverage
//                                       </th>
//                                     </tr>
//                                   </thead>
//                                   <tbody>
//                                     {calcRows.map((row, index) => (
//                                       <tr
//                                         key={index}
//                                         className="border-b border-[#50D2C1] hover:bg-[#50D2C1]"
//                                       >
//                                         <td className="px-3 py-2">
//                                           <input
//                                             type="number"
//                                             placeholder="Enter price"
//                                             value={row.price}
//                                             onChange={(e) =>
//                                               handleCalculatorRowChange(
//                                                 index,
//                                                 "price",
//                                                 e.target.value,
//                                               )
//                                             }
//                                             className="w-full bg-[#50D2C1] border border-[#50D2C1] text-white px-2 py-1 rounded text-xs focus:outline-none focus:border-[#50D2C1]"
//                                           />
//                                         </td>
//                                         <td className="px-3 py-2">
//                                           <input
//                                             type="number"
//                                             placeholder="Enter amount"
//                                             value={row.amount}
//                                             onChange={(e) =>
//                                               handleCalculatorRowChange(
//                                                 index,
//                                                 "amount",
//                                                 e.target.value,
//                                               )
//                                             }
//                                             className="w-full bg-[#1a1a1a] border border-[#3a3f50] text-white px-2 py-1 rounded text-xs focus:outline-none focus:border-[#50D2C1]"
//                                           />
//                                         </td>
//                                         <td className="px-3 py-2">
//                                           <input
//                                             type="number"
//                                             placeholder="x"
//                                             value={row.leverage}
//                                             onChange={(e) =>
//                                               handleCalculatorRowChange(
//                                                 index,
//                                                 "leverage",
//                                                 e.target.value,
//                                               )
//                                             }
//                                             className="w-full bg-[#1a1a1a] border border-[#3a3f50] text-white px-2 py-1 rounded text-xs focus:outline-none focus:border-[#50D2C1]"
//                                           />
//                                         </td>
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             </>
//                           ) : (
//                             <>
//                               {/* PNL Calculator */}
//                               <div className="space-y-6">
//                                 {/* Position Selector */}
//                                 <div className="flex gap-3 mb-6">
//                                   <button
//                                     onClick={() => setPositionType("UP")}
//                                     className={`flex-1 py-2 rounded-l font-semibold text-sm transition ${
//                                       positionType === "UP"
//                                         ? "bg-[#50D2C1] text-black"
//                                         : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                                     }`}
//                                   >
//                                     Position UP
//                                   </button>
//                                   <button
//                                     onClick={() => setPositionType("DOWN")}
//                                     className={`flex-1 py-2 rounded-r font-semibold text-sm transition ${
//                                       positionType === "DOWN"
//                                         ? "bg-[#50D2C1] text-black"
//                                         : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                                     }`}
//                                   >
//                                     Position DOWN
//                                   </button>
//                                 </div>

//                                 {/* Section 1: Calculation of PNL and PNL% - Table Format */}
//                                 <div>
//                                   <h3 className="text-white font-semibold text-center mb-4 text-sm">
//                                     Calculation of PNL and PNL%
//                                   </h3>
//                                   <div className="border border-[#3a3f50] rounded-lg overflow-hidden mb-6">
//                                     <table className="w-full">
//                                       <tbody className="divide-y divide-[#3a3f50]">
//                                         {/* Row 1: Sell Price and Buy Price */}
//                                         <tr>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
//                                             Sell Price
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
//                                             <input
//                                               type="number"
//                                               placeholder="Enter value"
//                                               value={pnlCalcData.sellPrice}
//                                               onChange={(e) =>
//                                                 setPnlCalcData((prev) => ({
//                                                   ...prev,
//                                                   sellPrice: e.target.value,
//                                                 }))
//                                               }
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
//                                             Buy Price
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
//                                             <input
//                                               type="number"
//                                               placeholder="Enter value"
//                                               value={pnlCalcData.buyPrice}
//                                               onChange={(e) =>
//                                                 setPnlCalcData((prev) => ({
//                                                   ...prev,
//                                                   buyPrice: e.target.value,
//                                                 }))
//                                               }
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                         </tr>

//                                         {/* Row 2: Amount and Leverage */}
//                                         <tr>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
//                                             Amount (optional)
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
//                                             <input
//                                               type="number"
//                                               placeholder="Optional for"
//                                               value={pnlCalcData.amount}
//                                               onChange={(e) =>
//                                                 setPnlCalcData((prev) => ({
//                                                   ...prev,
//                                                   amount: e.target.value,
//                                                 }))
//                                               }
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
//                                             Leverage
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
//                                             <input
//                                               type="number"
//                                               placeholder="x"
//                                               value={pnlCalcData.leverage}
//                                               onChange={(e) =>
//                                                 setPnlCalcData((prev) => ({
//                                                   ...prev,
//                                                   leverage: e.target.value,
//                                                 }))
//                                               }
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                         </tr>
//                                       </tbody>
//                                     </table>
//                                   </div>
//                                 </div>

//                                 {/* Section 2: Calculation of the SELL Price */}
//                                 <div>
//                                   <h3 className="text-white font-semibold text-center mb-4 text-sm">
//                                     Calculation of the SELL Price
//                                   </h3>
//                                   <div className="border border-[#3a3f50] rounded-lg overflow-hidden mb-4">
//                                     <table className="w-full">
//                                       <tbody className="divide-y divide-[#3a3f50]">
//                                         <tr>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-fit">
//                                             Buy Price
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/3">
//                                             <input
//                                               type="number"
//                                               placeholder="Enter value"
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-fit">
//                                             PNL%
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/3">
//                                             <input
//                                               type="number"
//                                               placeholder="Enter %"
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                         </tr>
//                                         <tr>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/3">
//                                             Leverage
//                                           </td>
//                                           <td
//                                             colSpan={3}
//                                             className="px-4 py-3 bg-[#1a1a1a] w-2/3"
//                                           >
//                                             <input
//                                               type="number"
//                                               placeholder="Enter value"
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                         </tr>
//                                       </tbody>
//                                     </table>
//                                   </div>

//                                   {/* Calculate Button */}
//                                   {/* <button
//                                     onClick={calculatePNL}
//                                     className="w-full py-3 rounded border-2 border-[#50D2C1] text-[#50D2C1] font-bold text-sm hover:bg-[#50D2C1]/10 transition"
//                                   >
//                                     Calculate
//                                   </button> */}

//                                   {/* Results Table */}
//                                   {/* {(pnlCalcData.results.pnl !== 0 || pnlCalcData.results.pnlPercent !== 0 || pnlCalcData.results.sellPrice !== 0) && (
//                                     <div className="mt-6 border border-[#3a3f50] rounded overflow-hidden">
//                                       <table className="w-full text-xs">
//                                         <thead className="bg-[#242424] border-b border-[#3a3f50]">
//                                           <tr>
//                                             <th className="px-4 py-3 text-left text-gray-400 font-semibold">Metric</th>
//                                             <th className="px-4 py-3 text-left text-gray-400 font-semibold">Value</th>
//                                           </tr>
//                                         </thead>
//                                         <tbody className="divide-y divide-[#3a3f50]">
//                                           <tr className="hover:bg-[#1a1a1a]/50">
//                                             <td className="px-4 py-3 text-gray-400">PNL</td>
//                                             <td className={`px-4 py-3 font-bold ${pnlCalcData.results.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                                               ${pnlCalcData.results.pnl.toFixed(2)}
//                                             </td>
//                                           </tr>
//                                           <tr className="hover:bg-[#1a1a1a]/50">
//                                             <td className="px-4 py-3 text-gray-400">PNL %</td>
//                                             <td className={`px-4 py-3 font-bold ${pnlCalcData.results.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                                               {pnlCalcData.results.pnlPercent.toFixed(2)}%
//                                             </td>
//                                           </tr>
//                                           <tr className="hover:bg-[#1a1a1a]/50">
//                                             <td className="px-4 py-3 text-gray-400">Calculated Sell Price</td>
//                                             <td className="px-4 py-3 font-bold text-[#50D2C1]">
//                                               ${pnlCalcData.results.sellPrice.toFixed(2)}
//                                             </td>
//                                           </tr>
//                                         </tbody>
//                                       </table>
//                                     </div>
//                                   )} */}
//                                 </div>
//                               </div>
//                             </>
//                           )}

//                           {/* Calculate Button */}
//                           <button
//                             onClick={() =>
//                               calcTab === "position"
//                                 ? calculatePosition()
//                                 : calculatePNL()
//                             }
//                             className="w-full border-2 border-[#50D2C1] text-[#50D2C1] py-2.5 rounded font-semibold text-sm hover:bg-[#50D2C1] hover:text-black transition"
//                           >
//                             Calculate
//                           </button>
//                         </div>

//                         {/* Right Section - Results */}
//                         <div className="w-full lg:w-64 p-6 bg-[#1a1a1a]">
//                           <h3 className="text-[#50D2C1] font-bold mb-4 text-sm">
//                             {calcTab === "pnl" ? "PNL Results" : "Results"}
//                           </h3>
//                           {calcTab === "pnl" ? (
//                             <div className="space-y-4 text-sm">
//                               <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
//                                 <span className="text-gray-400">PNL:</span>
//                                 <span
//                                   className={`font-semibold text-lg ${
//                                     pnlCalcData.results.pnl >= 0
//                                       ? "text-green-400"
//                                       : "text-red-400"
//                                   }`}
//                                 >
//                                   {pnlCalcData.results.pnl}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
//                                 <span className="text-gray-400">PNL%:</span>
//                                 <span
//                                   className={`font-semibold text-lg ${
//                                     pnlCalcData.results.pnlPercent >= 0
//                                       ? "text-green-400"
//                                       : "text-red-400"
//                                   }`}
//                                 >
//                                   {pnlCalcData.results.pnlPercent}%
//                                 </span>
//                               </div>
//                               <div className="flex justify-between items-center pt-2">
//                                 <span className="text-gray-400">
//                                   Sell Price:
//                                 </span>
//                                 <span className="text-[#50D2C1] font-semibold">
//                                   {pnlCalcData.results.sellPrice}
//                                 </span>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="space-y-2.5 text-sm">
//                               <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
//                                 <span className="text-gray-400">Amount:</span>
//                                 <span className="text-[#50D2C1] font-semibold">
//                                   {calcResults.amount.toFixed(4)}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
//                                 <span className="text-gray-400">Price:</span>
//                                 <span className="text-[#50D2C1] font-semibold">
//                                   ${calcResults.price.toFixed(2)}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
//                                 <span className="text-gray-400">Leverage:</span>
//                                 <span className="text-[#50D2C1] font-semibold">
//                                   {calcResults.leverage.toFixed(2)}x
//                                 </span>
//                               </div>
//                               <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
//                                 <span className="text-gray-400">Loss Cut:</span>
//                                 <span
//                                   className={`font-semibold ${
//                                     calcResults.lossCut > 0
//                                       ? "text-red-400"
//                                       : "text-[#50D2C1]"
//                                   }`}
//                                 >
//                                   ${Math.abs(calcResults.lossCut).toFixed(2)}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
//                                 <span className="text-gray-400">Fee:</span>
//                                 <span
//                                   className={`font-semibold ${
//                                     calcResults.fee > 0
//                                       ? "text-green-400"
//                                       : "text-red-400"
//                                   }`}
//                                 >
//                                   ${calcResults.fee.toFixed(2)}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between pt-2">
//                                 <span className="text-gray-400">Fee %:</span>
//                                 <span
//                                   className={`font-semibold ${
//                                     calcResults.feePercent > 0
//                                       ? "text-green-400"
//                                       : "text-red-400"
//                                   }`}
//                                 >
//                                   {calcResults.feePercent.toFixed(2)}%
//                                 </span>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </form>
//           </div>

//           {/* Pricing Sources Section */}
//           <div className="bg-white dark:bg-[#1f1f1f] p-4 rounded-xl my-4 border-none dark:border border-[#242424]">
//             <h4 className="text-sm mb-3 font-bold text-[#333] dark:text-gray-300">
//               Pricing Sources
//             </h4>
//             <ul className="space-y-1 text-sm text-[#333] dark:text-gray-300">
//               {[
//                 ["Bitfinex", (currentCoin?.price || 0) - 1],
//                 ["HTX", (currentCoin?.price || 0) - 0.3],
//                 ["Binance", currentCoin?.price],
//                 ["Coinbase", (currentCoin?.price || 0) + 0.5],
//                 ["Bybit", (currentCoin?.price || 0) + 1.2],
//               ].map(([name, amount]) => (
//                 <li
//                   key={name}
//                   className="flex justify-between hover:text-orange-400 dark:hover:text-[#50D2C1] transition"
//                 >
//                   <span>{name}</span>
//                   <span className="font-mono">
//                     ${(amount as number).toFixed(2)}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Chart;

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Header from "../shared/header";
// import Footer from "../shared/footer";
// import { X, ChevronUp, ChevronDown, ArrowDown } from "lucide-react";
// import TradingViewChart from "./TradingViewChart";

// interface Order {
//   id: number;
//   symbol: string;
//   amount: number;
//   type: "BUY" | "SELL";
//   orderType: "Limit" | "Market";
//   pnl: string;
//   autoSell: string;
//   status: "filled" | "pending" | "cancelled";
//   filledPrice?: number;
//   timestamp: number;
// }

// interface Balance {
//   [key: string]: number;
// }

// interface Notification {
//   id: number;
//   type: "success" | "error" | "info" | "warning";
//   title: string;
//   message: string;
// }

// interface CoinData {
//   symbol: string;
//   price: number;
//   change24h: number;
//   high24h: number;
//   low24h: number;
//   name: string;
// }

// const Chart = ({ session }: { session: any }) => {
//   const [activeTableTab, setActiveTableTab] = useState("Positions");
//   const [selectedCoin, setSelectedCoin] = useState("BTC");
//   const [orderType, setOrderType] = useState<"Limit" | "Market">("Limit");
//   const [amount, setAmount] = useState(0);
//   const [price, setPrice] = useState<number | string>("");
//   const [stopLoss, setStopLoss] = useState<number | string>("");
//   const [leverage, setLeverage] = useState(10);
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [autoSell, setAutoSell] = useState("OFF");
//   const [mockOrders, setMockOrders] = useState<Order[]>([]);
//   const [utcTime, setUtcTime] = useState("");
//   const [calcTab, setCalcTab] = useState<"position" | "pnl">("position");
//   const [positionType, setPositionType] = useState<"UP" | "DOWN">("UP");
//   const [calcRows, setCalcRows] = useState([
//     { price: "", amount: "", leverage: "" },
//     { price: "", amount: "", leverage: "" },
//     { price: "", amount: "", leverage: "" },
//     { price: "", amount: "", leverage: "" },
//     { price: "", amount: "", leverage: "" },
//   ]);
//   const [calcResults, setCalcResults] = useState({
//     amount: 0,
//     price: 0,
//     leverage: 0,
//     lossCut: 0,
//     fee: 0,
//     feePercent: 0,
//   });
//   const [pnlCalcData, setPnlCalcData] = useState({
//     sellPrice: "",
//     buyPrice: "",
//     amount: "",
//     leverage: "",
//     pnlPercent: "",
//     results: {
//       pnl: 0,
//       pnlPercent: 0,
//       sellPrice: 0,
//     },
//   });
//   const [open, setOpen] = useState(false);

//   // ...existing code...
//   const [balances, setBalances] = useState<Balance>({
//     BTC: 0.5,
//     ETH: 5.0,
//     USDT: 1000.0,
//   });

//   const [coinPrices, setCoinPrices] = useState<{ [key: string]: CoinData }>({
//     BTC: {
//       symbol: "BTC/USDT",
//       price: 108234.56,
//       change24h: -2.11,
//       high24h: 111290,
//       low24h: 106710,
//       name: "BTC",
//     },
//     ETH: {
//       symbol: "ETH/USDT",
//       price: 3456.78,
//       change24h: 1.45,
//       high24h: 3520,
//       low24h: 3400,
//       name: "ETH",
//     },
//     USDT: {
//       symbol: "USDT/USDT",
//       price: 1.0,
//       change24h: 0,
//       high24h: 1.01,
//       low24h: 0.99,
//       name: "USDT",
//     },
//   });

//   const [activeTab, setActiveTab] = useState("orderbook");

//   const sellOrders = [
//     { price: "27.398", size: "145.98", total: "1,998.12", depth: 85 },
//     { price: "27.397", size: "438.06", total: "1,852.14", depth: 78 },
//     { price: "27.396", size: "24.68", total: "1,414.08", depth: 70 },
//     { price: "27.395", size: "91.62", total: "1,389.40", depth: 65 },
//     { price: "27.394", size: "0.44", total: "1,297.78", depth: 60 },
//     { price: "27.393", size: "234.93", total: "1,297.34", depth: 55 },
//     { price: "27.392", size: "713.89", total: "1,062.41", depth: 48 },
//     { price: "27.391", size: "292.04", total: "348.52", depth: 35 },
//     { price: "27.389", size: "20.00", total: "56.48", depth: 20 },
//     { price: "27.386", size: "16.48", total: "36.48", depth: 15 },
//     { price: "27.384", size: "20.00", total: "20.00", depth: 10 },
//   ];

//   const buyOrders = [
//     { price: "27.380", size: "3.64", total: "3.64", depth: 12 },
//     { price: "27.374", size: "93.55", total: "97.19", depth: 28 },
//     { price: "27.373", size: "312.00", total: "409.19", depth: 45 },
//     { price: "27.372", size: "219.92", total: "629.11", depth: 55 },
//     { price: "27.369", size: "20.00", total: "649.11", depth: 60 },
//     { price: "27.367", size: "234.94", total: "884.05", depth: 70 },
//     { price: "27.366", size: "438.07", total: "1,322.12", depth: 80 },
//     { price: "27.365", size: "144.72", total: "1,466.84", depth: 88 },
//     { price: "27.362", size: "0.76", total: "1,467.60", depth: 92 },
//   ];

//   const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       const hoursNum = now.getUTCHours();
//       const hours = hoursNum.toString().padStart(2, "0");
//       const minutes = now.getUTCMinutes().toString().padStart(2, "0");
//       const seconds = now.getUTCSeconds().toString().padStart(2, "0");
//       const ampm = hoursNum >= 12 ? "PM" : "AM";
//       const hour12 = (hoursNum % 12 || 12).toString().padStart(2, "0");

//       setUtcTime(`${hour12}:${minutes}:${seconds} ${ampm}`);
//     };

//     updateTime();
//     const interval = setInterval(updateTime, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // Simulate realistic price movements
//   useEffect(() => {
//     const priceInterval = setInterval(() => {
//       setCoinPrices((prev) => {
//         const updated = { ...prev };
//         Object.keys(updated).forEach((coin) => {
//           if (coin !== "USDT") {
//             const volatility = 0.002;
//             const change = (Math.random() - 0.5) * 2 * volatility;
//             const newPrice = updated[coin].price * (1 + change);
//             updated[coin] = {
//               ...updated[coin],
//               price: parseFloat(newPrice.toFixed(2)),
//             };
//           }
//         });
//         return updated;
//       });
//     }, 3000);

//     return () => clearInterval(priceInterval);
//   }, []);

//   const showNotification = (
//     type: "success" | "error" | "info" | "warning",
//     title: string,
//     message: string,
//   ) => {
//     const id = Date.now();
//     const notification: Notification = { id, type, title, message };
//     setNotifications((prev) => [...prev, notification]);

//     setTimeout(() => {
//       setNotifications((prev) => prev.filter((n) => n.id !== id));
//     }, 5000);
//   };

//   const removeNotification = (id: number) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   const getCurrentMarketPrice = (): number => {
//     const basePrice = coinPrices[selectedCoin]?.price || 100000;
//     const variance = basePrice * 0.0005;
//     return basePrice + (Math.random() - 0.5) * variance * 2;
//   };

//   const handleLimitOrder = (orderData: Order) => {
//     setPendingOrders((prev) => [...prev, { ...orderData, status: "pending" }]);

//     setTimeout(() => {
//       const currentPrice = getCurrentMarketPrice();
//       const targetPrice = Number(orderData.filledPrice || orderData.amount);
//       const priceRange = targetPrice * 0.02;

//       const isPriceMatched =
//         orderData.type === "BUY"
//           ? currentPrice <= targetPrice + priceRange
//           : currentPrice >= targetPrice - priceRange;

//       if (isPriceMatched) {
//         executeTrade(orderData, currentPrice, "filled");
//         setPendingOrders((prev) => prev.filter((o) => o.id !== orderData.id));
//         showNotification(
//           "success",
//           "Order Filled",
//           `Limit order for ${
//             orderData.symbol
//           } filled at $${currentPrice.toFixed(2)}`,
//         );
//       } else {
//         setPendingOrders((prev) =>
//           prev.map((o) =>
//             o.id === orderData.id ? { ...o, status: "pending" } : o,
//           ),
//         );
//       }
//     }, 2000);
//   };

//   const handleMarketOrder = (orderData: Order) => {
//     const currentPrice = getCurrentMarketPrice();
//     executeTrade(orderData, currentPrice, "filled");
//   };

//   const executeTrade = (
//     orderData: Order,
//     filledPrice: number,
//     status: "filled" | "cancelled",
//   ) => {
//     const quantity = orderData.amount;
//     const baseCoin = selectedCoin;
//     const positionValue = quantity * filledPrice;
//     const fee = positionValue * 0.001;

//     setBalances((prev) => {
//       const newBalances = { ...prev };

//       if (orderData.type === "BUY") {
//         newBalances.USDT = (newBalances.USDT || 0) - (positionValue + fee);
//         newBalances[baseCoin] = (newBalances[baseCoin] || 0) + quantity;
//       } else if (orderData.type === "SELL") {
//         newBalances.USDT = (newBalances.USDT || 0) + (positionValue - fee);
//         newBalances[baseCoin] = (newBalances[baseCoin] || 0) - quantity;
//       }

//       Object.keys(newBalances).forEach((key) => {
//         if (newBalances[key] < 0.00001) newBalances[key] = 0;
//       });

//       return newBalances;
//     });

//     const pnlPercent = (Math.random() * 6 - 3).toFixed(2);
//     const executedOrder: Order = {
//       ...orderData,
//       status,
//       filledPrice,
//       pnl: `${pnlPercent}%`,
//     };

//     setMockOrders((prev) => [executedOrder, ...prev]);
//   };

//   const validateOrder = (
//     buyAmount: number,
//     orderPrice: string | number,
//   ): boolean => {
//     if (!buyAmount || buyAmount <= 0) {
//       showNotification(
//         "error",
//         "Invalid Amount",
//         "Please enter a valid amount",
//       );
//       return false;
//     }

//     if (orderType === "Limit" && (!orderPrice || Number(orderPrice) <= 0)) {
//       showNotification(
//         "error",
//         "Invalid Price",
//         "Please enter a valid limit price",
//       );
//       return false;
//     }

//     const effectivePrice =
//       orderType === "Market" ? getCurrentMarketPrice() : Number(orderPrice);
//     const requiredUSDT = buyAmount * effectivePrice;

//     if (selectedCoin === "USDT" && balances.USDT < buyAmount) {
//       showNotification(
//         "error",
//         "Insufficient Balance",
//         `Required: ${buyAmount.toFixed(
//           2,
//         )} USDT, Available: ${balances.USDT.toFixed(2)} USDT`,
//       );
//       return false;
//     }

//     if (selectedCoin !== "USDT" && balances.USDT < requiredUSDT) {
//       showNotification(
//         "error",
//         "Insufficient Balance",
//         `Required: ${requiredUSDT.toFixed(
//           2,
//         )} USDT, Available: ${balances.USDT.toFixed(2)} USDT`,
//       );
//       return false;
//     }

//     if (
//       selectedCoin !== "USDT" &&
//       buyAmount > 0 &&
//       balances[selectedCoin] < buyAmount
//     ) {
//       showNotification(
//         "error",
//         "Insufficient Balance",
//         `Required: ${buyAmount.toFixed(
//           4,
//         )} ${selectedCoin}, Available: ${balances[selectedCoin].toFixed(
//           4,
//         )} ${selectedCoin}`,
//       );
//       return false;
//     }

//     return true;
//   };

//   const handleCalculatorRowChange = (
//     index: number,
//     field: "price" | "amount" | "leverage",
//     value: string,
//   ) => {
//     const newRows = [...calcRows];
//     newRows[index][field] = value;
//     setCalcRows(newRows);
//   };

//   const calculatePosition = () => {
//     // Get the first row with complete data
//     const dataRow = calcRows.find(
//       (row) => row.price && row.amount && row.leverage,
//     );
//     if (!dataRow) {
//       showNotification(
//         "error",
//         "Invalid Input",
//         "Please fill in Price, Amount, and Leverage",
//       );
//       return;
//     }

//     const price = parseFloat(dataRow.price) || 0;
//     const amount = parseFloat(dataRow.amount) || 0;
//     const leverage = parseFloat(dataRow.leverage) || 1;

//     // Calculate position details
//     const positionValue = price * amount;
//     const fee = positionValue * 0.001; // 0.1% fee
//     const feePercent = 0.1;
//     const lossCut = positionValue * (leverage / 100); // Loss cut based on leverage

//     setCalcResults({
//       amount: parseFloat(amount.toFixed(4)),
//       price: parseFloat(price.toFixed(2)),
//       leverage: parseFloat(leverage.toFixed(2)),
//       lossCut: parseFloat(lossCut.toFixed(2)),
//       fee: parseFloat(fee.toFixed(2)),
//       feePercent: feePercent,
//     });

//     showNotification(
//       "success",
//       "Calculation Complete",
//       `Position ${positionType} calculated successfully`,
//     );
//   };

//   const calculatePNL = () => {
//     const buyPrice = parseFloat(pnlCalcData.buyPrice) || 0;
//     const sellPrice = parseFloat(pnlCalcData.sellPrice) || 0;
//     const amount = parseFloat(pnlCalcData.amount) || 0;
//     const leverage = parseFloat(pnlCalcData.leverage) || 1;
//     const pnlPercent = parseFloat(pnlCalcData.pnlPercent) || 0;

//     if (!buyPrice || !sellPrice) {
//       showNotification(
//         "error",
//         "Invalid Input",
//         "Please enter Buy Price and Sell Price",
//       );
//       return;
//     }

//     const priceDifference = sellPrice - buyPrice;
//     const calculatedPNL = priceDifference * (amount || 1) * leverage;
//     const calculatedPNLPercent = (priceDifference / buyPrice) * 100 || 0;
//     const calculatedSellPrice =
//       positionType === "DOWN"
//         ? buyPrice - buyPrice * (pnlPercent / 100)
//         : buyPrice + buyPrice * (pnlPercent / 100);

//     setPnlCalcData((prev) => ({
//       ...prev,
//       results: {
//         pnl: parseFloat(calculatedPNL.toFixed(2)),
//         pnlPercent: parseFloat(calculatedPNLPercent.toFixed(2)),
//         sellPrice: parseFloat(calculatedSellPrice.toFixed(2)),
//       },
//     }));

//     showNotification(
//       "success",
//       "PNL Calculated",
//       `PNL: $${calculatedPNL.toFixed(2)} (${calculatedPNLPercent.toFixed(2)}%)`,
//     );
//   };

//   const handleOrderSubmit = (type: "BUY" | "SELL") => {
//     if (amount <= 0) {
//       showNotification(
//         "error",
//         "Invalid Amount",
//         "Please enter an amount greater than 0",
//       );
//       return;
//     }

//     const orderPrice =
//       orderType === "Market"
//         ? getCurrentMarketPrice()
//         : Number(price || amount);

//     if (!validateOrder(amount, orderPrice)) return;

//     const order: Order = {
//       id: Date.now(),
//       symbol: `${selectedCoin}/USDT`,
//       type,
//       orderType,
//       amount: amount,
//       filledPrice: orderPrice,
//       pnl: "0%",
//       autoSell,
//       status: "pending",
//       timestamp: Date.now(),
//     };

//     if (orderType === "Limit") {
//       handleLimitOrder(order);
//       showNotification(
//         "info",
//         "Limit Order Placed",
//         `${type} ${amount.toFixed(4)} ${selectedCoin} at $${orderPrice.toFixed(
//           2,
//         )} - waiting for price match`,
//       );
//     } else {
//       handleMarketOrder(order);
//       showNotification(
//         "success",
//         "Market Order Executed",
//         `${type} ${amount.toFixed(4)} ${selectedCoin} at $${orderPrice.toFixed(
//           2,
//         )}`,
//       );
//     }

//     setAmount(0);
//     setPrice("");
//   };

//   const increaseAmount = () => setAmount((prev) => prev + 10);
//   const decreaseAmount = () =>
//     setAmount((prev) => (prev - 10 >= 0 ? prev - 10 : 0));

//   const handleSlider = (value: string) => {
//     const percent = parseInt(value, 10);
//     const maxAmount = balances[selectedCoin] || 0;
//     setAmount(parseFloat(((percent / 100) * maxAmount).toFixed(4)));
//   };

//   const cancelPendingOrder = (orderId: number) => {
//     setPendingOrders((prev) => prev.filter((o) => o.id !== orderId));
//     setMockOrders((prev) =>
//       prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o)),
//     );
//     showNotification(
//       "warning",
//       "Order Cancelled",
//       "Pending order has been cancelled",
//     );
//   };

//   const renderTableRows = () => {
//     const displayOrders =
//       activeTableTab === "Positions"
//         ? mockOrders.filter((o) => o.status === "filled")
//         : mockOrders.filter((o) => o.status !== "cancelled");

//     if (displayOrders.length === 0)
//       return (
//         <tr>
//           <td colSpan={11} className="text-center py-6 text-gray-500">
//             No {activeTableTab.toLowerCase()} yet
//           </td>
//         </tr>
//       );

//     return displayOrders.map((order) => (
//       <tr
//         key={order.id}
//         className="border-b border-[#242424] hover:bg-[#2a2a2a]"
//       >
//         <td className="px-2 py-2">{order.symbol}</td>
//         <td className="px-2 py-2">{order.amount.toFixed(4)}</td>
//         <td className="px-2 py-2">{leverage}x</td>
//         <td className="px-2 py-2">${(order.filledPrice || 0).toFixed(2)}</td>
//         <td className="px-2 py-2">
//           ${((order.filledPrice || 0) * 0.95).toFixed(2)}
//         </td>
//         <td className="px-2 py-2">
//           ${((order.filledPrice || 0) * 0.9).toFixed(2)}
//         </td>
//         <td className="px-2 py-2">
//           <button className="text-[#50D2C1] hover:underline text-xs">
//             Limit
//           </button>
//         </td>
//         <td className="px-2 py-2">
//           <button className="text-red-400 hover:underline text-xs">
//             Market
//           </button>
//         </td>
//         <td
//           className={`px-2 py-2 font-semibold ${
//             order.pnl.includes("-") ? "text-red-500" : "text-green-500"
//           }`}
//         >
//           {order.pnl}
//         </td>
//       </tr>
//     ));
//   };

//   const getNotificationStyles = (type: Notification["type"]) => {
//     const styles = {
//       success: "bg-green-500/20 border-green-500/50 text-green-400",
//       error: "bg-red-500/20 border-red-500/50 text-red-400",
//       warning: "bg-[#50D2C1]/20 border-[#50D2C1]/50 text-[#50D2C1]",
//       info: "bg-blue-500/20 border-blue-500/50 text-blue-400",
//     };
//     return styles[type];
//   };

//   const currentCoin = coinPrices[selectedCoin];

//   return (
//     <div className="text-white bg-white dark:bg-[#0F1A1F] min-h-screen">
//       <Header session={session} />

//       <div className="fixed top-28 right-4 z-50 space-y-6 max-w-md">
//         {notifications.map((notification) => (
//           <div
//             key={notification.id}
//             className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 ${getNotificationStyles(
//               notification.type,
//             )}`}
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex-1">
//                 <p className="font-semibold text-sm text-white">
//                   {notification.title}
//                 </p>
//                 <p className="text-xs opacity-90 mt-1 text-white">
//                   {notification.message}
//                 </p>
//               </div>
//               <button
//                 onClick={() => removeNotification(notification.id)}
//                 className="mt-1 hover:opacity-70 transition"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <main className="bg-white dark:bg-[#0F1A1F] mx-auto w-full flex flex-col mt-18 lg:flex-row  ">
//         <section className="flex flex-1">
//           <div>
//           {/* trade header tsx starts */}
//           <div className="py-3 px-3 border-b border-gray-700 rounded-md">
//             <svg
//               width="12"
//               height="12"
//               stroke="#FFB648"
//               fill="#FFB648"
//               focusable="false"
//               aria-hidden="true"
//               viewBox="0 0 16 16"
//               className="sc-eDvSVe ghLAkI"
//             >
//               <path
//                 d="M7.19178 2.0681C7.52192 1.39918 8.47578 1.39917 8.80592 2.0681L10.3779 5.25325L13.8929 5.76401C14.6311 5.87127 14.9259 6.77847 14.3917 7.29913L11.8482 9.7784L12.4487 13.2793C12.5747 14.0145 11.8031 14.5751 11.1428 14.228L7.99885 12.5751L4.85493 14.228C4.19467 14.5751 3.42298 14.0145 3.54908 13.2793L4.14952 9.7784L1.60603 7.29913C1.07186 6.77847 1.36662 5.87127 2.10482 5.76401L5.61984 5.25325L7.19178 2.0681Z"
//                 className="sc-bcXHqe iaMRsW"
//               ></path>
//             </svg>
//           </div>
//           <div
//             className="flex flex-wrap items-center gap-6 p-2 dark:border-none border-2
//            border-gray-300 dark:border-gray-600 shadow-sm  bg-white dark:bg-[#0F1A1F] relative"
//           >
//             <div
//               className="flex items-center gap-2 cursor-pointer relative group"
//               onClick={() => setOpen(!open)}
//             >
//               <svg
//                 width="32"
//                 height="32"
//                 viewBox="0 0 32 32"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={{ transform: "translateY(2px)" }}
//               >
//                 <g clipPath="url(#clip0_623_29714)">
//                   <path
//                     d="M20.4523 14.5389C20.471 16.2176 20.1196 17.8218 19.4292 19.3544C18.4434 21.5368 16.0799 23.3213 13.9218 21.4218C12.1616 19.8736 11.8351 16.7306 9.19798 16.2705C5.7088 15.8477 5.62483 19.8923 3.34536 20.3492C0.804661 20.8653 -0.0380915 16.5938 -0.000774032 14.6539C0.0365434 12.714 0.552769 9.98759 2.76072 9.98759C5.30142 9.98759 5.47245 13.8332 8.69731 13.6249C11.8911 13.4073 11.947 9.40624 14.0337 7.69329C15.8343 6.2135 17.952 7.29847 19.0125 9.07982C19.9952 10.7275 20.4274 12.6612 20.4492 14.5389H20.4523Z"
//                     fill="#46c4b3"
//                   ></path>
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_623_29714">
//                     <rect width="32" height="32" fill="white"></rect>
//                   </clipPath>
//                 </defs>
//               </svg>
//               <span className="font-semibold text-[#333] dark:text-white">
//                 {selectedCoin} (Bitcoin) / USDT
//               </span>
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 11 11"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={{ transform: "rotate(180deg)" }}
//               >
//                 <path
//                   d="M1.375 7.7915L5.5 3.6665L9.625 7.7915"
//                   stroke-width="0.7"
//                   stroke="#fff"
//                 ></path>
//               </svg>

//               {/* Dropdown List - Dynamic Coin List */}
//               {open && (
//                 <div className="absolute top-full left-0 mt-2 bg-[#1b1f2e] border border-gray-700 rounded-lg shadow-xl z-50 w-100 overflow-hidden">
//                   {/* <div className="px-4 py-3 border-b border-gray-700 bg-[#161928]">
//                     <h3 className="text-sm font-semibold text-white">All Markets</h3>
//                   </div> */}
//                   <div className="overflow-y-auto max-h-96">
//                     <table className="w-full text-xs">
//                       <thead className="bg-[#242424] border-b border-gray-700 sticky top-0">
//                         <tr>
//                           <th className="text-left px-3 py-2 text-gray-400 font-semibold">
//                             Symbol
//                           </th>
//                           <th className="text-right px-3 py-2 text-gray-400 font-semibold">
//                             Price
//                           </th>
//                           <th className="text-right px-3 py-2 text-gray-400 font-semibold">
//                             24H Change
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="text-white">
//                         {Object.entries(coinPrices).map(([symbol, data]) => (
//                           <tr
//                             key={symbol}
//                             className="border-b border-gray-800 hover:bg-[#222638] cursor-pointer transition"
//                             onClick={() => {
//                               setSelectedCoin(symbol);
//                               setOpen(false);
//                             }}
//                           >
//                             <td className="px-3 py-2.5 font-semibold flex items-center gap-2">
//                               <span className="text-gray-400">☆</span>
//                               <div>
//                                 <div className="font-bold">{data.symbol}</div>
//                                 <div className="text-gray-500 text-xs">
//                                   {data?.name || "USDT"}
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="text-right px-3 py-2.5">
//                               ${data.price.toFixed(2)}
//                             </td>
//                             <td
//                               className={`text-right px-3 py-2.5 font-semibold ${
//                                 data.change24h < 0
//                                   ? "text-red-500"
//                                   : "text-green-500"
//                               }`}
//                             >
//                               {data.change24h > 0 ? "+" : ""}
//                               {data.change24h.toFixed(2)}%
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="text-[12px]">
//               <span>Price</span>
//               <span
//                 className={
//                   currentCoin?.change24h! < 0
//                     ? "font-semibold text-red-500 flex"
//                     : "font-semibold text-green-500 flex"
//                 }
//               >
//                 {" "}
//                 {(currentCoin?.price || 0).toFixed(2)}
//               </span>
//             </div>

//             <div className="text-[12px]">
//               <div className="flex flex-col">
//                 <div>
//                   <span className="dark:text-white text-gray-600">
//                     24h Change
//                   </span>
//                   <br />
//                   <span
//                     className={
//                       currentCoin?.change24h! < 0
//                         ? "font-semibold text-red-500 flex"
//                         : "font-semibold text-green-500 flex"
//                     }
//                   >
//                     {" "}
//                     {(
//                       ((currentCoin?.price || 0) *
//                         (currentCoin?.change24h || 0)) /
//                       100
//                     ).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={
//                 currentCoin?.change24h! < 0
//                   ? "text-red-500 font-semibold text-[12px]"
//                   : "text-green-500 font-semibold text-[12px]"
//               }
//             >
//               {currentCoin?.change24h! > 0 ? "+" : ""}
//               {currentCoin?.change24h?.toFixed(2)}%
//             </div>

//             <div className="flex flex-col text-[12px]">
//               <div className="text-[#333] dark:text-white">24 High:</div>
//               <div className="text-green-500 font-semibold">
//                 {" "}
//                 {currentCoin?.high24h}
//               </div>
//             </div>

//             <div className="flex flex-col text-[12px]">
//               <div className="text-[#333] dark:text-white">24h Low:</div>
//               <div className="text-red-500 font-semibold">
//                 {" "}
//                 {currentCoin?.low24h}
//               </div>
//             </div>

//             <div className="flex text-[12px] gap-3 text-base items-center">
//               <div className="flex flex-col">
//                 <div className="text-[#333] dark:text-gray-300 font-semibold">
//                   FYBIT INDEX ({selectedCoin}):
//                 </div>
//                 <div className="text-red-500 font-semibold">
//                   {" "}
//                   ${currentCoin?.price.toFixed(2)}
//                 </div>
//               </div>

//               <div className="text-gray-300 flex flex-col text-[12px] ml-4">
//                 <div className="text-[#333] dark:text-white font-semibold">
//                   TIME: <span className="font-semibold">{utcTime}</span>
//                 </div>
//                 <div className="font-semibold text-[#333] dark:text-white">
//                   {" "}
//                   (UTC)
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* trade header tsx ends */}
//           {open && (
//             <div
//               className="fixed inset-0 z-30"
//               onClick={() => setOpen(false)}
//             ></div>
//           )}
//           <div className="border border-[#242424] rounded-xl relative">
//             <div>
//               <TradingViewChart symbol={selectedCoin} />
//             </div>
//           </div>

//           <div className="w-full border border-gray-800 overflow-didden mt-2 rounded-lg ">
//             {/* Tabs */}
//             <div className="flex items-center text-[12px] border-b border-[#1e2329]">
//               {[
//                 "Balances",
//                 "Positions",
//                 "Open Orders",
//                 "TWAP",
//                 "Trade History",
//                 "Funding History",
//                 "Order History",
//               ].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTableTab(tab)}
//                   className={`px-3 py-2 font-medium transition
//           ${
//             activeTableTab === tab
//               ? "text-[#00c2a8] border-b-2 border-[#00c2a8]"
//               : "text-[#848e9c] hover:text-white hover:bg-none"
//           }
//         `}
//                 >
//                   {tab}
//                 </button>
//               ))}

//               {/* Right Side */}
//               <div className="ml-auto flex items-center gap-4 pr-4 text-xs text-[#848e9c]">
//                 {/* <button className="hover:text-white">Filter</button> */}
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input type="checkbox" className="accent-[#00c2a8]" checked />
//                   Hide Small Balances
//                 </label>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full text-[12px] border border-[#1e2329] rounded-lg">
//                 <thead className="text-[#848e9c] border-none">
//                   <tr>
//                     {[
//                       "Coin",
//                       "Total Balance",
//                       "Available Balance",
//                       "USDC Value",
//                       "PNL (ROE %)",
//                       "Contract",
//                     ].map((th) => (
//                       <th
//                         key={th}
//                         className="px-4 py-3 text-left font-medium whitespace-nowrap"
//                       >
//                         {th}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>

//                 <tbody>
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="text-center py-10 text-[#848e9c]"
//                     >
//                       No balances yet
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           </div>
//           <div className="w-[320px] rounded-lg text-sm text-white">
//       {/* Tabs */}
//       <div className="flex border-b border-[#1e2329]">
//         <button
//           onClick={() => setActiveTab("orderbook")}
//           className={`flex-1 py-2 font-medium text-[12px] transition ${
//             activeTab === "orderbook"
//               ? "text-[#00c2a8] border-b-2 border-[#00c2a8]"
//               : "text-[#848e9c]"
//           }`}
//         >
//           Order Book
//         </button>
//         <button
//           onClick={() => setActiveTab("trades")}
//           className={`flex-1 py-2 font-medium text-[12px] transition ${
//             activeTab === "trades"
//               ? "text-[#00c2a8] border-b-2 border-[#00c2a8]"
//               : "text-[#848e9c]"
//           }`}
//         >
//           Trades
//         </button>
//       </div>

//       {/* Controls */}
//       <div className="flex items-center justify-between px-3 py-2 text-xs text-[#848e9c]">
//         <span>0.001 ▾</span>
//         <span className="text-white">HYPE ▾</span>
//       </div>

//       {/* Header */}
//       <div className="grid grid-cols-3 px-3 py-2 text-xs text-[#848e9c]">
//         <span>Price</span>
//         <span className="text-right">Size (HYPE)</span>
//         <span className="text-right">Total (HYPE)</span>
//       </div>

//       {/* Sell Orders */}
//       {sellOrders.map((row, i) => (
//         <div
//           key={i}
//           className="relative grid grid-cols-3 px-3 py-[6px]"
//         >
//           <div
//             className="absolute inset-y-0 right-0 bg-red-500/20"
//             style={{ width: `${row.depth}%` }}
//           />
//           <span className="text-red-400 z-10">{row.price}</span>
//           <span className="text-right z-10">{row.size}</span>
//           <span className="text-right z-10">{row.total}</span>
//         </div>
//       ))}

//       {/* Spread */}
//       <div className="flex justify-between px-3 py-2 bg-[#12161c] text-xs">
//         <span>Spread</span>
//         <span>0.004</span>
//         <span className="text-[#848e9c]">0.015%</span>
//       </div>

//       {/* Buy Orders */}
//       {buyOrders.map((row, i) => (
//         <div
//           key={i}
//           className="relative grid grid-cols-3 px-3 py-[6px]"
//         >
//           <div
//             className="absolute inset-y-0 left-0 bg-green-500/20"
//             style={{ width: `${row.depth}%` }}
//           />
//           <span className="text-green-400 z-10">{row.price}</span>
//           <span className="text-right z-10">{row.size}</span>
//           <span className="text-right z-10">{row.total}</span>
//         </div>
//       ))}
//     </div>
//         </section>

//         {/* RIGHT SIDE BAR */}
//         <div className="w-full lg:w-[350px] ">
//           <div className="bg-[#ffffff] dark:bg-[#0F1A1F] p-4 rounded-xl border-none dark:border-[#242424] shadow-sm">
//             <div className="flex gap-1 ">
//               {["BTC", "ETH", "USDT"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setSelectedCoin(tab)}
//                   className={`flex-1 py-2 transition ${
//                     selectedCoin === tab
//                       ? "border-b-2 text-[12px] border-b-[#50D2C1] text-[#50D2C1]"
//                       : " text-[#333] text-[12px] dark:text-white"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//             <form
//               className="mt-2  dark:text-white text-[#333] space-y-2"
//               onSubmit={(e) => e.preventDefault()}
//             >
//               <div className=" text-[12px] text-[#333333] dark:text-gray-200 mt-3">
//                 <p>
//                   Balance:{" "}
//                   {balances[selectedCoin]?.toFixed(
//                     selectedCoin === "USDT" ? 2 : 5,
//                   ) || "0.00"}{" "}
//                   {selectedCoin}
//                 </p>
//                 <p>
//                   Available:{" "}
//                   {(balances[selectedCoin] * 0.95)?.toFixed(
//                     selectedCoin === "USDT" ? 2 : 5,
//                   ) || "0.00"}{" "}
//                   {selectedCoin}
//                 </p>
//               </div>

//               <div className="flex justify-between text-[12px] text-[ #333] dark:text-gray-200">
//                 <span>Min: 5.00 {selectedCoin}</span>
//                 <span>
//                   Max: {balances[selectedCoin]?.toFixed(2) || "0.00"}{" "}
//                   {selectedCoin}
//                 </span>
//               </div>

//               <div className="flex gap-2">
//                 {["Limit", "Market"].map((label) => (
//                   <button
//                     key={label}
//                     type="button"
//                     onClick={() => setOrderType(label as "Limit" | "Market")}
//                     className={`flex-1 py-2 rounded transition ${
//                       orderType === label
//                         ? "border-b-2 text-[12px] border-b-[#50D2C1] text-[#50D2C1]"
//                         : "text-[#333] text-[12px] dark:text-white"
//                     }`}
//                   >
//                     {label}
//                   </button>
//                 ))}
//               </div>

//               <div className="flex items-center rounded overflow-hidden gap-1 justify-around py-1">
//                 <div className="flex items-center gap-1">
//                   <label className="text-sm text-[#333] dark:text-gray-300">
//                     Amount /
//                     <span className="text-[#50D2C1] dark:text-[#50D2C1]">
//                       {" "}
//                       All
//                     </span>
//                   </label>
//                 </div>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     placeholder="0"
//                     value={amount || ""}
//                     onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
//                     step="0.0001"
//                     className="dark:bg-[#2b2d40] border dark:border-none bg-white text-right w-[150px] text-[#333] dark:text-white px-2 py-1 rounded outline-none pr-6"
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setAmount((prev) => parseFloat((prev + 0.1).toFixed(4)))
//                     }
//                     className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
//                   >
//                     <ChevronUp size={14} />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setAmount((prev) =>
//                         Math.max(parseFloat((prev - 0.1).toFixed(4)), 0),
//                       )
//                     }
//                     className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
//                   >
//                     <ChevronDown size={14} />
//                   </button>
//                 </div>
//                 <div>
//                   <span className="px-3 text-[#333] dark:text-gray-300 text-sm">
//                     {selectedCoin}
//                   </span>
//                 </div>
//               </div>
//               <input
//                 type="range"
//                 className="w-full  accent-[#50D2C1] dark:accent-[#50D2C1]"
//                 value={(amount / (balances[selectedCoin] || 1000)) * 100}
//                 onChange={(e) => handleSlider(e.target.value)}
//               />
//               <div className="flex justify-between text-xs text-gray-500">
//                 {["0%", "25%", "50%", "75%", "100%"].map((v) => (
//                   <span key={v}>{v}</span>
//                 ))}
//               </div>

//               {orderType === "Limit" && (
//                 <div className="flex items-center rounded overflow-hidden gap-1 justify-around py-1">
//                   <div className="flex items-center gap-1">
//                     <label className="text-sm text-[#333] dark:text-gray-300">
//                       Limit Price
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       placeholder={`${currentCoin?.price.toFixed(2)}`}
//                       value={price || ""}
//                       onChange={(e) => setPrice(e.target.value)}
//                       step="0.01"
//                       className="border dark:border-none bg-white dark:bg-[#2b2d40] text-right w-[150px] text-[#333] dark:text-white px-2 py-1 rounded outline-none pr-6"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setPrice((prev) => (Number(prev) || 0) + 10)
//                       }
//                       className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
//                     >
//                       <ChevronUp size={14} />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setPrice((prev) =>
//                           Math.max((Number(prev) || 0) - 10, 0),
//                         )
//                       }
//                       className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
//                     >
//                       <ChevronDown size={14} />
//                     </button>
//                   </div>
//                   <div>
//                     <span className="px-3 text-[#333] dark:text-gray-300 text-sm">
//                       USDT
//                     </span>
//                   </div>
//                 </div>
//               )}

//               <div className="space-y-3">
//                 <div className="flex items-center justify-between rounded-md py-2">
//                   <div>
//                     <label className="text-sm text-[#333] dark:text-gray-300 w-24 flex items-center">
//                       Stop Loss
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       placeholder="Enter stop loss"
//                       value={stopLoss || ""}
//                       onChange={(e) => setStopLoss(Number(e.target.value))}
//                       className="flex-1 bg-white border dark:border-none dark:bg-[#2b2d40] text-right text-[#333] dark:text-white w-[150px] px-2 py-1 rounded outline-none pr-6"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setStopLoss((prev) => Number(prev || 0) + 1)
//                       }
//                       className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
//                     >
//                       <ChevronUp size={14} />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setStopLoss((prev) =>
//                           Math.max(Number(prev || 0) - 1, 0),
//                         )
//                       }
//                       className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
//                     >
//                       <ChevronDown size={14} />
//                     </button>
//                   </div>
//                   <div>
//                     <span className="text-[#333] dark:text-gray-300 text-sm ml-2">
//                       USDT
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between rounded-md py-2">
//                     <div>
//                       <label className="text-sm text-[#333] dark:text-gray-300 w-24 flex items-center">
//                         Leverage
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="number"
//                         value={leverage || ""}
//                         onChange={(e) => setLeverage(Number(e.target.value))}
//                         className="flex-1 bg-white border dark:border-none dark:bg-[#2b2d40] text-right text-[#333] dark:text-white w-[150px] px-2 py-1 rounded outline-none pr-6"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setLeverage((prev) => (prev || 0) + 1)}
//                         className="absolute right-1 top-0 text-[#333] dark:text-gray-300 hover:text-white"
//                       >
//                         <ChevronUp size={14} />
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setLeverage((prev) => Math.max((prev || 1) - 1, 1))
//                         }
//                         className="absolute right-1 bottom-0 text-[#333] dark:text-gray-300 hover:text-white"
//                       >
//                         <ChevronDown size={14} />
//                       </button>
//                     </div>
//                     <div>
//                       <span className="text-[#333] dark:text-gray-300 text-sm ml-2">
//                         X
//                       </span>
//                     </div>
//                   </div>
//                   <input
//                     type="range"
//                     min={1}
//                     max={100}
//                     value={leverage}
//                     onChange={(e) => setLeverage(Number(e.target.value))}
//                     className="w-full accent-[#50D2C1]  dark:accent-[#50D2C1] mt-2"
//                   />

//                   <div className="flex justify-between text-xs text-gray-500 mt-1">
//                     {["1x", "5x", "10x", "25x", "50x", "75x", "100x"].map(
//                       (v) => (
//                         <span key={v}>{v}</span>
//                       ),
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   type="button"
//                   onClick={() => handleOrderSubmit("BUY")}
//                   className="flex-1 text-[12px] text-white dark:text-[#333] bg-green-600 py-3 rounded hover:bg-green-700"
//                 >
//                   Buy Order
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => handleOrderSubmit("SELL")}
//                   className="flex-1 text-white dark:text-[#333] text-[12px] bg-red-600 py-3 rounded hover:bg-red-700"
//                 >
//                   Sell Order
//                 </button>
//               </div>

//               <div>
//                 <h3 className="text-md mb-2">Auto-Sell Setting:</h3>
//                 <div className="flex gap-2">
//                   {["OFF", "100%", "200%", "300%"].map((label) => (
//                     <button
//                       key={label}
//                       type="button"
//                       onClick={() => setAutoSell(label)}
//                       className={`flex-1 py-2 rounded transition ${
//                         autoSell === label
//                           ? "bg-[#50D2C1] text-[#50D2C1] dark:text-white"
//                           : "border-[#50D2C1] dark:border-[#50D2C1] hover:bg-blue-600/20"
//                       }`}
//                     >
//                       {label}
//                     </button>
//                   ))}
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setShowCalculator(true)}
//                   className="w-full bg-[#50D2C1] hover:bg-orange-600 py-2 mt-3 rounded font-semibold"
//                 >
//                   Calculator
//                 </button>

//                 {showCalculator && (
//                   <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
//                     <div className="relative bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
//                       <button
//                         className="absolute top-2.5 right-3 text-gray-400 hover:text-white text-2xl z-10"
//                         onClick={() => setShowCalculator(false)}
//                       >
//                         ✕
//                       </button>

//                       {/* Tab Selection */}
//                       <div className="flex border-b border-[#2a2a2a] sticky top-0 bg-[#1f1f1f]">
//                         <button
//                           onClick={() => setCalcTab("position")}
//                           className={`flex-1 py-3 font-semibold text-sm transition ${
//                             calcTab === "position"
//                               ? "bg-[#50D2C1] text-black"
//                               : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                           }`}
//                         >
//                           Position Calculator
//                         </button>
//                         <button
//                           onClick={() => setCalcTab("pnl")}
//                           className={`flex-1 py-3 font-semibold text-sm transition ${
//                             calcTab === "pnl"
//                               ? "bg-[#50D2C1] text-black"
//                               : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                           }`}
//                         >
//                           PNL Calculator
//                         </button>
//                       </div>

//                       <div className="flex flex-col lg:flex-row">
//                         {/* Left Section - Input Fields */}
//                         <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-[#2a2a2a]">
//                           {calcTab === "position" ? (
//                             <>
//                               {/* Position Type Selection */}
//                               <div className="flex gap-2 mb-4">
//                                 <button
//                                   onClick={() => setPositionType("UP")}
//                                   className={`flex-1 py-2 rounded-l font-semibold text-sm transition ${
//                                     positionType === "UP"
//                                       ? "bg-[#50D2C1] text-black"
//                                       : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                                   }`}
//                                 >
//                                   Position UP
//                                 </button>
//                                 <button
//                                   onClick={() => setPositionType("DOWN")}
//                                   className={`flex-1 py-2 rounded-r font-semibold text-sm transition ${
//                                     positionType === "DOWN"
//                                       ? "bg-[#50D2C1] text-black"
//                                       : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                                   }`}
//                                 >
//                                   Position DOWN
//                                 </button>
//                               </div>

//                               {/* Position Calculator Table */}
//                               <div className="overflow-x-auto mb-4 border border-[#3a3f50] rounded">
//                                 <table className="w-full text-xs">
//                                   <thead className="bg-[#242424] border-b border-[#3a3f50]">
//                                     <tr>
//                                       <th className="px-3 py-2 text-left text-[#50D2C1] font-bold">
//                                         Price
//                                       </th>
//                                       <th className="px-3 py-2 text-left text-[#50D2C1] font-bold">
//                                         Amount
//                                       </th>
//                                       <th className="px-3 py-2 text-left text-[#50D2C1] font-bold">
//                                         Leverage
//                                       </th>
//                                     </tr>
//                                   </thead>
//                                   <tbody>
//                                     {calcRows.map((row, index) => (
//                                       <tr
//                                         key={index}
//                                         className="border-b border-[#50D2C1] hover:bg-[#50D2C1]"
//                                       >
//                                         <td className="px-3 py-2">
//                                           <input
//                                             type="number"
//                                             placeholder="Enter price"
//                                             value={row.price}
//                                             onChange={(e) =>
//                                               handleCalculatorRowChange(
//                                                 index,
//                                                 "price",
//                                                 e.target.value,
//                                               )
//                                             }
//                                             className="w-full bg-[#50D2C1] border border-[#50D2C1] text-white px-2 py-1 rounded text-xs focus:outline-none focus:border-[#50D2C1]"
//                                           />
//                                         </td>
//                                         <td className="px-3 py-2">
//                                           <input
//                                             type="number"
//                                             placeholder="Enter amount"
//                                             value={row.amount}
//                                             onChange={(e) =>
//                                               handleCalculatorRowChange(
//                                                 index,
//                                                 "amount",
//                                                 e.target.value,
//                                               )
//                                             }
//                                             className="w-full bg-[#1a1a1a] border border-[#3a3f50] text-white px-2 py-1 rounded text-xs focus:outline-none focus:border-[#50D2C1]"
//                                           />
//                                         </td>
//                                         <td className="px-3 py-2">
//                                           <input
//                                             type="number"
//                                             placeholder="x"
//                                             value={row.leverage}
//                                             onChange={(e) =>
//                                               handleCalculatorRowChange(
//                                                 index,
//                                                 "leverage",
//                                                 e.target.value,
//                                               )
//                                             }
//                                             className="w-full bg-[#1a1a1a] border border-[#3a3f50] text-white px-2 py-1 rounded text-xs focus:outline-none focus:border-[#50D2C1]"
//                                           />
//                                         </td>
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             </>
//                           ) : (
//                             <>
//                               {/* PNL Calculator */}
//                               <div className="space-y-6">
//                                 {/* Position Selector */}
//                                 <div className="flex gap-3 mb-6">
//                                   <button
//                                     onClick={() => setPositionType("UP")}
//                                     className={`flex-1 py-2 rounded-l font-semibold text-sm transition ${
//                                       positionType === "UP"
//                                         ? "bg-[#50D2C1] text-black"
//                                         : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                                     }`}
//                                   >
//                                     Position UP
//                                   </button>
//                                   <button
//                                     onClick={() => setPositionType("DOWN")}
//                                     className={`flex-1 py-2 rounded-r font-semibold text-sm transition ${
//                                       positionType === "DOWN"
//                                         ? "bg-[#50D2C1] text-black"
//                                         : "bg-[#242424] text-gray-300 hover:bg-[#50D2C1]/20"
//                                     }`}
//                                   >
//                                     Position DOWN
//                                   </button>
//                                 </div>

//                                 {/* Section 1: Calculation of PNL and PNL% - Table Format */}
//                                 <div>
//                                   <h3 className="text-white font-semibold text-center mb-4 text-sm">
//                                     Calculation of PNL and PNL%
//                                   </h3>
//                                   <div className="border border-[#3a3f50] rounded-lg overflow-hidden mb-6">
//                                     <table className="w-full">
//                                       <tbody className="divide-y divide-[#3a3f50]">
//                                         {/* Row 1: Sell Price and Buy Price */}
//                                         <tr>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
//                                             Sell Price
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
//                                             <input
//                                               type="number"
//                                               placeholder="Enter value"
//                                               value={pnlCalcData.sellPrice}
//                                               onChange={(e) =>
//                                                 setPnlCalcData((prev) => ({
//                                                   ...prev,
//                                                   sellPrice: e.target.value,
//                                                 }))
//                                               }
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
//                                             Buy Price
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
//                                             <input
//                                               type="number"
//                                               placeholder="Enter value"
//                                               value={pnlCalcData.buyPrice}
//                                               onChange={(e) =>
//                                                 setPnlCalcData((prev) => ({
//                                                   ...prev,
//                                                   buyPrice: e.target.value,
//                                                 }))
//                                               }
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                         </tr>

//                                         {/* Row 2: Amount and Leverage */}
//                                         <tr>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
//                                             Amount (optional)
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
//                                             <input
//                                               type="number"
//                                               placeholder="Optional for"
//                                               value={pnlCalcData.amount}
//                                               onChange={(e) =>
//                                                 setPnlCalcData((prev) => ({
//                                                   ...prev,
//                                                   amount: e.target.value,
//                                                 }))
//                                               }
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/4">
//                                             Leverage
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/4">
//                                             <input
//                                               type="number"
//                                               placeholder="x"
//                                               value={pnlCalcData.leverage}
//                                               onChange={(e) =>
//                                                 setPnlCalcData((prev) => ({
//                                                   ...prev,
//                                                   leverage: e.target.value,
//                                                 }))
//                                               }
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                         </tr>
//                                       </tbody>
//                                     </table>
//                                   </div>
//                                 </div>

//                                 {/* Section 2: Calculation of the SELL Price */}
//                                 <div>
//                                   <h3 className="text-white font-semibold text-center mb-4 text-sm">
//                                     Calculation of the SELL Price
//                                   </h3>
//                                   <div className="border border-[#3a3f50] rounded-lg overflow-hidden mb-4">
//                                     <table className="w-full">
//                                       <tbody className="divide-y divide-[#3a3f50]">
//                                         <tr>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-fit">
//                                             Buy Price
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/3">
//                                             <input
//                                               type="number"
//                                               placeholder="Enter value"
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-fit">
//                                             PNL%
//                                           </td>
//                                           <td className="px-4 py-3 bg-[#1a1a1a] w-1/3">
//                                             <input
//                                               type="number"
//                                               placeholder="Enter %"
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                         </tr>
//                                         <tr>
//                                           <td className="px-4 py-3 bg-[#242424] text-gray-400 font-semibold text-xs w-1/3">
//                                             Leverage
//                                           </td>
//                                           <td
//                                             colSpan={3}
//                                             className="px-4 py-3 bg-[#1a1a1a] w-2/3"
//                                           >
//                                             <input
//                                               type="number"
//                                               placeholder="Enter value"
//                                               className="w-full bg-transparent text-white text-xs focus:outline-none border-b border-[#3a3f50]"
//                                             />
//                                           </td>
//                                         </tr>
//                                       </tbody>
//                                     </table>
//                                   </div>

//                                   {/* Calculate Button */}
//                                   {/* <button
//                                     onClick={calculatePNL}
//                                     className="w-full py-3 rounded border-2 border-[#50D2C1] text-[#50D2C1] font-bold text-sm hover:bg-[#50D2C1]/10 transition"
//                                   >
//                                     Calculate
//                                   </button> */}

//                                   {/* Results Table */}
//                                   {/* {(pnlCalcData.results.pnl !== 0 || pnlCalcData.results.pnlPercent !== 0 || pnlCalcData.results.sellPrice !== 0) && (
//                                     <div className="mt-6 border border-[#3a3f50] rounded overflow-hidden">
//                                       <table className="w-full text-xs">
//                                         <thead className="bg-[#242424] border-b border-[#3a3f50]">
//                                           <tr>
//                                             <th className="px-4 py-3 text-left text-gray-400 font-semibold">Metric</th>
//                                             <th className="px-4 py-3 text-left text-gray-400 font-semibold">Value</th>
//                                           </tr>
//                                         </thead>
//                                         <tbody className="divide-y divide-[#3a3f50]">
//                                           <tr className="hover:bg-[#1a1a1a]/50">
//                                             <td className="px-4 py-3 text-gray-400">PNL</td>
//                                             <td className={`px-4 py-3 font-bold ${pnlCalcData.results.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                                               ${pnlCalcData.results.pnl.toFixed(2)}
//                                             </td>
//                                           </tr>
//                                           <tr className="hover:bg-[#1a1a1a]/50">
//                                             <td className="px-4 py-3 text-gray-400">PNL %</td>
//                                             <td className={`px-4 py-3 font-bold ${pnlCalcData.results.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                                               {pnlCalcData.results.pnlPercent.toFixed(2)}%
//                                             </td>
//                                           </tr>
//                                           <tr className="hover:bg-[#1a1a1a]/50">
//                                             <td className="px-4 py-3 text-gray-400">Calculated Sell Price</td>
//                                             <td className="px-4 py-3 font-bold text-[#50D2C1]">
//                                               ${pnlCalcData.results.sellPrice.toFixed(2)}
//                                             </td>
//                                           </tr>
//                                         </tbody>
//                                       </table>
//                                     </div>
//                                   )} */}
//                                 </div>
//                               </div>
//                             </>
//                           )}

//                           {/* Calculate Button */}
//                           <button
//                             onClick={() =>
//                               calcTab === "position"
//                                 ? calculatePosition()
//                                 : calculatePNL()
//                             }
//                             className="w-full border-2 border-[#50D2C1] text-[#50D2C1] py-2.5 rounded font-semibold text-sm hover:bg-[#50D2C1] hover:text-black transition"
//                           >
//                             Calculate
//                           </button>
//                         </div>

//                         {/* Right Section - Results */}
//                         <div className="w-full lg:w-64 p-6 bg-[#1a1a1a]">
//                           <h3 className="text-[#50D2C1] font-bold mb-4 text-sm">
//                             {calcTab === "pnl" ? "PNL Results" : "Results"}
//                           </h3>
//                           {calcTab === "pnl" ? (
//                             <div className="space-y-4 text-sm">
//                               <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
//                                 <span className="text-gray-400">PNL:</span>
//                                 <span
//                                   className={`font-semibold text-lg ${
//                                     pnlCalcData.results.pnl >= 0
//                                       ? "text-green-400"
//                                       : "text-red-400"
//                                   }`}
//                                 >
//                                   {pnlCalcData.results.pnl}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-3">
//                                 <span className="text-gray-400">PNL%:</span>
//                                 <span
//                                   className={`font-semibold text-lg ${
//                                     pnlCalcData.results.pnlPercent >= 0
//                                       ? "text-green-400"
//                                       : "text-red-400"
//                                   }`}
//                                 >
//                                   {pnlCalcData.results.pnlPercent}%
//                                 </span>
//                               </div>
//                               <div className="flex justify-between items-center pt-2">
//                                 <span className="text-gray-400">
//                                   Sell Price:
//                                 </span>
//                                 <span className="text-[#50D2C1] font-semibold">
//                                   {pnlCalcData.results.sellPrice}
//                                 </span>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="space-y-2.5 text-sm">
//                               <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
//                                 <span className="text-gray-400">Amount:</span>
//                                 <span className="text-[#50D2C1] font-semibold">
//                                   {calcResults.amount.toFixed(4)}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
//                                 <span className="text-gray-400">Price:</span>
//                                 <span className="text-[#50D2C1] font-semibold">
//                                   ${calcResults.price.toFixed(2)}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
//                                 <span className="text-gray-400">Leverage:</span>
//                                 <span className="text-[#50D2C1] font-semibold">
//                                   {calcResults.leverage.toFixed(2)}x
//                                 </span>
//                               </div>
//                               <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
//                                 <span className="text-gray-400">Loss Cut:</span>
//                                 <span
//                                   className={`font-semibold ${
//                                     calcResults.lossCut > 0
//                                       ? "text-red-400"
//                                       : "text-[#50D2C1]"
//                                   }`}
//                                 >
//                                   ${Math.abs(calcResults.lossCut).toFixed(2)}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
//                                 <span className="text-gray-400">Fee:</span>
//                                 <span
//                                   className={`font-semibold ${
//                                     calcResults.fee > 0
//                                       ? "text-green-400"
//                                       : "text-red-400"
//                                   }`}
//                                 >
//                                   ${calcResults.fee.toFixed(2)}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between pt-2">
//                                 <span className="text-gray-400">Fee %:</span>
//                                 <span
//                                   className={`font-semibold ${
//                                     calcResults.feePercent > 0
//                                       ? "text-green-400"
//                                       : "text-red-400"
//                                   }`}
//                                 >
//                                   {calcResults.feePercent.toFixed(2)}%
//                                 </span>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </form>
//           </div>

//           {/* Pricing Sources Section */}
//           <div className="bg-white dark:bg-[#1f1f1f] p-4 rounded-xl my-4 border-none dark:border border-[#242424]">
//             <h4 className="text-sm mb-3 font-bold text-[#333] dark:text-gray-300">
//               Pricing Sources
//             </h4>
//             <ul className="space-y-1 text-sm text-[#333] dark:text-gray-300">
//               {[
//                 ["Bitfinex", (currentCoin?.price || 0) - 1],
//                 ["HTX", (currentCoin?.price || 0) - 0.3],
//                 ["Binance", currentCoin?.price],
//                 ["Coinbase", (currentCoin?.price || 0) + 0.5],
//                 ["Bybit", (currentCoin?.price || 0) + 1.2],
//               ].map(([name, amount]) => (
//                 <li
//                   key={name}
//                   className="flex justify-between hover:text-orange-400 dark:hover:text-[#50D2C1] transition"
//                 >
//                   <span>{name}</span>
//                   <span className="font-mono">
//                     ${(amount as number).toFixed(2)}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Chart;

"use client";

import { useState } from "react";
import TradingViewChart from "./TradingViewChart";
import Footer from "../shared/footer";
import Header from "../shared/header";
import MarketsModal from "../../components/MarketsDropdown";
import { Search, X } from "lucide-react";

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

const subTabs: SubTab[] = ["All", "xyz", "flx", "vntl", "hyna", "km", "cash"];

interface MarketsModalProps {
  open: boolean;
  onClose: () => void;
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

const Chart = ({ session }: { session: any }) => {
  const [orderBookTab, setOrderBookTab] = useState<OrderBookTab>("orderbook");
  const [bottomTab, setBottomTab] = useState<BottomTab>("Balances");
  const [tradeMode, setTradeMode] = useState<TradeMode>("Market");
  const [tradeSide, setTradeSide] = useState<TradeSide>("Buy");
  const [sizePercent, setSizePercent] = useState(0);

  const [moreOpen, setMoreOpen] = useState(false);

  const [mainTab, setMainTab] = useState<MainTab>("HIP-3");
  const [subTab, setSubTab] = useState<SubTab>("All");
  const [search, setSearch] = useState("");

  if (!open) return null;

  const filteredMarkets = MARKETS.filter((m) => {
    const matchesSub = subTab === "All" ? true : m.tag === subTab;
    const matchesSearch = m.symbol.toLowerCase().includes(search.toLowerCase());
    return matchesSub && matchesSearch;
  });

  return (
    <div className="bg-[#050B11] text-white">
      <Header session={session} />
      {/* 0F1A1F */}
      <main className="bg-white dark:bg-[#1B2429] mx-auto w-full flex flex-col mobile_set mt-[54px] lg:flex-row  ">
        {/* LEFT: PAIR HEADER + CHART + BOTTOM TABS */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col flex-1 min-w-0 border-r border-[#111827]">
              <div className="bg-[#0F1A1F] m-1 rounded-md px-3 h-[40px] flex items-center">
                <svg
                  width="12"
                  height="12"
                  stroke="#FFB648"
                  fill="#FFB648"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="sc-eDvSVe ghLAkI"
                >
                  <path
                    d="M7.19178 2.0681C7.52192 1.39918 8.47578 1.39917 8.80592 2.0681L10.3779 5.25325L13.8929 5.76401C14.6311 5.87127 14.9259 6.77847 14.3917 7.29913L11.8482 9.7784L12.4487 13.2793C12.5747 14.0145 11.8031 14.5751 11.1428 14.228L7.99885 12.5751L4.85493 14.228C4.19467 14.5751 3.42298 14.0145 3.54908 13.2793L4.14952 9.7784L1.60603 7.29913C1.07186 6.77847 1.36662 5.87127 2.10482 5.76401L5.61984 5.25325L7.19178 2.0681Z"
                    className="sc-bcXHqe iaMRsW"
                  ></path>
                </svg>
              </div>
              {/* Pair header */}
              <div className="bg-[#0F1A1F] mx-1 rounded-md h-[63px] flex items-center overflow-x-auto whitespace-nowrap">
                <div className="flex flex-col md:items-center md:justify-between">
                  <div className="flex gap-[16px] sm:flex-row items-center sm:gap-[32px]">
                    {/* Pair + spot badge */}
                    <div className="flex items-center gap-1">
                      <div className="relative inline-block p-2">
                        <span
                          className="text-[16px] sm:text-[20px] line-[27px] flex gap-2 items-center cursor-pointer"
                          onClick={() => setMoreOpen((prev) => !prev)}
                        >
                          <svg
                            width="32"
                            height="30"
                            viewBox="0 0 26 30"
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
                                <rect
                                  width="115"
                                  height="32"
                                  fill="white"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                          HYPE/USDC
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: "rotate(180deg)" }}
                            className="font-bolder mx-2"
                          >
                            <path
                              d="M1.375 7.7915L5.5 3.6665L9.625 7.7915"
                              stroke-width="0.7"
                              stroke="#fff"
                            ></path>
                          </svg>
                        </span>
                        {moreOpen && (
                          <div className="absolute left-0 mt-2 w-[800px] rounded-lg bg-white dark:bg-[#1B2429] border border-gray-300 dark:border-gray-700 shadow-lg z-40">
                            <div className="flex flex-col text-white">
                              {/* Search + Strict/All + Close */}
                              <div className="flex w-full items-center gap-3 px-4 py-3">
                                <div className="relative flex gap-2 items-center w-full">
                                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7280] z-40 hidden md:block" />
                                  <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search"
                                    className="w-full text-[12px] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-teal-400"
                                  />
                                </div>
                                <div className="w-[120px]">
                                  <div className="flex rounded-lg bg-[#273035] text-sm">
                                    <button
                                      onClick={() => setTradeSide("Buy")}
                                      className={`flex-1 text-[12px] py-1.5 rounded-lg ${
                                        tradeSide === "Buy"
                                          ? "bg-teal-400 text-black"
                                          : "text-[#8b9bb5]"
                                      }`}
                                    >
                                      Strict
                                    </button>
                                    <button
                                      onClick={() => setTradeSide("Sell")}
                                      className={`flex-1 text-[12px] py-1.5 rounded-lg ${
                                        tradeSide === "Sell"
                                          ? "bg-teal-400 text-black"
                                          : "text-[#8b9bb5]"
                                      }`}
                                    >
                                      All
                                    </button>
                                  </div>
                                  <div className="hidden sm:flex items-center gap-2">
                                    <button className="px-4 py-1.5 rounded bg-teal-400 text-black text-xs font-semibold">
                                      Strict
                                    </button>
                                    <button className="px-4 py-1.5 rounded bg-[#020915] border border-[#1f2933] text-xs text-[#cbd5f5]">
                                      All
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Main tabs */}
                              <div className="flex items-center gap-4 px-4 pt-2 text-[12px] text-[#9ca3af] border-b border-gray-700 overflow-x-auto">
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
                              <div className="flex items-center gap-4 px-4 pt-3 text-[11px] text-[#9ca3af] border-b border-gray-700 overflow-x-auto">
                                {subTabs.map((tab) => (
                                  <button
                                    key={tab}
                                    onClick={() => setSubTab(tab)}
                                    className={` border-b-2 uppercase whitespace-nowrap ${
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
                                <table className="min-w-full text-[12px] px-3 w-full border-0 border-separate">
                                  <thead className="sticky top-0 z-10">
                                    <tr className="text-[#9ca3af] text-[11px] font-[400] border-0">
                                      <th className="px-4 py-2 text-left font-normal ">
                                        Symbol
                                      </th>
                                      <th className="px-2 py-2 text-right font-normal">
                                        Last Price
                                      </th>
                                      <th className="px-2 py-2 text-right font-normal">
                                        24H Change
                                      </th>
                                      <th className="px-2 py-2 text-right font-normal">
                                        8H Funding
                                      </th>
                                      <th className="px-2 py-2 text-right font-normal">
                                        Volume
                                      </th>
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
                                          row.highlight ? "" : ""
                                        }`}
                                      >
                                        <td className="px-2 py-1 whitespace-nowrap">
                                          <div className="flex items-center gap-2">
                                            <span className="text-yellow-400 text-sm">
                                              ★
                                            </span>
                                            <span className="text-[13px]">
                                              {row.symbol}
                                            </span>
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
                                          className={`px-2 py-2 text-right text-[12px] ${
                                            row.isUp
                                              ? "text-emerald-400"
                                              : "text-red-400"
                                          }`}
                                        >
                                          {row.change}{" "}
                                          <span className="text-[11px]">
                                            {row.changePct}
                                          </span>
                                        </td>
                                        <td className="px-2 py-2 text-right text-[12px] text-[#9ca3af]">
                                          {row.funding}
                                        </td>
                                        <td className="px-2 py-2 text-right text-[12px] text-[#cbd5f5]">
                                          {row.volume}
                                        </td>
                                        <td className="px-4 py-2 text-right text-[12px] text-[#cbd5f5] whitespace-nowrap">
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
                              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2 border-t border-[#111827] text-[11px] text-[#9ca3af]">
                                <span>
                                  <span className="px-1.5 py-0.5 rounded bg-[#111827] mr-1">
                                    ⌘K
                                  </span>
                                  Open
                                </span>
                                <span>
                                  <span className="px-1.5 py-0.5 rounded bg-[#111827] mr-1">
                                    →
                                  </span>
                                  Navigate
                                </span>
                                <span>
                                  <span className="px-1.5 py-0.5 rounded bg-[#111827] mr-1">
                                    Enter
                                  </span>
                                  Select
                                </span>
                                <span>
                                  <span className="px-1.5 py-0.5 rounded bg-[#111827] mr-1">
                                    ★
                                  </span>
                                  Favorite
                                </span>
                                <span className="ml-auto">
                                  <span className="px-1.5 py-0.5 rounded bg-[#111827] mr-1">
                                    Esc
                                  </span>
                                  Close
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#071720] text-teal-300 text-[11px] border border-[#11343f]">
                        Spot
                      </span>
                    </div>

                    <div
                      style={{
                        overflowX: "scroll",
                        scrollbarWidth: "none",
                        display: "grid",
                        gridTemplateColumns: "repeat(6, auto)",
                        gap: "32px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateRows: "1fr 1fr",
                          gap: "4px",
                        }}
                      >
                        <div>
                          <div
                            className="sc-pyfCe gKZuHd"
                            style={{ display: "inline-block" }}
                          >
                            <p
                              className="sc-bjfHbI bFBYgR underline noWrap"
                              style={{
                                color: "rgb(148, 158, 156)",
                                display: "block",
                                fontSize: "12px",
                              }}
                            >
                              Price
                            </p>
                          </div>
                        </div>
                        <div
                          className="sc-bjfHbI bFBYgR noWrap monospaced"
                          style={{color: "rgb(246, 254, 253)", fontSize: "12px", display: "block"}}
                        >
                          <span style={{animation: "1.8s ease 0s 1 normal none running use-color-change05053352619754738"}}>
                            {" "}
                            32.659{" "}
                          </span>
                        </div>
                      </div>
                      <div
                        className="sc-fEXmlR ejmSgi"
                        style={{display: "grid", gridTemplateRows: "1fr 1fr", gap: "4px"}}
                      >
                        <div>
                          <div
                            className="sc-bjfHbI bFBYgR noWrap"
                            style={{
                                color: "rgb(148, 158, 156)",
                                display: "block",
                                fontSize: "12px",
                              }}
                          >
                            24H Change
                          </div>
                        </div>
                        <div
                          className="sc-bjfHbI bFBYgR noWrap monospaced"
                          style={{color: "rgb(246, 254, 253)", fontSize: "12px", display: "block"}}
                        >
                          <span style={{fontVariantNumeric: "tabular-nums lining-nums", color: "rgb(237, 112, 136)"}}>
                            <span>-0.849</span> / <span>-2.53%</span>
                          </span>
                        </div>
                      </div>
                      <div
                        className="sc-fEXmlR ejmSgi"
                        style={{
                          display: "grid",
                          gridTemplateRows: "1fr 1fr",
                          gap: "4px",
                        }}
                      >
                        <div>
                          <div
                            className="sc-bjfHbI bFBYgR noWrap"
                            style={{
                                color: "rgb(148, 158, 156)",
                                display: "block",
                                fontSize: "12px",
                              }}
                          >
                            24H Volume
                          </div>
                        </div>
                        <div
                          className="sc-bjfHbI bFBYgR noWrap monospaced"
                          style={{color: "rgb(246, 254, 253)", fontSize: "12px", display: "block"}}
                        >
                          <span>
                            <div
                              className="sc-pyfCe gKZuHd"
                              style={{display: "inline-block"}}
                            >
                              179,841,161.50 USDC
                            </div>
                          </span>
                        </div>
                      </div>
                      <div
                        className="sc-fEXmlR ejmSgi"
                        style={{
                          display: "grid",
                          gridTemplateRows: "1fr 1fr",
                          gap: "4px",
                        }}
                      >
                        <div>
                          <div
                            className="sc-bjfHbI bFBYgR noWrap"
                            style={{
                                color: "rgb(148, 158, 156)",
                                display: "block",
                                fontSize: "12px",
                              }}
                          >
                            Market Cap
                          </div>
                        </div>
                        <div
                          className="sc-bjfHbI bFBYgR noWrap monospaced"
                          style={{color: "rgb(246, 254, 253)", fontSize: "12px", display: "block"}}
                        >
                          9,835,456,319 USDC
                        </div>
                      </div>
                      <div
                        className="sc-fEXmlR ejmSgi"
                        style={{display: "grid", gridTemplateRows: "1fr 1fr", gap: "4px"}}
                      >
                        <div>
                          <div
                            className="sc-bjfHbI bFBYgR noWrap"
                            style={{
                                color: "rgb(148, 158, 156)",
                                display: "block",
                                fontSize: "12px",
                              }}
                          >
                            Contract
                          </div>
                        </div>
                        <div
                          className="sc-bjfHbI bFBYgR noWrap monospaced"
                          style={{color: "rgb(246, 254, 253)", fontSize: "12px", display: "block"}}
                        >
                          <div
                            className=""
                            style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}
                          >
                            0x0d01...11ec
                            <div
                              className=""
                              style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}
                            >
                              <a
                                target="_blank"
                                href="explorer/token/0x0d01dc56dcaaca66ad901c959b4011ec"
                                rel="noreferrer"
                                style={{color: "gray", textDecoration: "none"}}
                              >
                                {" "}
                                <svg
                                  width="14"
                                  height="14"
                                  focusable="false"
                                  aria-hidden="true"
                                  viewBox="-2 -2 16 16"
                                  className="sc-eDvSVe KHlvw"
                                  style={{marginBottom: "-2.4px"}}
                                >
                                  <path
                                    d="M2.16649 1C1.52217 1 0.999851 1.52233 0.999851 2.16667V9.83333C0.999851 10.4777 1.52217 11 2.16649 11H9.83294C10.4773 11 10.9996 10.4777 10.9996 9.83333V7.16667C10.9996 6.89053 11.2235 6.66667 11.4996 6.66667C11.7757 6.66667 11.9995 6.89053 11.9995 7.16667V9.83333C11.9995 11.0299 11.0295 12 9.83294 12H2.16649C0.969905 12 -0.00012207 11.0299 -0.00012207 9.83333V2.16667C-0.00012207 0.970047 0.969905 0 2.16649 0H4.83308C5.10921 0 5.33308 0.22386 5.33308 0.5C5.33308 0.77614 5.10921 1 4.83308 1H2.16649ZM6.66634 0.5C6.66634 0.22386 6.89021 0 7.16634 0H11.4999C11.776 0 11.9999 0.22386 11.9999 0.5V4.83333C11.9999 5.10947 11.776 5.33333 11.4999 5.33333C11.2237 5.33333 10.9999 5.10947 10.9999 4.83333V1.70716L7.51988 5.18693C7.32461 5.38213 7.00808 5.38213 6.81281 5.18687C6.61755 4.9916 6.61755 4.675 6.81281 4.47976L10.2929 1H7.16634C6.89021 1 6.66634 0.77614 6.66634 0.5Z"
                                    fill="#50D2C1"
                                  ></path>
                                </svg>
                              </a>
                              <div
                                className="sc-pyfCe gKZuHd"
                                style={{display: "inline-block"}}
                              >
                                <div style={{cursor: "pointer", padding: "0px", lineHeight: "12px"}}>
                                  <svg
                                    width="14"
                                    height="14"
                                    focusable="false"
                                    aria-hidden="true"
                                    viewBox="0 -960 960 900"
                                    className="sc-eDvSVe ghLAkI"
                                  >
                                    <path
                                      d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-480h480q22 0 42 5t38 16v-21q0-33-23.5-56.5T720-720H240q-33 0-56.5 23.5T160-640v21q18-11 38-16t42-5Zm-74 130 445 108q9 2 18 0t17-8l139-116q-11-15-28-24.5t-37-9.5H240q-26 0-45.5 13.5T166-510Z"
                                      fill="#50D2C1"
                                      className="sc-bcXHqe iaMRsW"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="flex-1 m-1">
                <TradingViewChart symbol="BTC" />
              </div>
            </div>

            {/* MIDDLE: ORDER BOOK / TRADES */}
            <div className="w-[284px] h-[650px] set_width flex flex-col border-r border-[#111827] bg-[#0F1A1F] my-1 rounded-md">
              {/* Tabs */}
              <div className="flex border-b border-gray-700 text-sm">
                <button
                  onClick={() => setOrderBookTab("orderbook")}
                  className={`flex-1 py-2 text-[12px] font-medium cursor-pointer ${
                    orderBookTab === "orderbook"
                      ? "text-teal-300 border-b-2 border-teal-400"
                      : "text-[#8b9bb5]"
                  }`}
                >
                  Order Book
                </button>
                <button
                  onClick={() => setOrderBookTab("trades")}
                  className={`flex-1 py-3 text-[12px] font-medium cursor-pointer ${
                    orderBookTab === "trades"
                      ? "text-teal-300 border-b-2 border-teal-400"
                      : "text-[#8b9bb5]"
                  }`}
                >
                  Trades
                </button>
              </div>

              {/* Top controls */}
              <div className="flex items-center justify-between px-3 py-2 text-[11px] text-[#8b9bb5]">
                <span>0.001 ▾</span>
                <span>HYPE ▾</span>
              </div>

              {/* Column headers */}
              <div
                className="flex justify-between px-3 py-2 text-[11px] text-[#8b9bb5]"
                style={{ marginTop: "0px !important" }}
              >
                <span>Price</span>
                <span className="text-right">Size (HYPE)</span>
                <span className="text-right">Total (HYPE)</span>
              </div>

              {/* Order book content */}
              <div className="flex-1 overflow-y-auto text-xs">
                {/* Sell orders */}
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

                {/* Buy orders */}
                {buyOrders.map((row, idx) => (
                  <div
                    key={`buy-${idx}`}
                    className="relative flex justify-between px-3 py-[4px]"
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-green-500/15"
                      style={{ width: `${row.depth}%` }}
                    />
                    <span className="text-green-400 z-10">{row.price}</span>
                    <span className="text-right z-10">{row.size}</span>
                    <span className="text-right z-10">{row.total}</span>
                  </div>
                ))}
              </div>

              {/* Bottom filter / hide small balances (same as screenshot) */}
            </div>
          </div>

          {/* Bottom tabs / balances */}
          <div className="flex flex-col text-xs bg-[#0F1A1F] h-auto mx-1 rounded-md mb-1 p-2 h-[250px]">
            {/* Tabs + Filter row */}
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-[#111827]">
              {/* Tabs (scrollable on mobile) */}
              <div className="flex overflow-x-auto sm:overflow-visible -mb-px">
                {[
                  "Balances",
                  "Positions",
                  "Open Orders",
                  "TWAP",
                  "Trade History",
                  "Funding History",
                  "Order History",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setBottomTab(tab as BottomTab)}
                    className={`px-4 py-2 whitespace-nowrap flex-shrink-0 font-medium transition border-b-2 ${
                      bottomTab === tab
                        ? "border-teal-400 text-teal-300"
                        : "border-transparent text-[#8b9bb5] hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Filter + Hide Small Balances */}
              <div className="flex items-center gap-3 px-4 py-2 sm:py-0 sm:ml-auto text-[11px] text-[#8b9bb5] shrink-0">
                <button className="hover:text-white">Filter</button>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-teal-400 h-3 w-3"
                    defaultChecked
                  />
                  <span>Hide Small Balances</span>
                </label>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-4 text-[#8b9bb5]">
              {bottomTab === "Balances" ? (
                <p>No balances yet</p>
              ) : (
                <p>No {bottomTab.toLowerCase()} yet</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: TRADE PANEL */}
        <div className="w-[284px] set_width flex flex-col bg-[#0F1A1F] p-2 m-1 rounded-md pb-12">
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

            {/* Connect button */}
            <button className="w-full py-2 rounded-lg bg-teal-400 text-black text-[12px] hover:bg-teal-300 mt-[200px]">
              Connect
            </button>

            {/* Order value / fees */}
            <div className="space-y-1 text-[11px] text-[#8b9bb5] border-t border-[#111827] pt-3">
              <div className="flex justify-between">
                <span>Order Value</span>
                <span className="text-white">N/A</span>
              </div>
              <div className="flex justify-between">
                <span>Slippage</span>
                <span>Est: 0% / Max: 8.00%</span>
              </div>
              <div className="flex justify-between">
                <span>Fees</span>
                <span>0.0700% / 0.0400%</span>
              </div>
            </div>

            {/* Deposit / Withdraw buttons */}
            <div className="mt-2 space-y-2">
              <button className="w-full py-2 rounded bg-[#0d1d26] text-sm border border-[#11343f] hover:bg-[#102532]">
                Deposit
              </button>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded bg-[#0d1d26] text-sm border border-[#11343f] hover:bg-[#102532]">
                  Perps ↔ Spot
                </button>
                <button className="flex-1 py-2 rounded bg-[#0d1d26] text-sm border border-[#11343f] hover:bg-[#102532]">
                  Withdraw
                </button>
              </div>
            </div>

            {/* Account equity card */}
            <div className="mt-3 border-t border-[#111827] pt-3 text-[11px] text-[#8b9bb5] space-y-1">
              <div className="font-semibold text-sm text-white">
                Account Equity
              </div>
              <div className="flex justify-between">
                <span>Spot</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Perps</span>
                <span>$0.00</span>
              </div>

              <div className="mt-2 font-semibold text-sm text-white">
                Perps Overview
              </div>
              <div className="flex justify-between">
                <span>Balance</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Unrealized PNL</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Cross Margin Ratio</span>
                <span>0.00%</span>
              </div>
              <div className="flex justify-between">
                <span>Maintenance Margin</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Cross Account Leverage</span>
                <span>0.00x</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chart;
