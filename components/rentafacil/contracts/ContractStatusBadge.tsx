'use client'

interface Props {
  status?: "pending" | "approved" | "rejected"
}

export default function ContractStatusBadge({ status }: Props) {

  const config = {
    pending: {
      label: "En revisión",
      className: "bg-indigo-100 text-indigo-700 border-indigo-200"
    },
    approved: {
      label: "Aprobado",
      className: "bg-blue-100 text-blue-700 border-blue-200"
    },
    rejected: {
      label: "Rechazado",
      className: "bg-red-100 text-red-700 border-red-200"
    }
  }

  const current = status && config[status] ? config[status] : {
    label: "Desconocido",
    className: "bg-gray-100 text-gray-500 border-gray-200"
  }

  return (
    <span
      className={`
        inline-block text-sm font-medium px-3 py-1 rounded-full border
        ${current.className}
      `}
    >
      {current.label}
    </span>
  )
}