'use client'

import { useEffect, useState } from "react"
import PropertyCard from "@/components/owner-panel/PropertyCard"
import PropertyListHeader from "@/components/owner-panel/PropertyListHeader"
import {
  OwnerProperty,
  getOwnerProperties,
} from "@/src/rentafacil/services/ownerPropertyService"

export default function OwnerPanelPage() {
  const [properties, setProperties] = useState<OwnerProperty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOwnerProperties().then(data => {
      setProperties(data)
      setLoading(false)
    })
  }, [])

  const handleDelete = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id))
  }

  const handleTogglePause = (id: string, newStatus: "active" | "paused") => {
    setProperties(prev =>
      prev.map(p => p.id === id ? { ...p, status: newStatus } : p)
    )
  }

  const active = properties.filter(p => p.status === "active").length

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">

      <PropertyListHeader total={properties.length} active={active} />

      {loading ? (
        // SKELETON
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white overflow-hidden animate-pulse">
              <div className="h-44 bg-gray-100" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-px bg-gray-100" />
                <div className="grid grid-cols-3 gap-2">
                  {[1,2,3].map(j => <div key={j} className="h-8 bg-gray-100 rounded" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        // EMPTY STATE
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">🏠</div>
          <div>
            <p className="text-gray-900 font-semibold">Todavía no tenés propiedades</p>
            <p className="text-sm text-gray-500 mt-1">Publicá tu primera propiedad para empezar a alquilar.</p>
          </div>
        </div>
      ) : (
        // GRID
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={handleDelete}
              onTogglePause={handleTogglePause}
            />
          ))}
        </div>
      )}

    </div>
  )
}