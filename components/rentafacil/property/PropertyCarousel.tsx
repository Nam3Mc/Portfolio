'use client'

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { properties } from "@/src/rentafacil/mocks/properties"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Infinite3DCarouselSmooth() {
  const [startIndex, setStartIndex] = useState(0)

  // Detectar número de items visibles según ancho de pantalla
  const visibleCount = useMemo(() => {
    if (typeof window === "undefined") return 4
    const width = window.innerWidth
    if (width < 640) return 1
    if (width < 1024) return 2
    if (width < 1280) return 3
    return 4
  }, [])

  const loopProps = [...properties, ...properties]

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + properties.length) % properties.length)
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % properties.length)
  }

  const formatCOP = (value: number) =>
    value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    })

  return (
    <div className="relative py-12 bg-gray-50 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 px-6">
        Explorar propiedades
      </h2>

      <div className="relative flex items-center px-6 gap-4">

        {/* PREV BUTTON */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
          aria-label="Previous properties"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* CAROUSEL */}
        <div className="overflow-hidden flex-1">
          <motion.div
            className="flex gap-6 touch-pan-x cursor-grab select-none"
          >
            {loopProps.slice(startIndex, startIndex + visibleCount).map((property, i) => {
              // Efecto 3D profesional
              let scale = 1
              let opacity = 1
              let translateY = 0
              if (i === 0 || i === visibleCount - 1) {
                scale = 0.85
                opacity = 0.6
                translateY = 20
              } else if (i === 1 || i === visibleCount - 2) {
                scale = 0.95
                opacity = 0.8
                translateY = 10
              }

              return (
                <motion.div
                  key={`${property.id}-${i}`}
                  className="min-w-[calc(100%/4-1rem)] sm:min-w-[calc(100%/2-1rem)] md:min-w-[calc(100%/3-1rem)] lg:min-w-[calc(100%/4-1rem)] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-transform cursor-pointer"
                  layout
                  animate={{ scale, opacity, y: translateY }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link href={`/rentafacil/explore/properties/${property.id}`} className="block">

                    {/* IMAGE */}
                    <div className="relative w-full h-48">
                      <Image
                        src={property.images?.[0] || "/placeholder.png"}
                        alt={property.name}
                        fill
                        className="object-cover"
                      />

                      {/* STATUS BADGE */}
                      <div className="absolute top-2 left-2">
                        {property.isOccupied ? (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow">
                            Ocupado
                          </span>
                        ) : (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow">
                            Disponible
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 space-y-1">
                      <h3 className="font-semibold text-lg truncate">{property.name}</h3>
                      {property.isOccupied && property.availableFrom && (
                        <p className="text-xs text-gray-500">
                          Disponible desde {new Date(property.availableFrom).toLocaleDateString()}
                        </p>
                      )}
                      <p className="text-indigo-600 font-bold mt-1">{formatCOP(property.pricePerMonth)} / mes</p>
                    </div>

                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* NEXT BUTTON */}
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
          aria-label="Next properties"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

      </div>

      {/* INDICADORES OPCIONALES */}
      <div className="flex justify-center mt-6 space-x-2 md:hidden">
        {properties.map((_, idx) => (
          <span key={idx} className="w-3 h-3 bg-gray-300 rounded-full"></span>
        ))}
      </div>
    </div>
  )
}