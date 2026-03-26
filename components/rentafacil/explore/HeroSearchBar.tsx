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
    <div className="w-full bg-white rounded-3xl shadow-xl p-6 flex flex-col md:flex-row md:items-center gap-4 transition-all hover:shadow-2xl">

      {/* Location */}
      <div className="flex items-center gap-3 px-4 py-3 flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 transition">
        <MapPin size={20} className="text-indigo-500"/>
        <input
          type="text"
          placeholder="City, neighborhood, or address"
          className="w-full outline-none text-sm font-medium bg-transparent placeholder-gray-400"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Location"
        />
      </div>

      {/* Available From */}
      <div className="flex items-center gap-3 px-4 py-3 w-full md:w-auto bg-gray-50 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 transition">
        <Calendar size={20} className="text-indigo-500"/>
        <input
          type="date"
          className="text-sm font-medium outline-none w-full bg-transparent placeholder-gray-400"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Available from"
        />
      </div>

      {/* Max Price */}
      <div className="flex items-center gap-3 px-4 py-3 w-full md:w-auto bg-gray-50 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 transition">
        <input
          type="number"
          min={0}
          placeholder="Max $"
          className="w-full md:w-28 text-sm font-medium outline-none bg-transparent placeholder-gray-400"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
          onKeyDown={handleKeyDown}
          aria-label="Maximum price"
        />
      </div>

      {/* Search Button */}
      <div className="flex flex-col items-center gap-1 w-full md:w-auto">
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-2xl hover:scale-105 hover:from-indigo-700 hover:to-violet-700 transition shadow-lg w-full md:w-auto font-semibold"
          aria-label="Search properties"
        >
          <Search size={18}/> Search
        </button>
        <span className="text-xs text-indigo-600 mt-1 font-medium">Web3 Rentals</span>
      </div>

    </div>
  )
}