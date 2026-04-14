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
    <div className="grid grid-cols-3 gap-3">

      {/* 📅 START */}
      <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1">
        <span className="text-[11px] text-gray-500">Start</span>
        <span className="text-sm font-semibold text-gray-900">
          {start.toLocaleDateString("es-CO")}
        </span>
      </div>

      {/* ⏳ DURATION */}
      <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1">
        <span className="text-[11px] text-gray-500">Duration</span>
        <span className="text-sm font-semibold text-gray-900">
          {months} mo
        </span>
      </div>

      {/* 💰 MONTHLY */}
      <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1">
        <span className="text-[11px] text-gray-500">Monthly</span>
        <span className="text-sm font-semibold text-gray-900">
          {pricePerMonth.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
          })}
        </span>
      </div>

      {/* 💎 TOTAL (FULL WIDTH EMPHASIS) */}
      <div className="col-span-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-3 flex items-center justify-between mt-1 border border-indigo-100">

        <span className="text-sm font-semibold text-gray-900">
          Total Contract Value
        </span>

        <span className="text-base font-bold text-indigo-600">
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