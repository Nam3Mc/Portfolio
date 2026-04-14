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
      const payload = {
        contractId,
        startDate,
        months
      }

      // 🔥 MOCK → aquí luego conectas backend real
      const res = await fetch("/api/contracts/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        throw new Error("Error al actualizar el contrato")
      }

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

        {/* HEADER */}
        <h2 className="text-lg font-semibold text-gray-900">
          Modificar contrato
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Ajusta la fecha de ingreso y duración del contrato
        </p>

        {/* ERROR */}
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}

        {/* FORM */}
        <div className="mt-6 space-y-4">

          {/* DATE */}
          <div>
            <label className="text-sm text-gray-600">
              Fecha de ingreso
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg"
            />
          </div>

          {/* MONTHS */}
          <div>
            <label className="text-sm text-gray-600">
              Meses de renta
            </label>
            <input
              type="number"
              min={1}
              max={36}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg"
            />
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-6">

          <button
            onClick={onClose}
            disabled={loading}
            className="w-full py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>

        </div>

      </div>
    </div>
  )
}