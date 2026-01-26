// getBtcBalance.js
// Node 18+ (built-in fetch) recommended

const ADDRESS = 'bc1q...replace_with_address_here'; // ← put address here
const NETWORK = 'mainnet'; // 'mainnet' or 'testnet'

const API_BASE =
  NETWORK === 'testnet' ? 'https://blockstream.info/testnet/api' : 'https://blockstream.info/api';

async function getAddressInfo(addr) {
  const res = await fetch(`${API_BASE}/address/${addr}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function main() {
  try {
    if (!ADDRESS || ADDRESS.length < 10) {
      console.error('Set ADDRESS at the top of this file to a valid BTC address.');
      process.exit(1);
    }

    console.log(`Querying ${NETWORK} for address: ${ADDRESS}`);
    const info = await getAddressInfo(ADDRESS);

    // Blockstream returns chain_stats and mempool_stats.
    // chain_stats.funded_txo_sum - chain_stats.spent_txo_sum = confirmed satoshis received - spent => confirmed balance
    const confirmedSats =
      (info.chain_stats?.funded_txo_sum || 0) - (info.chain_stats?.spent_txo_sum || 0);

    // mempool (unconfirmed) balance: funded - spent in mempool
    const mempoolSats =
      (info.mempool_stats?.funded_txo_sum || 0) - (info.mempool_stats?.spent_txo_sum || 0);

    const totalSats = confirmedSats + mempoolSats;

    console.log('Confirmed (sats):', confirmedSats);
    console.log('Unconfirmed (sats):', mempoolSats);
    console.log('Total (sats):', totalSats);
    console.log('Total (BTC):', (totalSats / 1e8).toString());
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

main();
