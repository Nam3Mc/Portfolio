// 'use client'

// interface Props {
//   monthly: number
//   total: number
// }

// export default function PriceBlock({ monthly, total }: Props) {

//   return (
//     <div className="
//       flex flex-col gap-3
//       p-4 sm:p-5
//       rounded-2xl
//       bg-gray-50
//       border border-gray-100
//     ">

//       {/* 💰 TOTAL */}
//       <div className="flex flex-col gap-1">
//         <span className="text-xs sm:text-sm text-gray-500">
//           Total del contrato
//         </span>

//         <span className="
//           text-xl sm:text-2xl
//           font-semibold
//           text-gray-900
//         ">
//           {total.toLocaleString("es-CO", {
//             style: "currency",
//             currency: "COP",
//             minimumFractionDigits: 0
//           })}
//         </span>
//       </div>

//       {/* DIVIDER */}
//       <div className="w-full h-px bg-gray-200" />

//       {/* 💵 MONTHLY */}
//       <div className="flex justify-between items-center">
//         <span className="text-xs sm:text-sm text-gray-500">
//           Pago mensual
//         </span>

//         <span className="
//           text-sm sm:text-base
//           font-medium
//           text-indigo-600
//         ">
//           {monthly.toLocaleString("es-CO", {
//             style: "currency",
//             currency: "COP",
//             minimumFractionDigits: 0
//           })} / mes
//         </span>
//       </div>

//     </div>
//   )
// }


'use client'
// PriceBlock.tsx — sin cambios lógicos
interface Props { monthly: number; total: number }
 
const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })
 
export default function PriceBlock({ monthly, total }: Props) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">Total del contrato</span>
        <span className="text-2xl font-semibold text-gray-900">{formatCOP(total)}</span>
      </div>
      <div className="w-full h-px bg-gray-200" />
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Pago mensual</span>
        <span className="text-sm font-medium text-indigo-600">{formatCOP(monthly)} / mes</span>
      </div>
    </div>
  )
}
 
// ─────────────────────────────────────────────────────────────────────────────