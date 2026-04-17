// 'use client'

// import { useState } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// interface Props {
//   images: string[]
// }

// export default function ImageCarousel({ images }: Props) {

//   const [index, setIndex] = useState(0)

//   const prev = () => {
//     setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
//   }

//   const next = () => {
//     setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
//   }

//   if (!images?.length) return null

//   return (
//     <div className="
//       relative w-full
//       h-56 sm:h-64 md:h-72
//       bg-gray-100
//       overflow-hidden
//       rounded-2xl
//     ">

//       {/* 🖼️ IMAGE */}
//       <img
//         src={images[index]}
//         alt={`image-${index}`}
//         className="
//           w-full h-full
//           object-cover
//           transition-all duration-500
//         "
//       />

//       {/* 🌫️ overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

//       {/* 🔢 COUNTER */}
//       <div className="
//         absolute top-3 right-3
//         bg-black/60 text-white
//         text-xs px-2 py-1 rounded-md
//       ">
//         {index + 1} / {images.length}
//       </div>

//       {/* ⬅️ LEFT */}
//       <button
//         onClick={prev}
//         className="
//           absolute left-2 sm:left-3 top-1/2 -translate-y-1/2
//           bg-white/90 hover:bg-white
//           rounded-full
//           p-2.5 sm:p-2
//           shadow-md
//           active:scale-90
//           transition
//         "
//       >
//         <ChevronLeft size={20} />
//       </button>

//       {/* ➡️ RIGHT */}
//       <button
//         onClick={next}
//         className="
//           absolute right-2 sm:right-3 top-1/2 -translate-y-1/2
//           bg-white/90 hover:bg-white
//           rounded-full
//           p-2.5 sm:p-2
//           shadow-md
//           active:scale-90
//           transition
//         "
//       >
//         <ChevronRight size={20} />
//       </button>

//       {/* 🔘 DOTS */}
//       <div className="
//         absolute bottom-3 left-1/2 -translate-x-1/2
//         flex gap-2
//       ">
//         {images.map((_, i) => (
//           <div
//             key={i}
//             className={`
//               h-2 rounded-full transition-all
//               ${i === index ? "bg-white w-4" : "bg-white/50 w-2"}
//             `}
//           />
//         ))}
//       </div>

//     </div>
//   )
// }


'use client'
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
  images: string[]
}

export default function ImageCarousel({ images }: Props) {
  const [index, setIndex] = useState(0)

  if (!images?.length) return null

  const prev = () => setIndex(i => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setIndex(i => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="relative w-full h-56 sm:h-64 bg-gray-100 overflow-hidden">

      {/* IMAGE */}
      <img
        src={images[index]}
        alt={`Imagen ${index + 1} de ${images.length}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

      {/* COUNTER */}
      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
        {index + 1} / {images.length}
      </div>

      {/* LEFT ARROW — anclada a la izquierda */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md active:scale-90 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>

      {/* RIGHT ARROW — anclada a la derecha */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md active:scale-90 transition-colors"
      >
        <ChevronRight size={18} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "bg-white w-4" : "bg-white/50 w-1.5"
            }`}
          />
        ))}
      </div>

    </div>
  )
}