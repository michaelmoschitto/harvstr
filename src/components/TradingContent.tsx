'use client';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export default function TradingContent() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!publicKey) return;

    const getBalance = async () => {
      try {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      } catch (e) {
        console.error('Error getting balance:', e);
      }
    };

    getBalance();
    const intervalId = setInterval(getBalance, 10000);
    return () => clearInterval(intervalId);
  }, [connection, publicKey]);

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-start justify-between'>
        <Heading
          title='Trading'
          description='Trading dashboard and analytics'
        />
        <div className='flex flex-col items-end gap-2'>
          <WalletMultiButton />
          {publicKey && (
            <div className='text-sm'>Balance: {balance.toFixed(2)} SOL</div>
          )}
        </div>
      </div>
      <Separator />
      <div>{/* Trading content will go here */}</div>
    </div>
  );
}
