'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export default function WalletBalance() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        try {
          const newBalance = await connection.getBalance(publicKey);
          setBalance(newBalance / LAMPORTS_PER_SOL);
          setTimeout(getBalanceEvery10Seconds, 10000);
        } catch (err) {
          console.error('Error fetching balance:', err);
        }
      })();
    }
  }, [publicKey, connection]);

  if (!publicKey) {
    return null;
  }

  return (
    <div className='flex flex-col text-sm'>
      <div>Wallet: {publicKey.toString()}</div>
      <div>Balance: {balance.toFixed(2)} SOL</div>
    </div>
  );
}
