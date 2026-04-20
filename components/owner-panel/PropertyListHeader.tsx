'use client'

import Link from "next/link"
import { Plus } from "lucide-react"

interface Props {
  total: number
  active: number
}

export default function PropertyListHeader({ total, active }: Props) {
  return (
    <div className="flex items-start justify-between gap-4">

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-gray-900">Mis propiedades</h1>
        <p className="text-sm text-gray-500">
          {total} propiedad{total !== 1 ? "es" : ""} · {active} activa{active !== 1 ? "s" : ""}
        </p>
      </div>

      <Link
        href="/rentafacil/create-property"
        className="
          flex items-center gap-2 shrink-0
          px-4 py-2.5 rounded-xl
          bg-indigo-600 text-white text-sm font-semibold
          hover:bg-indigo-700 transition-colors shadow-sm
        "
      >
        <Plus size={16} />
        <span className="hidden sm:inline">Nueva propiedad</span>
        <span className="sm:hidden">Nueva</span>
      </Link>

    </div>
  )
}