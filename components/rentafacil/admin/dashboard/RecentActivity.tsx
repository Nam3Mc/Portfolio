'use client'

import { CheckCircle2, XCircle, AlertTriangle, CreditCard, Home } from "lucide-react"

const ACTIVITY = [
  { icon: Home,         color: "text-amber-500", bg: "bg-amber-50", label: "Nueva propiedad enviada", sub: "Casa Usaquén con Jardín · Ana Rodríguez", time: "Hace 10 min" },
  { icon: CreditCard,   color: "text-indigo-500", bg: "bg-indigo-50", label: "Pago recibido · Plan Pro", sub: "Carlos Mendoza · $29 USD", time: "Hace 2 h" },
  { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50", label: "Propiedad aprobada", sub: "Apartamento Rosales Piso 8", time: "Hace 5 h" },
  { icon: AlertTriangle,color: "text-red-500",   bg: "bg-red-50",   label: "Nueva disputa abierta", sub: "Depósito no devuelto · Contrato #312", time: "Hace 1 día" },
  { icon: XCircle,      color: "text-gray-400",  bg: "bg-gray-50",  label: "Propiedad rechazada", sub: "Documentos incompletos · Roberto Silva", time: "Hace 2 días" },
]

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-900">Actividad reciente</p>
      </div>
      <div className="flex flex-col divide-y divide-gray-50">
        {ACTIVITY.map(({ icon: Icon, color, bg, label, sub, time }) => (
          <div key={label} className="flex items-start gap-3 px-4 py-3">
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
              <Icon size={14} className={color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900">{label}</p>
              <p className="text-[11px] text-gray-400 truncate">{sub}</p>
            </div>
            <span className="text-[11px] text-gray-400 shrink-0">{time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}