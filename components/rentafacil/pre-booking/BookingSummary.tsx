'use client'

interface Props {
  bookingData: {
    months: number
    startDate: string
    pricePerMonth: number
  }
  variant?: "default" | "sidebar"
}

export default function BookingSummary({ bookingData, variant = "default" }: Props) {

  const startDate = new Date(bookingData.startDate)
  const total = bookingData.months * bookingData.pricePerMonth

  if (variant === "sidebar") {
    return (
      <div className="
        bg-white border border-gray-100 rounded-2xl shadow-sm
        p-4 flex flex-col gap-3
      ">

        <h3 className="text-sm font-semibold text-gray-900">
          Resumen de reserva
        </h3>

        <div className="text-xs text-gray-500 flex flex-col gap-2">

          <div className="flex justify-between">
            <span>Duración</span>
            <span className="text-gray-900 font-medium">
              {bookingData.months} mes{bookingData.months > 1 && "es"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Inicio</span>
            <span className="text-gray-900 font-medium">
              {startDate.toLocaleDateString("es-CO")}
            </span>
          </div>

        </div>

        <div className="border-t border-gray-100 my-2" />

        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-900">
            Total
          </span>
          <span className="text-lg font-bold text-green-600">
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

  // fallback (si lo usas en otra parte)
  return null
}