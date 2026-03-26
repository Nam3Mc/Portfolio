"use client"

import { useAccount, useDisconnect, useBalance, useConnect } from "wagmi"

export default function useWallet() {

  const { address, isConnected } = useAccount()

  const { disconnect } = useDisconnect()

  const { connect, connectors, isPending } = useConnect()

  const { data: balance } = useBalance({
    address
  })

  const handleConnect = () => {
    if (!connectors || connectors.length === 0) return

    connect({ connector: connectors[0] }) // MetaMask normalmente
  }

  return {

    address,

    connected: isConnected,

    balance: balance?.formatted,

    symbol: balance?.symbol,

    connect: handleConnect, // 👈 FIX

    connecting: isPending,

    disconnect

  }

}