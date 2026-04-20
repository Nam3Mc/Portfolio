'use client'

import { useState } from "react"
import { Settings, ImageIcon, FileText, Calendar, BarChart2, ScrollText } from "lucide-react"
import { OwnerProperty } from "@/src/rentafacil/services/ownerPropertyService"
import TabGeneral from "../tabs/TabGeneral"
import TabPhotos from "../tabs/TabPhotos"
import TabDocuments from "../tabs/TabDocuments"
import TabCalendar from "../tabs/TabCalendar"
import TabStats from "../tabs/TabStats"
import TabContracts from "../tabs/TabContracts"

interface Props {
  property: OwnerProperty
  onUpdate: (data: Partial<OwnerProperty>) => void
}

const TABS = [
  { id: "general",   label: "General",    icon: Settings },
  { id: "photos",    label: "Fotos",      icon: ImageIcon },
  { id: "documents", label: "Documentos", icon: FileText },
  { id: "calendar",  label: "Calendario", icon: Calendar },
  { id: "stats",     label: "Estadísticas", icon: BarChart2 },
  { id: "contracts", label: "Contratos",  icon: ScrollText },
]

export default function PropertyDetailTabs({ property, onUpdate }: Props) {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="flex flex-col gap-0">

      {/* TAB BAR */}
      <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-none">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`
              flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap
              border-b-2 transition-colors shrink-0
              ${activeTab === id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
              }
            `}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="pt-6">
        {activeTab === "general" && (
          <TabGeneral property={property} onUpdate={onUpdate} />
        )}
        {activeTab === "photos" && (
          <TabPhotos property={property} onUpdate={onUpdate} />
        )}
        {activeTab === "documents" && (
          <TabDocuments />
        )}
        {activeTab === "calendar" && (
          <TabCalendar
            propertyId={property.id}
            blockedDates={property.blockedDates}
            onUpdate={dates => onUpdate({ blockedDates: dates })}
          />
        )}
        {activeTab === "stats" && (
          <TabStats property={property} />
        )}
        {activeTab === "contracts" && (
          <TabContracts propertyId={property.id} />
        )}
      </div>

    </div>
  )
}