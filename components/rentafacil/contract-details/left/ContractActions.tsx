'use client'

import { Pencil, XCircle } from "lucide-react"

type ContractStatus = 'pending' | 'approved' | 'active' | 'cancelled'

interface Props {
  status: ContractStatus
  onCancel?: () => void
  onModify?: () => void
  onPay?: () => void
}

export default function ContractActions({
  status,
  onCancel,
  onModify,
  onPay
}: Props) {
  return (
    <div className="flex flex-col gap-2 pt-2">

      {/* 🔵 PRIMARY ACTION */}
      <button
        onClick={onModify}
        className="
          flex items-center justify-center gap-2
          w-full py-3 rounded-xl
          bg-indigo-600 text-white
          font-semibold text-sm
          hover:bg-indigo-700
          shadow-sm hover:shadow-md
          transition-all duration-200
        "
      >
        <Pencil size={16} />
        Modificar contrato
      </button>

      {/* ⚪ SECONDARY ACTION DINÁMICA */}
      {status === 'approved' ? (
        <button
          onClick={onPay}
          className="
            flex items-center justify-center gap-2
            w-full py-3 rounded-xl
            bg-green-600 text-white
            font-semibold text-sm
            hover:bg-green-700
            shadow-sm hover:shadow-md
            transition-all duration-200
          "
        >
          💳 Pagar contrato
        </button>
      ) : (
        <button
          onClick={onCancel}
          className="
            flex items-center justify-center gap-2
            w-full py-3 rounded-xl
            border border-gray-200
            text-gray-600 text-sm font-medium
            hover:bg-gray-50
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