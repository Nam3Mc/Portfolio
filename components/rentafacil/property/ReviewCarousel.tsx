"use client"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Review } from "@/src/rentafacil/interfaces/Review"

interface Props {
  reviews: Review[]
}

export default function ReviewCarousel({ reviews }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  // ancho de cada tarjeta + gap
  const cardWidth = 280 + 24
  const totalWidth = cardWidth * reviews.length

  // loop infinito usando modulo
  const loopX = useTransform(x, (latest) => {
    let mod = latest % totalWidth
    return mod
  })

  // animación automática
  useAnimationFrame((time, delta) => {
    x.set(x.get() - 0.5) // velocidad
  })

  // duplicamos visualmente para loop infinito
  const displayReviews = [...reviews, ...reviews]

  return (
    <div className="w-full overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Guest Reviews</h2>

      <motion.div
        ref={containerRef}
        className="flex cursor-grab select-none"
        drag="x"
        dragConstraints={{ left: -totalWidth, right: 0 }}
        style={{ x: loopX }}
        whileTap={{ cursor: "grabbing" }}
      >
        {displayReviews.map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="min-w-[280px] flex-shrink-0 bg-white rounded-xl shadow-lg border border-gray-200 p-4"
          >
            <p className="font-semibold text-gray-800 text-sm">{r.user}</p>
            <div className="flex items-center mt-1">
              <p className="text-yellow-500 mr-2">{"⭐".repeat(r.rating)}</p>
              <p className="text-gray-400 text-xs">{r.rating}/5</p>
            </div>
            <p className="text-gray-600 text-sm mt-3 italic">"{r.comment}"</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// hook para usar requestAnimationFrame con Framer Motion
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