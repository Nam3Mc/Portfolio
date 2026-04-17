// 'use client'

// interface Props {
//   amenities: string[]
// }

// export default function AmenitiesList({ amenities }: Props) {

//   if (!amenities?.length) return null

//   return (
//     <div className="flex flex-col gap-3">

//       {/* TITLE */}
//       <span className="
//         text-[11px] sm:text-xs
//         uppercase tracking-wide
//         text-gray-400
//       ">
//         Amenidades
//       </span>

//       {/* CHIPS */}
//       <div className="
//         flex flex-wrap
//         gap-2 sm:gap-3
//       ">
//         {amenities.map((item, index) => (
//           <span
//             key={index}
//             className="
//               px-3 py-1.5 sm:px-4 sm:py-2
//               text-xs sm:text-sm
//               bg-gray-100 text-gray-700
//               rounded-full
//               border border-gray-200
//               transition
//               hover:bg-gray-200
//             "
//           >
//             {item}
//           </span>
//         ))}
//       </div>

//     </div>
//   )
// }

'use client'

interface Props {
  amenities: string[]
}

export default function AmenitiesList({ amenities }: Props) {
  if (!amenities?.length) return null

  return (
    <div className="flex flex-col gap-1">

      <span className="text-[11px] uppercase tracking-wide text-gray-400">
        Amenidades
      </span>

      <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {amenities.map(item => (
            <span
              key={item}
              className="
                px-3 py-1.5
                text-xs font-medium
                bg-white text-gray-600
                rounded-lg
                border border-gray-200
                hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50
                transition-colors
              "
            >
              {item}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}