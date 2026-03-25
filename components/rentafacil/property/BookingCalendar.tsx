"use client"

import { useState } from "react"

interface Props {
  pricePerMonth: number
  isOccupied: boolean
  availableFrom: Date | null
  onSelect: (startDate: Date, months: number) => void
}

export default function BookingPanel({
  pricePerMonth,
  isOccupied,
  availableFrom,
  onSelect,
}: Props) {

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [months, setMonths] = useState(1)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const formatCOP = (value: number) =>
    value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    })

  const isDisabled = (date: Date) => {
    if (date < today) return true
    if (isOccupied && availableFrom) {
      return date < availableFrom
    }
    return false
  }

  const handleClick = (date: Date) => {
    if (isDisabled(date)) return

    setStartDate(date)
    onSelect(date, months)
  }

  // calendario base
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const daysInMonth = endOfMonth.getDate()
  const startDay = startOfMonth.getDay()

  const days: (Date | null)[] = []
  for (let i = 0; i < startDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i))
  }

  const total = pricePerMonth * months

  const monthLabel = currentMonth.toLocaleString("es-CO", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="w-full space-y-4 bg-white p-4 rounded-2xl shadow-md border">

      {/* STATUS */}
      <div className="text-center text-sm">
        {isOccupied ? (
          <span className="text-red-500 font-medium">
            Ocupado hasta {availableFrom?.toDateString()}
          </span>
        ) : (
          <span className="text-green-600 font-medium">
            Disponible ahora
          </span>
        )}
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <button onClick={() =>
          setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
        }>←</button>

        <h3 className="text-sm font-semibold capitalize">{monthLabel}</h3>

        <button onClick={() =>
          setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
        }>→</button>
      </div>

      {/* DAYS */}
      <div className="grid grid-cols-7 text-xs text-gray-400 text-center">
        {["D","L","M","M","J","V","S"].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (!day) return <div key={i} />

          const disabled = isDisabled(day)

          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => handleClick(day)}
              className={`
                h-9 rounded-full text-sm
                ${disabled ? "text-gray-300" : "hover:bg-gray-100"}
                ${startDate && day.toDateString() === startDate.toDateString()
                  ? "bg-indigo-600 text-white"
                  : ""}
              `}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>

      {/* SELECTOR MESES */}
      <div>
        <label className="text-xs text-gray-500">Duración</label>
        <select
          value={months}
          onChange={(e) => {
            const m = Number(e.target.value)
            setMonths(m)
            if (startDate) onSelect(startDate, m)
          }}
          className="w-full mt-1 p-2 border rounded-lg"
        >
          {[1, 3, 6, 12].map(m => (
            <option key={m} value={m}>
              {m} mes{m > 1 && "es"}
            </option>
          ))}
        </select>
      </div>

      {/* PRECIO */}
      <div className="border rounded-lg p-4 bg-gray-50 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>{months} mes{months > 1 && "es"}</span>
          <span>{formatCOP(pricePerMonth * months)}</span>
        </div>

        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCOP(total)}</span>
        </div>
      </div>

    </div>
  )
}