'use client'

import { useState } from "react"
import HeroSearchBar from "@/components/rentafacil/explore/HeroSearchBar"
import PropertyGrid from "@/components/rentafacil/explore/PropertyGrid"
import PropertyDetailModal from "@/components/rentafacil/explore/PropertyDetailModal"
import { Property } from "@/src/rentafacil/interfaces/Property"

// Mock de propiedades
import { properties as allProperties } from "@/src/rentafacil/mocks/properties"

export default function ExplorePage() {
  // 🔹 Filtros
  const [filters, setFilters] = useState({
    address: "",
    availableFrom: "",
    guests: 1,
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
  })

  // 🔹 Propiedades filtradas
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties)

  // 🔹 Propiedad seleccionada para modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  // 🔹 Paginación
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  // 🔹 Función de búsqueda
  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters)

    const results = allProperties.filter(p => {
      // 🔹 Filtrar por dirección
      const matchesAddress = p.address.toLowerCase().includes(newFilters.address.toLowerCase())

      // 🔹 Filtrar por huéspedes
      const matchesGuests = newFilters.guests ? p.guests >= newFilters.guests : true

      // 🔹 Filtrar por fecha de disponibilidad
      const matchesDate = newFilters.availableFrom
        ? new Date(p.availableFrom) <= new Date(newFilters.availableFrom)
        : true

      // 🔹 Filtrar por precio mensual
      const matchesPrice =
        (newFilters.minPrice === undefined || p.price >= newFilters.minPrice) &&
        (newFilters.maxPrice === undefined || p.price <= newFilters.maxPrice)

      return matchesAddress && matchesGuests && matchesDate && matchesPrice
    })

    setFilteredProperties(results)
    setCurrentPage(1)
  }

  // 🔹 Función para seleccionar propiedad
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property)
  }

  // 🔹 Lógica de paginación
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
      <HeroSearchBar
        onSearch={handleSearch}
      />

      {/* Property Grid */}
      <PropertyGrid
        properties={currentProperties}
        onSelectProperty={handleSelectProperty}
      />

      {/* Paginación */}
      {filteredProperties.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-8">
          
          {/* Selector de cantidad por página */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[20, 50, 100, 200].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Botones de navegación */}
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-2 text-sm">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

        </div>
      )}

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

    </div>
  )
}