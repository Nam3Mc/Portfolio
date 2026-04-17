// "use client"

// import { useAuth } from "@/src/rentafacil/auth/AuthContext"
// import NavbarGuest from "./NavbarGuest"
// import NavbarUser from "./NavbarUser"
// import NavbarOwner from "./NavbarOwner"

// /**
//  * Selector de Navbar según rol
//  * - guest: usuario regular
//  * - owner: propietario
//  * - null: visitante
//  */
// export default function Navbar() {
//   const { user } = useAuth()

//   const renderNavbar = () => {
//     if (!user) return <NavbarGuest />
//     if (user.role === "guest") return <NavbarUser />
//     if (user.role === "owner") return <NavbarOwner />

//     // Fallback para roles no contemplados
//     return <NavbarGuest />
//   }

//   return renderNavbar()
// }

// components/rentafacil/navbar/Navbar.tsx
"use client"

import Link from "next/link"
import NavbarBase from "./NavbarBase"
import UserMenu from "./UserMenu"
import WalletConnectButton from "../web3/WalletConnectButton"
import { useAuth } from "@/src/rentafacil/auth/AuthContext"
import { getNavbarConfig } from "@/src/rentafacil/services/navbarService"

export default function Navbar() {
  const { user, logout } = useAuth()

  // ── GUEST (no autenticado) ──────────────────────────────────────────────────
  if (!user) {
    return (
      <NavbarBase
        rightContent={
          <div className="flex items-center gap-3">
            <Link
              href="/rentafacil/register"
              className="hidden sm:inline text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Registrarse
            </Link>
            <Link
              href="/rentafacil/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
            >
              Iniciar sesión
            </Link>
          </div>
        }
      >
        <Link href="/rentafacil/explore" className="py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors">
          Explorar
        </Link>
      </NavbarBase>
    )
  }

  // ── AUTENTICADO (guest | owner) ─────────────────────────────────────────────
  const config = getNavbarConfig(user.role)
  const { cta } = config

  return (
    <NavbarBase
      rightContent={
        <div className="flex items-center gap-3">
          {/* CTA según rol */}
          {cta && (
            <Link
              href={cta.href}
              className={
                cta.variant === "filled"
                  ? "hidden sm:block bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
                  : "hidden sm:block text-indigo-600 text-sm font-medium hover:underline"
              }
            >
              {cta.label}
            </Link>
          )}

          {/* Wallet Web3 */}
          <WalletConnectButton />

          {/* User dropdown */}
          <UserMenu
            name={user.name}
            links={config.dropdownLinks}
            onLogout={logout}
          />
        </div>
      }
    >
      {config.navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className="py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          {link.label}
        </Link>
      ))}
    </NavbarBase>
  )
}