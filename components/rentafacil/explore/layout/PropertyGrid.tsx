"use client"

import PropertyCard from "../cards/PropertyCard"
import { PropertyGridProps } from "@/src/rentafacil/interfaces/PropertyGridProps"
import { SearchX } from "lucide-react"

export default function PropertyGrid({
  properties,
  onSelectProperty
}: PropertyGridProps) {

  if (!properties.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4 text-gray-500">

        <SearchX size={40} className="opacity-60"/>

        <h3 className="text-lg font-semibold">
          No properties found
        </h3>

        <p className="text-sm max-w-sm">
          Try adjusting your filters or searching in another address.
        </p>

      </div>
    )
  }

  return (

    <div
      className="
      grid
      gap-8
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      "
    >

      {properties.map((property) => (

        <div
          key={property.id}
          className="transition-transform duration-200 hover:scale-[1.02]"
        >

          <PropertyCard
            property={property}
            onSelect={onSelectProperty}
          />

        </div>

      ))}

    </div>

  )
}