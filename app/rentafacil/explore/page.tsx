"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

import PropertyGrid from "@/components/rentafacil/explore/layout/PropertyGrid"
import PropertyDetailModal from "@/components/rentafacil/explore/modal/PropertyDetailModal"
import FilterSidebar from "@/components/rentafacil/explore/filters/FilterSidebar"
import HeroSearchBar from "@/components/rentafacil/explore/search/HeroSearchBar"

import { PropertyWeb3 } from "@/src/rentafacil/interfaces/propertyWeb3"
import { properties } from "@/src/rentafacil/mocks/properties"

type Filters = {
  city?: string
  minPrice?: number
  maxPrice?: number
  guests?: number
  type?: string
  wifi?: boolean
  pool?: boolean
  parking?: boolean
  nftOnly?: boolean
  blockchain?: "ethereum" | "polygon" | "arbitrum"
}

export default function ExplorePage() {

  const searchParams = useSearchParams()

  const city = searchParams.get("address") || undefined
  const guestsParam = searchParams.get("guests")

  const guests = guestsParam ? Number(guestsParam) : undefined

  const [selectedProperty, setSelectedProperty] = useState<PropertyWeb3 | null>(null)

  const [filters, setFilters] = useState<Filters>({
    city,
    guests
  })

  const filteredProperties = (properties as PropertyWeb3[]).filter((property) => {

    if (filters.city) {
      if (!property.address.toLowerCase().includes(filters.city.toLowerCase())) {
        return false
      }
    }

    if (filters.minPrice !== undefined && property.pricePerNight < filters.minPrice) {
      return false
    }

    if (filters.maxPrice !== undefined && property.pricePerNight > filters.maxPrice) {
      return false
    }

    if (filters.guests !== undefined && property.maxGuests < filters.guests) {
      return false
    }

    if (filters.type && property.type !== filters.type) {
      return false
    }

    if (filters.wifi && !property.amenities.includes("wifi")) {
      return false
    }

    if (filters.pool && !property.amenities.includes("pool")) {
      return false
    }

    if (filters.parking && !property.amenities.includes("parking")) {
      return false
    }

    if (filters.nftOnly && !property.tokenized) {
      return false
    }

    if (filters.blockchain && property.blockchain !== filters.blockchain) {
      return false
    }

    return true
  })

  return (

    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 flex flex-col gap-8 md:gap-10">

      {/* PAGE TITLE */}
      <div className="flex flex-col gap-2">

        <h1 className="text-2xl md:text-3xl font-bold">
          Explore Properties
        </h1>

        <p className="text-gray-500 text-sm md:text-base">
          Discover luxury stays and tokenized real estate.
        </p>

      </div>

      {/* HERO SEARCH BAR */}
      <HeroSearchBar />

      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden">
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* FILTER SIDEBAR DESKTOP */}
        <div className="hidden md:block md:col-span-3">

          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
          />

        </div>

        {/* PROPERTY GRID */}
        <div className="md:col-span-9">

          <PropertyGrid
            properties={filteredProperties}
            onSelectProperty={setSelectedProperty}
          />

        </div>

      </div>

      {/* PROPERTY MODAL */}
      {selectedProperty && (

        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />

      )}

    </div>
  )
}