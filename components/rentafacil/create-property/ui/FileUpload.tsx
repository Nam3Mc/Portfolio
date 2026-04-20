'use client'

import { useRef } from "react"
import { Upload, X, FileText, ImageIcon } from "lucide-react"
import { PropertyDocument } from "@/src/rentafacil/services/propertyService"

interface Props {
  label: string
  hint?: string
  accept: string
  value: PropertyDocument | null
  onChange: (doc: PropertyDocument | null) => void
  error?: string
  type?: "document" | "image"
}

export default function FileUpload({
  label,
  hint,
  accept,
  value,
  onChange,
  error,
  type = "document",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const preview = URL.createObjectURL(file)
    onChange({ file, preview, name: file.name })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleRemove = () => {
    if (value) URL.revokeObjectURL(value.preview)
    onChange(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="flex flex-col gap-1.5">

      <label className="text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}

      {value ? (
        // ── PREVIEW ────────────────────────────────────────────────────────
        <div className="relative rounded-xl border border-indigo-200 bg-indigo-50 overflow-hidden">

          {type === "image" ? (
            <img
              src={value.preview}
              alt={value.name}
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="flex items-center gap-3 px-4 py-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                <FileText size={18} className="text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{value.name}</p>
                <p className="text-xs text-indigo-600">Archivo cargado</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        // ── DROP ZONE ───────────────────────────────────────────────────────
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className={`
            cursor-pointer rounded-xl border-2 border-dashed
            flex flex-col items-center justify-center gap-2
            py-8 px-4 text-center
            transition-colors
            ${error
              ? "border-red-300 bg-red-50 hover:bg-red-100"
              : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50"
            }
          `}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${error ? "bg-red-100" : "bg-gray-100"}`}>
            {type === "image"
              ? <ImageIcon size={18} className={error ? "text-red-400" : "text-gray-400"} />
              : <Upload size={18} className={error ? "text-red-400" : "text-gray-400"} />
            }
          </div>
          <div>
            <p className={`text-sm font-medium ${error ? "text-red-500" : "text-gray-600"}`}>
              Clic o arrastrá aquí
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {accept.replace(/,/g, ", ").replace(/\./g, "").toUpperCase()}
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}