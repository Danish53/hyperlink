import { ethers } from 'ethers';

const PRIVATE_KEY = '387f439a087a362d1fdbc6f5f89a6adbfb2ec60ab838fea04714bb9752b0f42f';

const RPC_URL = 'https://sepolia.infura.io/v3/ec388667ca9742769dc2dc9cc736389b';

const TO_ADDRESS = '0x7a71a107e4329802187c91c211d11b538c8e1e00';
const AMOUNT_ETH = '0.001';

if (!RPC_URL || !PRIVATE_KEY) {
  console.error('Missing SEPOLIA_RPC_URL or PRIVATE_KEY in environment.');
  process.exit(1);
}

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log(`From: ${wallet.address}`);
  console.log(`To:   ${TO_ADDRESS}`);
  console.log(`Amount (ETH): ${AMOUNT_ETH}`);
  console.log('Preparing transaction...');

  const txRequest = {
    to: TO_ADDRESS,
    value: ethers.parseEther(AMOUNT_ETH),
  };

  try {
    const estimatedGas = await provider.estimateGas({
      from: wallet.address,
      ...txRequest,
    });
    console.log('Estimated gas:', estimatedGas.toString());
  } catch (err) {
    console.warn(
      'Gas estimation failed — continuing without explicit gasLimit.',
      err?.message || err,
    );
  }

  try {
    const sentTx = await wallet.sendTransaction(txRequest);
    console.log('Transaction sent. Hash:', sentTx.hash);
    console.log('Waiting for 1 confirmation...');
    const receipt = await sentTx.wait(1);
    console.log('Transaction confirmed in block', receipt.blockNumber);
    console.log('Receipt:', {
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      status: receipt.status,
    });
  } catch (err) {
    console.error('Error sending transaction:', err?.message || err);
    process.exit(1);
  }
}

main();
