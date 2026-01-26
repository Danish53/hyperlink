// ethwalletBalance.js
// Check ETH balance of a wallet using ethers v6+

import { JsonRpcProvider, formatEther, isAddress } from 'ethers';

// === CONFIG ===
const address = '0x7a71a107e4329802187c91c211d11b538c8e1e00';
//const address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
const rpcUrl = 'https://eth.llamarpc.com'; // Public RPC
const provider = new JsonRpcProvider(rpcUrl);

async function main() {
  try {
    if (!isAddress(address)) {
      console.error('❌ Invalid Ethereum address:', address);
      process.exit(1);
    }

    const balanceWei = await provider.getBalance(address);
    const balanceEth = formatEther(balanceWei);

    console.log('=== Ethereum Wallet Balance ===');
    console.log('Address:', address);
    console.log('Balance:', `${balanceEth} ETH`);
    console.log('(in wei):', balanceWei.toString());
  } catch (err) {
    console.error('❌ Error fetching balance:', err.message || err);
  }
}

main();
