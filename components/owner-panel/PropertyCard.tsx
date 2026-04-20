'use client'

import Link from "next/link"
import { useState } from "react"
import { Trash2, Pause, Play, ArrowRight, MapPin, TrendingUp } from "lucide-react"
import StatusBadge from "./StatusBadge"
import { OwnerProperty, togglePropertyStatus, deleteProperty } from "@/src/rentafacil/services/ownerPropertyService"

interface Props {
  property: OwnerProperty
  onDelete: (id: string) => void
  onTogglePause: (id: string, newStatus: "active" | "paused") => void
}

const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })

export default function PropertyCard({ property, onDelete, onTogglePause }: Props) {
  const [loading, setLoading] = useState<"pause" | "delete" | null>(null)
  const canToggle = property.status === "active" || property.status === "paused"

  const handleTogglePause = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!canToggle) return
    const next = property.status === "active" ? "paused" : "active"
    setLoading("pause")
    await togglePropertyStatus(property.id, next)
    onTogglePause(property.id, next)
    setLoading(null)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!confirm("¿Seguro que querés eliminar esta propiedad?")) return
    setLoading("delete")
    await deleteProperty(property.id)
    onDelete(property.id)
    setLoading(null)
  }

  return (
    <Link href={`/rentafacil/owner-panel/${property.id}`} className="group block">
      <div className="
        relative rounded-2xl border border-gray-100 bg-white overflow-hidden
        shadow-sm hover:shadow-md hover:border-indigo-100
        transition-all duration-200
      ">
        {/* IMAGE */}
        <div className="relative h-44 bg-gray-100 overflow-hidden">
          {property.images[0] ? (
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
              Sin imagen
            </div>
          )}

          {/* STATUS BADGE */}
          <div className="absolute top-3 left-3">
            <StatusBadge status={property.status} size="sm" />
          </div>

          {/* ACTIONS */}
          <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {canToggle && (
              <button
                onClick={handleTogglePause}
                disabled={loading !== null}
                className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                title={property.status === "active" ? "Pausar" : "Reactivar"}
              >
                {loading === "pause"
                  ? <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  : property.status === "active"
                  ? <Pause size={13} className="text-gray-600" />
                  : <Play size={13} className="text-gray-600" />
                }
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={loading !== null}
              className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow hover:bg-red-50 hover:text-red-500 transition-colors"
              title="Eliminar"
            >
              {loading === "delete"
                ? <span className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                : <Trash2 size={13} className="text-gray-600" />
              }
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col gap-3">

          {/* NAME + ADDRESS */}
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {property.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin size={11} className="shrink-0" />
              <span className="line-clamp-1">{property.address}</span>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-gray-100" />

          {/* METRICS */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">Precio</span>
              <span className="text-xs font-semibold text-indigo-600">
                {formatCOP(property.price)}<span className="font-normal text-gray-400">/mes</span>
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">Contratos</span>
              <span className="text-xs font-semibold text-gray-900">{property.activeContracts} activos</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">Ocupación</span>
              <div className="flex items-center gap-1">
                <TrendingUp size={10} className="text-green-500" />
                <span className="text-xs font-semibold text-gray-900">{property.occupancyRate}%</span>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-gray-400">
              {formatCOP(property.totalIncome)} total generado
            </span>
            <ArrowRight size={14} className="text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
          </div>

        </div>
      </div>
    </Link>
  )
}