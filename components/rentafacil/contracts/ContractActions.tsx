'use client'

interface Props {
  status: "pending" | "approved" | "rejected"
  onCancel?: () => void
  onView?: () => void
  onRetry?: () => void
}

export default function ContractActions({
  status,
  onCancel,
  onView,
  onRetry
}: Props) {

  return (
    <div className="flex gap-2 mt-3">

      {/* Pendiente */}
      {status === "pending" && (
        <button
          onClick={onCancel}
          className="w-full text-sm font-medium py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          Cancelar solicitud
        </button>
      )}

      {/* Aprobado */}
      {status === "approved" && (
        <button
          onClick={onView}
          className="w-full text-sm font-semibold py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Ver contrato
        </button>
      )}

      {/* Rechazado */}
      {status === "rejected" && (
        <button
          onClick={onRetry}
          className="w-full text-sm font-semibold py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Reintentar
        </button>
      )}

    </div>
  )
}