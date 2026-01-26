// usdtwalletBalance.js
// Check ETH and USDT (ERC20) balances using ethers v6+

import { JsonRpcProvider, formatEther, Contract, isAddress } from 'ethers';

// === CONFIG ===
const address = '0x7a71a107e4329802187c91c211d11b538c8e1e00';
const rpcUrl = 'https://eth.llamarpc.com'; // Public RPC
const provider = new JsonRpcProvider(rpcUrl);

// USDT contract on Ethereum mainnet
const USDT_CONTRACT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

// ERC20 minimal ABI for balanceOf()
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

async function main() {
  try {
    if (!isAddress(address)) {
      console.error('❌ Invalid Ethereum address:', address);
      process.exit(1);
    }

    // === ETH BALANCE ===
    const balanceWei = await provider.getBalance(address);
    const balanceEth = formatEther(balanceWei);

    // === USDT BALANCE ===
    const usdt = new Contract(USDT_CONTRACT, ERC20_ABI, provider);
    const [usdtBalanceRaw, decimals, symbol] = await Promise.all([
      usdt.balanceOf(address),
      usdt.decimals(),
      usdt.symbol(),
    ]);

    // Convert BigInt safely
    const usdtBalance = Number(usdtBalanceRaw) / 10 ** Number(decimals);

    console.log('=== Ethereum Wallet Balances ===');
    console.log('Address:', address);
    console.log(`ETH: ${balanceEth} ETH`);
    console.log(`${symbol}: ${usdtBalance} ${symbol}`);
  } catch (err) {
    console.error('❌ Error fetching balance:', err.message || err);
  }
}

main();
