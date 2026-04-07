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

  // 🔥 Ordenar por prioridad: pending -> approved -> rejected
  const sorted = [...contracts].sort((a, b) => {
    const order = { pending: 0, approved: 1, rejected: 2 }
    return order[a.status] - order[b.status]
  })

  // 🧊 Empty state
  if (!sorted.length) return <EmptyState />

  return (
    <div className="flex flex-col gap-4">
      {sorted.map(contract => (
        <ContractCard
          key={contract.id}
          contract={contract}
          onCancel={onCancel}
          onView={onView}
          onRetry={onRetry}
        />
      ))}
    </div>
  )
}