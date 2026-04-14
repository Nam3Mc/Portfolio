'use client'

import ImageCarousel from "./left/ImageCarousel"
import PropertyHeader from "./left/PropertyHeader"
import ContractMetrics from "./left/ContractMetrics"
import PriceBlock from "./left/PriceBlock"
import DescriptionBlock from "./left/DescriptionBlock"
import AmenitiesList from "./left/AmenitiesList"
import ContractActions from "./left/ContractActions"

interface ContractDetail {
  id: string
  propertyName: string
  propertyAddress: string
  images: string[]
  months: number
  startDate: string
  endDate: string
  pricePerMonth: number
  total: number
  description: string
  amenities: string[]
}

interface Props {
  contract: ContractDetail
  onCancel?: () => void
  onModify?: () => void
}

export default function LeftPanel({
  contract,
  onCancel,
  onModify
}: Props) {

  return (
    <div className="
      w-full h-full
      flex flex-col
      bg-white
      overflow-y-auto
      scrollbar-thin scrollbar-thumb-gray-200
    ">

      {/* 🖼️ HERO IMAGE CAROUSEL */}
      <ImageCarousel images={contract.images} />

      {/* 📦 CONTENT */}
      <div className="p-5 flex flex-col gap-6">

        {/* 🏠 PROPERTY IDENTITY */}
        <PropertyHeader
          name={contract.propertyName}
          address={contract.propertyAddress}
        />

        {/* 📊 METRICS */}
        <ContractMetrics
          months={contract.months}
          startDate={contract.startDate}
          endDate={contract.endDate}
        />

        {/* 💰 PRICE BLOCK */}
        <PriceBlock
          monthly={contract.pricePerMonth}
          total={contract.total}
        />

        {/* 📝 DESCRIPTION */}
        <DescriptionBlock
          description={contract.description}
        />

        {/* 🧩 AMENITIES */}
        <AmenitiesList
          amenities={contract.amenities}
        />

        {/* ⚡ ACTIONS */}
        <div className="pt-2">
          <ContractActions
            onCancel={onCancel}
            onModify={onModify}
          />
        </div>

      </div>
    </div>
  )
}