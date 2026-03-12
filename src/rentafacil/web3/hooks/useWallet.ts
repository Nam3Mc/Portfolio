"use client"

import { useAccount, useDisconnect, useBalance } from "wagmi"

export default function useWallet() {

  const { address, isConnected } = useAccount()

  const { disconnect } = useDisconnect()

  const { data: balance } = useBalance({
    address
  })

  return {

    address,

    connected: isConnected,

    balance: balance?.formatted,

    symbol: balance?.symbol,

    disconnect

  }

}