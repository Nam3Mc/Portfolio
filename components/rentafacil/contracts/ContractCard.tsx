'use client'

import ContractStatusBadge from "./ContractStatusBadge"
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

  const totalValue = contract.pricePerMonth * contract.months

  return (
    <div
      className="
        group relative flex flex-col gap-4
        rounded-2xl border border-gray-200/70
        bg-white/80 backdrop-blur-md
        p-5 shadow-sm
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
      "
    >

      {/* 🔥 HEADER: STATUS + ID */}
      <div className="flex items-center justify-between">
        <ContractStatusBadge status={contract.status} />

        <span className="text-xs text-gray-400 font-mono">
          #{contract.id}
        </span>
      </div>

      {/* 🏠 PROPERTY INFO */}
      <div className="flex items-start gap-3">
        <img
          src={contract.propertyImage}
          alt={contract.propertyName}
          className="w-14 h-14 rounded-xl object-cover"
        />

        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-gray-900">
            {contract.propertyName}
          </h3>
          <p className="text-sm text-gray-500">
            {contract.propertyAddress}
          </p>
        </div>
      </div>

      {/* 💰 METRICS GRID */}
      <div className="grid grid-cols-3 gap-3 pt-2">

        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500">Duration</p>
          <p className="text-sm font-semibold text-gray-900">
            {contract.months} mo
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500">Monthly</p>
          <p className="text-sm font-semibold text-gray-900">
            ${contract.pricePerMonth}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-sm font-semibold text-indigo-600">
            ${totalValue}
          </p>
        </div>

      </div>

      {/* 📅 TIMELINE */}
      <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
        <span>Start: {contract.startDate}</span>
        <span className="text-gray-400">•</span>
        <span>Active contract</span>
      </div>

      {/* ⚡ ACTIONS */}
      <ContractActions
        status={contract.status}
        onCancel={() => onCancel?.(contract.id)}
        onView={() => onView?.(contract.id)}
        onRetry={() => onRetry?.(contract.id)}
      />
    </div>
  )
}