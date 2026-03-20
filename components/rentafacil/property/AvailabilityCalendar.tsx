"use client"

import { useState } from "react"

interface Props {
  onChange: (start: Date | null, end: Date | null) => void
}

export default function BookingCalendar({ onChange }: Props) {

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

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

  const handleSelectDate = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    if (!startDate || (startDate && endDate)) {
      setStartDate(selected)
      setEndDate(null)
      onChange(selected, null)
    } else if (selected > startDate) {
      setEndDate(selected)
      onChange(startDate, selected)
    } else {
      setStartDate(selected)
      setEndDate(null)
      onChange(selected, null)
    }
  }

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date > startDate && date < endDate
  }

  const isSelected = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return (
      (startDate && date.getTime() === startDate.getTime()) ||
      (endDate && date.getTime() === endDate.getTime())
    )
  }

  const monthLabel = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="bg-white rounded-2xl shadow-xl border p-4 w-[320px]">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          ←
        </button>

        <h3 className="font-semibold text-sm">
          {monthLabel}
        </h3>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          →
        </button>
      </div>

      {/* DAYS HEADER */}
      <div className="grid grid-cols-7 text-xs text-gray-500 mb-2 text-center">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* DAYS GRID */}
      <div className="grid grid-cols-7 gap-1 text-sm">

        {/* EMPTY SPACES */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={i} />
        ))}

        {/* DAYS */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1

          return (
            <button
              key={day}
              onClick={() => handleSelectDate(day)}
              className={`
                h-9 w-9 flex items-center justify-center rounded-full
                transition text-sm

                ${isSelected(day)
                  ? "bg-indigo-600 text-white"
                  : isInRange(day)
                  ? "bg-indigo-100 text-indigo-600"
                  : "hover:bg-gray-100"
                }
              `}
            >
              {day}
            </button>
          )
        })}

      </div>

      {/* FOOTER */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Select check-in and check-out dates
      </div>

    </div>
  )
}