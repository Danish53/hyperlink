// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import { Crosshair, PenLine, Brush, Type, Sigma, Smile, LayoutGrid, Layers } from 'lucide-react';
// import {
//   createChart,
//   ColorType,
//   CandlestickSeriesOptions,
//   IChartApi,
//   ISeriesApi,
//   CandlestickSeries,
//   UTCTimestamp,
//   CandlestickData,
// } from 'lightweight-charts';
// const TIMEFRAMES = ['1m', '5m', '15m', '1h', '4h', '1D'];
// const CANDLE_TYPES = ['Candles', 'Bars', 'Line'];
// import { RxCrosshair1 } from 'react-icons/rx';
// import { PiLineSegmentBold } from 'react-icons/pi';
// import { MdBrush, MdGridView, MdLayers } from 'react-icons/md';
// import { TfiText } from 'react-icons/tfi';
// import { SlGraph } from 'react-icons/sl';
// import { BiCandles } from 'react-icons/bi';
// import { TbMathFunction } from 'react-icons/tb';
// import { FiSettings } from 'react-icons/fi';
// import { RxEnterFullScreen } from 'react-icons/rx';
// import { BsEmojiSmile } from 'react-icons/bs';

// export default function TradingViewClone() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const chartRef = useRef<IChartApi | null>(null);
//   const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
//   const [timeframe, setTimeframe] = useState('1m');
//   const [candleType, setCandleType] = useState('Candles');
//   const [crosshair, setCrosshair] = useState(true);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showIndicators, setShowIndicators] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [activeTool, setActiveTool] = useState<string | null>(null);
//   const overlayRef = useRef<HTMLDivElement | null>(null);
//   const [drawings, setDrawings] = useState<any[]>([]);
//   const currentDrawRef = useRef<any>(null);
//   const [barSpacing, setBarSpacing] = useState(12);
//   const [popup, setPopup] = useState<null | 'time' | 'candle' | 'indicators'>(null);
//   const closePopup = () => setPopup(null);
//   const [toolPopup, setToolPopup] = useState<null | string>(null);
//   const [activeTab, setActiveTab] = useState<'symbol' | 'status' | 'scales' | 'appearance'>(
//     'symbol',
//   );
//   const [theme, setTheme] = useState<'dark' | 'light'>('dark');

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const chart = createChart(containerRef.current, {
//       width: containerRef.current.clientWidth,
//       height: 520,
//       layout: { background: { type: ColorType.Solid, color: '#222636' }, textColor: '#9CA3AF' },
//       grid: { vertLines: { color: '#16191b' }, horzLines: { color: '#16191b' } },
//       localization: { dateFormat: 'yyyy-MM-dd' },
//       rightPriceScale: {
//         visible: true,
//         borderColor: '#151515',
//         scaleMargins: { top: 0.1, bottom: 0.1 },
//       },
//       //timeScale: { borderColor: '#151515' },

//       timeScale: {
//         borderColor: '#151515',
//         timeVisible: true,
//         secondsVisible: false,
//         fixLeftEdge: true,
//         fixRightEdge: true,
//         tickMarkFormatter: (time: UTCTimestamp) => {
//           const d = new Date(time * 1000);
//           return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         },
//       },
//     });

//     chartRef.current = chart;

//     const candleSeries = chart.addSeries(CandlestickSeries, {
//       upColor: '#26a69a',
//       downColor: '#ef5350',

//       wickUpColor: '#26a69a',
//       wickDownColor: '#ef5350',

//       borderVisible: true,
//       borderColor: '#000000',
//       borderUpColor: '#26a69a',
//       borderDownColor: '#ef5350',

//       wickVisible: true,
//     });

//     seriesRef.current = candleSeries;

//     const mock = generateMockData();
//     candleSeries.setData(mock);

//     const handleResize = () => {
//       if (!containerRef.current || !chartRef.current) return;
//       chart.applyOptions({ width: containerRef.current.clientWidth });
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       chart.remove();
//     };
//   }, []);

//   const addIndicator = (name: string) => {
//     console.log('Add indicator:', name);
//   };

//   useEffect(() => {
//     if (!chartRef.current) return;
//     chartRef.current.applyOptions({
//       crosshair: { vertLine: { visible: crosshair }, horzLine: { visible: crosshair } },
//     });
//   }, [crosshair]);

//   useEffect(() => {
//     if (!chartRef.current) return;
//     chartRef.current.applyOptions({ timeScale: { barSpacing } });
//   }, [barSpacing]);

//   useEffect(() => {
//     if (!chartRef.current || !seriesRef.current) return;
//     const chart = chartRef.current;
//     const existing = seriesRef.current;
//   }, [candleType]);

//   useEffect(() => {
//     const overlay = overlayRef.current;
//     if (!overlay) return;

//     const start = (e: MouseEvent) => {
//       if (!activeTool) return;
//       const rect = overlay.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       currentDrawRef.current = { tool: activeTool, points: [{ x, y }] };
//     };
//     const move = (e: MouseEvent) => {
//       if (!activeTool || !currentDrawRef.current) return;
//       const rect = overlay.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       currentDrawRef.current.points.push({ x, y });
//       setDrawings((d) => [...d.filter(Boolean), { ...currentDrawRef.current }]);
//     };
//     const end = () => {
//       if (!activeTool || !currentDrawRef.current) return;
//       setDrawings((d) => [...d, currentDrawRef.current]);
//       currentDrawRef.current = null;
//     };

//     overlay.addEventListener('pointerdown', start);
//     overlay.addEventListener('pointermove', move);
//     window.addEventListener('pointerup', end);

//     return () => {
//       overlay.removeEventListener('pointerdown', start);
//       overlay.removeEventListener('pointermove', move);
//       window.removeEventListener('pointerup', end);
//     };
//   }, [activeTool]);

//   const zoomIn = () => setBarSpacing((s) => Math.min(40, s + 2));
//   const zoomOut = () => setBarSpacing((s) => Math.max(2, s - 2));
//   const resetZoom = () => setBarSpacing(12);

//   const toggleFullscreen = async () => {
//     const el = containerRef.current?.closest('.tv-wrapper') as HTMLElement | null;
//     if (!el) return;
//     if (!document.fullscreenElement) {
//       await el.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       await document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   const takeSnapshot = () => {
//     if (!chartRef.current) return;
//     const dataUrl = (chartRef.current as any).takeScreenshot?.() || null;
//     console.log('snapshot:', dataUrl);
//     alert('Snapshot taken (mock)');
//   };

//   return (
//     <div className="tv-wrapper relative bg-white dark:bg-[#222636] rounded-lg overflow-hidden shadow-xl">
//       <div className="flex items-center justify-between px-4 py-2 border-b border-[#0f1416] bg-white dark:bg-[#131722]">
//         <div className="flex items-center gap-4 text-gray-300">
//           <button
//             onClick={() => setPopup('time')}
//             className="text-sm text-[#333] dark:text-white hover:text-white"
//           >
//             1m
//           </button>

//           <div className="h-4 w-px bg-gray-400 dark:bg-[#262c33]" />

//           <button onClick={() => setPopup('candle')} className=" hover:text-white">
//             <BiCandles size={22} className="opacity-80 text-[#333] dark:text-gray-400" />
//           </button>

//           <div className="h-4 w-px bg-gray-400 dark:bg-[#262c33]" />

//           <button
//             className="text-sm hover:text-white text-[#333] dark:text-gray-400"
//             onClick={() => setPopup('indicators')}
//           >
//             <span className="flex">
//               <TbMathFunction size={22} className="opacity-80 text-[#333] dark:text-gray-400" />
//               <span> Indicators</span>
//             </span>
//           </button>

//           {popup && (
//             <div
//               className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
//               onClick={closePopup}
//             >
//               <div
//                 className="bg-[#1e1e1e] border border-[#333] rounded-lg p-3 w-56 text-gray-200 shadow-xl"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <h3 className="font-semibold text-md mb-2 capitalize">{popup} Options</h3>

//                 {popup === 'time' && (
//                   <div className="text-sm text-gray-300 space-y-2">
//                     <div>
//                       <div className="px-2 py-1 text-xs text-gray-500 uppercase tracking-wide">
//                         Minutes
//                       </div>
//                       {[
//                         { label: '1 minute', value: '1m' },
//                         { label: '3 minutes', value: '3m' },
//                         { label: '5 minutes', value: '5m' },
//                         { label: '15 minutes', value: '15m' },
//                         { label: '30 minutes', value: '30m' },
//                       ].map((tf) => (
//                         <button
//                           key={tf.value}
//                           onClick={() => {
//                             setTimeframe(tf.value);
//                             closePopup();
//                           }}
//                           className={`w-full flex items-center justify-between px-2 py-1 rounded text-sm
//                   ${timeframe === tf.value ? 'bg-[#2962ff] text-white' : 'hover:bg-[#2a2a2a]'}`}
//                         >
//                           <span>{tf.label}</span>
//                           <span className="text-gray-400">☆</span>
//                         </button>
//                       ))}
//                     </div>

//                     <div className="border-t border-[#2a2a2a] pt-1">
//                       <div className="px-2 py-1 text-xs text-gray-500 uppercase tracking-wide">
//                         Hours
//                       </div>
//                       {[
//                         { label: '1 hour', value: '1h' },
//                         { label: '2 hours', value: '2h' },
//                         { label: '4 hours', value: '4h' },
//                         { label: '6 hours', value: '6h' },
//                       ].map((tf) => (
//                         <button
//                           key={tf.value}
//                           onClick={() => {
//                             setTimeframe(tf.value);
//                             closePopup();
//                           }}
//                           className={`w-full flex items-center justify-between px-2 py-1 rounded text-sm
//                   ${timeframe === tf.value ? 'bg-[#2962ff] text-white' : 'hover:bg-[#2a2a2a]'}`}
//                         >
//                           <span>{tf.label}</span>
//                           <span className="text-gray-400">☆</span>
//                         </button>
//                       ))}
//                     </div>

//                     {/* DAYS */}
//                     <div className="border-t border-[#2a2a2a] pt-1">
//                       <div className="px-2 py-1 text-xs text-gray-500 uppercase tracking-wide">
//                         Days
//                       </div>
//                       {[{ label: '1 day', value: '1D' }].map((tf) => (
//                         <button
//                           key={tf.value}
//                           onClick={() => {
//                             setTimeframe(tf.value);
//                             closePopup();
//                           }}
//                           className={`w-full flex items-center justify-between px-2 py-1 rounded text-sm
//                   ${timeframe === tf.value ? 'bg-[#2962ff] text-white' : 'hover:bg-[#2a2a2a]'}`}
//                         >
//                           <span>{tf.label}</span>
//                           <span className="text-gray-400">☆</span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {popup === 'candle' && (
//                   <div className="text-sm text-gray-300 space-y-1">
//                     {[
//                       { label: 'Bars', value: 'bars' },
//                       { label: 'Candles', value: 'candles' },
//                       { label: 'Hollow candles', value: 'hollow' },
//                       { label: 'Columns', value: 'columns' },
//                       { label: 'Line', value: 'line' },
//                       { label: 'Line with markers', value: 'line_markers' },
//                       { label: 'Step line', value: 'step_line' },
//                       { label: 'Area', value: 'area' },
//                       { label: 'HLC area', value: 'hlc_area' },
//                     ].map((type) => (
//                       <button
//                         key={type.value}
//                         onClick={() => {
//                           setCandleType(type.value); // <-- your chart switch logic
//                           closePopup();
//                         }}
//                         className={`w-full flex items-center justify-between px-2 py-1 rounded
//           ${candleType === type.value ? 'bg-[#2962ff] text-white' : 'hover:bg-[#2a2a2a]'}`}
//                       >
//                         <div className="flex items-center gap-2">
//                           {/* icon placeholder (optional) */}
//                           <span className="opacity-70">▮▮</span>
//                           <span>{type.label}</span>
//                         </div>

//                         <span className="text-gray-400">☆</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {popup === 'indicators' && (
//                   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//                     <div
//                       className="w-[420px] max-h-[80vh] bg-[#131722] rounded-lg shadow-xl flex flex-col"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       {/* Header */}
//                       <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2e39]">
//                         <h2 className="text-lg font-semibold text-gray-200">Indicators</h2>
//                         <button onClick={closePopup} className="text-gray-400 hover:text-white">
//                           ✕
//                         </button>
//                       </div>

//                       {/* Search */}
//                       <div className="px-4 py-3 border-b border-[#2a2e39]">
//                         <div className="flex items-center gap-2 bg-[#1e222d] rounded px-3 py-2">
//                           <span className="text-gray-400">🔍</span>
//                           <input
//                             type="text"
//                             placeholder="Search"
//                             className="bg-transparent outline-none text-sm text-gray-200 w-full placeholder-gray-500"
//                           />
//                         </div>
//                       </div>

//                       {/* List */}
//                       <div className="flex-1 overflow-y-auto px-2 py-2">
//                         <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-500">
//                           Script Name
//                         </div>

//                         {[
//                           'Accelerator Oscillator',
//                           'Accumulation/Distribution',
//                           'Accumulative Swing Index',
//                           'Advance/Decline',
//                           'Arnaud Legoux Moving Average',
//                           'Aroon',
//                           'Average Directional Index',
//                           'Awesome Oscillator',
//                           'Bollinger Bands',
//                           'Commodity Channel Index',
//                           'Moving Average',
//                           'MACD',
//                           'RSI',
//                           'Volume',
//                         ].map((indicator) => (
//                           <button
//                             key={indicator}
//                             onClick={() => {
//                               addIndicator(indicator); // your logic
//                               closePopup();
//                             }}
//                             className="w-full text-left px-3 py-2 rounded hover:bg-[#2a2e39] text-sm text-gray-200"
//                           >
//                             {indicator}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setShowSettings(true)}
//             className="text-[#333] dark:text-gray-400 hover:bg-[#0f1416] p-1.5 rounded"
//           >
//             <FiSettings size={22} className="opacity-80" />
//           </button>
//           <button onClick={toggleFullscreen} className="hover:bg-[#0f1416] p-1.5 rounded">
//             <RxEnterFullScreen size={22} className="text-[#333] dark:text-gray-400 opacity-80" />
//           </button>
//         </div>
//       </div>

//       <div className="flex ">
//         <div className="w-14 bg-white  dark:bg-[#131722] border-r border-[#0f1416] flex flex-col items-center py-3 gap-4 text-[#333] dark:text-gray-400 ">
//           <ToolButton icon={<RxCrosshair1 size={20} />} onClick={() => setToolPopup('cursor')} />

//           <ToolButton
//             icon={<PiLineSegmentBold size={20} />}
//             active={activeTool === 'draw-line'}
//             onClick={() => {
//               setActiveTool((s) => (s === 'draw-line' ? null : 'draw-line'));
//               setToolPopup('line-tools');
//             }}
//           />

//           <ToolButton
//             icon={<MdBrush size={20} />}
//             active={activeTool === 'brush'}
//             onClick={() => {
//               setActiveTool((s) => (s === 'brush' ? null : 'brush'));
//               setToolPopup('brush');
//             }}
//           />

//           <ToolButton icon={<PenLine size={20} />} onClick={() => setToolPopup('curve')} />

//           <ToolButton icon={<TfiText size={20} />} onClick={() => setToolPopup('text')} />

//           <ToolButton icon={<SlGraph size={20} />} onClick={() => setToolPopup('fib')} />

//           <ToolButton icon={<BsEmojiSmile size={20} />} onClick={() => setToolPopup('emoji')} />

//           <div className="mt-auto w-full flex flex-col items-center gap-4">
//             <ToolButton icon={<MdGridView size={20} />} onClick={() => setToolPopup('layout')} />
//             <ToolButton icon={<MdLayers size={20} />} onClick={() => setToolPopup('template')} />
//           </div>
//         </div>
//         {toolPopup && (
//           <div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
//             onClick={() => setToolPopup(null)}
//           >
//             <div
//               className="bg-[#1e1e1e] border border-[#333] rounded-xl p-5 w-72 text-gray-200 shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h3 className="font-semibold text-lg mb-3 capitalize">{toolPopup} Options</h3>

//               {/* Cursor */}
//               {toolPopup === 'cursor' && (
//                 <div className="bg-[#1b2233] rounded-lg overflow-hidden">
//                   {/* Active Tool */}
//                   <button className="w-full flex items-center justify-between px-4 py-3 bg-[#2563eb] text-white">
//                     <div className="flex items-center gap-3">
//                       <span className="text-lg">✛</span>
//                       <span className="font-medium">Cross</span>
//                     </div>
//                     <span className="text-[#50D2C1]">★</span>
//                   </button>

//                   {/* Other Tools */}
//                   {[
//                     { label: 'Dot', icon: '•' },
//                     { label: 'Arrow', icon: '➜' },
//                     { label: 'Eraser', icon: '⌫' },
//                   ].map((tool) => (
//                     <button
//                       key={tool.label}
//                       className="w-full flex items-center justify-between px-4 py-3 text-gray-200 hover:bg-[#2a324a]"
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className="text-lg">{tool.icon}</span>
//                         <span>{tool.label}</span>
//                       </div>
//                       <span className="text-gray-500 hover:text-[#50D2C1]">☆</span>
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {toolPopup === 'line-tools' && (
//                 <div className="bg-[#1b2233] rounded-lg overflow-hidden text-sm">
//                   {[
//                     { label: 'Trend Line', icon: '⟋', shortcut: 'Alt + T', active: true },
//                     { label: 'Arrow', icon: '➜' },
//                     { label: 'Ray', icon: '⟶' },
//                     { label: 'Info Line', icon: 'ⓘ' },
//                     { label: 'Extended Line', icon: '⟷' },
//                     { label: 'Trend Angle', icon: '∠' },
//                     { label: 'Horizontal Line', icon: '─', shortcut: 'Alt + H' },
//                     { label: 'Horizontal Ray', icon: '⟼', shortcut: 'Alt + J' },
//                     { label: 'Vertical Line', icon: '│', shortcut: 'Alt + V' },
//                     { label: 'Cross Line', icon: '✛', shortcut: 'Alt + C' },
//                   ].map((tool) => (
//                     <button
//                       key={tool.label}
//                       className={`w-full flex items-center justify-between px-4 py-2
//           ${tool.active ? 'bg-[#2563eb] text-white' : 'text-gray-200 hover:bg-[#2a324a]'}`}
//                     >
//                       {/* Left */}
//                       <div className="flex items-center gap-3">
//                         <span className="text-base opacity-80">{tool.icon}</span>
//                         <span>{tool.label}</span>
//                       </div>

//                       {/* Right */}
//                       <div className="flex items-center gap-3 text-xs">
//                         {tool.shortcut && (
//                           <span className="text-gray-300 opacity-70">{tool.shortcut}</span>
//                         )}
//                         <span
//                           className={`${
//                             tool.active ? 'text-[#50D2C1]' : 'text-gray-500 hover:text-[#50D2C1]'
//                           }`}
//                         >
//                           {tool.active ? '★' : '☆'}
//                         </span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Brush */}
//               {toolPopup === 'brush' && (
//                 <div className="space-y-2">
//                   {['Soft Brush', 'Hard Brush', 'Marker', 'Highlighter'].map((t) => (
//                     <button
//                       key={t}
//                       className="w-full text-left px-3 py-2 bg-[#2a2a2a] rounded hover:bg-[#3a3a3a]"
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Curve */}
//               {toolPopup === 'curve' && (
//                 <div className="space-y-2">
//                   {['Smooth Curve', 'Arc', 'Bezier', 'Freeform Curve'].map((t) => (
//                     <button
//                       key={t}
//                       className="w-full text-left px-3 py-2 bg-[#2a2a2a] rounded hover:bg-[#3a3a3a]"
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Text */}
//               {toolPopup === 'text' && (
//                 <div className="space-y-2">
//                   {['Small Text', 'Medium Text', 'Large Text'].map((t) => (
//                     <button
//                       key={t}
//                       className="w-full text-left px-3 py-2 bg-[#2a2a2a] rounded hover:bg-[#3a3a3a]"
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Fib Retracement */}
//               {toolPopup === 'fib' && (
//                 <div className="space-y-2">
//                   {['Standard Fib', 'Trend-Based Fib', 'Fib Circles', 'Fib Extension'].map((t) => (
//                     <button
//                       key={t}
//                       className="w-full text-left px-3 py-2 bg-[#2a2a2a] rounded hover:bg-[#3a3a3a]"
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Emoji */}
//               {toolPopup === 'emoji' && (
//                 <div className="space-y-2">
//                   {['🎯 Target', '🚀 Rocket', '💎 Diamond', '❗ Alert'].map((t) => (
//                     <button
//                       key={t}
//                       className="w-full text-left px-3 py-2 bg-[#2a2a2a] rounded hover:bg-[#3a3a3a]"
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Layout */}
//               {toolPopup === 'layout' && (
//                 <div className="space-y-2">
//                   {['1 Chart', '2 Charts (Vertical)', '2 Charts (Horizontal)', '4 Charts Grid'].map(
//                     (t) => (
//                       <button
//                         key={t}
//                         className="w-full text-left px-3 py-2 bg-[#2a2a2a] rounded hover:bg-[#3a3a3a]"
//                       >
//                         {t}
//                       </button>
//                     ),
//                   )}
//                 </div>
//               )}

