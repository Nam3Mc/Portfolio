'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Property } from "@/src/rentafacil/interfaces/Property"
import BookingPanel from "@/components/rentafacil/property/AvailabilityCalendar"

interface BookingData {
  propertyId: string
  startDate: string
  months: number
  pricePerMonth: number
}

interface Props {
  property?: Property // opcional, por si ya tenemos la propiedad
}

export default function CheckoutPage({ property }: Props) {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(property || null)

  useEffect(() => {
    // Si no viene por props, buscar en localStorage
    if (!property) {
      const data = localStorage.getItem("bookingData")
      if (data) {
        const parsed: BookingData = JSON.parse(data)
        setBookingData(parsed)
        // Aquí podemos hacer fetch de la propiedad según parsed.propertyId
        // setSelectedProperty(fetchProperty(parsed.propertyId))
      }
    } else {
      // Ya viene con propiedad, buscar info en localStorage si existe
      const data = localStorage.getItem("bookingData")
      if (data) setBookingData(JSON.parse(data))
    }
  }, [property])

  const handleSelection = (startDate: Date, months: number) => {
    if (!selectedProperty) return
    const data: BookingData = {
      propertyId: selectedProperty.id,
      startDate: startDate.toISOString(),
      months,
      pricePerMonth: selectedProperty.pricePerMonth
    }
    setBookingData(data)
    localStorage.setItem("bookingData", JSON.stringify(data))
  }

  if (!selectedProperty) {
    return <div className="p-6 text-center">Cargando propiedad...</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* Si no hay bookingData, mostrar calendario */}
      {!bookingData && (
        <BookingPanel
          pricePerMonth={selectedProperty.pricePerMonth}
          isOccupied={selectedProperty.isOccupied}
          availableFrom={selectedProperty.availableFrom}
          onSelect={handleSelection}
        />
      )}

      {/* Mostrar resumen si ya hay info */}
      {bookingData && (
        <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
          <div><strong>Propiedad:</strong> {selectedProperty.name}</div>
          <div><strong>Fecha de inicio:</strong> {new Date(bookingData.startDate).toLocaleDateString()}</div>
          <div><strong>Duración:</strong> {bookingData.months} mes{bookingData.months > 1 ? "es" : ""}</div>
          <div><strong>Total:</strong> {(bookingData.months * bookingData.pricePerMonth).toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })}</div>
        </div>
      )}

      {/* Aquí agregaremos condiciones del dueño y KYC */}
      <div className="border p-4 rounded-lg bg-white">
        <h2 className="font-semibold mb-2">Condiciones y KYC</h2>
        <p>Aquí se mostrarán condiciones especiales del dueño y verificación del inquilino.</p>
      </div>

      {/* Botón continuar */}
      {bookingData && (
        <button
          onClick={() => router.push("/rentafacil/payment")} // cambiar según flujo
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
        >
          Continuar
        </button>
      )}
    </div>
  )
}