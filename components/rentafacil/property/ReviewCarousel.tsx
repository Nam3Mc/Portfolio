'use client'

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Review } from "@/src/rentafacil/interfaces/Review"

interface Props {
  reviews: Review[]
}

export default function ReviewCarousel({ reviews }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const cardWidth = 280 + 24 // ancho de tarjeta + gap
  const totalWidth = cardWidth * reviews.length

  const loopX = useTransform(x, (latest) => {
    let mod = latest % totalWidth
    return mod
  })

  useAnimationFrame((time, delta) => {
    x.set(x.get() - 0.5) // velocidad del loop
  })

  const displayReviews = [...reviews, ...reviews] // duplicamos para loop infinito

  return (
    <div className="w-full overflow-x-hidden relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Guest Reviews</h2>

      <motion.div
        ref={containerRef}
        className="flex gap-6 touch-pan-x cursor-grab select-none px-2 md:px-0"
        drag="x"
        dragConstraints={{ left: -totalWidth, right: 0 }}
        style={{ x: loopX }}
        whileTap={{ cursor: "grabbing" }}
      >
        {displayReviews.map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 w-[280px] sm:w-[260px] md:w-[300px] bg-white rounded-2xl shadow-lg border border-gray-200 p-5 flex flex-col transition-transform"
          >
            {/* Usuario */}
            <p className="font-semibold text-gray-800 text-sm truncate">{r.user}</p>

            {/* Rating */}
            <div className="flex items-center mt-2">
              <p className="text-yellow-400 mr-2">{'⭐'.repeat(r.rating)}</p>
              <p className="text-gray-400 text-xs">{r.rating}/5</p>
            </div>

            {/* Comentario */}
            <p className="text-gray-600 text-sm mt-3 italic line-clamp-4">
              "{r.comment}"
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Indicadores opcionales para escritorio */}
      <div className="hidden md:flex justify-center mt-4 space-x-2">
        {reviews.map((_, idx) => (
          <span
            key={idx}
            className="w-3 h-3 bg-gray-300 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}

// Hook para usar requestAnimationFrame con Framer Motion
function useAnimationFrame(callback: (time: number, delta: number) => void) {
  const last = useRef<number>(0)

  useEffect(() => {
    let rafId: number

    const frame = (time: number) => {
      if (!last.current) last.current = time
      const delta = time - last.current
      last.current = time
      callback(time, delta)
      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
  }, [callback])
}