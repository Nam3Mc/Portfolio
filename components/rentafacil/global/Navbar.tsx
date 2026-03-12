"use client"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import WalletConnectButton from "../web3/WalletConnectButton"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() // Para estado activo

  const navLinks = [
    { label: "Cómo funciona", href: "#how-it-works" },
    { label: "Para propietarios", href: "#owners" },
    { label: "Explorar", href: "#explore" },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-6 sm:px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/rentafacil" className="flex items-center">
          <Image
            src="/rentafacil/logo.PNG"
            alt="Renta Fácil"
            width={400}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-indigo-600 transition ${
                pathname === link.href ? "text-indigo-600 font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-indigo-600 transition"
          >
            Iniciar sesión
          </Link>
          <div className="scale-90">
            <WalletConnectButton />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 text-2xl"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4 overflow-hidden"
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-indigo-600 transition"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/login"
              className="block w-full text-left text-gray-700 hover:text-indigo-600 transition"
            >
              Iniciar sesión
            </Link>
            
            <div className="w-full flex justify-center">
              <WalletConnectButton />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
