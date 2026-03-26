'use client'

import { useState } from "react"
import HeroSearchBar from "@/components/rentafacil/explore/HeroSearchBar"
import PropertyGrid from "@/components/rentafacil/explore/PropertyGrid"
import PropertyDetailModal from "@/components/rentafacil/explore/PropertyDetailModal"
import Pagination from "@/components/rentafacil/property/Pagination"
import { Property } from "@/src/rentafacil/interfaces/Property"

// Mock de propiedades
import { properties as allProperties } from "@/src/rentafacil/mocks/properties"

export default function ExplorePage() {
  const [filters, setFilters] = useState({
    address: "",
    availableFrom: "",
    guests: 1,
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
  })

  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  // Paginación
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  // Función de búsqueda
  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters)
    const results = allProperties.filter(p => {
      const matchesAddress = p.address.toLowerCase().includes(newFilters.address.toLowerCase())
      const matchesGuests = newFilters.guests ? p.guests >= newFilters.guests : true
      const matchesDate = newFilters.availableFrom
        ? new Date(p.availableFrom) <= new Date(newFilters.availableFrom)
        : true
      const matchesPrice =
        (newFilters.minPrice === undefined || p.price >= newFilters.minPrice) &&
        (newFilters.maxPrice === undefined || p.price <= newFilters.maxPrice)
      return matchesAddress && matchesGuests && matchesDate && matchesPrice
    })
    setFilteredProperties(results)
    setCurrentPage(1)
  }

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property)
  }

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage)
  }

  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto py-10 px-4 flex flex-col gap-10">
      {/* Hero Search Bar */}
      <HeroSearchBar onSearch={handleSearch} />

      {/* Property Grid */}
      <PropertyGrid properties={currentProperties} onSelectProperty={handleSelectProperty} />

      {/* Componente de Paginación */}
      {filteredProperties.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </div>
  )
}