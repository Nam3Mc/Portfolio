// 'use client'

// import { useMemo, useState } from "react"

// import LeftPanel from "@/components/rentafacil/contract-details/LeftPanel"
// import RightPanel from "@/components/rentafacil/contract-details/RightPanel"
// import ContractModifyModal from "@/components/rentafacil/contract-details/ContractModifyModal"
// import CancelContractModal from "@/components/rentafacil/contract-details/CancelContractModal"

// import { messages as allMessages } from "@/src/rentafacil/mocks/messages"
// import { contracts as mockContracts } from "@/src/rentafacil/mocks/contracts"
// import { properties } from "@/src/rentafacil/mocks/properties"

// export default function MisContratosPage() {

//   const [contracts, setContracts] = useState(mockContracts)

//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [isCancelOpen, setIsCancelOpen] = useState(false)

//   const contract = useMemo(() => {
//     const first = contracts[0]
//     if (!first) return null

//     const property = properties.find(p => p.id === first.propertyId)
//     if (!property) return null

//     const start = new Date(first.startDate)
//     const end = new Date(first.endDate)

//     return {
//       id: first.id,
//       propertyId: first.propertyId,
//       status: first.status,
//       propertyName: property.name,
//       propertyAddress: property.address,
//       images: property.images,
//       months: first.months,
//       startDate: start.toISOString().slice(0, 10),
//       endDate: end.toISOString().slice(0, 10),
//       pricePerMonth: first.pricePerMonth,
//       total: first.months * first.pricePerMonth,
//       description: "Contrato de arrendamiento activo con condiciones estándar.",
//       amenities: property.amenities
//     }
//   }, [contracts])

//   const contractMessages = useMemo(() => {
//     if (!contract) return []
//     return allMessages.filter(m => m.contractId === contract.id)
//   }, [contract])

//   const owner = {
//     name: "Owner Demo",
//     status: "online" as const
//   }

//   if (!contract) {
//     return (
//       <div className="h-screen flex items-center justify-center text-gray-400">
//         No hay contratos disponibles
//       </div>
//     )
//   }

//   const handleUpdateContract = async (data: {
//     startDate: string
//     months: number
//   }) => {

//     const start = new Date(data.startDate)
//     const end = new Date(start)
//     end.setMonth(end.getMonth() + data.months)

//     setContracts(prev =>
//       prev.map(c =>
//         c.id === contract.id
//           ? {
//               ...c,
//               startDate: start,
//               months: data.months,
//               endDate: end
//             }
//           : c
//       )
//     )

//     setIsModalOpen(false)
//   }

//   const handleCancelContract = async (contractId: string) => {

//     setContracts(prev =>
//       prev.map(c =>
//         c.id === contractId
//           ? { ...c, status: "rejected" }
//           : c
//       )
//     )

//     setIsCancelOpen(false)
//   }

//   return (
//     <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-3 bg-gray-50">

//       {/* LEFT (desktop only) */}
//       <div className="
//         hidden lg:block
//         h-screen
//         border-r border-gray-100
//         bg-white
//         overflow-hidden
//       ">
//         <LeftPanel
//           contract={contract}
//           onCancel={() => setIsCancelOpen(true)}
//           onModify={() => setIsModalOpen(true)}
//         />
//       </div>

//       {/* RIGHT (mobile + desktop main) */}
//       <div className="h-screen bg-white">
//         <RightPanel
//           owner={owner}
//           messages={contractMessages}
//           onSendMessage={(msg) => console.log(msg)}
//         />
//       </div>

//       {/* MODALS */}
//       <ContractModifyModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         contractId={contract.id}
//         initialStartDate={contract.startDate}
//         initialMonths={contract.months}
//         onSuccess={handleUpdateContract}
//       />

//       <CancelContractModal
//         isOpen={isCancelOpen}
//         contractId={contract.id}
//         onClose={() => setIsCancelOpen(false)}
//         onConfirm={handleCancelContract}
//       />

//     </div>
//   )
// }


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

const NAV_MOBILE = 64
const NAV_DESKTOP = 80

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

  // ✅ Fuerza scroll al top al montar — evita que el browser restaure
  // la posición de scroll de la página anterior
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

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
  if (isDesktop) {
    return (
      <>
        <div
          className="mx-auto w-full max-w-7xl flex overflow-hidden rounded-xl shadow-sm border border-gray-100"
          style={{
            marginTop: `${NAV_DESKTOP + 16}px`,
            height: `calc(100vh - ${NAV_DESKTOP + 32}px)`,
          }}
        >
          <div className="w-1/3 h-full border-r border-gray-100 overflow-hidden bg-white">
            <LeftPanel
              contract={contract}
              onCancel={() => setIsCancelOpen(true)}
              onModify={() => setIsModalOpen(true)}
            />
          </div>
          <div className="w-2/3 h-full overflow-hidden bg-white">
            <RightPanel
              owner={owner}
              messages={contractMessages}
              onSendMessage={(msg) => console.log(msg)}
            />
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
  return (
    <>
      <div
        className="flex flex-col w-full overflow-hidden"
        style={{ paddingTop: `${NAV_MOBILE}px`, height: "100vh" }}
      >
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


// ✅ Desactiva la restauración de scroll de Next.js para esta página
export const dynamic = 'force-dynamic'