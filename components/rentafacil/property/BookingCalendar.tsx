"use client"

import { useState } from "react"

interface Props {
  onChange: (start: Date | null, end: Date | null) => void
  pricePerNight: number
}

export default function BookingCalendar({ onChange, pricePerNight }: Props) {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const formatCOP = (value: number) =>
    value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

  const isSameDay = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString()

  const handleClick = (date: Date) => {
    if (date < today) return

    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
      onChange(date, null)
      return
    }
    if (date < startDate) {
      setStartDate(date)
      onChange(date, null)
      return
    }
    setEndDate(date)
    onChange(startDate, date)
  }

  // Generar días del mes
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const daysInMonth = endOfMonth.getDate()
  const startDay = startOfMonth.getDay()

  const days: (Date | null)[] = []
  for (let i = 0; i < startDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++)
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i))

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false
    return date > startDate && date < endDate
  }

  // Cálculo del total
  const getNights = () => {
    if (!startDate || !endDate) return 0
    const diff = endDate.getTime() - startDate.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const nights = getNights()
  const subtotal = nights * pricePerNight
  const serviceFee = subtotal * 0.1 // Ejemplo: 10% fee
  const total = subtotal + serviceFee

  const monthLabel = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="w-full space-y-4">

      {/* HEADER DE NAVEGACIÓN DE MESES */}
      <div className="flex justify-between items-center mb-2 px-1">
        <button
          onClick={() =>
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
          }
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          ←
        </button>
        <h3 className="text-sm font-semibold capitalize">{monthLabel}</h3>
        <button
          onClick={() =>
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
          }
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          →
        </button>
      </div>

      {/* CABECERA DE DÍAS */}
      <div className="grid grid-cols-7 text-[12px] text-gray-500 mb-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* CALENDAR GRID FIJO */}
      <div className="grid grid-cols-7 gap-[2px] w-full h-[240px]">
        {days.map((day, i) => {
          if (!day) return <div key={i} />

          const isStart = startDate && isSameDay(day, startDate)
          const isEnd = endDate && isSameDay(day, endDate)
          const isPast = day < today

          return (
            <button
              key={i}
              onClick={() => !isPast && handleClick(day)}
              className={`
                h-10 flex flex-col items-center justify-center text-[12px] transition
                ${isStart ? "bg-indigo-600 text-white rounded-l-full" : ""}
                ${isEnd ? "bg-indigo-600 text-white rounded-r-full" : ""}
                ${isInRange(day) && !isStart && !isEnd ? "bg-indigo-100" : ""}
                ${!isStart && !isEnd && !isPast ? "hover:bg-indigo-50" : ""}
                ${isPast ? "text-gray-300 cursor-not-allowed" : ""}
              `}
              disabled={isPast}
            >
              <span className="font-medium">{day.getDate()}</span>
            </button>
          )
        })}
      </div>

      {/* DETALLES DE LA RESERVA */}
      {startDate && endDate ? (
        <div className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{nights} night{nights > 1 ? "s" : ""}</span>
            <span>{formatCOP(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Service fee (10%)</span>
            <span>{formatCOP(serviceFee)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatCOP(total)}</span>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50 shadow-sm text-gray-500 text-sm text-center">
          Select check-in and check-out dates to see pricing
        </div>
      )}
    </div>
  )
}