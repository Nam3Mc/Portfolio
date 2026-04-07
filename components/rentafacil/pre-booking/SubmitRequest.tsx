'use client'

import { useState } from "react"
import { RequiredDocument } from "@/src/rentafacil/interfaces/preCheckout"

interface Props {
  documents: Record<string, File | null>
  requiredDocs: RequiredDocument[]
  message: string
  onSubmit: () => Promise<void> | void
}

export default function SubmitRequest({
  documents,
  requiredDocs,
  message,
  onSubmit
}: Props) {

  const [loading, setLoading] = useState(false)

  const missingDocs = requiredDocs.filter(
    (doc) => doc.required && !documents[doc.id]
  )

  const isValid = missingDocs.length === 0

  const handleClick = async () => {
    if (!isValid || loading) return

    try {
      setLoading(true)
      await onSubmit()
    } catch (error) {
      console.error(error)
      alert("Error al enviar la solicitud")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">

      {/* 🔹 Feedback */}
      {!isValid ? (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg p-3">
          Faltan {missingDocs.length} documento{missingDocs.length > 1 && "s"} obligatorio{missingDocs.length > 1 && "s"}.
        </div>
      ) : (
        <div className="bg-green-50 border border-green-100 text-green-700 text-sm rounded-lg p-3">
          Todo listo para enviar 🚀
        </div>
      )}

      {/* 🔹 Botón */}
      <button
        onClick={handleClick}
        disabled={!isValid || loading}
        className={`
          w-full py-3 rounded-xl font-semibold transition-all duration-200
          flex items-center justify-center gap-2
          ${isValid
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }
          ${loading && "opacity-80 cursor-wait"}
        `}
      >
        {loading ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            Enviando...
          </>
        ) : (
          "Enviar solicitud"
        )}
      </button>

    </div>
  )
}