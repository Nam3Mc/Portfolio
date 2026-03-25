"use client"

import { useState } from "react"
import { Property } from "@/src/rentafacil/interfaces/Property"
import { useAccount, useConnect } from "wagmi"
import { useAuth } from "@/src/rentafacil/auth/AuthContext"
import BookingPanel from "./BookingCalendar"
import LoginModal from "../auth/LoginModal"

interface Props {
  property: Property
}

export default function PropertyBooking({ property }: Props) {

  const { user } = useAuth()
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [months, setMonths] = useState(1)

  const [showLoginModal, setShowLoginModal] = useState(false)

  const pricePerMonth = property.pricePerMonth

  const formatCOP = (value: number) =>
    value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    })

  const handleSelection = (date: Date, m: number) => {
    setStartDate(date)
    setMonths(m)
  }

  const total = pricePerMonth * months

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col gap-4">

        {/* PRICE */}
        <h3 className="text-xl font-semibold text-right">
          {formatCOP(pricePerMonth)} / mes
        </h3>

        {/* CALENDARIO NUEVO */}
        <BookingPanel
          pricePerMonth={pricePerMonth}
          isOccupied={property.isOccupied}
          availableFrom={property.availableFrom}
          onSelect={handleSelection}
        />

        {/* TOTAL */}
        {startDate && (
          <div className="text-sm text-gray-600 text-right">
            {months} mes{months > 1 && "es"} × {formatCOP(pricePerMonth)}

            <div className="font-semibold text-black mt-1">
              Total: {formatCOP(total)}
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex flex-col gap-3">

          {!user && (
            <button
              onClick={() => setShowLoginModal(true)}
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
              className={`
                py-3 rounded font-semibold
                ${startDate
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500"}
              `}
            >
              Crear contrato
            </button>
          )}

        </div>
      </div>

      {/* MODAL */}
      {showLoginModal && (
        <LoginModal close={() => setShowLoginModal(false)} />
      )}
    </>
  )
}