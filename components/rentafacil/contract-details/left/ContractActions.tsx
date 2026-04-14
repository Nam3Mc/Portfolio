'use client'

import { Pencil, XCircle } from "lucide-react"

interface Props {
  onCancel?: () => void
  onModify?: () => void
}

export default function ContractActions({
  onCancel,
  onModify
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

      {/* ⚪ SECONDARY ACTION */}
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

    </div>
  )
}