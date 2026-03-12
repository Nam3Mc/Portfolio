'use client'

import Navbar from "@/components/rentafacil/global/Navbar"
import Footer from "@/components/rentafacil/global/Footer"
import Web3Provider from "@/src/rentafacil/web3/Web3Provider"

export default function RentaFacilLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <Web3Provider>

      <section className="min-h-screen bg-white flex flex-col">

        <Navbar />

        {/* MAIN CONTENT */}
        <main className="flex-1 pt-24">

          <div className="max-w-7xl mx-auto px-6">
            {children}
          </div>

        </main>

        <Footer />

      </section>

    </Web3Provider>

  )
}