'use client'

import { RequiredDocument } from "@/src/rentafacil/interfaces/preCheckout"
import DocumentItem from "./DocumentItem"

interface Props {
  documentsRequired: RequiredDocument[]
  documents: Record<string, File | null>
  setDocuments: (docs: Record<string, File | null>) => void
}

export default function DocumentsSection({
  documentsRequired,
  documents,
  setDocuments
}: Props) {

  const handleFileChange = (id: string, file: File | null) => {
    setDocuments({
      ...documents,
      [id]: file
    })
  }

  // 📊 progreso
  const uploadedCount = documentsRequired.filter(
    doc => documents[doc.id]
  ).length

  const total = documentsRequired.length
  const progress = Math.round((uploadedCount / total) * 100)

  return (
    <div className="
      bg-white border border-gray-100 rounded-2xl shadow-sm
      p-4 sm:p-5 lg:p-6 flex flex-col gap-5
    ">

      {/* 🧠 Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-900">
          Documentos requeridos
        </h2>
        <p className="text-sm text-gray-500">
          Sube los documentos para completar tu solicitud
        </p>
      </div>

      {/* 📊 Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{uploadedCount} de {total} completados</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 📄 Lista */}
      <div className="flex flex-col gap-3">
        {documentsRequired.map(doc => (
          <DocumentItem
            key={doc.id}
            doc={doc}
            file={documents[doc.id] || null}
            onChange={handleFileChange}
          />
        ))}
      </div>

      {/* 💡 Helper */}
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs text-gray-500">
        🔒 Tus documentos son privados y solo serán visibles para el propietario.
      </div>

    </div>
  )
}