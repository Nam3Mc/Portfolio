"use client"

import { useState } from "react"
import { Property } from "@/src/rentafacil/interfaces/Property"
import { useAccount, useConnect } from "wagmi"
import { useAuth } from "@/src/rentafacil/auth/AuthContext"
import BookingCalendar from "./BookingCalendar"

interface Props {
  property: Property
}

export default function PropertyBooking({ property }: Props) {

  const { user } = useAuth()
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()

  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)

  const pricePerNight = property.pricePerNight

  // ✅ Formato correcto de moneda (COP + 2 decimales)
  const formatCOP = (value: number) =>
    value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const handleDates = (start: Date | null, end: Date | null) => {
    setCheckIn(start)
    setCheckOut(end)
  }

  const calculateNights = () => {
  if (!checkIn || !checkOut) return 0

  const start = new Date(checkIn)
  const end = new Date(checkOut)

  // 🔥 eliminar horas (clave)
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  const diff = end.getTime() - start.getTime()

  return Math.round(diff / (1000 * 60 * 60 * 24))
}

  const nights = calculateNights()
  const total = nights * pricePerNight

  return (

    <div className="bg-white border-none rounded-xl p-6 shadow-lg flex flex-col gap-1">

      {/* PRICE */}
      <h3 className="text-xl font-semibold text-right">
        {formatCOP(pricePerNight)} / night
      </h3>

      {/* CALENDARIO */}
      <BookingCalendar 
        onChange={handleDates} 
        pricePerNight={pricePerNight}
      />
      {/* TOTAL */}
      {nights > 0 && (

        <div className="text-sm text-gray-600 text-right">

          {nights} nights × {formatCOP(pricePerNight)}

          <div className="font-semibold text-black mt-1 text-right">
            Total: {formatCOP(total)}
          </div>

        </div>

      )}

      {/* ACTIONS */}
      <div className="flex flex-col gap-3 mt-2">

        {!user && (
          <button className="bg-gray-300 py-3 rounded font-semibold">
            Login to reserve
          </button>
        )}

        {user && !isConnected && (
          <button
            onClick={() => connect({ connector: connectors[0] })}
            className="bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700"
          >
            Connect Wallet
          </button>
        )}

        {user && isConnected && (
          <button
            disabled={nights <= 0}
            className={`py-3 rounded font-semibold ${
              nights > 0
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Reserve with Crypto
          </button>
        )}

      </div>

    </div>
  )
}