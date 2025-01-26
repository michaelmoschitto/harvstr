'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export default function AddressPage() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);

  // code for the `getAirdropOnClick` function here

  // code for the `getBalanceEvery10Seconds` and useEffect code here

  return (
    <main className='flex min-h-screen flex-col items-center justify-evenly p-24'>
      {publicKey ? (
        <div className='flex flex-col gap-4'>
          <h1>Your Public key is: {publicKey.toString()}</h1>
          <h2>Your Balance is: {balance} SOL</h2>
          <div>
            <button
              onClick={undefined}
              type='button'
              className='mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
            >
              Get Airdrop
            </button>
          </div>
        </div>
      ) : (
        <h1>Wallet is not connected</h1>
      )}
      <WalletMultiButton />
    </main>
  );
}
