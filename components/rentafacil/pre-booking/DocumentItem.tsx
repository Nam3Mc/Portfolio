'use client'

import { RequiredDocument } from "@/src/rentafacil/interfaces/RequiredDocument"

interface Props {
  doc: RequiredDocument
  file: File | null
  onChange: (id: string, file: File | null) => void
}

export default function DocumentItem({ doc, file, onChange }: Props) {

  return (
    <div className={`
      border rounded-xl p-4 transition-all duration-200
      ${file
        ? "border-green-200 bg-green-50"
        : "border-gray-200 bg-white hover:border-gray-300"
      }
    `}>

      {/* 🧾 Header */}
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium text-gray-800 text-sm">
          {doc.name}
          {doc.required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </p>

        {file && (
          <span className="text-xs text-green-600 font-medium">
            ✓ Cargado
          </span>
        )}
      </div>

      {/* 📄 Descripción */}
      {doc.description && (
        <p className="text-xs text-gray-500 mb-3">
          {doc.description}
        </p>
      )}

      {/* 📤 Upload area */}
      <label className="
        flex items-center justify-center
        w-full h-24
        border-2 border-dashed rounded-lg
        cursor-pointer
        transition-all

        text-sm text-gray-500

        hover:border-green-500 hover:text-green-600
      ">

        <input
          type="file"
          className="hidden"
          accept={doc.type === "pdf" ? ".pdf" : "image/*"}
          onChange={(e) => onChange(doc.id, e.target.files?.[0] || null)}
        />

        {file ? (
          <div className="flex flex-col items-center text-center">
            <span className="text-green-600 font-medium">
              {file.name}
            </span>
            <span className="text-xs text-gray-400">
              Click para reemplazar
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <span>Subir archivo</span>
            <span className="text-xs text-gray-400">
              PDF o imagen
            </span>
          </div>
        )}
      </label>

    </div>
  )
}