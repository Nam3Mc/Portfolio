'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Pause, Play, Loader2 } from "lucide-react"
import StatusBadge from "@/components/owner-panel/StatusBadge"
import PropertyDetailTabs from "@/components/owner-panel/detail/PropertyDetailTabs"
import {
  OwnerProperty,
  getOwnerProperty,
  togglePropertyStatus,
} from "@/src/rentafacil/services/ownerPropertyService"

const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [property, setProperty] = useState<OwnerProperty | null>(null)
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState(false)

  useEffect(() => {
    getOwnerProperty(id).then(data => {
      setProperty(data)
      setLoading(false)
    })
  }, [id])

  const handleUpdate = (data: Partial<OwnerProperty>) => {
    setProperty(prev => prev ? { ...prev, ...data } : prev)
  }

  const handleToggle = async () => {
    if (!property) return
    const next = property.status === "active" ? "paused" : "active"
    setToggling(true)
    await togglePropertyStatus(property.id, next)
    setProperty(prev => prev ? { ...prev, status: next } : prev)
    setToggling(false)
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        Propiedad no encontrada
      </div>
    )
  }

  const canToggle = property.status === "active" || property.status === "paused"

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">

      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors self-start"
      >
        <ArrowLeft size={16} />
        Mis propiedades
      </button>

      {/* HERO */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">

        {/* IMAGE */}
        <div className="relative h-52 bg-gray-100">
          {property.images[0] && (
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* STATUS */}
          <div className="absolute top-4 left-4">
            <StatusBadge status={property.status} />
          </div>

          {/* TOGGLE */}
          {canToggle && (
            <div className="absolute top-4 right-4">
              <button
                onClick={handleToggle}
                disabled={toggling}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-medium hover:bg-white transition-colors shadow"
              >
                {toggling
                  ? <Loader2 size={12} className="animate-spin" />
                  : property.status === "active"
                  ? <Pause size={12} />
                  : <Play size={12} />
                }
                {property.status === "active" ? "Pausar" : "Reactivar"}
              </button>
            </div>
          )}

          {/* NAME OVERLAY */}
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-xl font-semibold text-white leading-tight">{property.name}</h1>
            <p className="text-sm text-white/70 mt-0.5">{property.address}</p>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
          {[
            { label: "Precio", value: `${formatCOP(property.price)}/mes` },
            { label: "Contratos activos", value: property.activeContracts },
            { label: "Ocupación", value: `${property.occupancyRate}%` },
          ].map(({ label, value }) => (
            <div key={label} className="px-4 py-3 flex flex-col gap-0.5">
              <span className="text-[11px] text-gray-400 uppercase tracking-wide">{label}</span>
              <span className="text-sm font-semibold text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden px-4 pb-6">
        <PropertyDetailTabs property={property} onUpdate={handleUpdate} />
      </div>

    </div>
  )
}