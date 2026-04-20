'use client'

import { useRef, useState } from "react"
import { ImagePlus, Trash2, Star, Loader2 } from "lucide-react"
import { OwnerProperty, updateProperty } from "@/src/rentafacil/services/ownerPropertyService"

interface Props {
  property: OwnerProperty
  onUpdate: (data: Partial<OwnerProperty>) => void
}

export default function TabPhotos({ property, onUpdate }: Props) {
  const [images, setImages] = useState<string[]>(property.images)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file)
      setImages(prev => [...prev, url])
    })
  }

  const handleRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSetMain = (index: number) => {
    setImages(prev => {
      const next = [...prev]
      const [item] = next.splice(index, 1)
      return [item, ...next]
    })
  }

  const handleSave = async () => {
    setLoading(true)
    await updateProperty(property.id, { images })
    onUpdate({ images })
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">{images.length} foto{images.length !== 1 ? "s" : ""}</p>
          <p className="text-xs text-gray-400">La primera imagen es la principal</p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 text-sm text-gray-600 transition-colors"
        >
          <ImagePlus size={15} />
          Agregar fotos
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          onChange={e => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* GRID */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((src, i) => (
            <div key={src + i} className="relative aspect-video rounded-xl overflow-hidden group bg-gray-100">
              <img src={src} alt="" className="w-full h-full object-cover" />

              {/* PRINCIPAL BADGE */}
              {i === 0 && (
                <span className="absolute top-2 left-2 text-[10px] font-semibold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                  Principal
                </span>
              )}

              {/* OVERLAY ACTIONS */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {i !== 0 && (
                  <button
                    onClick={() => handleSetMain(i)}
                    title="Establecer como principal"
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-yellow-50 transition-colors"
                  >
                    <Star size={13} className="text-yellow-500" />
                  </button>
                )}
                <button
                  onClick={() => handleRemove(i)}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={13} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50 flex flex-col items-center justify-center gap-2 py-16 transition-colors"
        >
          <ImagePlus size={24} className="text-gray-300" />
          <p className="text-sm text-gray-500">Agregar fotos</p>
        </div>
      )}

      {/* SAVE */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="flex items-center gap-2 self-start px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {loading ? "Guardando..." : "Guardar fotos"}
      </button>

    </div>
  )
}