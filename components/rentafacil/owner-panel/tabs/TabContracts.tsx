'use client'

import { useEffect, useState } from "react"
import { getPropertyContracts, OwnerContract } from "@/src/rentafacil/services/ownerPropertyService"

interface Props {
  propertyId: string
}

const STATUS_CONFIG = {
  active:    { label: "Activo",     classes: "bg-green-50 text-green-700 border-green-200" },
  pending:   { label: "Pendiente",  classes: "bg-amber-50 text-amber-700 border-amber-200" },
  completed: { label: "Completado", classes: "bg-gray-50 text-gray-600 border-gray-200" },
  cancelled: { label: "Cancelado",  classes: "bg-red-50 text-red-700 border-red-200" },
}

const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })

const formatDate = (s: string) =>
  new Date(s + "T12:00:00").toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })

export default function TabContracts({ propertyId }: Props) {
  const [contracts, setContracts] = useState<OwnerContract[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPropertyContracts(propertyId).then(data => {
      setContracts(data)
      setLoading(false)
    })
  }, [propertyId])

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2].map(i => (
          <div key={i} className="h-24 rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    )
  }

  if (contracts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-xl">📄</div>
        <p className="text-sm text-gray-500">Aún no hay contratos para esta propiedad.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {contracts.map(contract => {
        const cfg = STATUS_CONFIG[contract.status]
        return (
          <div key={contract.id} className="rounded-2xl border border-gray-100 bg-white p-4 flex flex-col gap-3">

            {/* HEADER */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{contract.guestName}</p>
                <p className="text-xs text-gray-400 font-mono">{contract.guestAddress}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-medium shrink-0 ${cfg.classes}`}>
                {cfg.label}
              </span>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-50">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">Inicio</span>
                <span className="text-xs font-medium text-gray-700">{formatDate(contract.startDate)}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">Fin</span>
                <span className="text-xs font-medium text-gray-700">{formatDate(contract.endDate)}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">Total</span>
                <span className="text-xs font-semibold text-indigo-600">
                  {formatCOP(contract.months * contract.pricePerMonth)}
                </span>
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}