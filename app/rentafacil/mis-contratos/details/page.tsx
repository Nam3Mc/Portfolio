'use client'

import { useMemo, useState, useEffect } from "react"
import LeftPanel from "@/components/rentafacil/contract-details/LeftPanel"
import RightPanel from "@/components/rentafacil/contract-details/RightPanel"
import ContractModifyModal from "@/components/rentafacil/contract-details/ContractModifyModal"
import CancelContractModal from "@/components/rentafacil/contract-details/CancelContractModal"
import { messages as allMessages } from "@/src/rentafacil/mocks/messages"
import { contracts as mockContracts } from "@/src/rentafacil/mocks/contracts"
import { properties } from "@/src/rentafacil/mocks/properties"
import { buildContractDetail } from "@/src/rentafacil/services/contractService"

type MobileTab = "details" | "chat"

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  )
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isDesktop
}

export default function MisContratosPage() {
  const [contracts, setContracts] = useState(mockContracts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [mobileTab, setMobileTab] = useState<MobileTab>("details")
  const isDesktop = useIsDesktop()

  const contract = useMemo(
    () => buildContractDetail(contracts[0], properties),
    [contracts]
  )

  const contractMessages = useMemo(
    () => (contract ? allMessages.filter(m => m.contractId === contract.id) : []),
    [contract]
  )

  const owner = { name: "Owner Demo", status: "online" as const }

  const handleUpdateContract = (data: { startDate: string; months: number }) => {
    const start = new Date(data.startDate)
    const end = new Date(start)
    end.setMonth(end.getMonth() + data.months)
    setContracts(prev =>
      prev.map(c =>
        c.id === contract?.id
          ? { ...c, startDate: start, months: data.months, endDate: end }
          : c
      )
    )
    setIsModalOpen(false)
  }

  const handleCancelContract = (contractId: string) => {
    setContracts(prev =>
      prev.map(c => (c.id === contractId ? { ...c, status: "rejected" } : c))
    )
    setIsCancelOpen(false)
  }

  if (!contract) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        No hay contratos disponibles
      </div>
    )
  }

  // ── DESKTOP ────────────────────────────────────────────────────────────────
  // El layout ya empujó el contenido con pt-20 (80px)
  // flex-1 ocupa el resto del espacio disponible en el main
  if (isDesktop) {
    return (
      <>
        <div className="flex-1 flex items-start px-4 pb-4">
          <div
            className="mx-auto w-full max-w-7xl flex overflow-hidden rounded-xl shadow-sm border border-gray-100"
            style={{ height: "calc(100vh - 80px - 32px)" }} // 80px navbar + 32px padding
          >
            {/* LEFT — 1/3 */}
            <div className="w-1/3 h-full border-r border-gray-100 overflow-hidden bg-white">
              <LeftPanel
                contract={contract}
                onCancel={() => setIsCancelOpen(true)}
                onModify={() => setIsModalOpen(true)}
              />
            </div>

            {/* RIGHT — 2/3 */}
            <div className="w-2/3 h-full overflow-hidden bg-white">
              <RightPanel
                owner={owner}
                messages={contractMessages}
                onSendMessage={(msg) => console.log(msg)}
              />
            </div>
          </div>
        </div>

        <ContractModifyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          contractId={contract.id}
          initialStartDate={contract.startDate}
          initialMonths={contract.months}
          onSuccess={handleUpdateContract}
        />
        <CancelContractModal
          isOpen={isCancelOpen}
          contractId={contract.id}
          onClose={() => setIsCancelOpen(false)}
          onConfirm={handleCancelContract}
        />
      </>
    )
  }

  // ── MOBILE ─────────────────────────────────────────────────────────────────
  // El layout ya empujó el contenido con pt-16 (64px)
  // flex-1 ocupa el resto — sin necesidad de calcular navbar
  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TAB BAR */}
        <div className="flex shrink-0 border-b border-gray-200 bg-white">
          {(["details", "chat"] as MobileTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`
                flex-1 py-3 text-sm font-medium transition-colors
                ${mobileTab === tab
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              {tab === "details" ? "Contrato" : "Chat"}
            </button>
          ))}
        </div>

        {/* PANEL ACTIVO */}
        <div className="flex-1 overflow-hidden">
          {mobileTab === "details" ? (
            <LeftPanel
              contract={contract}
              onCancel={() => setIsCancelOpen(true)}
              onModify={() => setIsModalOpen(true)}
            />
          ) : (
            <RightPanel
              owner={owner}
              messages={contractMessages}
              onSendMessage={(msg) => console.log(msg)}
            />
          )}
        </div>
      </div>

      <ContractModifyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contractId={contract.id}
        initialStartDate={contract.startDate}
        initialMonths={contract.months}
        onSuccess={handleUpdateContract}
      />
      <CancelContractModal
        isOpen={isCancelOpen}
        contractId={contract.id}
        onClose={() => setIsCancelOpen(false)}
        onConfirm={handleCancelContract}
      />
    </>
  )
}