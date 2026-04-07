'use client'

import { useState, useMemo } from "react"
import HeaderSection from "@/components/rentafacil/contracts/HeaderSection"
import FilterTabs from "@/components/rentafacil/contracts/FilterTabs"
import ContractsList from "@/components/rentafacil/contracts/ContractsList"

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

const MOCK_CONTRACTS: Contract[] = [
  // {
    // id: "1",
    // status: "pending",
    // propertyName: "Apartamento Centro",
    // propertyAddress: "Calle 100 #12-34, Bogotá",
    // propertyImage: "/images/apto1.jpg",
    // months: 12,
    // startDate: "2026-05-01",
    // pricePerMonth: 1500000
  // },
  // {
    // id: "2",
    // status: "approved",
    // propertyName: "Loft Chicó",
    // propertyAddress: "Carrera 11 #93-21, Bogotá",
    // propertyImage: "/images/loft1.jpg",
    // months: 6,
    // startDate: "2026-06-01",
    // pricePerMonth: 2500000
  // },
  // {
    // id: "3",
    // status: "rejected",
    // propertyName: "Apartamento Cedritos",
    // propertyAddress: "Calle 140 #7-89, Bogotá",
    // propertyImage: "/images/apto2.jpg",
    // months: 12,
    // startDate: "2026-04-15",
    // pricePerMonth: 1200000
  // }
]

export default function MisContratosPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")

  // 🔹 Filtrar contratos según tab
  const filteredContracts = useMemo(() => {
    if (filter === "all") return MOCK_CONTRACTS
    return MOCK_CONTRACTS.filter(c => c.status === filter)
  }, [filter])

  // 🔹 Stats
  const stats = useMemo(() => {
    const total = MOCK_CONTRACTS.length
    const pending = MOCK_CONTRACTS.filter(c => c.status === "pending").length
    const approved = MOCK_CONTRACTS.filter(c => c.status === "approved").length
    const rejected = MOCK_CONTRACTS.filter(c => c.status === "rejected").length
    return { total, pending, approved, rejected }
  }, [])

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-sm rounded-2xl">

      {/* 🧾 Header + Stats */}
      <HeaderSection
        total={stats.total}
        pending={stats.pending}
        approved={stats.approved}
        rejected={stats.rejected}
      />

      {/* 🔘 Tabs */}
      <div className="mt-6">
        <FilterTabs current={filter} onChange={setFilter} />
      </div>

      {/* 📄 Lista de contratos */}
      <div className="mt-6">
        <ContractsList contracts={filteredContracts} />
      </div>

    </div>
  )
}