//               {/* Templates */}
//               {toolPopup === 'template' && (
//                 <div className="space-y-2">
//                   {['Save Template', 'Load Template', 'Default Template'].map((t) => (
//                     <button
//                       key={t}
//                       className="w-full text-left px-3 py-2 bg-[#2a2a2a] rounded hover:bg-[#3a3a3a]"
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="flex-1 relative">
//           <div className="flex absolute left z-40 top-8 left-4">
//             <div className="text-sm font-semibold ">
//               BTC : Bitcoin FYBIT Index Price · <span className="font-normal">{timeframe}</span>
//             </div>
//             <div className="ml-4 text-xs text-green-400">
//               O 84,128 H 84,189 L 84,128 C 84,142 +14 (+0.02%)
//             </div>
//           </div>

//           <img
//             src="/images/FYBIT_white_horizontal.png"
//             alt="watermark"
//             className="pointer-events-none absolute left-1/2 top-1/2
//                -translate-x-1/2 -translate-y-1/2
//                opacity-20 w-80 z-40"
//           />

//           <div ref={containerRef} className="w-full h-[520px] bg-white dark:bg-[#131722] z-10" />

//           <div ref={overlayRef} className="absolute inset-0 pointer-events-auto z-30">
//             <svg className="w-full h-full">
//               {drawings.map((d: any, i: number) => (
//                 <polyline
//                   key={i}
//                   points={d.points.map((p: any) => `${p.x},${p.y}`).join(' ')}
//                   stroke={d.tool === 'brush' ? '#f59e0b' : '#60a5fa'}
//                   strokeWidth={d.tool === 'brush' ? 3 : 2}
//                   fill="none"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               ))}
//             </svg>
//           </div>
//         </div>
//       </div>
//       {showIndicators && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//           <div className="bg-[#071014] w-[540px] rounded shadow-lg p-4 border border-[#0f1416]">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="font-semibold">Indicators</h3>
//               <button onClick={() => setShowIndicators(false)}>✕</button>
//             </div>
//             <div className="space-y-2 text-sm text-gray-300">
//               <div className="flex justify-between">
//                 <span>EMA (12)</span>
//                 <button className="text-sm">Add</button>
//               </div>
//               <div className="flex justify-between">
//                 <span>SMA (50)</span>
//                 <button className="text-sm">Add</button>
//               </div>
//               <div className="flex justify-between">
//                 <span>RSI</span>
//                 <button className="text-sm">Add</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showSettings && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//           <div className="w-[720px] h-[460px] bg-[#0e141b] rounded-lg border border-[#1c232b] shadow-xl flex">
//             {/* LEFT SIDEBAR */}
//             <div className="w-56 border-r border-[#1c232b] p-3 text-sm text-gray-300">
//               <h3 className="text-lg font-semibold mb-3">Chart settings</h3>

