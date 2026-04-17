// components/rentafacil/navbar/UserMenu.tsx
"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavLink } from "@/src/rentafacil/services/navbarService"

interface Props {
  name?: string
  links: NavLink[]
  onLogout: () => void
}

export default function UserMenu({ name, links, onLogout }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const initial = name?.charAt(0).toUpperCase() ?? "U"

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold hover:bg-indigo-700 transition-colors"
      >
        {initial}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b text-sm text-gray-500 truncate">
              {name ?? "Usuario"}
            </div>

            <div className="flex flex-col text-sm" role="none">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2 hover:bg-gray-100 transition-colors ${
                    link.mobileOnly ? "sm:hidden" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <button
                role="menuitem"
                onClick={() => { onLogout(); setOpen(false) }}
                className="text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}