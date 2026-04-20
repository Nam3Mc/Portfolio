'use client'

import FileUpload from "../ui/FileUpload"
import { PropertyDocument } from "@/src/rentafacil/services/propertyService"
import { ShieldCheck } from "lucide-react"

interface Props {
  data: {
    propertyDoc: PropertyDocument | null
    serviceReceipt: PropertyDocument | null
    ownerIdDoc: PropertyDocument | null
  }
  onChange: (field: string, value: PropertyDocument | null) => void
  errors: Record<string, string>
}

export default function Step2Documents({ data, onChange, errors }: Props) {
  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-gray-900">Documentos de verificación</h2>
        <p className="text-sm text-gray-500">
          Para garantizar la seguridad de todos, un administrador revisará estos documentos
          antes de aprobar la publicación.
        </p>
      </div>

      {/* AVISO */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100">
        <ShieldCheck size={18} className="text-indigo-600 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-700 leading-relaxed">
          Tus documentos son confidenciales y solo serán vistos por el equipo de verificación.
          Nunca se compartirán con terceros.
        </p>
      </div>

      {/* DOC PROPIEDAD */}
      <FileUpload
        label="Documento de propiedad"
        hint="Escritura pública, paz y salvo o certificado de tradición"
        accept=".pdf,.jpg,.jpeg,.png"
        value={data.propertyDoc}
        onChange={v => onChange("propertyDoc", v)}
        error={errors.propertyDoc}
        type="document"
      />

      {/* RECIBO SERVICIO */}
      <FileUpload
        label="Recibo de servicio público"
        hint="Recibo de luz o agua con tu nombre visible"
        accept=".pdf,.jpg,.jpeg,.png"
        value={data.serviceReceipt}
        onChange={v => onChange("serviceReceipt", v)}
        error={errors.serviceReceipt}
        type="document"
      />

      {/* CÉDULA */}
      <FileUpload
        label="Copia de cédula"
        hint="Ambas caras de tu documento de identidad en un solo archivo"
        accept=".pdf,.jpg,.jpeg,.png"
        value={data.ownerIdDoc}
        onChange={v => onChange("ownerIdDoc", v)}
        error={errors.ownerIdDoc}
        type="document"
      />

    </div>
  )
}