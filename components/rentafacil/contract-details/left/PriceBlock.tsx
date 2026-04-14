'use client'

interface Props {
  monthly: number
  total: number
}

export default function PriceBlock({ monthly, total }: Props) {

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-gray-50">

      {/* 💰 TOTAL */}
      <div className="flex justify-between items-end">
        <span className="text-sm text-gray-500">
          Total del contrato
        </span>

        <span className="text-lg font-semibold text-gray-900">
          {total.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
          })}
        </span>
      </div>

      {/* 💵 MONTHLY */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Pago mensual
        </span>

        <span className="text-sm font-medium text-indigo-600">
          {monthly.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
          })} / mes
        </span>
      </div>

    </div>
  )
}