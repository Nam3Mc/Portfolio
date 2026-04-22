'use client'

import { useState } from "react"
import { X, CheckCircle2, XCircle, FileText, Clock, AlertTriangle, Loader2 } from "lucide-react"
import { AdminProperty, approveProperty, rejectProperty, hoursAgo, isUrgent } from "@/src/rentafacil/services/adminService"

interface Props {
  property: AdminProperty
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string, reason: string) => void
}

const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })

export default function PropertyReviewModal({ property, onClose, onApprove, onReject }: Props) {
  const [rejecting, setRejecting] = useState(false)
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)
  const urgent = isUrgent(property.submittedAt)
  const hours = hoursAgo(property.submittedAt)
  const allDocsOk = Object.values(property.documents).every(Boolean)

  const handleApprove = async () => {
    setLoading(true)
    await approveProperty(property.id)
    onApprove(property.id)
    setLoading(false)
  }

  const handleReject = async () => {
    if (!reason.trim()) return
    setLoading(true)
    await rejectProperty(property.id, reason)
    onReject(property.id, reason)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{property.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{property.address}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors ml-3 shrink-0">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">

          {/* URGENT BANNER */}
          {urgent && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-200">
              <AlertTriangle size={14} className="text-red-500 shrink-0" />
              <p className="text-xs text-red-700 font-medium">
                Enviada hace {hours}h — supera el límite de 48h de revisión
              </p>
            </div>
          )}

          {/* IMAGE */}
          {property.images[0] && (
            <div className="h-36 rounded-xl overflow-hidden bg-gray-100">
              <img src={property.images[0]} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {/* INFO */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5 flex flex-col gap-0.5">
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">Owner</span>
              <span className="text-xs font-medium text-gray-900">{property.ownerName}</span>
              <span className="text-[11px] text-gray-400">{property.ownerEmail}</span>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5 flex flex-col gap-0.5">
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">Precio</span>
              <span className="text-xs font-medium text-indigo-600">{formatCOP(property.price)}/mes</span>
              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <Clock size={10} />
                Hace {hours}h
              </div>
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-700">Documentos</p>
            {[
              { label: "Documento de propiedad", ok: property.documents.propertyDoc },
              { label: "Recibo de servicio público", ok: property.documents.serviceReceipt },
              { label: "Copia de cédula", ok: property.documents.ownerIdDoc },
            ].map(({ label, ok }) => (
              <div key={label} className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl border
                ${ok ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}
              `}>
                {ok
                  ? <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                  : <XCircle size={14} className="text-red-500 shrink-0" />
                }
                <span className="text-xs text-gray-700">{label}</span>
                <span className={`ml-auto text-[11px] font-medium ${ok ? "text-green-600" : "text-red-500"}`}>
                  {ok ? "✓ Cargado" : "Faltante"}
                </span>
              </div>
            ))}

            {!allDocsOk && (
              <p className="text-xs text-red-500 flex items-center gap-1.5">
                <AlertTriangle size={12} />
                Documentos incompletos — no se recomienda aprobar
              </p>
            )}
          </div>

          {/* REJECTION FORM */}
          {rejecting && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-700">Motivo del rechazo</label>
              <textarea
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Explicá el motivo al owner..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="px-5 py-4 border-t border-gray-100 flex gap-2">
          {!rejecting ? (
            <>
              <button
                onClick={() => setRejecting(true)}
                disabled={loading}
                className="flex-1 h-11 rounded-xl border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Rechazar
              </button>
              <button
                onClick={handleApprove}
                disabled={loading || !allDocsOk}
                className="flex-1 h-11 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                Aprobar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setRejecting(false)}
                disabled={loading}
                className="flex-1 h-11 rounded-xl border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleReject}
                disabled={loading || !reason.trim()}
                className="flex-1 h-11 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                Confirmar rechazo
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}