//               {[
//                 { id: 'symbol', label: 'Symbol' },
//                 { id: 'status', label: 'Status line' },
//                 { id: 'scales', label: 'Scales' },
//                 { id: 'appearance', label: 'Appearance' },
//               ].map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => setActiveTab(item.id as any)}
//                   className={`w-full flex items-center gap-2 px-3 py-2 rounded
//               ${activeTab === item.id ? 'bg-[#1b2330] text-white' : 'hover:bg-[#151b22]'}`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>

//             {/* RIGHT CONTENT */}
//             <div className="flex-1 p-5 text-sm text-gray-300 overflow-y-auto">
//               {activeTab === 'symbol' && (
//                 <>
//                   <h4 className="uppercase text-xs text-gray-500 mb-3">Candles</h4>

//                   <label className="flex items-center gap-2 mb-4">
//                     <input type="checkbox" className="accent-[#2962ff]" />
//                     <span>Color bars based on previous close</span>
//                   </label>

//                   {/* BODY */}
//                   <div className="flex items-center justify-between mb-3">
//                     <label className="flex items-center gap-2">
//                       <input type="checkbox" defaultChecked className="accent-[#2962ff]" />
//                       Body
//                     </label>

//                     <div className="flex gap-2">
//                       <div className="w-8 h-8 rounded bg-emerald-500 border border-[#333]" />
//                       <div className="w-8 h-8 rounded bg-red-500 border border-[#333]" />
//                     </div>
//                   </div>

