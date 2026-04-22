'use client'

import { useEffect, useState } from "react"
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react"
import PropertyReviewModal from "@/components/rentafacil/admin/properties/PropertyReviewModal"
import {
  AdminProperty, getPendingProperties,
  hoursAgo, isUrgent
} from "@/src/rentafacil/services/adminService"

const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<AdminProperty[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<AdminProperty | null>(null)

  useEffect(() => {
    getPendingProperties().then(data => { setProperties(data); setLoading(false) })
  }, [])

  const handleApprove = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id))
    setSelected(null)
  }

  const handleReject = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id))
    setSelected(null)
  }

  const urgent = properties.filter(p => isUrgent(p.submittedAt))

  return (
    <div className="px-4 sm:px-6 py-6 flex flex-col gap-6 max-w-5xl mx-auto w-full">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Propiedades pendientes</h1>
          <p className="text-sm text-gray-500 mt-0.5">{properties.length} esperando revisión</p>
        </div>
        {urgent.length > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-medium text-red-600 shrink-0">
            <AlertTriangle size={12} />
            {urgent.length} urgente{urgent.length > 1 ? "s" : ""} (+48h)
          </div>
        )}
      </div>

      {/* LIST */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
            <CheckCircle2 size={22} className="text-green-600" />
          </div>
          <p className="text-sm font-medium text-gray-700">Todo al día</p>
          <p className="text-xs text-gray-400">No hay propiedades pendientes de revisión.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {properties
            .sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime())
            .map(property => {
              const hours = hoursAgo(property.submittedAt)
              const urgent = isUrgent(property.submittedAt)
              const allDocs = Object.values(property.documents).every(Boolean)

              return (
                <button
                  key={property.id}
                  onClick={() => setSelected(property)}
                  className={`
                    text-left flex gap-4 p-4 rounded-2xl border bg-white
                    hover:shadow-sm transition-all
                    ${urgent ? "border-red-200 hover:border-red-300" : "border-gray-100 hover:border-indigo-200"}
                  `}
                >
                  {/* IMAGE */}
                  <div className="w-20 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    {property.images[0] && (
                      <img src={property.images[0]} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>

                  {/* INFO */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">{property.name}</p>
                      {urgent && (
                        <span className="shrink-0 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                          URGENTE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1">{property.address}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs font-medium text-indigo-600">{formatCOP(property.price)}/mes</span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={11} />
                        {hours}h
                      </span>
                      {!allDocs && (
                        <span className="text-xs text-red-500 flex items-center gap-1">
                          <AlertTriangle size={11} />
                          Docs incompletos
                        </span>
                      )}
                      <span className="text-xs text-gray-400">{property.ownerName}</span>
                    </div>
                  </div>
                </button>
              )
            })}
        </div>
      )}

      {/* MODAL */}
      {selected && (
        <PropertyReviewModal
          property={selected}
          onClose={() => setSelected(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  )
}