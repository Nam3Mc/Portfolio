'use client'

import { MapPin, FileText, ImageIcon, Wallet, ShieldCheck } from "lucide-react"
import { CreatePropertyPayload } from "@/src/rentafacil/services/propertyService"
import { useAccount } from "wagmi"

interface Props {
  data: Omit<CreatePropertyPayload, "ownerAddress" | "status" | "createdAt">
}

export default function Step4Confirm({ data }: Props) {
  const { address, isConnected } = useAccount()

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-gray-900">Revisión y publicación</h2>
        <p className="text-sm text-gray-500">
          Revisá que todo esté correcto antes de firmar y publicar.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="flex flex-col gap-3">

        {/* INFO BÁSICA */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wide text-gray-400">Propiedad</span>
          <p className="text-sm font-semibold text-gray-900">{data.name}</p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin size={12} className="text-indigo-400" />
            {data.address}
          </div>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{data.description}</p>
        </div>

        {/* DOCUMENTOS */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wide text-gray-400">Documentos</span>
          {[
            { label: "Documento de propiedad", doc: data.propertyDoc },
            { label: "Recibo de servicio", doc: data.serviceReceipt },
            { label: "Cédula", doc: data.ownerIdDoc },
          ].map(({ label, doc }) => (
            <div key={label} className="flex items-center gap-2">
              <FileText size={13} className={doc ? "text-green-500" : "text-red-400"} />
              <span className="text-xs text-gray-700">{label}</span>
              <span className={`ml-auto text-[11px] font-medium ${doc ? "text-green-600" : "text-red-500"}`}>
                {doc ? "✓ Cargado" : "Faltante"}
              </span>
            </div>
          ))}
        </div>

        {/* FOTOS */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wide text-gray-400">Fotos</span>
            <span className={`text-xs font-medium ${data.photos.length >= 3 ? "text-green-600" : "text-red-500"}`}>
              {data.photos.length} / 3 mínimo
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {data.photos.map((photo, i) => (
              <img
                key={i}
                src={photo.preview}
                alt={photo.name}
                className="w-16 h-16 rounded-lg object-cover shrink-0"
              />
            ))}
          </div>
        </div>

        {/* WEB3 WALLET */}
        <div className={`
          rounded-xl border px-4 py-3 flex flex-col gap-2
          ${isConnected ? "border-green-100 bg-green-50" : "border-amber-100 bg-amber-50"}
        `}>
          <span className="text-[11px] uppercase tracking-wide text-gray-400">Firma blockchain</span>
          <div className="flex items-center gap-2">
            <Wallet size={14} className={isConnected ? "text-green-600" : "text-amber-500"} />
            {isConnected ? (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-green-700">Wallet conectada</span>
                <span className="text-[11px] text-gray-500 font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
            ) : (
              <span className="text-xs font-medium text-amber-700">
                Conectá tu wallet para firmar la publicación
              </span>
            )}
          </div>
        </div>

      </div>

      {/* AVISO FINAL */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100">
        <ShieldCheck size={16} className="text-indigo-600 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-700 leading-relaxed">
          Al publicar, la propiedad quedará en estado <strong>pendiente de verificación</strong>.
          Un administrador revisará tus documentos y te notificará cuando sea aprobada.
          Solo entonces podrás modificar precio, amenidades y disponibilidad.
        </p>
      </div>

    </div>
  )
}