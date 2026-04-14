'use client'

import { Clock, CheckCircle2, XCircle } from "lucide-react"

interface Props {
  status?: "pending" | "approved" | "rejected"
}

export default function ContractStatusBadge({ status }: Props) {

  const config = {
    pending: {
      label: "En revisión",
      icon: Clock,
      className: "bg-amber-50 text-amber-700 border-amber-200"
    },
    approved: {
      label: "Aprobado",
      icon: CheckCircle2,
      className: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    rejected: {
      label: "Rechazado",
      icon: XCircle,
      className: "bg-red-50 text-red-700 border-red-200"
    }
  }

  const current = status && config[status]
    ? config[status]
    : {
        label: "Desconocido",
        icon: Clock,
        className: "bg-gray-100 text-gray-500 border-gray-200"
      }

  const Icon = current.icon

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        text-xs font-medium px-3 py-1 rounded-full border
        transition-all duration-200
        ${current.className}
      `}
    >
      <Icon size={14} />
      {current.label}
    </span>
  )
}