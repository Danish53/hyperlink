"use client";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";
import React from "react";
import { ChevronDown } from "lucide-react";

export default function EarnPage() {
  const tableData = [
    {
      asset: "USDC",
      ltv: "N/A",
      apy: "0.12%",
      price: "$1.00",
      supplied: "0.00000000 USDC",
      interest: "0.00000000 USDC",
      total: "3,051,325.27330866 USDC",
    },
    {
      asset: "USDH",
      ltv: "N/A",
      apy: "0.05%",
      price: "$1.00",
      supplied: "0.00000000 USDH",
      interest: "0.00000000 USDH",
      total: "1,596,195.26498587 USDH",
    },
  ];

  return (
    <>
      <Header session={null} />

      <div className="min-h-screen bg-[#01221b] text-[#eafffb] px-10 py-10 mt-8">
        <div className="max-w-[1320px] mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mt-8">
            <h1 className="text-[34px] font-[400] text-white">Earn</h1>
            <button className="bg-[#2dd4bf] text-gray-900 px-4 py-2 rounded-md text-[12px] h-[40px]">
              Supply
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4" style={{gap: "10px", marginTop: "30px"}}>
            <Stat title="Your Health Factor" value="--" />
            <Stat title="Your Total Supplied" value="$0.00" />
            <Stat title="Your Total Borrowed" value="$0.00" />
          </div>

          {/* Table */}
          <div className="bg-[#050f12] border border-[#050f12] rounded-xl p-4">
            <div className="mb-4 text-sm font-semibold">Supply</div>

            <table className="w-full text-[12px] border-none">
              <thead>
                <tr className="text-[#7aa6a0] text-xs">
                  <th className="text-left py-3 flex items-center gap-1">
                    Asset <ChevronDown size={12} />
                  </th>
                  <th>LTV</th>
                  <th>APY</th>
                  <th>Oracle Price</th>
                  <th>Your Supplied</th>
                  <th>Your Interest Earned</th>
                  <th>Total Supplied</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, i) => (
                  <tr
                    key={i}
                    className=" hover:bg-[#0d2a24]"
                  >
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#12332d]" />
                      {row.asset}
                    </td>

                    <td>{row.ltv}</td>
                    <td className="text-[#1ad1a3]">{row.apy}</td>
                    <td>{row.price}</td>
                    <td className="font-mono">{row.supplied}</td>
                    <td className="font-mono">{row.interest}</td>
                    <td className="font-mono">{row.total}</td>

                    <td className="text-right">
                      <button className="text-[#1ad1a3] text-xs mr-3">
                        Supply
                      </button>
                      <button className="text-[#7aa6a0] text-xs">
                        Withdraw
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
 
    </>
  );
}

/* ✅ Props properly typed */
type StatProps = {
  title: string;
  value: string;
};

function Stat({ title, value }: StatProps) {
  return (
    <div className="bg-[#050f12] border border-[#050f12] sadow-lg rounded-xl p-5">
      <div className="text-xs text-[#7aa6a0] mb-2">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
