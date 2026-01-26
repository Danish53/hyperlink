// Import required dependencies
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';

// Function to generate a Bitcoin wallet
async function createBitcoinWallet() {
  try {
    // Generate a mnemonic (12-word seed phrase)
    const mnemonic = bip39.generateMnemonic();
    console.log('🪶 Mnemonic (Seed Phrase):', mnemonic);

    // Derive seed from mnemonic
    const seed = await bip39.mnemonicToSeed(mnemonic);

    // Create an HD wallet root from the seed
    const root = bitcoin.bip32.fromSeed(seed);

    // Derive the first Bitcoin address (BIP44 path for Bitcoin)
    const path = "m/44'/0'/0'/0/0";
    const child = root.derivePath(path);

    // Generate the Bitcoin address (Legacy P2PKH)
    const { address } = bitcoin.payments.p2pkh({
      pubkey: child.publicKey,
      network: bitcoin.networks.bitcoin, // Mainnet
    });

    console.log('💳 Bitcoin Address:', address);

    // Optional: You can also derive the private key
    const privateKeyWIF = child.toWIF();
    console.log('🔑 Private Key (WIF):', privateKeyWIF);

    // Return the wallet details
    return {
      mnemonic,
      address,
      privateKey: privateKeyWIF,
      derivationPath: path,
    };
  } catch (error) {
    console.error('❌ Error generating wallet:', error);
  }
}

// Run the wallet generator
createBitcoinWallet().then((wallet) => {
  console.log('\n✅ Wallet Created Successfully:\n', wallet);
});
