"use client"

import Link from "next/link"
import NavbarBase from "./NavbarBase"

export default function NavbarGuest() {
  return (
    <NavbarBase
      rightContent={
        <div className="flex items-center gap-3">
          <Link
            href="/register"
            className="hidden sm:inline text-sm text-gray-600 hover:text-indigo-600 transition"
          >
            Registrarse
          </Link>

          <Link
            href="/rentafacil/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition"
          >
            Iniciar sesión
          </Link>
        </div>
      }
    >
      {/* NAV LINKS */}
      <Link
        href="/rentafacil/explore"
        className="py-2 px-2 rounded-lg hover:bg-gray-100 transition"
      >
        Explorar
      </Link>
    </NavbarBase>
  )
}