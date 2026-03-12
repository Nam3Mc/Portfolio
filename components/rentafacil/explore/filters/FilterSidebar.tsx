"use client"

import { useState } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { FilterSidebarProps } from "@/src/rentafacil/interfaces/FilterSidebarProps"

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {

  const [localFilters, setLocalFilters] = useState(filters)
  const [open, setOpen] = useState(false)

  const updateFilter = (key: string, value: any) => {
    const updated = { ...localFilters, [key]: value }
    setLocalFilters(updated)
    onFilterChange(updated)
  }

  const clearFilters = () => {
    const reset = {}
    setLocalFilters(reset)
    onFilterChange(reset)
  }

  const FiltersContent = (

    <div className="flex flex-col gap-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-gray-500"/>
          <h2 className="text-lg font-semibold">
            Filters
          </h2>
        </div>

        <button
          onClick={clearFilters}
          className="text-xs text-indigo-600 hover:underline"
        >
          Clear
        </button>

      </div>

      {/* PRICE RANGE */}
      <div className="flex flex-col gap-3">

        <label className="text-sm font-medium text-gray-700">
          Price Range
        </label>

        <div className="flex gap-2">

          <input
            type="number"
            placeholder="Min"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e)=>updateFilter("minPrice", Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Max"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e)=>updateFilter("maxPrice", Number(e.target.value))}
          />

        </div>

      </div>

      {/* PROPERTY TYPE */}
      <div className="flex flex-col gap-3">

        <label className="text-sm font-medium text-gray-700">
          Property Type
        </label>

        <select
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e)=>updateFilter("type", e.target.value)}
        >
          <option value="">All</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="loft">Loft</option>
          <option value="penthouse">Penthouse</option>
        </select>

      </div>

      {/* GUESTS */}
      <div className="flex flex-col gap-3">

        <label className="text-sm font-medium text-gray-700">
          Guests
        </label>

        <input
          type="number"
          min={1}
          placeholder="Guests"
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e)=>updateFilter("guests", Number(e.target.value))}
        />

      </div>

      {/* AMENITIES */}
      <div className="flex flex-col gap-3">

        <label className="text-sm font-medium text-gray-700">
          Amenities
        </label>

        <div className="flex flex-col gap-2 text-sm text-gray-600">

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" onChange={(e)=>updateFilter("wifi", e.target.checked)}/>
            Wifi
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" onChange={(e)=>updateFilter("pool", e.target.checked)}/>
            Pool
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" onChange={(e)=>updateFilter("parking", e.target.checked)}/>
            Parking
          </label>

        </div>

      </div>

      {/* NFT FILTER */}
      <div className="flex items-center justify-between border-t pt-4">

        <label className="text-sm font-medium text-gray-700">
          NFT Properties
        </label>

        <input
          type="checkbox"
          onChange={(e)=>updateFilter("nftOnly", e.target.checked)}
        />

      </div>

      {/* BLOCKCHAIN */}
      <div className="flex flex-col gap-3">

        <label className="text-sm font-medium text-gray-700">
          Blockchain
        </label>

        <select
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e)=>updateFilter("blockchain", e.target.value)}
        >
          <option value="">All</option>
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="arbitrum">Arbitrum</option>
        </select>

      </div>

    </div>

  )

  return (

    <>

      {/* MOBILE BUTTON */}
      <button
        onClick={()=>setOpen(true)}
        className="md:hidden flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl bg-white shadow-sm"
      >
        <SlidersHorizontal size={16}/>
        Filters
      </button>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-full max-w-xs bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex-col gap-8 sticky top-28 h-fit">
        {FiltersContent}
      </aside>

      {/* MOBILE DRAWER */}
      {open && (

        <div className="fixed inset-0 z-50 flex">

          {/* BACKDROP */}
          <div
            onClick={()=>setOpen(false)}
            className="flex-1 bg-black/40"
          />

          {/* PANEL */}
          <div className="w-[80%] max-w-sm bg-white h-full p-6 overflow-y-auto shadow-xl flex flex-col gap-8">

            <div className="flex items-center justify-between">

              <h2 className="font-semibold text-lg">
                Filters
              </h2>

              <button onClick={()=>setOpen(false)}>
                <X size={20}/>
              </button>

            </div>

            {FiltersContent}

          </div>

        </div>

      )}

    </>

  )
}