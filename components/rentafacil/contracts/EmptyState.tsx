'use client'

import { useRouter } from "next/navigation"
import { Home, Search, Sparkles } from "lucide-react"

export default function EmptyState() {

  const router = useRouter()

  return (
    <div className="
      flex flex-col items-center justify-center text-center
      py-20 px-6
      bg-gradient-to-b from-white to-indigo-50/30
      border border-gray-200/60
      rounded-2xl
      shadow-sm
    ">

      {/* ✨ VISUAL CORE */}
      <div className="
        relative w-20 h-20 flex items-center justify-center
        rounded-2xl bg-indigo-50 border border-indigo-100
        mb-5
      ">
        <Sparkles className="text-indigo-600" size={28} />
      </div>

      {/* 🧠 HEADLINE */}
      <h2 className="text-xl font-semibold text-gray-900">
        Tu historial de contratos está vacío
      </h2>

      {/* 📝 SUBTEXT */}
      <p className="text-sm text-gray-500 mt-2 max-w-sm leading-relaxed">
        Aquí verás todas tus solicitudes de alquiler, aprobaciones y contratos activos.
        Empieza explorando propiedades disponibles.
      </p>

      {/* 🚀 CTA PRIMARY */}
      <button
        onClick={() => router.push("/rentafacil/explore")}
        className="
          mt-7 px-6 py-3
          rounded-xl
          bg-indigo-600 text-white
          text-sm font-semibold
          hover:bg-indigo-700
          transition-all duration-200
          shadow-sm hover:shadow-md
          flex items-center gap-2
        "
      >
        <Search size={16} />
        Explorar propiedades
      </button>

      {/* subtle hint */}
      <p className="text-[11px] text-gray-400 mt-4">
        Descubre espacios verificados y listos para alquilar
      </p>

    </div>
  )
}