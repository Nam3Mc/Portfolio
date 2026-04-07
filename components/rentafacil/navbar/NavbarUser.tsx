"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import NavbarBase from "./NavbarBase"
import { useAuth } from "@/src/rentafacil/auth/AuthContext"
import WalletConnectButton from "../web3/WalletConnectButton"

export default function NavbarUser() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <NavbarBase
      rightContent={
        <div className="flex items-center gap-3 relative">

          {/* CTA */}
          <Link
            href="/rentafacil/become-owner"
            className="hidden sm:block text-indigo-600 text-sm font-medium hover:underline"
          >
            Listar propiedad
          </Link>

          {/* WALLET */}
          <WalletConnectButton />

          {/* USER DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold hover:bg-indigo-700 transition"
            >
              {user?.name?.charAt(0)}
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                >
                  {/* USER INFO */}
                  <div className="px-4 py-3 border-b text-sm text-gray-600">
                    {user?.name}
                  </div>

                  {/* LINKS */}
                  <div className="flex flex-col text-sm">
                    <Link
                      href="/rentafacil/profile"
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      Perfil
                    </Link>

                    <Link
                      href="/rentafacil/mis-contractos"
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      Mis contratos
                    </Link>

                    {/* MOBILE CTA */}
                    <Link
                      href="/rentafacil/become-owner"
                      className="px-4 py-2 hover:bg-gray-100 sm:hidden"
                    >
                      Listar propiedad
                    </Link>

                    <button
                      onClick={logout}
                      className="text-left px-4 py-2 hover:bg-red-50 text-red-500"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      }
    >
      {/* NAV LINKS */}
      <Link
        href="/rentafacil/explore"
        className="py-2 px-2 rounded-lg hover:bg-gray-100"
      >
        Explorar
      </Link>

      <Link
        href="/rentafacil/mis-contratos"
        className="py-2 px-2 rounded-lg hover:bg-gray-100"
      >
        Mis contratos
      </Link>
    </NavbarBase>
  )
}