'use client'

import { Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ContractActions() {

  const router = useRouter()

  return (
    <div className="flex gap-2 mt-3">

      {/* 👁️ SINGLE ACTION */}
      <button
        onClick={() => router.push("/rentafacil/mis-contratos/details")}
        className="
          w-full flex items-center justify-center gap-2
          text-sm font-semibold py-2.5 rounded-xl
          bg-indigo-600 text-white
          hover:bg-indigo-700
          shadow-sm hover:shadow-md
          transition-all duration-200
        "
      >
        <Eye size={16} />
        Ver detalles
      </button>

    </div>
  )
}