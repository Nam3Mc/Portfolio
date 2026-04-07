'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Property } from "@/src/rentafacil/interfaces/Property"
import { useAccount, useConnect } from "wagmi"
import { useAuth } from "@/src/rentafacil/auth/AuthContext"
import BookingPanel from "./BookingCalendar"

interface Props {
  property: Property
}

export default function PropertyBooking({ property }: Props) {

  const router = useRouter()
  const { user } = useAuth()
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [months, setMonths] = useState(1)

  const pricePerMonth = property.pricePerMonth
  const total = pricePerMonth * months

  const handleSelection = (date: Date, m: number) => {
    setStartDate(date)
    setMonths(m)
  }

  const handleCreateContract = () => {
    if (!startDate) return

    // Guardar la info en localStorage para usarla en checkout
    const bookingData = {
      propertyId: property.id,
      startDate: startDate.toISOString(),
      months,
      pricePerMonth,

    
    }
    localStorage.setItem("bookingData", JSON.stringify(bookingData))

    // Redirigir a checkout
    router.push(`/rentafacil/explore/pre-booking`)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col gap-4">

      <h3 className="text-xl font-semibold text-right">
        {pricePerMonth.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })} / mes
      </h3>

      <BookingPanel
        // pricePerMonth={pricePerMonth}
        isOccupied={property.isOccupied}
        availableFrom={property.availableFrom}
        onSelect={handleSelection}
      />

      {startDate && (
        <div className="text-sm text-gray-600 text-right">
          {months} mes{months > 1 && "es"} × {pricePerMonth.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })}
          <div className="font-semibold text-black mt-1">
            Total: {(pricePerMonth * months).toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {!user && (
          <button
            onClick={() => router.push("/login")}
            className="bg-gray-300 py-3 rounded font-semibold hover:bg-gray-400"
          >
            Iniciar sesión
          </button>
        )}

        {user && !isConnected && (
          <button
            onClick={() => connect({ connector: connectors[0] })}
            className="bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700"
          >
            Conectar Wallet
          </button>
        )}

        {user && isConnected && (
          <button
            disabled={!startDate}
            onClick={handleCreateContract}
            className={`py-3 rounded font-semibold ${startDate ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500"}`}
          >
            Crear contrato
          </button>
        )}
      </div>
    </div>
  )
}