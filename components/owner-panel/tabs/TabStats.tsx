'use client'

import { TrendingUp, DollarSign, FileText, Calendar } from "lucide-react"
import { OwnerProperty } from "@/src/rentafacil/services/ownerPropertyService"

interface Props {
  property: OwnerProperty
}

const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })

export default function TabStats({ property }: Props) {
  const metrics = [
    {
      icon: DollarSign,
      label: "Ingresos totales",
      value: formatCOP(property.totalIncome),
      sub: "Desde el inicio",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: TrendingUp,
      label: "Tasa de ocupación",
      value: `${property.occupancyRate}%`,
      sub: "Promedio histórico",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: FileText,
      label: "Contratos totales",
      value: property.totalContracts,
      sub: `${property.activeContracts} activo${property.activeContracts !== 1 ? "s" : ""}`,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Calendar,
      label: "Fechas bloqueadas",
      value: property.blockedDates.length,
      sub: "Este mes",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ]

  return (
    <div className="flex flex-col gap-6">

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map(({ icon: Icon, label, value, sub, color, bg }) => (
          <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4 flex flex-col gap-3">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              <p className={`text-xl font-semibold mt-0.5 ${color}`}>{value}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* OCCUPANCY BAR */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-700">Ocupación histórica</p>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-700"
            style={{ width: `${property.occupancyRate}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>0%</span>
          <span className="text-indigo-600 font-medium">{property.occupancyRate}% ocupado</span>
          <span>100%</span>
        </div>
      </div>

      {/* INCOME BREAKDOWN */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-700">Desglose de ingresos</p>
        <div className="flex flex-col gap-2">
          {[
            { label: "Ingreso mensual estimado", value: formatCOP(property.price), highlight: true },
            { label: "Total de contratos", value: property.totalContracts },
            { label: "Ingreso promedio por contrato", value: property.totalContracts > 0 ? formatCOP(property.totalIncome / property.totalContracts) : "-" },
            { label: "Total generado", value: formatCOP(property.totalIncome), highlight: true },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
              <span className="text-xs text-gray-500">{label}</span>
              <span className={`text-xs font-semibold ${highlight ? "text-indigo-600" : "text-gray-900"}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}