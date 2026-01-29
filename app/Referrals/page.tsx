"use client";
import React from "react";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";
export default function Referrals() {
    const session = null;
    return (
      <>
      <Header session={session} />
      <div className="min-h-screen bg-[#01221b] text-white px-6 py-8 mt-8">
        <div className="max-w-[1320px] mx-auto space-y-6 mt-10">
   {/* Header */}
   
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-6">
          <div>
            <h1 className="text-[34px] font-[400]">Referrals</h1>
            <p className="text-gray-400 mt-1">
              Refer users to earn rewards.{" "}
              <span className="text-emerald-400 cursor-pointer hover:underline">
                Learn more
              </span>
            </p>
          </div>
  
          <div className="flex flex-wrap gap-3">
            <button className="h-[40px] text-[12px] border border-emerald-600 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-600/10">
              Enter Code
            </button>
            <button className="h-[40px] text-[12px] border border-emerald-600 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-600/10">
              Create Code
            </button>
            <button className="h-[40px] text-[12px] bg-[#2dd4bf] px-4 py-2 rounded-lg hover:bg-emerald-600 transition">
              Claim Rewards
            </button>
          </div>
        </div>
  
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2" style={{gap: "10px", marginTop: "30px"}}>
  
          <div className="bg-[#050f12] p-5 rounded-xl">
            <p className="text-gray-400 text-sm">Traders Referred</p>
            <h2 className="text-2xl font-semibold mt-2">0</h2>
          </div>
  
          <div className="bg-[#050f12] p-5 rounded-xl">
            <p className="text-gray-400 text-sm">Rewards Earned</p>
            <h2 className="text-2xl font-semibold mt-2">$0.00</h2>
          </div>
  
          <div className="bg-[#050f12] p-5 rounded-xl">
            <p className="text-gray-400 text-sm">Claimable Rewards</p>
            <h2 className="text-2xl font-semibold mt-2">$0.00</h2>
          </div>
  
        </div>
  
        {/* Tabs */}
        <div className="bg-[#050f12] rounded-xl">
  
          <div className="flex gap-6 px-5 pt-2 border-b border-gray-700">
            <button className="text-white border-b-2 border-emerald-500 pb-3">
              Referrals
            </button>
            <button className="text-gray-400 hover:text-white pb-3">
              Legacy Reward History
            </button>
          </div>
  
          <div className="p-6 text-center text-gray-400">
            No referrals yet
          </div>
  
        </div>
        </div>
 
      </div>
       {/* Footer */} 
      </>

    );
  }