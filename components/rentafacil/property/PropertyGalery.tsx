'use client'

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface Props {
  images: string[]
}

export default function PropertyGallery({ images }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeLightbox = () => setIsOpen(false)

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <>
      {/* GRID DE IMÁGENES */}
      <div className="grid grid-cols-4 gap-2 auto-rows-[150px] auto-flow-dense">
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative rounded-xl overflow-hidden cursor-pointer ${
              i === 0 ? "col-span-2 row-span-2" : ""
            }`}
            onClick={() => openLightbox(i)}
          >
            <Image src={img} alt={`property-${i}`} fill className="object-cover transition-transform hover:scale-105" />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CERRAR */}
            <button
              className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white hover:text-black transition"
              onClick={closeLightbox}
            >
              <X size={28} />
            </button>

            {/* IZQUIERDA */}
            <button
              className="absolute left-6 text-white p-2 rounded-full hover:bg-white hover:text-black transition"
              onClick={prevImage}
            >
              <ChevronLeft size={32} />
            </button>

            {/* IMAGEN */}
            <motion.div
              key={currentIndex}
              className="relative w-full max-w-5xl max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Image
                src={images[currentIndex]}
                alt={`property-${currentIndex}`}
                width={1200}
                height={800}
                className="object-contain rounded-lg shadow-xl"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>

            {/* DERECHA */}
            <button
              className="absolute right-6 text-white p-2 rounded-full hover:bg-white hover:text-black transition"
              onClick={nextImage}
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}