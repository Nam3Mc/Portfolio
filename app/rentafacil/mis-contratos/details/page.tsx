'use client'

import { useMemo, useState } from "react"

import LeftPanel from "@/components/rentafacil/contract-details/LeftPanel"
import RightPanel from "@/components/rentafacil/contract-details/RightPanel"
import ContractModifyModal from "@/components/rentafacil/contract-details/ContractModifyModal"
import CancelContractModal from "@/components/rentafacil/contract-details/CancelContractModal"

import { messages as allMessages } from "@/src/rentafacil/mocks/messages"
import { contracts as mockContracts } from "@/src/rentafacil/mocks/contracts"
import { properties } from "@/src/rentafacil/mocks/properties"

export default function MisContratosPage() {

  // 🔥 STATE (mock backend)
  const [contracts, setContracts] = useState(mockContracts)

  // 🔥 MODALS STATE
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCancelOpen, setIsCancelOpen] = useState(false)

  // 👉 contrato activo
  const contract = useMemo(() => {
    const first = contracts[0]
    if (!first) return null

    const property = properties.find(p => p.id === first.propertyId)
    if (!property) return null

    const start = new Date(first.startDate)
    const end = new Date(first.endDate)

    return {
      id: first.id,
      propertyId: first.propertyId,
      status: first.status,
      propertyName: property.name,
      propertyAddress: property.address,
      images: property.images,

      months: first.months,
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),

      pricePerMonth: first.pricePerMonth,
      total: first.months * first.pricePerMonth,

      description:
        "Contrato de arrendamiento activo con condiciones estándar de alquiler.",

      amenities: property.amenities
    }
  }, [contracts])

  // 🔥 MENSAJES
  const contractMessages = useMemo(() => {
    if (!contract) return []
    return allMessages.filter(m => m.contractId === contract.id)
  }, [contract])

  const owner = {
    name: "Owner Demo",
    status: "online" as const
  }

  if (!contract) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        No hay contratos disponibles
      </div>
    )
  }

  // 🔥 UPDATE CONTRACT (BACKEND READY)
  const handleUpdateContract = async (data: {
    startDate: string
    months: number
  }) => {

    console.log("PATCH /contracts", {
      contractId: contract.id,
      ...data
    })

    const start = new Date(data.startDate)

    const end = new Date(start)
    end.setMonth(end.getMonth() + data.months)

    setContracts(prev =>
      prev.map(c =>
        c.id === contract.id
          ? {
              ...c,
              startDate: start,
              months: data.months,
              endDate: end
            }
          : c
      )
    )

    setIsModalOpen(false)
  }

  // 🔥 CANCEL CONTRACT (BACKEND READY)
  const handleCancelContract = async (contractId: string) => {

    console.log("POST /contracts/cancel", {
      contractId
    })

    setContracts(prev =>
      prev.map(c =>
        c.id === contractId
          ? {
              ...c,
              status: "rejected"
            }
          : c
      )
    )

    setIsCancelOpen(false)
  }

  return (
    <div className="md:col-span-2 flex items-start justify-center pt-6 overflow-hidden">

      {/* 🟦 LEFT */}
      <div className="md:col-span-1 border-r border-gray-100 overflow-hidden">
        <LeftPanel
          contract={contract}
          onCancel={() => setIsCancelOpen(true)}
          onModify={() => setIsModalOpen(true)}
        />
      </div>

      {/* 🟨 RIGHT */}
      <div className="w-full h-[85vh] max-h-[850px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <RightPanel
          owner={owner}
          messages={contractMessages}
          onSendMessage={(msg) => console.log(msg)}
        />
      </div>

      {/* 💎 MODIFY MODAL */}
      <ContractModifyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contractId={contract.id}
        initialStartDate={contract.startDate}
        initialMonths={contract.months}
        onSuccess={handleUpdateContract}
      />

      {/* 💎 CANCEL MODAL */}
      <CancelContractModal
        isOpen={isCancelOpen}
        contractId={contract.id}
        onClose={() => setIsCancelOpen(false)}
        onConfirm={handleCancelContract}
      />

    </div>
  )
}