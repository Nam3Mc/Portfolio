// 'use client'

// import { useState } from "react"

// interface Props {
//   description: string
// }

// export default function DescriptionBlock({ description }: Props) {

//   const [expanded, setExpanded] = useState(false)

//   if (!description) return null

//   return (
//     <div className="flex flex-col gap-2">

//       {/* TITLE */}
//       <span className="
//         text-[11px] sm:text-xs
//         uppercase tracking-wide
//         text-gray-400
//       ">
//         Descripción
//       </span>

//       {/* TEXT */}
//       <p className={`
//         text-sm sm:text-base
//         text-gray-600
//         leading-relaxed
//         transition-all
//         ${!expanded ? 'line-clamp-3' : ''}
//       `}>
//         {description}
//       </p>

//       {/* ACTION */}
//       {description.length > 120 && (
//         <button
//           onClick={() => setExpanded(!expanded)}
//           className="
//             text-xs sm:text-sm
//             text-indigo-600
//             font-medium
//             self-start
//             hover:underline
//           "
//         >
//           {expanded ? "Ver menos" : "Ver más"}
//         </button>
//       )}

//     </div>
//   )
// }



'use client'

import { useState } from "react"

interface Props {
  description: string
}

export default function DescriptionBlock({ description }: Props) {
  const [expanded, setExpanded] = useState(false)
  if (!description) return null

  return (
    <div className="flex flex-col gap-1">

      <span className="text-[11px] uppercase tracking-wide text-gray-400">
        Descripción
      </span>

      <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex flex-col gap-2">
        <p className={`text-sm text-gray-700 leading-relaxed ${!expanded ? "line-clamp-3" : ""}`}>
          {description}
        </p>

        {description.length > 120 && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-xs text-indigo-600 font-medium self-start hover:underline"
          >
            {expanded ? "Ver menos" : "Ver más"}
          </button>
        )}
      </div>

    </div>
  )
}