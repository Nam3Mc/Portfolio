'use client'

import { useState } from "react"
import { X, Lock, Loader2, Info } from "lucide-react"
import { BlockedDate, updateBlockedDates } from "@/src/rentafacil/services/ownerPropertyService"

interface Props {
  propertyId: string
  blockedDates: BlockedDate[]
  onUpdate: (dates: BlockedDate[]) => void
}

const MONTH_NAMES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
const DAY_NAMES = ["Do","Lu","Ma","Mi","Ju","Vi","Sá"]
const REASONS = ["Remodelación", "Uso personal", "Mantenimiento", "Reservado", "Otro"]

function toKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

export default function TabCalendar({ propertyId, blockedDates, onUpdate }: Props) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [blocked, setBlocked] = useState<BlockedDate[]>(blockedDates)
  const [selectedReason, setSelectedReason] = useState("Remodelación")
  const [loading, setLoading] = useState(false)

  const blockedSet = new Set(blocked.map(b => b.date))

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  // Build calendar grid
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const toggleDate = (day: number) => {
    const date = new Date(year, month, day)
    if (date < today) return
    const key = toKey(date)
    if (blockedSet.has(key)) {
      setBlocked(prev => prev.filter(b => b.date !== key))
    } else {
      setBlocked(prev => [...prev, { date: key, reason: selectedReason }])
    }
  }

  const handleSave = async () => {
    setLoading(true)
    await updateBlockedDates(propertyId, blocked)
    onUpdate(blocked)
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">

      {/* INFO */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100">
        <Info size={15} className="text-indigo-500 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-700 leading-relaxed">
          Las fechas bloqueadas no estarán disponibles para los inquilinos. Podés bloquear días
          para remodelación, uso personal o mantenimiento.
        </p>
      </div>

      {/* REASON SELECTOR */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Motivo del bloqueo</label>
        <div className="flex flex-wrap gap-2">
          {REASONS.map(r => (
            <button
              key={r}
              onClick={() => setSelectedReason(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                selectedReason === r
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-indigo-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* CALENDAR */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">‹</button>
          <span className="text-sm font-semibold text-gray-900">{MONTH_NAMES[month]} {year}</span>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">›</button>
        </div>

        {/* DAY NAMES */}
        <div className="grid grid-cols-7 px-3 pt-3">
          {DAY_NAMES.map(d => (
            <div key={d} className="text-center text-[11px] text-gray-400 font-medium pb-2">{d}</div>
          ))}
        </div>

        {/* CELLS */}
        <div className="grid grid-cols-7 px-3 pb-3 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={i} />
            const date = new Date(year, month, day)
            const key = toKey(date)
            const isPast = date < today
            const isBlocked = blockedSet.has(key)
            const isToday = key === toKey(today)

            return (
              <button
                key={key}
                onClick={() => toggleDate(day)}
                disabled={isPast}
                className={`
                  aspect-square flex items-center justify-center rounded-lg text-xs font-medium
                  transition-all
                  ${isPast ? "text-gray-200 cursor-not-allowed" : ""}
                  ${isBlocked ? "bg-indigo-600 text-white hover:bg-red-500" : ""}
                  ${!isPast && !isBlocked ? "hover:bg-indigo-50 hover:text-indigo-600 text-gray-700" : ""}
                  ${isToday && !isBlocked ? "ring-1 ring-indigo-400" : ""}
                `}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* BLOCKED LIST */}
      {blocked.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-wide text-gray-400">{blocked.length} fecha{blocked.length > 1 ? "s" : ""} bloqueada{blocked.length > 1 ? "s" : ""}</p>
          <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto">
            {blocked.sort((a, b) => a.date.localeCompare(b.date)).map(b => (
              <div key={b.date} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2">
                  <Lock size={12} className="text-indigo-500" />
                  <span className="text-xs text-gray-700">
                    {new Date(b.date + "T12:00:00").toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                  {b.reason && <span className="text-[11px] text-gray-400">· {b.reason}</span>}
                </div>
                <button onClick={() => setBlocked(prev => prev.filter(d => d.date !== b.date))} className="text-gray-300 hover:text-red-400 transition-colors">
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SAVE */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="flex items-center gap-2 self-start px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {loading ? "Guardando..." : "Guardar calendario"}
      </button>

    </div>
  )
}