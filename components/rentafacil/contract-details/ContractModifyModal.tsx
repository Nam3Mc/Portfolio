'use client'

import { useState, useEffect } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
  contractId: string
  initialStartDate: string
  initialMonths: number
  onSuccess?: (data: any) => void
}

export default function ContractModifyModal({
  isOpen,
  onClose,
  contractId,
  initialStartDate,
  initialMonths,
  onSuccess
}: Props) {

  const [startDate, setStartDate] = useState(initialStartDate)
  const [months, setMonths] = useState(initialMonths)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 🔒 bloquear scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "auto" }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setStartDate(initialStartDate)
      setMonths(initialMonths)
      setError(null)
    }
  }, [isOpen, initialStartDate, initialMonths])

  const handleSave = async () => {
    setLoading(true)
    setError(null)

    try {
      const payload = { contractId, startDate, months }

      const res = await fetch("/api/contracts/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error("Error al actualizar el contrato")

      const data = await res.json()
      onSuccess?.(data)
      onClose()

    } catch (err: any) {
      setError(err.message || "Error inesperado")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40
        flex items-end sm:items-center justify-center
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
          shadow-xl
          p-5 sm:p-6
        "
      >

        {/* HEADER */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Modificar contrato
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Ajusta la fecha de ingreso y duración del contrato
        </p>

        {/* ERROR */}
        {error && (
          <div className="
            mt-4 text-sm text-red-600
            bg-red-50 p-3 rounded-xl border border-red-100
          ">
            {error}
          </div>
        )}

        {/* FORM */}
        <div className="mt-6 flex flex-col gap-4">

          {/* DATE */}
          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-sm text-gray-600">
              Fecha de ingreso
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="
                w-full
                h-11
                px-3
                border border-gray-200
                rounded-xl
                text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>

          {/* MONTHS */}
          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-sm text-gray-600">
              Meses de renta
            </label>

            <input
              type="number"
              min={1}
              max={36}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="
                w-full
                h-11
                px-3
                border border-gray-200
                rounded-xl
                text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>

        </div>

        {/* ACTIONS */}
        <div className="
          flex flex-col sm:flex-row
          gap-2
          mt-6
        ">

          <button
            onClick={onClose}
            disabled={loading}
            className="
              flex-1 h-11
              rounded-xl
              border border-gray-200
              text-gray-700
              hover:bg-gray-50
              disabled:opacity-50
            "
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="
              flex-1 h-11
              rounded-xl
              bg-indigo-600 text-white
              hover:bg-indigo-700
              active:scale-95
              disabled:opacity-50
            "
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>

        </div>

      </div>
    </div>
  )
}