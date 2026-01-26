'use client';
import { useState } from 'react';
import React from 'react';

const Withdrawal = ({
  session,
  balances,
}: {
  session: any;
  balances: { btc: number; eth: number; usdt: number };
}) => {
  const [selectedCoin, setSelectedCoin] = useState<'BTC' | 'ETH' | 'USDT'>('BTC');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');

  const availableBalance =
    selectedCoin === 'BTC' ? balances.btc : selectedCoin === 'ETH' ? balances.eth : balances.usdt;

  // Inside Withdrawal.tsx
  const handleWithdraw = async () => {
    if (!toAddress || !amount) return;
    try {
      const res = await fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          coin: selectedCoin,
          toAddress,
          amount,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`✅ Transaction sent! Hash: ${data.hash}`);
      } else {
        alert(`❌ Withdrawal failed: ${data.error}`);
      }
    } catch (err) {
      alert('Error sending withdrawal');
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#50D2C1] mb-8">Cryptocurrency Withdrawal</h1>

      {/* === Select Coin === */}
      <div className="mb-8">
        <label className="block text-gray-300 mb-3 text-lg">Select Coin</label>
        <div className="flex gap-4 flex-wrap">
          {['BTC', 'ETH', 'USDT'].map((coin) => (
            <button
              key={coin}
              className={`flex flex-col items-center justify-center w-24 h-24 border rounded-lg transition-all ${
                selectedCoin === coin
                  ? 'border-[#50D2C1] bg-[#50D2C1]/10'
                  : 'border-gray-700 hover:border-[#50D2C1]/50'
              }`}
              onClick={() => setSelectedCoin(coin as 'BTC' | 'ETH' | 'USDT')}
            >
              <img
                src={`/icons/${coin.toLowerCase()}.svg`}
                alt={coin}
                className="w-8 h-8 mb-2 object-contain transition-transform duration-150 group-hover:scale-110"
              />
              <span className="font-semibold">{coin}</span>
            </button>
          ))}
        </div>
      </div>

      {/* === Destination Address === */}
      <div className="mb-8">
        <label className="block text-gray-300 mb-3 text-lg">Destination Address:</label>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#50D2C1] placeholder-gray-500"
        />
      </div>

      {/* === Withdrawal Amount === */}
      <div className="mb-8">
        <label className="block text-gray-300 mb-3 text-lg">Withdrawal Amount:</label>
        <div className="flex">
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-transparent border border-gray-700 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#50D2C1] placeholder-gray-500"
          />
          <button
            onClick={() => setAmount(availableBalance.toString())}
            className="bg-[#50D2C1] text-black font-bold px-5 rounded-r-lg hover:bg-[#50D2C1] transition"
          >
            MAX
          </button>
        </div>
        <p className="mt-3 text-gray-400 text-sm">
          Available for withdrawal:{' '}
          <span className="text-[#50D2C1]">
            {availableBalance.toFixed(6)} {selectedCoin}
          </span>
        </p>
      </div>

      {/* === Withdraw Button === */}
      <button
        onClick={handleWithdraw}
        className="w-full bg-[#50D2C1] text-black font-semibold text-lg py-3 rounded-lg hover:bg-[#50D2C1] transition disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={!toAddress || !amount}
      >
        Withdraw Now
      </button>
    </div>
  );
};

export default Withdrawal;
