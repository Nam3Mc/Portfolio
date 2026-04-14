'use client'

import { CheckCircle, Clock, XCircle, LayoutList } from "lucide-react"

interface Props {
  current: "all" | "pending" | "approved" | "rejected"
  onChange: (value: "all" | "pending" | "approved" | "rejected") => void
}

export default function FilterTabs({ current, onChange }: Props) {

  const tabs = [
    { key: "all", label: "Todos", icon: LayoutList },
    { key: "pending", label: "Pendientes", icon: Clock },
    { key: "approved", label: "Aprobados", icon: CheckCircle },
    { key: "rejected", label: "Rechazados", icon: XCircle }
  ] as const

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 bg-gray-100/70 backdrop-blur-sm p-1.5 rounded-2xl w-fit">

        {tabs.map(tab => {
          const isActive = current === tab.key
          const Icon = tab.icon

          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                transition-all duration-200

                ${isActive
                  ? "bg-white text-indigo-600 shadow-sm scale-[1.02]"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
                }
              `}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}

      </div>
    </div>
  )
}