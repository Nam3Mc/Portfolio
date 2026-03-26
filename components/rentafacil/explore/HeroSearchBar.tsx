'use client'

import { useState } from "react"
import { MapPin, Calendar, Search } from "lucide-react"

interface HeroSearchBarProps {
  onSearch: (filters: {
    address: string
    availableFrom: string
    maxPrice?: number
  }) => void
}

export default function HeroSearchBar({ onSearch }: HeroSearchBarProps) {
  const [address, setAddress] = useState("")
  const [availableFrom, setAvailableFrom] = useState("")
  const [maxPrice, setMaxPrice] = useState<number | "">("")

  const handleSearch = () => {
    if (availableFrom && new Date(availableFrom) < new Date(new Date().toDateString())) {
      alert("Available from date cannot be in the past")
      return
    }

    onSearch({
      address: address.trim().toLowerCase(),
      availableFrom,
      maxPrice: maxPrice === "" ? undefined : Number(maxPrice),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col md:flex-row md:items-center gap-3">

      {/* Location */}
      <div className="flex items-center gap-3 px-3 py-2 flex-1">
        <MapPin size={18} className="text-gray-400"/>
        <input
          type="text"
          placeholder="City, neighborhood, or address"
          className="w-full outline-none text-sm font-medium"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Location"
        />
      </div>

      {/* Available From */}
      <div className="flex items-center gap-3 px-3 py-2 w-full md:w-auto md:border-r border-gray-200">
        <Calendar size={18} className="text-gray-400"/>
        <input
          type="date"
          className="text-sm font-medium outline-none w-full"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Available from"
        />
      </div>

      {/* Max Price */}
      <div className="flex items-center gap-3 px-3 py-2 w-full md:w-auto">
        <input
          type="number"
          min={0}
          placeholder="Max $"
          className="w-full md:w-24 text-sm font-medium outline-none border border-gray-300 rounded-lg px-2 py-1 focus:ring-1 focus:ring-indigo-500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
          onKeyDown={handleKeyDown}
          aria-label="Maximum price"
        />
      </div>

      {/* Search Button + Web3 */}
      <div className="flex flex-col items-center gap-1 w-full md:w-auto">
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-sm w-full md:w-auto"
          aria-label="Search properties"
        >
          <Search size={16}/> Search
        </button>
        <span className="text-xs text-indigo-700 mt-1">Web3 Rentals</span>
      </div>

    </div>
  )
}