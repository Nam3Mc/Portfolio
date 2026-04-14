'use client'

interface Props {
  months: number
  startDate: string
  endDate: string
}

export default function ContractMetrics({
  months,
  startDate,
  endDate
}: Props) {

  const start = new Date(startDate)
  const end = new Date(endDate)

  return (
    <div className="grid grid-cols-3 gap-4">

      {/* 📆 START */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">Inicio</span>
        <span className="text-sm font-medium text-gray-900">
          {start.toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}
        </span>
      </div>

      {/* ⏳ DURATION */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">Duración</span>
        <span className="text-sm font-medium text-gray-900">
          {months} mes{months > 1 ? "es" : ""}
        </span>
      </div>

      {/* 📆 END */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">Finaliza</span>
        <span className="text-sm font-medium text-gray-900">
          {end.toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}
        </span>
      </div>

    </div>
  )
}