'use client'

import ContractStatusBadge from "./ContractStatusBadge"
import ContractInfo from "./ContractInfo"
import ContractMeta from "./ContractMeta"
import ContractActions from "./ContractActions"

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
  contract: Contract
  onCancel?: (id: string) => void
  onView?: (id: string) => void
  onRetry?: (id: string) => void
}

export default function ContractCard({
  contract,
  onCancel,
  onView,
  onRetry
}: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-4 hover:shadow-md transition">

      {/* Top: Info + Status */}
      <div className="flex justify-between items-start gap-3">
        <ContractInfo
          name={contract.propertyName}
          address={contract.propertyAddress}
          image={contract.propertyImage}
        />
        <ContractStatusBadge status={contract.status} />
      </div>

      {/* Meta */}
      <ContractMeta
        months={contract.months}
        startDate={contract.startDate}
        pricePerMonth={contract.pricePerMonth}
      />

      {/* Actions */}
      <ContractActions
        status={contract.status}
        onCancel={() => onCancel?.(contract.id)}
        onView={() => onView?.(contract.id)}
        onRetry={() => onRetry?.(contract.id)}
      />

    </div>
  )
}