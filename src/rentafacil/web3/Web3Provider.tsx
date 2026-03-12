"use client"

import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { mainnet, polygon } from 'wagmi/chains'

const config = getDefaultConfig({
  appName: 'RentaFacil',
  projectId: '086303a39a8a68e2453daf6b8ccea83f',
  chains: [mainnet, polygon],
  ssr: true
})

const queryClient = new QueryClient()

export default function Web3Provider({ children }: any) {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )

}