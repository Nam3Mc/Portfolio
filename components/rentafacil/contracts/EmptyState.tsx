'use client'

import { useRouter } from "next/navigation"

export default function EmptyState() {

  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white border border-gray-200 rounded-2xl shadow-sm">

      {/* 🏠 Icon */}
      <div className="text-5xl mb-4 text-indigo-600">🏠</div>

      {/* 📝 Texto */}
      <h2 className="text-xl font-semibold text-gray-900">
        No tienes solicitudes aún
      </h2>

      <p className="text-sm text-gray-500 mt-2 max-w-sm">
        Explora propiedades y envía tu primera solicitud de alquiler fácilmente.
      </p>

      {/* 🚀 CTA */}
      <button
        onClick={() => router.push("/rentafacil/explore")}
        className="mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
      >
        Explorar propiedades
      </button>

    </div>
  )
}