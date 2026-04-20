'use client'

import { useRef, useState } from "react"
import { FileText, Upload, X, CheckCircle2, ShieldCheck } from "lucide-react"
import { mockPropertyDocuments, OwnerDocument } from "@/src/rentafacil/services/ownerPropertyService"

export default function TabDocuments() {
  const [docs, setDocs] = useState<OwnerDocument[]>(mockPropertyDocuments)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const handleFile = (docId: string, file: File) => {
    setDocs(prev =>
      prev.map(d =>
        d.id === docId
          ? { ...d, file: { name: file.name, url: URL.createObjectURL(file), uploadedAt: new Date().toISOString() } }
          : d
      )
    )
  }

  const handleRemove = (docId: string) => {
    setDocs(prev =>
      prev.map(d => d.id === docId ? { ...d, file: null } : d)
    )
  }

  const required = docs.filter(d => d.required)
  const optional = docs.filter(d => !d.required)
  const allRequiredDone = required.every(d => d.file)

  return (
    <div className="flex flex-col gap-6 max-w-2xl">

      {/* STATUS */}
      <div className={`
        flex items-start gap-3 px-4 py-3 rounded-xl border
        ${allRequiredDone ? "bg-green-50 border-green-100" : "bg-amber-50 border-amber-100"}
      `}>
        <ShieldCheck size={16} className={allRequiredDone ? "text-green-600" : "text-amber-500"} />
        <p className={`text-xs leading-relaxed ${allRequiredDone ? "text-green-700" : "text-amber-700"}`}>
          {allRequiredDone
            ? "Todos los documentos requeridos están cargados. Los inquilinos podrán ver estos archivos antes de arrendar."
            : "Cargá los documentos requeridos para que los inquilinos puedan firmar el contrato de arrendamiento."
          }
        </p>
      </div>

      {/* REQUIRED */}
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">Requeridos</p>
        {required.map(doc => (
          <DocRow
            key={doc.id}
            doc={doc}
            inputRef={el => { inputRefs.current[doc.id] = el }}
            onFile={file => handleFile(doc.id, file)}
            onRemove={() => handleRemove(doc.id)}
          />
        ))}
      </div>

      {/* OPTIONAL */}
      {optional.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">Opcionales</p>
          {optional.map(doc => (
            <DocRow
              key={doc.id}
              doc={doc}
              inputRef={el => { inputRefs.current[doc.id] = el }}
              onFile={file => handleFile(doc.id, file)}
              onRemove={() => handleRemove(doc.id)}
            />
          ))}
        </div>
      )}

    </div>
  )
}

// ── DOC ROW ────────────────────────────────────────────────────────────────
interface DocRowProps {
  doc: OwnerDocument
  inputRef: (el: HTMLInputElement | null) => void
  onFile: (file: File) => void
  onRemove: () => void
}

function DocRow({ doc, inputRef, onFile, onRemove }: DocRowProps) {
  const localRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className={`
      rounded-xl border px-4 py-3 flex items-center gap-4
      ${doc.file ? "border-green-100 bg-green-50" : "border-gray-100 bg-gray-50"}
    `}>
      {/* ICON */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${doc.file ? "bg-green-100" : "bg-white border border-gray-200"}`}>
        {doc.file
          ? <CheckCircle2 size={18} className="text-green-600" />
          : <FileText size={18} className="text-gray-400" />
        }
      </div>

      {/* INFO */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 truncate">{doc.label}</p>
          {doc.required && (
            <span className="text-[10px] text-red-500 font-medium shrink-0">Requerido</span>
          )}
        </div>
        {doc.file
          ? <p className="text-xs text-green-600 truncate">{doc.file.name}</p>
          : <p className="text-xs text-gray-400 truncate">{doc.description}</p>
        }
      </div>

      {/* ACTION */}
      {doc.file ? (
        <button
          onClick={onRemove}
          className="w-7 h-7 rounded-full hover:bg-red-100 flex items-center justify-center transition-colors shrink-0"
        >
          <X size={13} className="text-red-400" />
        </button>
      ) : (
        <button
          onClick={() => localRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 text-xs text-gray-600 transition-colors shrink-0"
        >
          <Upload size={12} />
          Subir
        </button>
      )}

      <input
        ref={el => { localRef.current = el; inputRef(el) }}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={e => e.target.files?.[0] && onFile(e.target.files[0])}
        className="hidden"
      />
    </div>
  )
}