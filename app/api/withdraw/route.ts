// app/api/withdraw/route.ts
import { NextResponse } from 'next/server';
import { ethers, Contract } from 'ethers';
import { decryptText } from '../../../lib/crypto-utils'; // your utils path
import { User } from '@/models/User';
import mongoose from 'mongoose';
import crypto from 'crypto';
import * as bitcoin from 'bitcoinjs-lib';
import axios from 'axios';

const RPC_MAINNET = 'https://eth.llamarpc.com';
const USDT_MAINNET = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const ERC20_ABI = [
  'function transfer(address to, uint256 value) returns (bool)',
  'function decimals() view returns (uint8)',
];

// === CONNECT TO MONGO ===
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI!);
}

export async function POST(req: Request) {
  try {
    const { email, coin, toAddress, amount } = await req.json();
    if (!email || !coin || !toAddress || !amount)
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // === DECRYPT PRIVATE KEY ===
    let privateKey: string | null = null;
    if (coin === 'ETH' || coin === 'USDT') {
      if (!user.ethPrivateKeyEncrypted)
        return NextResponse.json({ error: 'ETH key not found' }, { status: 400 });
      privateKey = decryptText(user.ethPrivateKeyEncrypted);
    } else if (coin === 'BTC') {
      if (!user.btcMnemonicEncrypted)
        return NextResponse.json({ error: 'BTC key not found' }, { status: 400 });
      privateKey = decryptText(user.btcMnemonicEncrypted);
    }

    // === ETH or USDT TRANSFER ===
    if (coin === 'ETH' || coin === 'USDT') {
      const provider = new ethers.JsonRpcProvider(RPC_MAINNET);
      const wallet = new ethers.Wallet(privateKey!, provider);

      if (coin === 'ETH') {
        const tx = await wallet.sendTransaction({
          to: toAddress,
          value: ethers.parseEther(amount),
        });
        const receipt = await tx.wait(1);
        if (!receipt) return NextResponse.json({ error: 'Transaction not mined' }, { status: 500 });
        return NextResponse.json({
          success: true,
          hash: receipt.hash,
          block: receipt.blockNumber,
        });
      } else if (coin === 'USDT') {
        const contract = new Contract(USDT_MAINNET, ERC20_ABI, wallet);
        const decimals = await contract.decimals();
        const value = ethers.parseUnits(amount, decimals);
        const tx = await contract.transfer(toAddress, value);
        const receipt = await tx.wait(1);
        return NextResponse.json({
          success: true,
          hash: receipt.hash,
          block: receipt.blockNumber,
        });
      }
    }

    // === BTC TRANSFER ===
    if (coin === 'BTC') {
      // Using bitcoinjs-lib (and API broadcast)
      const network = bitcoin.networks.bitcoin;
      const keyPair = bitcoin.ECPair.fromWIF(privateKey!, network);
      const { address: fromAddress } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

      // Fetch UTXOs (using BlockCypher)
      const utxosRes = await axios.get(
        `https://api.blockcypher.com/v1/btc/main/addrs/${fromAddress}?unspentOnly=true`,
      );
      const utxos = utxosRes.data.txrefs || [];

      if (utxos.length === 0)
        return NextResponse.json({ error: 'No UTXOs available' }, { status: 400 });

      const psbt = new bitcoin.Psbt({ network });
      let totalInput = 0;
      const sendAmountSats = Math.floor(Number(amount) * 1e8);
      const fee = 15000; // ~0.00015 BTC fee estimate

      for (const utxo of utxos) {
        // fetch the full tx hex once
        const txHexRes = await axios.get(
          `https://api.blockcypher.com/v1/btc/main/txs/${utxo.tx_hash}?includeHex=true`,
        );
        const rawTxHex = txHexRes.data.hex;

        // bitcoinjs-lib expects the txid as a little-endian Buffer for the input hash
        const txidLE = Buffer.from(utxo.tx_hash, 'hex').reverse();

        // Cast to any to satisfy TypeScript types for PsbtInput shape
        psbt.addInput({
          hash: txidLE,
          index: utxo.tx_output_n,
          nonWitnessUtxo: Buffer.from(rawTxHex, 'hex'),
        } as any);

        totalInput += utxo.value;
        if (totalInput >= sendAmountSats + fee) break;
      }

      if (totalInput < sendAmountSats + fee)
        return NextResponse.json({ error: 'Insufficient BTC balance' }, { status: 400 });

      psbt.addOutput({ address: toAddress, value: sendAmountSats });
      const change = totalInput - sendAmountSats - fee;
      if (change > 0) psbt.addOutput({ address: fromAddress!, value: change });

      psbt.signAllInputs(keyPair);
      psbt.finalizeAllInputs();
      const txHex = psbt.extractTransaction().toHex();

      const broadcast = await axios.post('https://api.blockcypher.com/v1/btc/main/txs/push', {
        tx: txHex,
      });

      return NextResponse.json({ success: true, hash: broadcast.data.tx.hash });
    }

    return NextResponse.json({ error: 'Unsupported coin' }, { status: 400 });
  } catch (err: any) {
    console.error('Withdraw error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
