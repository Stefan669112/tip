// src/providers/EvmProvider.tsx
import React, { PropsWithChildren } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

// Create a QueryClient instance for caching
const queryClient = new QueryClient();

// Configure chains for EVM wallets
const chains = [mainnet, polygon, optimism, arbitrum, base];

// Configure Wagmi and RainbowKit with default settings
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect Project ID
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // Enable SSR if applicable
});

export const EvmProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
};
