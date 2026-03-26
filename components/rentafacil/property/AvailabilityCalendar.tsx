'use client'

import { useState } from "react"

interface Props {
  isOccupied: boolean
  availableFrom: Date | null
  onSelect: (startDate: Date, months: number) => void
}

export default function BookingPanel({ isOccupied, availableFrom, onSelect }: Props) {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [months, setMonths] = useState(1)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isDisabled = (date: Date) => {
    if (date < today) return true
    if (isOccupied && availableFrom) return date < availableFrom
    return false
  }

  const handleClick = (date: Date) => {
    if (isDisabled(date)) return
    setStartDate(date)
    onSelect(date, months)
  }

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const daysInMonth = endOfMonth.getDate()
  const startDay = startOfMonth.getDay()

  const days: (Date | null)[] = []
  for (let i = 0; i < startDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i))

  const monthLabel = currentMonth.toLocaleString("es-CO", { month: "long", year: "numeric" })

  return (
    <div className="w-full max-w-sm mx-auto space-y-4 bg-white p-6 rounded-3xl shadow-lg border">

      {/* STATUS */}
      <div className="text-center text-sm font-medium">
        {isOccupied ? (
          <span className="text-red-500">Ocupado hasta {availableFrom?.toLocaleDateString()}</span>
        ) : (
          <span className="text-green-600">Disponible ahora</span>
        )}
      </div>

      {/* CALENDARIO */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >←</button>
        <h3 className="text-sm font-semibold capitalize">{monthLabel}</h3>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >→</button>
      </div>

      <div className="grid grid-cols-7 text-xs text-gray-400 text-center">
        {["D","L","M","M","J","V","S"].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (!day) return <div key={i} />
          const disabled = isDisabled(day)
          const isSelected = startDate && day.toDateString() === startDate.toDateString()
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => handleClick(day)}
              className={`
                h-10 w-10 flex items-center justify-center rounded-full text-sm transition
                ${disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-indigo-100"}
                ${isSelected ? "bg-indigo-600 text-white shadow-md" : ""}`}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>

      {/* SELECTOR DE MESES */}
      <div className="space-y-1">
        <label className="text-xs text-gray-500 font-medium">Duración</label>
        <select
          value={months}
          onChange={(e) => {
            const m = Number(e.target.value)
            setMonths(m)
            if (startDate) onSelect(startDate, m)
          }}
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {[1,3,6,12].map(m => <option key={m} value={m}>{m} mes{m>1?"es":""}</option>)}
        </select>
      </div>

    </div>
  )
}