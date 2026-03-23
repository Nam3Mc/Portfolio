"use client"

import { useState } from "react"
import Image from "next/image"

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
            className={i === 0 ? "col-span-2 row-span-2 relative rounded-xl overflow-hidden cursor-pointer" : "relative rounded-xl overflow-hidden cursor-pointer"}
            onClick={() => openLightbox(i)}
          >
            <Image src={img} alt={`property-${i}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={closeLightbox}
          >
            &times;
          </button>

          <button
            className="absolute left-4 text-white text-3xl font-bold"
            onClick={prevImage}
          >
            &#10094;
          </button>

          <div className="relative w-full max-w-4xl max-h-[90vh]">
            <Image
              src={images[currentIndex]}
              alt={`property-${currentIndex}`}
              width={1200}
              height={800}
              className="object-contain rounded-lg"
            />
          </div>

          <button
            className="absolute right-4 text-white text-3xl font-bold"
            onClick={nextImage}
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  )
}