"use client"

import { useAuth } from "@/src/rentafacil/auth/AuthContext"
import NavbarGuest from "./NavbarGuest"
import NavbarUser from "./NavbarUser"
import NavbarOwner from "./NavbarOwner"

/**
 * Selector de Navbar según rol
 * - guest: usuario regular
 * - owner: propietario
 * - null: visitante
 */
export default function Navbar() {
  const { user } = useAuth()

  const renderNavbar = () => {
    if (!user) return <NavbarGuest />
    if (user.role === "guest") return <NavbarUser />
    if (user.role === "owner") return <NavbarOwner />

    // Fallback para roles no contemplados
    return <NavbarGuest />
  }

  return renderNavbar()
}