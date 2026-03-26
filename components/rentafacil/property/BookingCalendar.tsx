'use client'

import { useState } from "react"
import { motion } from "framer-motion"

interface Props {
  isOccupied: boolean
  availableFrom: Date | null
  onSelect: (startDate: Date, months: number) => void
}

export default function PremiumBookingCalendar({ isOccupied, availableFrom, onSelect }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [months, setMonths] = useState(1)

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const daysInMonth = endOfMonth.getDate()
  const startDay = startOfMonth.getDay()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))

  const isDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (date < today) return true
    if (isOccupied && availableFrom) return date < availableFrom
    return false
  }

  const handleSelectDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (isDisabled(day)) return
    setSelectedDate(date)
    onSelect(date, months)
  }

  const monthLabel = currentMonth.toLocaleString("es-CO", { month: "long", year: "numeric" })

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl w-[360px] max-w-full mx-auto space-y-4">

      {/* STATUS */}
      <div className="text-center text-sm font-medium">
        {isOccupied ? (
          <span className="text-red-500">Ocupado hasta {availableFrom?.toLocaleDateString()}</span>
        ) : (
          <span className="text-green-600">Disponible ahora</span>
        )}
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 transition">←</button>
        <h3 className="font-semibold text-sm capitalize">{monthLabel}</h3>
        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 transition">→</button>
      </div>

      {/* DAYS HEADER */}
      <div className="grid grid-cols-7 text-xs text-gray-500 text-center mb-1">
        {["D","L","M","M","J","V","S"].map(d => <div key={d}>{d}</div>)}
      </div>

      {/* DAYS GRID */}
      <div className="grid grid-cols-7 gap-1 text-sm">
        {Array.from({ length: startDay }).map((_, i) => <div key={i} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const disabled = isDisabled(day)
          const isSelected = selectedDate?.toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString()

          return (
            <motion.button
              key={day}
              disabled={disabled}
              onClick={() => handleSelectDate(day)}
              layout
              whileHover={!disabled ? { scale: 1.1 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              className={`
                h-10 w-10 flex items-center justify-center rounded-full transition
                ${disabled ? "bg-red-100 text-red-300 cursor-not-allowed" : "bg-gray-50 hover:bg-indigo-100"}
                ${isSelected ? "bg-indigo-600 text-white shadow-md" : ""}
              `}
            >
              {day}
            </motion.button>
          )
        })}
      </div>

      {/* SELECTOR MESES */}
      <div className="space-y-1">
        <label className="text-xs text-gray-500 font-medium">Duración</label>
        <select
          value={months}
          onChange={(e) => {
            const m = Number(e.target.value)
            setMonths(m)
            if (selectedDate) onSelect(selectedDate, m)
          }}
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
        >
          {[1,2,3,6,12].map((m) => <option key={m} value={m}>{m} mes{m>1?"es":""}</option>)}
        </select>
      </div>
    </div>
  )
}