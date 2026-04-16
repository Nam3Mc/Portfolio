// components/rentafacil/global/Providers.tsx
"use client"

import Web3Provider from "@/src/rentafacil/web3/Web3Provider"
import { AuthProvider } from "@/src/rentafacil/auth/AuthContext"

interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <Web3Provider>
        {children}
      </Web3Provider>
    </AuthProvider>
  )
}