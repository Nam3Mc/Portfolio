'use client'

import { useState } from "react"
import { Property } from "@/src/rentafacil/interfaces/Property"
import { RequiredDocument } from "@/src/rentafacil/interfaces/RequiredDocument"

interface Props {
  property: Property
  documents: Record<string, File | null>
  requiredDocs: RequiredDocument[]
  onSubmit: () => Promise<void> | void
}

export default function SidebarInfo({
  property,
  documents,
  requiredDocs,
  onSubmit
}: Props) {

  const [loading, setLoading] = useState(false)

  const requiredCount = requiredDocs.filter(d => d.required).length

  const completedRequired = requiredDocs.filter(
    d => d.required && documents[d.id]
  ).length

  const isValid = requiredDocs.every(
    d => !d.required || documents[d.id]
  )

  const missing = requiredCount - completedRequired

  const handleClick = async () => {
    if (!isValid || loading) return

    try {
      setLoading(true)
      await onSubmit() // 👉 aquí ocurre el redirect desde la page
    } catch (error) {
      console.error(error)
      alert("Error al enviar la solicitud")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">

      {/* 👤 Owner */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div>
            <p className="text-sm font-medium">Propietario verificado</p>
            <p className="text-xs text-gray-500">Responde en menos de 24h</p>
          </div>
        </div>
      </div>

      {/* 🔒 Confianza */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-xs text-gray-500 flex flex-col gap-2">
        <p>🔒 Documentos protegidos</p>
        <p>✅ Propiedad verificada</p>
        <p>💬 Comunicación segura</p>
      </div>

      {/* 💡 Tips */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-xs text-green-700 flex flex-col gap-1">
        <p className="font-semibold text-green-800">Consejos</p>
        <p>• Completa todos los documentos</p>
        <p>• Escribe un mensaje claro</p>
      </div>

      {/* 💰 CTA + Progreso */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-3">

        <button
          disabled={!isValid || loading}
          onClick={handleClick}
          className={`
            w-full py-3 rounded-xl font-semibold text-sm transition
            flex items-center justify-center gap-2
            ${isValid
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
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

        {!isValid ? (
          <p className="text-xs text-gray-400 text-center">
            Te faltan {missing} documento{missing !== 1 && "s"} obligatorios
          </p>
        ) : (
          <p className="text-xs text-green-600 text-center">
            Todo listo para enviar 🚀
          </p>
        )}

      </div>

      {/* 🪙 Web3 */}
      {"tokenized" in property && property.tokenized && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-xs text-indigo-700">
          Propiedad verificada en blockchain
        </div>
      )}

    </div>
  )
}