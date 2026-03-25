"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

import { useAuth } from "@/src/rentafacil/auth/AuthContext"
import WalletConnectButton from "../web3/WalletConnectButton"

export default function Navbar() {

  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const role = user?.role
  const isLanding = pathname === "/rentafacil"

  const isActive = (href: string) => pathname.startsWith(href)

  /* LANDING */
  const landingLinks = [
    { label: "Cómo funciona", href: "#how-it-works" },
    { label: "Explorar", href: "/rentafacil/explore" },
    { label: "Propietarios", href: "#owners" }
  ]

  /* APP */
  const guestLinks = [
    { label: "Explorar", href: "/rentafacil/explore" },
    { label: "Mis contratos", href: "/rentafacil/contracts" }
  ]

  const ownerLinks = [
    { label: "Explorar", href: "/rentafacil/explore" },
    { label: "Mis propiedades", href: "/rentafacil/owner/properties" },
    { label: "Contratos activos", href: "/rentafacil/contracts" },
    { label: "Finanzas", href: "/rentafacil/owner/finance" }
  ]

  let navLinks: { label: string; href: string }[] = []

  if (isLanding && !user) navLinks = landingLinks
  if (!isLanding && !user) navLinks = [{ label: "Explorar", href: "/rentafacil/explore" }]
  if (!isLanding && role === "guest") navLinks = guestLinks
  if (!isLanding && role === "owner") navLinks = ownerLinks

  return (

<header
className={`fixed top-0 left-0 w-full z-50 transition-all
${isLanding ? "bg-white/96" : "bg-white/90 backdrop-blur border-b border-gray-200"}
`}
>

<nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

{/* LOGO */}
<Link href="/rentafacil">
  <Image
    src="/rentafacil/logo.PNG"
    alt="Renta Fácil"
    width={200}
    height={80}
    className="h-full w-auto object-contain"
  />
</Link>

{/* DESKTOP NAV */}
<div className="hidden md:flex items-center space-x-8 text-sm font-medium">
  {navLinks.map(link => (
    <Link
      key={link.href}
      href={link.href}
      className={`transition ${
        isActive(link.href)
          ? "text-indigo-600 font-semibold"
          : "text-gray-700 hover:text-indigo-600"
      }`}
    >
      {link.label}
    </Link>
  ))}
</div>

{/* RIGHT SIDE */}
<div className="hidden md:flex items-center gap-4">

{/* VISITOR */}
{!user && (
  <>
    <Link
      href="/register"
      className="text-sm text-gray-600 hover:text-indigo-600"
    >
      Registrarse
    </Link>

    <Link
      href="/login"
      className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition"
    >
      Iniciar sesión
    </Link>
  </>
)}

{/* USER */}
{user && (
  <>
    {role === "guest" && (
      <Link
        href="/rentafacil/become-owner"
        className="text-indigo-600 text-sm font-medium hover:underline"
      >
        Listar propiedad
      </Link>
    )}

    {role === "owner" && (
      <Link
        href="/rentafacil/list-property"
        className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700"
      >
        + Nueva propiedad
      </Link>
    )}

    <WalletConnectButton />

    {/* USER */}
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 hidden sm:block">
        {user.name}
      </span>

      <Link
        href="/rentafacil/profile"
        className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm"
      >
        {user.name.charAt(0)}
      </Link>
    </div>

    <button
      onClick={logout}
      className="text-sm text-gray-500 hover:text-red-500"
    >
      Salir
    </button>
  </>
)}

</div>

{/* MOBILE BUTTON */}
<button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="md:hidden text-2xl"
>
  {isMenuOpen ? "✕" : "☰"}
</button>

</nav>

{/* MOBILE MENU */}
<AnimatePresence>
{isMenuOpen && (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    className="md:hidden border-t border-gray-200 px-6 py-6 space-y-4 bg-white"
  >

    {navLinks.map(link => (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setIsMenuOpen(false)}
      >
        {link.label}
      </Link>
    ))}

    {!user && (
      <>
        <Link href="/register">Registrarse</Link>
        <Link href="/login">Iniciar sesión</Link>
      </>
    )}

    {user && (
      <>
        <p className="text-sm text-gray-500">{user.name}</p>

        {role === "guest" && (
          <Link href="/rentafacil/become-owner">
            Listar propiedad
          </Link>
        )}

        {role === "owner" && (
          <Link href="/rentafacil/list-property">
            Nueva propiedad
          </Link>
        )}

        <button
          onClick={logout}
          className="text-red-500"
        >
          Cerrar sesión
        </button>
      </>
    )}

    {user && <WalletConnectButton />}

  </motion.div>
)}
</AnimatePresence>

</header>
  )
}