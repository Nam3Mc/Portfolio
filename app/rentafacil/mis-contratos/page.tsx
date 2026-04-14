'use client'

import { useState, useMemo } from "react"
import FilterTabs from "@/components/rentafacil/contracts/FilterTabs"
import ContractsList from "@/components/rentafacil/contracts/ContractsList"

import { contracts } from "@/src/rentafacil/mocks/contracts"
import { properties } from "@/src/rentafacil/mocks/properties"

interface ContractUI {
  id: string
  status: "pending" | "approved" | "rejected"
  propertyName: string
  propertyAddress: string
  propertyImage: string
  months: number
  startDate: string
  pricePerMonth: number
}

export default function MisContratosPage() {

  const [filter, setFilter] =
    useState<"all" | "pending" | "approved" | "rejected">("all")

  const contractsUI: ContractUI[] = useMemo(() => {
    return contracts.map(contract => {
      const property = properties.find(p => p.id === contract.propertyId)!

      return {
        id: contract.id,
        status: contract.status,
        propertyName: property.name,
        propertyAddress: property.address,
        propertyImage: property.images[0],
        months: contract.months,
        startDate: contract.startDate.toISOString(),
        pricePerMonth: contract.pricePerMonth
      }
    })
  }, [])

  const filteredContracts = useMemo(() => {
    if (filter === "all") return contractsUI
    return contractsUI.filter(c => c.status === filter)
  }, [filter, contractsUI])

  return (
    <div className="min-h-screen bg-white">

      {/* 🧠 HEADER MINIMAL */}
      <div className="max-w-4xl mx-auto px-6 pt-14 pb-6">

        <h1 className="text-xl font-semibold text-gray-900">
          Mis contratos
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Gestiona tus alquileres y solicitudes activas
        </p>

        {/* 🔘 FILTERS (clean spacing) */}
        <div className="mt-6">
          <FilterTabs current={filter} onChange={setFilter} />
        </div>

      </div>

      {/* 📄 FEED */}
      <div className="max-w-4xl mx-auto px-6 pb-20">

        <ContractsList contracts={filteredContracts} />

      </div>

    </div>
  )
}