//                   {/* BORDERS */}
//                   <div className="flex items-center justify-between mb-3">
//                     <label className="flex items-center gap-2">
//                       <input type="checkbox" defaultChecked className="accent-[#2962ff]" />
//                       Borders
//                     </label>

//                     <div className="flex gap-2">
//                       <div className="w-8 h-8 rounded bg-emerald-500 border border-[#333]" />
//                       <div className="w-8 h-8 rounded bg-red-500 border border-[#333]" />
//                     </div>
//                   </div>

//                   {/* WICK */}
//                   <div className="flex items-center justify-between">
//                     <label className="flex items-center gap-2">
//                       <input type="checkbox" defaultChecked className="accent-[#2962ff]" />
//                       Wick
//                     </label>

//                     <div className="flex gap-2">
//                       <div className="w-8 h-8 rounded bg-emerald-500 border border-[#333]" />
//                       <div className="w-8 h-8 rounded bg-red-500 border border-[#333]" />
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* CLOSE ICON */}
//             <button
//               onClick={() => setShowSettings(false)}
//               className="absolute top-3 right-4 text-gray-400 hover:text-white"
//             >
//               ✕
//             </button>
//           </div>

//           {/* BOTTOM BAR */}
//           <div className="fixed bottom-[calc(50%-230px)] w-[720px] flex justify-between px-4 py-3 bg-[#0b1118] border-t border-[#1c232b] rounded-b-lg">
//             <button className="px-3 py-1 rounded bg-[#151b22] hover:bg-[#1c2330]">Template</button>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowSettings(false)}
//                 className="px-4 py-1 rounded text-[#2962ff] hover:bg-[#1b2330]"
//               >
//                 Cancel
//               </button>
//               <button className="px-4 py-1 rounded bg-[#2962ff] text-white">Ok</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function ToolButton({
//   icon,
//   onClick,
//   active,
// }: {
//   icon: React.ReactNode;
//   onClick?: () => void;
//   active?: boolean;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-9 h-9 rounded flex items-center justify-center
//         ${active ? 'bg-[#0f1416]' : 'hover:bg-[#0f1416]'} text-gray-300`}
//     >
//       {icon}
//     </button>
//   );
// }

