"use client"

import { useState } from "react"
import { MapPin, Calendar, Users, Search, Cpu } from "lucide-react"

export default function HeroSearchBar() {

  const [address, setaddress] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)

  const handleSearch = () => {

    const params = new URLSearchParams()

    const normalizedaddress = address.trim()

    if (normalizedaddress) {
      params.set("address", normalizedaddress)
    }

    if (checkIn) {
      params.set("checkIn", checkIn)
    }

    if (checkOut) {
      params.set("checkOut", checkOut)
    }

    if (guests && guests > 0) {
      params.set("guests", guests.toString())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (

    <div
      className="
      w-full
      bg-white
      border border-gray-200
      rounded-2xl
      shadow-sm
      hover:shadow-md
      transition
      p-4
      flex
      flex-col
      md:flex-row
      md:items-center
      gap-3
      "
    >

      {/* address */}
      <div
        className="
        flex items-center gap-3
        px-3 py-2
        w-full
        md:flex-1
        md:border-r
        border-gray-200
        "
      >

        <MapPin size={18} className="text-gray-400"/>

        <div className="flex flex-col w-full">

          <span className="text-xs text-gray-400">
            address
          </span>

          <input
            type="text"
            placeholder="Where are you going?"
            className="w-full outline-none text-sm font-medium"
            value={address}
            onChange={(e)=>setaddress(e.target.value)}
            onKeyDown={handleKeyDown}
          />

        </div>

      </div>

      {/* CHECKIN */}
      <div
        className="
        flex items-center gap-3
        px-3 py-2
        w-full
        md:w-auto
        md:border-r
        border-gray-200
        "
      >

        <Calendar size={18} className="text-gray-400"/>

        <div className="flex flex-col w-full">

          <span className="text-xs text-gray-400">
            Check in
          </span>

          <input
            type="date"
            className="text-sm font-medium outline-none w-full"
            value={checkIn}
            onChange={(e)=>setCheckIn(e.target.value)}
          />

        </div>

      </div>

      {/* CHECKOUT */}
      <div
        className="
        flex items-center gap-3
        px-3 py-2
        w-full
        md:w-auto
        md:border-r
        border-gray-200
        "
      >

        <Calendar size={18} className="text-gray-400"/>

        <div className="flex flex-col w-full">

          <span className="text-xs text-gray-400">
            Check out
          </span>

          <input
            type="date"
            className="text-sm font-medium outline-none w-full"
            value={checkOut}
            onChange={(e)=>setCheckOut(e.target.value)}
          />

        </div>

      </div>

      {/* GUESTS */}
      <div
        className="
        flex items-center gap-3
        px-3 py-2
        w-full
        md:w-auto
        "
      >

        <Users size={18} className="text-gray-400"/>

        <div className="flex flex-col w-full">

          <span className="text-xs text-gray-400">
            Guests
          </span>

          <input
            type="number"
            min={1}
            className="w-full md:w-20 text-sm font-medium outline-none"
            value={guests}
            onChange={(e)=>setGuests(Number(e.target.value))}
            onKeyDown={handleKeyDown}
          />

        </div>

      </div>

      {/* SEARCH BUTTON */}
      <button
        onClick={handleSearch}
        className="
        flex items-center justify-center gap-2
        bg-indigo-600 text-white
        px-6 py-3
        rounded-xl
        hover:bg-indigo-700
        transition
        shadow-sm
        w-full
        md:w-auto
        "
      >

        <Search size={16}/>

        Search

      </button>

      {/* WEB3 BADGE */}
      <div
        className="
        flex items-center justify-center gap-2
        text-xs
        bg-indigo-50
        text-indigo-700
        px-3 py-1
        rounded-full
        w-full
        md:w-auto
        "
      >

        <Cpu size={14}/>

        Web3 Rentals

      </div>

    </div>

  )
}