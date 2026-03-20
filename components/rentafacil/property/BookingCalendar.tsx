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

  const formatCOP = (value: number) =>
    value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

  const isSameDay = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString()

  const handleClick = (date: Date) => {
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

  const monthLabel = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="w-full">

      {/* HEADER */}
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

      {/* DAYS HEADER */}
      <div className="grid grid-cols-7 text-[10px] text-gray-500 mb-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-[1px] w-full">

        {days.map((day, i) => {
          if (!day) return <div key={i} />

          const isStart = startDate && isSameDay(day, startDate)
          const isEnd = endDate && isSameDay(day, endDate)

          return (
            <button
              key={i}
              onClick={() => handleClick(day)}
              className={`
                h-8.5 w-full flex flex-col items-center justify-center text-[14px] transition
                ${isStart && "bg-indigo-600 text-white"}
                ${isEnd && "bg-indigo-600 text-white"}
                ${isInRange(day) && "bg-indigo-100"}
                ${!isStart && !isEnd && "hover:bg-gray-100"}
              `}
            >
              {/* Día */}
              <span className="font-medium">{day.getDate()}</span>

              {/* Precio sutil */}
              <span className="text-[12px] text-gray-400 mt-[1px] opacity-80">
                {formatCOP(pricePerNight)}
              </span>
            </button>
          )
        })}

      </div>
    </div>
  )
}