'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo, useState } from 'react';
import { create } from 'zustand';

// Import styles using standard CSS import
import '@solana/wallet-adapter-react-ui/styles.css';

export type NetworkType = 'devnet' | 'testnet' | 'localnet';

// Create a store for network state
interface NetworkStore {
  network: NetworkType;
  setNetwork: (network: NetworkType) => void;
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  network: 'devnet',
  setNetwork: (network) => set({ network })
}));

export default function AppWalletProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const network = useNetworkStore((state) => state.network);

  const endpoint = useMemo(() => {
    if (network === 'localnet') return 'http://127.0.0.1:8899';
    return clusterApiUrl(
      network === 'devnet'
        ? WalletAdapterNetwork.Devnet
        : WalletAdapterNetwork.Testnet
    );
  }, [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
