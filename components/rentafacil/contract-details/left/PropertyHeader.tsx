// 'use client'

// interface Props {
//   name: string
//   address: string
// }

// export default function PropertyHeader({ name, address }: Props) {

//   return (
//     <div className="flex flex-col gap-1.5">

//       {/* 🏠 NAME */}
//       <h1 className="
//         text-lg sm:text-xl md:text-2xl
//         font-semibold
//         text-gray-900
//         leading-tight
//         line-clamp-2
//       ">
//         {name}
//       </h1>

//       {/* 📍 ADDRESS */}
//       <p className="
//         text-sm sm:text-base
//         text-gray-500
//         line-clamp-1 sm:line-clamp-2
//       ">
//         {address}
//       </p>

//     </div>
//   )
// }


'use client'

import { MapPin } from "lucide-react"

interface Props {
  name: string
  address: string
}

export default function PropertyHeader({ name, address }: Props) {
  return (
    <div className="flex flex-col gap-1">

      <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex flex-col gap-2">

        <h1 className="text-base font-semibold text-gray-900 leading-tight line-clamp-2">
          {name}
        </h1>

        <div className="flex items-start gap-1.5">
          <MapPin size={14} className="text-indigo-400 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-500 line-clamp-2 leading-snug">
            {address}
          </p>
        </div>

      </div>
    </div>
  )
}