"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { properties } from "@/src/rentafacil/mocks/properties"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Infinite3DCarouselSmooth() {
  const visibleCount = 4 // cards visibles en desktop
  const [startIndex, setStartIndex] = useState(0)

  const loopProps = [...properties, ...properties]

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + properties.length) % properties.length)
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % properties.length)
  }

  return (
    <div className="relative py-12 bg-gray-50 overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 px-6">Explore More Properties</h2>

      <div className="flex items-center gap-4 px-6 relative">
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <div className="overflow-hidden flex-1">
          <motion.div className="flex gap-6">
            {loopProps.slice(startIndex, startIndex + visibleCount).map((property, i) => {
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
                  className="min-w-[calc(25%-1rem)] flex-shrink-0 rounded-lg overflow-hidden shadow-lg bg-white"
                  layout
                  animate={{ scale, opacity, y: translateY }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1], // easing más suave y natural
                  }}
                >
                  <Link href={`/rentafacil/explore/properties/${property.id}`}>
                    <div className="relative w-full h-48">
                      <Image
                        src={property.images?.[0] || "/placeholder.png"}
                        alt={property.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg truncate">{property.name}</h3>
                      <p className="text-indigo-600 font-bold mt-1">${property.pricePerNight} / night</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  )
}