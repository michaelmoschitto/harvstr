'use client';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { NetworkType, useNetworkStore } from './AppWalletProvider';

export default function TradingContent() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(0);
  const { network, setNetwork } = useNetworkStore();

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

  // Get the current network from the connection endpoint
  const currentNetwork = connection.rpcEndpoint.includes('devnet')
    ? 'Devnet'
    : connection.rpcEndpoint.includes('testnet')
      ? 'Testnet'
      : connection.rpcEndpoint.includes('localhost') ||
          connection.rpcEndpoint.includes('127.0.0.1')
        ? 'Localnet'
        : 'Unknown';

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-start justify-between'>
        <div>
          <Heading
            title='Trading'
            description='Trading dashboard and analytics'
          />
          <div className='mt-2 text-sm text-muted-foreground'>
            Current Network: {currentNetwork}
          </div>
        </div>
        <div className='flex flex-col items-end gap-2'>
          <WalletMultiButton />
          <button
            onClick={(e) => e.preventDefault()}
            className='wallet-adapter-button wallet-adapter-button-trigger'
            style={{ padding: '0 15px', height: '36px', fontSize: '14px' }}
          >
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value as NetworkType)}
              className='cursor-pointer border-none bg-transparent text-inherit focus:outline-none'
              style={{ width: '140px' }}
            >
              <option value='testnet'>Solana Testnet</option>
              <option value='devnet'>Solana Devnet</option>
              <option value='localnet'>Solana Localnet</option>
            </select>
          </button>
          {publicKey && (
            <div className='text-sm'>
              <div>Wallet: {publicKey.toString()}</div>
              <div>Balance: {balance.toFixed(2)} SOL</div>
            </div>
          )}
        </div>
      </div>
      <Separator />
      <div>{/* Trading content will go here */}</div>
    </div>
  );
}
