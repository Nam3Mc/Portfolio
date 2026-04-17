// 'use client'

// import { Pencil, XCircle } from "lucide-react"

// type ContractStatus = 'pending' | 'approved' | 'active' | 'cancelled'

// interface Props {
//   status: ContractStatus
//   onCancel?: () => void
//   onModify?: () => void
//   onPay?: () => void
// }

// export default function ContractActions({
//   status,
//   onCancel,
//   onModify,
//   onPay
// }: Props) {
//   return (
//     <div className="
//       flex flex-col sm:flex-row
//       gap-2 sm:gap-3
//       pt-3
//     ">

//       {/* 🔵 PRIMARY ACTION */}
//       <button
//         onClick={onModify}
//         className="
//           flex items-center justify-center gap-2
//           w-full sm:flex-1
//           h-12 sm:h-11
//           rounded-xl
//           bg-indigo-600 text-white
//           font-semibold text-sm sm:text-base
//           hover:bg-indigo-700
//           active:scale-[0.98]
//           shadow-sm hover:shadow-md
//           transition-all duration-200
//         "
//       >
//         <Pencil size={18} />
//         Modificar
//       </button>

//       {/* ⚪ SECONDARY ACTION */}
//       {status === 'approved' ? (
//         <button
//           onClick={onPay}
//           className="
//             flex items-center justify-center gap-2
//             w-full sm:flex-1
//             h-12 sm:h-11
//             rounded-xl
//             bg-green-600 text-white
//             font-semibold text-sm sm:text-base
//             hover:bg-green-700
//             active:scale-[0.98]
//             shadow-sm hover:shadow-md
//             transition-all duration-200
//           "
//         >
//           💳 Pagar
//         </button>
//       ) : (
//         <button
//           onClick={onCancel}
//           className="
//             flex items-center justify-center gap-2
//             w-full sm:flex-1
//             h-12 sm:h-11
//             rounded-xl
//             border border-gray-200
//             text-gray-600
//             text-sm sm:text-base
//             font-medium
//             hover:bg-gray-50
//             active:scale-[0.98]
//             transition-all duration-200
//           "
//         >
//           <XCircle size={18} />
//           Cancelar
//         </button>
//       )}

//     </div>
//   )
// }



'use client'

import { Pencil, XCircle } from "lucide-react"

type ContractStatus = 'pending' | 'approved' | 'active' | 'cancelled'

interface Props {
  status: ContractStatus
  onCancel?: () => void
  onModify?: () => void
  onPay?: () => void
}

export default function ContractActions({ status, onCancel, onModify, onPay }: Props) {
  return (
    <div className="flex flex-col gap-3">

      {/* MODIFICAR — siempre visible */}
      <button
        onClick={onModify}
        className="
          flex items-center justify-center gap-2
          w-full h-14
          rounded-xl
          bg-indigo-600 text-white
          text-base font-semibold
          hover:bg-indigo-700
          active:scale-[0.98]
          shadow-sm hover:shadow-md
          transition-all duration-200
        "
      >
        <Pencil size={18} />
        Modificar contrato
      </button>

      {/* PAGAR o CANCELAR — según status */}
      {status === 'approved' ? (
        <button
          onClick={onPay}
          className="
            flex items-center justify-center gap-2
            w-full h-14
            rounded-xl
            bg-green-600 text-white
            text-base font-semibold
            hover:bg-green-700
            active:scale-[0.98]
            shadow-sm hover:shadow-md
            transition-all duration-200
          "
        >
          💳 Pagar mensualidad
        </button>
      ) : (
        <button
          onClick={onCancel}
          className="
            flex items-center justify-center gap-2
            w-full h-12
            rounded-xl
            border border-gray-200
            text-gray-500 text-sm font-medium
            hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700
            active:scale-[0.98]
            transition-all duration-200
          "
        >
          <XCircle size={16} />
          Cancelar contrato
        </button>
      )}

    </div>
  )
}