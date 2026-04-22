'use client'

import {
  Clock, Home, FileText, AlertTriangle,
  DollarSign, Users, TrendingUp, Zap
} from "lucide-react"
import { DashboardMetrics } from "@/src/rentafacil/services/adminService"

const formatUSD = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })} USD`
const formatCOP = (n: number) => n.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })

interface Props { metrics: DashboardMetrics }

export default function MetricsGrid({ metrics }: Props) {
  const cards = [
    {
      label: "Pendientes de revisión",
      value: metrics.pendingProperties,
      sub: metrics.pendingOlderThan48h > 0 ? `${metrics.pendingOlderThan48h} urgentes (+48h)` : "Al día",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: metrics.pendingOlderThan48h > 0 ? "border-amber-200" : "border-gray-100",
      urgent: metrics.pendingOlderThan48h > 0,
    },
    {
      label: "Propiedades activas",
      value: metrics.activeProperties,
      sub: `${metrics.occupancyRate}% ocupación promedio`,
      icon: Home,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-gray-100",
    },
    {
      label: "Contratos activos",
      value: metrics.activeContracts,
      sub: `${metrics.totalContracts} totales`,
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-gray-100",
    },
    {
      label: "Disputas abiertas",
      value: metrics.openDisputes,
      sub: metrics.openDisputes > 0 ? "Requieren atención" : "Sin disputas",
      icon: AlertTriangle,
      color: metrics.openDisputes > 0 ? "text-red-600" : "text-gray-400",
      bg: metrics.openDisputes > 0 ? "bg-red-50" : "bg-gray-50",
      border: metrics.openDisputes > 0 ? "border-red-200" : "border-gray-100",
      urgent: metrics.openDisputes > 0,
    },
    {
      label: "Ingresos del mes",
      value: formatUSD(metrics.monthlyRevenue),
      sub: `${formatUSD(metrics.monthlyCommissions)} en comisiones`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-gray-100",
    },
    {
      label: "Usuarios totales",
      value: metrics.totalUsers,
      sub: "Owners e inquilinos",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-gray-100",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {cards.map(({ label, value, sub, icon: Icon, color, bg, border, urgent }) => (
        <div
          key={label}
          className={`
            relative rounded-2xl border bg-white p-4 flex flex-col gap-3
            ${border}
            ${urgent ? "shadow-sm" : ""}
          `}
        >
          {urgent && (
            <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          )}
          <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
            <Icon size={16} className={color} />
          </div>
          <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-xl font-bold mt-0.5 ${color}`}>{value}</p>
            <p className={`text-[11px] mt-0.5 ${urgent ? "text-red-500 font-medium" : "text-gray-400"}`}>{sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}