'use client'

import { useEffect, useState } from "react"
import { Wallet, CreditCard, TrendingUp } from "lucide-react"
import { AdminPayment, getPayments } from "@/src/rentafacil/services/adminService"

const STATUS_CFG = {
  completed: { label: "Completado", classes: "bg-green-50 text-green-700 border-green-200" },
  pending:   { label: "Pendiente",  classes: "bg-amber-50 text-amber-700 border-amber-200" },
  failed:    { label: "Fallido",    classes: "bg-red-50 text-red-700 border-red-200" },
  refunded:  { label: "Reembolsado",classes: "bg-gray-50 text-gray-600 border-gray-200" },
}

function timeAgo(iso: string) {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000)
  if (h < 1) return "Hace menos de 1h"
  if (h < 24) return `Hace ${h}h`
  return `Hace ${Math.floor(h / 24)} días`
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<AdminPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "completed" | "pending" | "failed">("all")

  useEffect(() => { getPayments().then(data => { setPayments(data); setLoading(false) }) }, [])

  const filtered = filter === "all" ? payments : payments.filter(p => p.status === filter)
  const totalCommissions = payments.filter(p => p.status === "completed").reduce((s, p) => s + p.commission, 0)
  const totalRevenue = payments.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0)

  return (
    <div className="px-4 sm:px-6 py-6 flex flex-col gap-6 max-w-5xl mx-auto w-full">

      <div>
        <h1 className="text-xl font-semibold text-gray-900">Pagos y comisiones</h1>
        <p className="text-sm text-gray-500 mt-0.5">Historial de transacciones de la plataforma.</p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Ingresos totales</p>
            <p className="text-lg font-bold text-green-600">${totalRevenue.toFixed(0)} USD</p>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <CreditCard size={16} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Comisiones</p>
            <p className="text-lg font-bold text-indigo-600">${totalCommissions.toFixed(2)} USD</p>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "completed", "pending", "failed"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === f ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
            }`}
          >
            {f === "all" ? "Todos" : STATUS_CFG[f].label}
          </button>
        ))}
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="flex flex-col gap-2">{[1,2,3,4].map(i => <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />)}</div>
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="hidden sm:grid grid-cols-6 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
            {["Owner", "Plan", "Monto", "Comisión", "Método", "Estado"].map(h => (
              <p key={h} className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{h}</p>
            ))}
          </div>
          <div className="flex flex-col divide-y divide-gray-50">
            {filtered.map(payment => {
              const cfg = STATUS_CFG[payment.status]
              return (
                <div key={payment.id} className="px-4 py-3 flex flex-col sm:grid sm:grid-cols-6 sm:items-center gap-1 sm:gap-0">
                  <div>
                    <p className="text-xs font-medium text-gray-900">{payment.ownerName}</p>
                    <p className="text-[11px] text-gray-400">{timeAgo(payment.date)}</p>
                  </div>
                  <p className="text-xs text-gray-600">{payment.planName}</p>
                  <p className="text-xs font-semibold text-gray-900">${payment.amount} USD</p>
                  <p className="text-xs font-medium text-indigo-600">${payment.commission.toFixed(2)} USD</p>
                  <div className="flex items-center gap-1.5">
                    {payment.method === "crypto"
                      ? <Wallet size={12} className="text-indigo-400" />
                      : <CreditCard size={12} className="text-gray-400" />
                    }
                    <span className="text-xs text-gray-500 capitalize">{payment.method}</span>
                  </div>
                  <span className={`self-start sm:self-auto inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium ${cfg.classes}`}>
                    {cfg.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}