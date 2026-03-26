"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { X } from "lucide-react"
import { PropertyType } from "@/src/rentafacil/interfaces/Property"

interface FiltersModalProps {
  filters: {
    address: string
    checkIn: string
    checkOut: string
    guests: number
    type?: PropertyType
    web3Only?: boolean
  }
  onApply: (filters: FiltersModalProps["filters"]) => void
  onClose: () => void
}

export default function FiltersModal({ filters, onApply, onClose }: FiltersModalProps) {

  const [localFilters, setLocalFilters] = useState(filters)

  const handleChange = (field: keyof typeof filters, value: any) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleApply = () => {
    // Validación rápida
    if (localFilters.checkIn && localFilters.checkOut && new Date(localFilters.checkOut) < new Date(localFilters.checkIn)) {
      alert("Departure date must be after arrival date")
      return
    }
    onApply(localFilters)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
          <input
            type="text"
            value={localFilters.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="City, neighborhood, or address"
          />
        </div>

        {/* Arrival & Departure */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Arrival</label>
            <input
              type="date"
              value={localFilters.checkIn}
              onChange={(e) => handleChange("checkIn", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Departure</label>
            <input
              type="date"
              value={localFilters.checkOut}
              onChange={(e) => handleChange("checkOut", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">Guests</label>
          <input
            type="number"
            min={1}
            value={localFilters.guests}
            onChange={(e) => handleChange("guests", Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Property Type */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">Property Type</label>
          <select
            value={localFilters.type || ""}
            onChange={(e) => handleChange("type", e.target.value || undefined)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="loft">Loft</option>
            <option value="penthouse">Penthouse</option>
            <option value="studio">Studio</option>
          </select>
        </div>

        {/* Web3 Verified */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={localFilters.web3Only || false}
            onChange={(e) => handleChange("web3Only", e.target.checked)}
            id="web3-only"
            className="w-4 h-4 accent-indigo-600"
          />
          <label htmlFor="web3-only" className="text-sm text-gray-600">Web3 Verified only</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Apply
          </button>
        </div>

      </div>
    </div>
  )
}