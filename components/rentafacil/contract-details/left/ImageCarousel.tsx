'use client'

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
  images: string[]
}

export default function ImageCarousel({ images }: Props) {

  const [index, setIndex] = useState(0)

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const next = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!images?.length) return null

  return (
    <div className="relative w-full h-64 bg-gray-100 overflow-hidden">

      {/* 🖼️ IMAGE */}
      <img
        src={images[index]}
        alt={`image-${index}`}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* 🌫️ overlay suave (premium feel) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      {/* ⬅️ LEFT */}
      <button
        onClick={prev}
        className="
          absolute left-3 top-1/2 -translate-y-1/2
          bg-white/80 hover:bg-white
          rounded-full p-2
          shadow-sm
          transition
        "
      >
        <ChevronLeft size={18} />
      </button>

      {/* ➡️ RIGHT */}
      <button
        onClick={next}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          bg-white/80 hover:bg-white
          rounded-full p-2
          shadow-sm
          transition
        "
      >
        <ChevronRight size={18} />
      </button>

      {/* 🔘 DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <div
            key={i}
            className={`
              w-1.5 h-1.5 rounded-full transition-all
              ${i === index ? "bg-white w-3" : "bg-white/50"}
            `}
          />
        ))}
      </div>

    </div>
  )
}