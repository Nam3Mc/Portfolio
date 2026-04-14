'use client'

import ContractCard from "./ContractCard"
import EmptyState from "./EmptyState"

interface Contract {
  id: string
  status: "pending" | "approved" | "rejected"
  propertyName: string
  propertyAddress: string
  propertyImage: string
  months: number
  startDate: string
  pricePerMonth: number
}

interface Props {
  contracts: Contract[]
  onCancel?: (id: string) => void
  onView?: (id: string) => void
  onRetry?: (id: string) => void
}

export default function ContractsList({
  contracts,
  onCancel,
  onView,
  onRetry
}: Props) {

  // 🔥 orden base por prioridad emocional
  const sorted = [...contracts].sort((a, b) => {
    const order = { pending: 0, approved: 1, rejected: 2 }
    return order[a.status] - order[b.status]
  })

  if (!sorted.length) return <EmptyState />

  // 🔥 agrupar por estado (mejora UX visual brutal)
  const grouped = {
    pending: sorted.filter(c => c.status === "pending"),
    approved: sorted.filter(c => c.status === "approved"),
    rejected: sorted.filter(c => c.status === "rejected")
  }

  return (
    <div className="flex flex-col gap-10">

      {/* 🟡 PENDING */}
      {grouped.pending.length > 0 && (
        <div className="flex flex-col gap-4">
          {grouped.pending.map(contract => (
            <ContractCard
              key={contract.id}
              contract={contract}
              onCancel={onCancel}
              onView={onView}
              onRetry={onRetry}
            />
          ))}
        </div>
      )}

      {/* 🟢 APPROVED */}
      {grouped.approved.length > 0 && (
        <div className="flex flex-col gap-4">
          {grouped.approved.map(contract => (
            <ContractCard
              key={contract.id}
              contract={contract}
              onCancel={onCancel}
              onView={onView}
              onRetry={onRetry}
            />
          ))}
        </div>
      )}

      {/* 🔴 REJECTED */}
      {grouped.rejected.length > 0 && (
        <div className="flex flex-col gap-4 opacity-80">
          {grouped.rejected.map(contract => (
            <ContractCard
              key={contract.id}
              contract={contract}
              onCancel={onCancel}
              onView={onView}
              onRetry={onRetry}
            />
          ))}
        </div>
      )}

    </div>
  )
}