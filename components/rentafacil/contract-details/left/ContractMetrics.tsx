// 'use client'

// interface Props {
//   months: number
//   startDate: string
//   endDate: string
// }

// export default function ContractMetrics({
//   months,
//   startDate,
//   endDate
// }: Props) {

//   const start = new Date(startDate)
//   const end = new Date(endDate)

//   return (
//     <div className="
//       grid grid-cols-1
//       sm:grid-cols-2
//       md:grid-cols-3
//       gap-3 sm:gap-4
//     ">

//       {/* 📆 START */}
//       <div className="flex flex-col gap-1">
//         <span className="text-xs text-gray-500">Inicio</span>
//         <span className="text-sm sm:text-base font-medium text-gray-900">
//           {start.toLocaleDateString("es-CO", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric"
//           })}
//         </span>
//       </div>

//       {/* ⏳ DURATION */}
//       <div className="flex flex-col gap-1">
//         <span className="text-xs text-gray-500">Duración</span>
//         <span className="text-sm sm:text-base font-medium text-gray-900">
//           {months} mes{months > 1 ? "es" : ""}
//         </span>
//       </div>

//       {/* 📆 END */}
//       <div className="flex flex-col gap-1">
//         <span className="text-xs text-gray-500">Finaliza</span>
//         <span className="text-sm sm:text-base font-medium text-gray-900">
//           {end.toLocaleDateString("es-CO", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric"
//           })}
//         </span>
//       </div>

//     </div>
//   )
// }


'use client'

interface Props {
  months: number
  startDate: string
  endDate: string
}

function parseLocalDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function formatDate(d: Date) {
  return d.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export default function ContractMetrics({ months, startDate, endDate }: Props) {
  const start = parseLocalDate(startDate)
  const end = parseLocalDate(endDate)

  return (
    <div className="flex flex-col gap-1">

      {/* LABEL */}
      <span className="text-[11px] uppercase tracking-wide text-gray-400">
        Vigencia del contrato
      </span>

      {/* CARD */}
      <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">

        {/* DURACIÓN — destacada arriba */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Duración</span>
          <span className="text-sm font-semibold text-indigo-600">
            {months} mes{months > 1 ? "es" : ""}
          </span>
        </div>

        {/* INICIO / FIN — en fila */}
        <div className="grid grid-cols-2 divide-x divide-gray-100">

          <div className="px-4 py-3 flex flex-col gap-0.5">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">Inicio</span>
            <span className="text-sm font-medium text-gray-800">
              {formatDate(start)}
            </span>
          </div>

          <div className="px-4 py-3 flex flex-col gap-0.5">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">Finaliza</span>
            <span className="text-sm font-medium text-gray-800">
              {formatDate(end)}
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}