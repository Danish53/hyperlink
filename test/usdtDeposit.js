import { ethers } from 'ethers';

// === CONFIG ===
const RPC_URL = 'https://sepolia.infura.io/v3/ec388667ca9742769dc2dc9cc736389b';
const PRIVATE_KEY = '387f439a087a362d1fdbc6f5f89a6adbfb2ec60ab838fea04714bb9752b0f42f';

// 💰 Sepolia USDT token address (example, replace if using another token)
const USDT_ADDRESS = '0xD67e2FCEd1eB7286218b444f3C91c3c59c8e61D6'; // Sepolia testnet USDT contract
const TO_ADDRESS = '0x7a71a107e4329802187c91c211d11b538c8e1e00';
const AMOUNT_USDT = '5.0'; // amount in USDT (not wei)

// === MAIN LOGIC ===
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function transfer(address to, uint256 amount) returns (bool)',
];

if (!RPC_URL || !PRIVATE_KEY) {
  console.error('Missing RPC_URL or PRIVATE_KEY.');
  process.exit(1);
}

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const usdt = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, wallet);

  console.log(`From: ${wallet.address}`);
  console.log(`To:   ${TO_ADDRESS}`);
  console.log(`Amount (USDT): ${AMOUNT_USDT}`);
  console.log('Preparing transaction...');

  // Get decimals to properly format transfer amount
  const decimals = await usdt.decimals();
  const amount = ethers.parseUnits(AMOUNT_USDT, decimals);

  try {
    const balance = await usdt.balanceOf(wallet.address);
    console.log(`Current USDT balance: ${ethers.formatUnits(balance, decimals)}`);

    if (balance < amount) {
      console.error('❌ Not enough USDT balance.');
      process.exit(1);
    }

    const tx = await usdt.transfer(TO_ADDRESS, amount);
    console.log('Transaction sent. Hash:', tx.hash);

    console.log('Waiting for 1 confirmation...');
    const receipt = await tx.wait(1);
    console.log('✅ Transaction confirmed in block', receipt.blockNumber);
    console.log('Receipt:', {
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      status: receipt.status,
    });
  } catch (err) {
    console.error('Error sending USDT:', err?.message || err);
    process.exit(1);
  }
}

main();
