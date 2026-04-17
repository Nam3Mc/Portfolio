'use client'

import { useEffect, useState } from "react"

interface Props {
  isOpen: boolean
  contractId: string
  onClose: () => void
  onConfirm: (contractId: string) => Promise<void> | void
}

export default function CancelContractModal({
  isOpen,
  contractId,
  onClose,
  onConfirm
}: Props) {

  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  // 🔒 bloquear scroll del fondo
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleCancel = async () => {
    if (!confirmed) return

    try {
      setLoading(true)
      await onConfirm(contractId)
      onClose()
    } catch (err) {
      console.error("Cancel contract error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40
        flex items-end sm:items-center justify-center
        p-0 sm:p-4
      "
      onClick={onClose}
    >

      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full sm:max-w-md
          bg-white
          rounded-t-2xl sm:rounded-2xl
          shadow-xl border border-gray-100
          p-5 sm:p-6
          animate-in fade-in slide-in-from-bottom-5 sm:slide-in-from-bottom-0
        "
      >

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Cancelar contrato
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Esta acción es permanente y puede afectar tu historial de usuario.
        </p>

        {/* Warning */}
        <div className="
          mt-4 p-3
          rounded-xl
          bg-red-50 border border-red-100
          text-sm text-red-700
        ">
          Estás a punto de cancelar este contrato activo.
        </div>

        {/* Checkbox */}
        <label className="
          flex items-start gap-2
          mt-5
          text-sm text-gray-700
        ">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-red-600"
          />
          Estoy de acuerdo en cancelar este contrato
        </label>

        {/* Actions */}
        <div className="
          flex flex-col sm:flex-row
          gap-2
          mt-6
        ">

          <button
            onClick={onClose}
            className="
              flex-1
              h-11
              rounded-xl
              border border-gray-200
              text-gray-700
              hover:bg-gray-50
              transition
            "
          >
            Volver
          </button>

          <button
            disabled={!confirmed || loading}
            onClick={handleCancel}
            className={`
              flex-1
              h-11
              rounded-xl
              font-medium
              transition
              ${confirmed
                ? "bg-red-600 hover:bg-red-700 text-white active:scale-95"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {loading ? "Cancelando..." : "Cancelar contrato"}
          </button>

        </div>

      </div>
    </div>
  )
}