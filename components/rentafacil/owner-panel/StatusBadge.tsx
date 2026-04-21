'use client'

import { PropertyStatus } from "@/src/rentafacil/services/ownerPropertyService"

const CONFIG: Record<PropertyStatus, { label: string; classes: string; dot: string }> = {
  active:               { label: "Activa",              classes: "bg-green-50 text-green-700 border-green-200",   dot: "bg-green-500" },
  approved:             { label: "Aprobada",             classes: "bg-blue-50 text-blue-700 border-blue-200",      dot: "bg-blue-500" },
  pending_verification: { label: "En verificación",      classes: "bg-amber-50 text-amber-700 border-amber-200",   dot: "bg-amber-500" },
  paused:               { label: "Pausada",              classes: "bg-gray-50 text-gray-600 border-gray-200",      dot: "bg-gray-400" },
  rejected:             { label: "Rechazada",            classes: "bg-red-50 text-red-700 border-red-200",         dot: "bg-red-500" },
}

interface Props {
  status: PropertyStatus
  size?: "sm" | "md"
}

export default function StatusBadge({ status, size = "md" }: Props) {
  const { label, classes, dot } = CONFIG[status]

  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full border font-medium
      ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"}
      ${classes}
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  )
}