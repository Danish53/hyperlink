'use server';

import { connectDB } from '../mongodb';
import { User } from '@/models/User';
import { encryptText } from '@/lib/crypto-utils';

export async function createWallets(email: string, fullname: string) {
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error('Email already registered.');
  }

  // ✅ Use fixed wallet addresses
  const btcAddress = 'bc1qahhaxl7yr9uv4mssxqgyvkr0p72cdfk6rwjtdh';
  const ethAddress = '0xD00cc58b698Ad0b06EEEa17E186ae186c0aB019a';
  const usdtAddress = '0xD00cc58b698Ad0b06EEEa17E186ae186c0aB019a';

  // Optionally encrypt placeholders to match schema fields
  const btcMnemonicEncrypted = encryptText('STATIC_WALLET');
  const btcPrivateKeyEncrypted = encryptText('STATIC_WALLET');
  const ethMnemonicEncrypted = encryptText('STATIC_WALLET');
  const ethPrivateKeyEncrypted = encryptText('STATIC_WALLET');

  const newUser = await User.create({
    fullname,
    email,
    btcAddress,
    ethAddress,
    usdtAddress,
    btcMnemonicEncrypted,
    btcPrivateKeyEncrypted,
    ethMnemonicEncrypted,
    ethPrivateKeyEncrypted,
  });

  return {
    user: {
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      btcAddress: newUser.btcAddress,
      ethAddress: newUser.ethAddress,
      usdtAddress: newUser.usdtAddress,
    },
  };
}

/*
'use server';

import { connectDB } from '../mongodb';
import { User } from '@/models/User';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import { ethers } from 'ethers';
import { encryptText } from '@/lib/crypto-utils';

export async function createWallets(email: string, fullname: string) {
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error('Email already registered.');
  }

  const btcMnemonic = bip39.generateMnemonic(); // 12-word mnemonic
  const seed = await bip39.mnemonicToSeed(btcMnemonic);

  const root = bitcoin.bip32.fromSeed(seed);

  const path = "m/44'/0'/0'/0/0";
  const child = root.derivePath(path);

  const { address: btcAddress } = bitcoin.payments.p2pkh({
    pubkey: child.publicKey,
    network: bitcoin.networks.bitcoin,
  });

  const btcPrivateKey = child.toWIF();

  const ethWallet = ethers.Wallet.createRandom();
  const ethAddress = await ethWallet.getAddress();
  const ethMnemonic = ethWallet.mnemonic?.phrase || null;
  const ethPrivateKey = ethWallet.privateKey;
  const usdtAddress = ethAddress;

  const btcMnemonicEncrypted = encryptText(btcMnemonic);
  const btcPrivateKeyEncrypted = encryptText(btcPrivateKey);
  const ethMnemonicEncrypted = ethMnemonic ? encryptText(ethMnemonic) : null;
  const ethPrivateKeyEncrypted = encryptText(ethPrivateKey);

  const newUser = await User.create({
    fullname,
    email,
    btcAddress,
    ethAddress,
    usdtAddress,
    btcMnemonicEncrypted,
    btcPrivateKeyEncrypted,
    ethMnemonicEncrypted,
    ethPrivateKeyEncrypted,
  });

  return {
    user: {
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      btcAddress: newUser.btcAddress,
      ethAddress: newUser.ethAddress,
      usdtAddress: newUser.usdtAddress,
    },
  };
}


*/
