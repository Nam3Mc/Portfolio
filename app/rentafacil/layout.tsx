"use client"

import Navbar from "@/components/rentafacil/navbar/Navbar"
import Footer from "@/components/rentafacil/global/Footer"
import Web3Provider from "@/src/rentafacil/web3/Web3Provider"
import { AuthProvider } from "@/src/rentafacil/auth/AuthContext"

interface Props {
  children: React.ReactNode
}

export default function RentaFacilLayout({ children }: Props) {
  return (
    <AuthProvider>
      <Web3Provider>
        <div className="min-h-screen flex flex-col bg-white">

          {/* NAVBAR */}
          <Navbar />

          {/* MAIN CONTENT */}
          <main className="flex-1 pt-16 md:pt-20">
            <div className="w-full max-w-7xl mx-auto px-6">
              {children}
            </div>
          </main>

          {/* FOOTER */}
          <Footer />

        </div>
      </Web3Provider>
    </AuthProvider>
  )
}