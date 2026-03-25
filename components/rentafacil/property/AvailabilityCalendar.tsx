"use client"

import { useState } from "react"

interface Props {
  isOccupied: boolean
  availableFrom: Date | null
  onSelect: (startDate: Date, months: number) => void
}

export default function BookingCalendar({
  isOccupied,
  availableFrom,
  onSelect,
}: Props) {

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [months, setMonths] = useState(1)

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

  const daysInMonth = endOfMonth.getDate()
  const startDay = startOfMonth.getDay()

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const isDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    if (isOccupied && availableFrom) {
      return date < availableFrom
    }

    return false
  }

  const handleSelectDate = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    if (isDisabled(day)) return

    setSelectedDate(selected)
    onSelect(selected, months)
  }

  const monthLabel = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="bg-white rounded-2xl shadow-xl border p-4 w-[340px]">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100">
          ←
        </button>

        <h3 className="font-semibold text-sm">
          {monthLabel}
        </h3>

        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100">
          →
        </button>
      </div>

      {/* STATUS */}
      <div className="mb-3 text-center text-xs">
        {isOccupied ? (
          <span className="text-red-500 font-medium">
            Occupied until {availableFrom?.toDateString()}
          </span>
        ) : (
          <span className="text-green-600 font-medium">
            Available now
          </span>
        )}
      </div>

      {/* DAYS HEADER */}
      <div className="grid grid-cols-7 text-xs text-gray-500 mb-2 text-center">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* DAYS GRID */}
      <div className="grid grid-cols-7 gap-1 text-sm">

        {Array.from({ length: startDay }).map((_, i) => (
          <div key={i} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const disabled = isDisabled(day)

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => handleSelectDate(day)}
              className={`
                h-9 w-9 flex items-center justify-center rounded-full
                transition text-sm

                ${disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : selectedDate?.getDate() === day
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100"
                }
              `}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* MONTH SELECTOR */}
      <div className="mt-4">
        <label className="text-xs text-gray-500">مدة (months)</label>
        <select
          value={months}
          onChange={(e) => {
            const m = Number(e.target.value)
            setMonths(m)
            if (selectedDate) onSelect(selectedDate, m)
          }}
          className="w-full mt-1 p-2 border rounded-lg text-sm"
        >
          {[1,2,3,6,12].map((m) => (
            <option key={m} value={m}>
              {m} month{m > 1 && "s"}
            </option>
          ))}
        </select>
      </div>

    </div>
  )
}