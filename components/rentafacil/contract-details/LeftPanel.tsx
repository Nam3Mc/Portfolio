// 'use client'

// import ImageCarousel from "./left/ImageCarousel"
// import PropertyHeader from "./left/PropertyHeader"
// import ContractMetrics from "./left/ContractMetrics"
// import PriceBlock from "./left/PriceBlock"
// import DescriptionBlock from "./left/DescriptionBlock"
// import AmenitiesList from "./left/AmenitiesList"
// import ContractActions from "./left/ContractActions"

// interface ContractDetail {
//   id: string
//   propertyName: string
//   propertyAddress: string
//   images: string[]
//   months: number
//   startDate: string
//   endDate: string
//   pricePerMonth: number
//   total: number
//   description: string
//   amenities: string[]
// }

// interface Props {
//   contract: ContractDetail
//   onCancel?: () => void
//   onModify?: () => void
// }

// export default function LeftPanel({
//   contract,
//   onCancel,
//   onModify
// }: Props) {

//   return (
//     <div className="
//       w-full h-full
//       flex flex-col
//       bg-white
//       overflow-hidden
//     ">

//       {/* 🖼️ HERO IMAGE */}
//       <div className="shrink-0">
//         <ImageCarousel images={contract.images} />
//       </div>

//       {/* 📦 SCROLL AREA */}
//       <div className="
//         flex-1
//         overflow-y-auto
//         px-4 sm:px-5
//         py-4 sm:py-5
//         flex flex-col
//         gap-6
//       ">

//         {/* 🏠 HEADER */}
//         <PropertyHeader
//           name={contract.propertyName}
//           address={contract.propertyAddress}
//         />

//         {/* 📊 METRICS */}
//         <ContractMetrics
//           months={contract.months}
//           startDate={contract.startDate}
//           endDate={contract.endDate}
//         />

//         {/* 💰 PRICE */}
//         <PriceBlock
//           monthly={contract.pricePerMonth}
//           total={contract.total}
//         />

//         {/* 📝 DESCRIPTION */}
//         <DescriptionBlock
//           description={contract.description}
//         />

//         {/* 🧩 AMENITIES */}
//         <AmenitiesList
//           amenities={contract.amenities}
//         />

//         {/* ⚡ ACTIONS (sticky on mobile feel optional) */}
//         <div className="pt-2">
//           <ContractActions
//             onCancel={onCancel}
//             onModify={onModify}
//           />
//         </div>

//       </div>
//     </div>
//   )
// }

'use client'

import ImageCarousel from "./left/ImageCarousel"
import PropertyHeader from "./left/PropertyHeader"
import ContractMetrics from "./left/ContractMetrics"
import PriceBlock from "./left/PriceBlock"
import DescriptionBlock from "./left/DescriptionBlock"
import AmenitiesList from "./left/AmenitiesList"
import ContractActions from "./left/ContractActions"
import { ContractDetail } from "@/src/rentafacil/services/contractService"

interface Props {
  contract: ContractDetail
  onCancel?: () => void
  onModify?: () => void
  onPay?: () => void
}

export default function LeftPanel({ contract, onCancel, onModify, onPay }: Props) {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">

      {/* HERO IMAGE */}
      <div className="shrink-0">
        <ImageCarousel images={contract.images} />
      </div>

      {/* SCROLL AREA — ocupa el espacio entre imagen y botones */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">

        <PropertyHeader
          name={contract.propertyName}
          address={contract.propertyAddress}
        />

        <ContractMetrics
          months={contract.months}
          startDate={contract.startDate}
          endDate={contract.endDate}
        />

        <PriceBlock
          monthly={contract.pricePerMonth}
          total={contract.total}
        />

        <DescriptionBlock description={contract.description} />

        <AmenitiesList amenities={contract.amenities} />

      </div>

      {/* ACTIONS — fijas al fondo, fuera del scroll */}
      <div className="shrink-0 px-5 py-4 border-t border-gray-100 bg-white">
        <ContractActions
          status={contract.status as any}
          onCancel={onCancel}
          onModify={onModify}
          onPay={onPay}
        />
      </div>

    </div>
  )
}