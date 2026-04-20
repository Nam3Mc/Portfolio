'use client'

import { useRef } from "react"
import { ImagePlus, X } from "lucide-react"
import { PropertyDocument } from "@/src/rentafacil/services/propertyService"

interface Props {
  photos: PropertyDocument[]
  onChange: (photos: PropertyDocument[]) => void
  error?: string
}

export default function Step3Photos({ photos, onChange, error }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList) => {
    const newPhotos: PropertyDocument[] = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }))
    onChange([...photos, ...newPhotos])
  }

  const handleRemove = (index: number) => {
    URL.revokeObjectURL(photos[index].preview)
    onChange(photos.filter((_, i) => i !== index))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-gray-900">Fotos de la propiedad</h2>
        <p className="text-sm text-gray-500">
          Subí al menos 3 fotos. Las buenas fotos aumentan las posibilidades de alquilar.
        </p>
      </div>

      {/* COUNTER */}
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${photos.length >= 3 ? "text-green-600" : "text-gray-500"}`}>
          {photos.length} foto{photos.length !== 1 ? "s" : ""} cargada{photos.length !== 1 ? "s" : ""}
        </span>
        <span className="text-xs text-gray-400">Mínimo 3 requeridas</span>
      </div>

      {/* GRID DE FOTOS */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <div key={photo.name + i} className="relative aspect-square rounded-xl overflow-hidden group">
              <img
                src={photo.preview}
                alt={photo.name}
                className="w-full h-full object-cover"
              />
              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
              {/* BADGE PRINCIPAL */}
              {i === 0 && (
                <span className="absolute top-2 left-2 text-[10px] font-semibold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                  Principal
                </span>
              )}
              {/* REMOVE */}
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* DROP ZONE */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className={`
          cursor-pointer rounded-xl border-2 border-dashed
          flex flex-col items-center justify-center gap-2
          py-10 px-4 text-center transition-colors
          ${error
            ? "border-red-300 bg-red-50 hover:bg-red-100"
            : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50"
          }
        `}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${error ? "bg-red-100" : "bg-gray-100"}`}>
          <ImagePlus size={20} className={error ? "text-red-400" : "text-gray-400"} />
        </div>
        <div>
          <p className={`text-sm font-medium ${error ? "text-red-500" : "text-gray-600"}`}>
            Agregar fotos
          </p>
          <p className="text-xs text-gray-400 mt-0.5">JPG, PNG — máx. 10MB cada una</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        multiple
        onChange={e => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

    </div>
  )
}