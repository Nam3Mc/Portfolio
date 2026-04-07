'use client'

interface Props {
  current: "all" | "pending" | "approved" | "rejected"
  onChange: (value: "all" | "pending" | "approved" | "rejected") => void
}

export default function FilterTabs({ current, onChange }: Props) {

  const tabs = [
    { key: "all", label: "Todos" },
    { key: "pending", label: "Pendientes" },
    { key: "approved", label: "Aprobados" },
    { key: "rejected", label: "Rechazados" }
  ] as const

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">

      {tabs.map(tab => {
        const isActive = current === tab.key

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition
              ${isActive
                ? "bg-indigo-600 text-white"      // Color principal de RF
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {tab.label}
          </button>
        )
      })}

    </div>
  )
}