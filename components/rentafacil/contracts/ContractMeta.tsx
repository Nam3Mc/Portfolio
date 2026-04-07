'use client'

interface Props {
  months: number
  startDate: string
  pricePerMonth: number
}

export default function ContractMeta({
  months,
  startDate,
  pricePerMonth
}: Props) {

  const start = new Date(startDate)
  const total = months * pricePerMonth

  return (
    <div className="flex flex-col gap-2 text-sm text-gray-600">

      {/* Fecha de inicio */}
      <div className="flex justify-between">
        <span>Inicio</span>
        <span className="text-gray-900 font-medium">
          {start.toLocaleDateString("es-CO")}
        </span>
      </div>

      {/* Duración */}
      <div className="flex justify-between">
        <span>Duración</span>
        <span className="text-gray-900 font-medium">
          {months} mes{months > 1 ? "es" : ""}
        </span>
      </div>

      {/* Total */}
      <div className="flex justify-between border-t border-gray-200 pt-2 mt-1">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="font-bold text-blue-600">
          {total.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
          })}
        </span>
      </div>

    </div>
  )
}