// function generateMockData() {
//   const out: any[] = [];
//   let t = Date.now() - 1000 * 60 * 200;
//   let price = 84000;
//   for (let i = 0; i < 200; i++) {
//     const open = price + random(-150, 150);
//     const close = open + random(-200, 200);
//     const high = Math.max(open, close) + random(0, 120);
//     const low = Math.min(open, close) - random(0, 120);
//     out.push({
//       time: Math.floor(t / 1000),
//       open: Math.round(open),
//       high: Math.round(high),
//       low: Math.round(low),
//       close: Math.round(close),
//     });
//     price = close;
//     t += 60 * 1000; // 1m interval
//   }
//   return out;
// }

// function random(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useTheme } from "@/contexts/ThemeContext";

declare global {
  interface Window {
    TradingView?: any;
  }
}

const TradingViewChart = ({ symbol }: { symbol: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!ready || !window.TradingView || !ref.current) return;

    ref.current.innerHTML = "";

    new window.TradingView.widget({
      autosize: true,
      symbol: `BINANCE:${symbol}USDT`,
      interval: "15",
      timezone: "Etc/UTC",
      theme: theme === "dark" ? "dark" : "light",
      style: 1,
      locale: "en",

      // 🔥 UI CONTROLS (IMAGE JAISE)
      hide_top_toolbar: false,
      hide_side_toolbar: false, // 👈 LEFT SIDEBAR
      allow_symbol_change: false,
      save_image: true,
      withdateranges: true,
      enable_publishing: false,

      // 🔥 INDICATORS & DRAWINGS
      drawings_access: {
        type: "all",
        tools: [
          { name: "Trend Line" },
          { name: "Horizontal Line" },
          { name: "Vertical Line" },
          { name: "Rectangle" },
          { name: "Brush" },
          { name: "Fib Retracement" },
        ],
      },

      studies: ["Volume@tv-basicstudies"],

      toolbar_bg: theme === "dark" ? "#0b1220" : "#ffffff",
      backgroundColor: theme === "dark" ? "#0b1220" : "#ffffff",

      container_id: "tv_chart",
    });
  }, [ready, symbol, theme]);

  return (
    <>
      <Script
        src="https://s3.tradingview.com/tv.js"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />

      <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-800">
        <div ref={ref} id="tv_chart" className="w-full h-full" />
      </div>
    </>
  );
};

export default TradingViewChart;
