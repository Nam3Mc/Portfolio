'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { properties } from "@/src/rentafacil/mocks/properties"
import { Property } from "@/src/rentafacil/interfaces/Property"
import { RequiredDocument } from "@/src/rentafacil/interfaces/RequiredDocument"

import BookingSummary from "@/components/rentafacil/pre-booking/BookingSummary"
import PropertyInfo from "@/components/rentafacil/pre-booking/PropertyInfo"
import DocumentsSection from "@/components/rentafacil/pre-booking/DocumentsSection"
import MessageToOwner from "@/components/rentafacil/pre-booking/MessageToOwner"
import SubmitRequest from "@/components/rentafacil/pre-booking/SubmitRequest"
import SidebarInfo from "@/components/rentafacil/pre-booking/SidebarInfo"

export default function PreBookingPage() {

  const router = useRouter()

  const [property, setProperty] = useState<Property | null>(null)
  const [bookingData, setBookingData] = useState<any>(null)

  const [documents, setDocuments] = useState<Record<string, File | null>>({})
  const [message, setMessage] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("bookingData")
    if (!stored) return

    const parsed = JSON.parse(stored)
    setBookingData(parsed)

    const found = properties.find(p => p.id === parsed.propertyId) as Property
    setProperty(found)
  }, [])

  if (!property || !bookingData) {
    return <div className="p-6">Cargando...</div>
  }

  const requiredDocs: RequiredDocument[] = property.documentsRequired || []

  // ✅ VALIDACIÓN CENTRALIZADA
  const isValid = requiredDocs.every(
    doc => !doc.required || documents[doc.id]
  )

  // 🚀 SUBMIT GLOBAL (usado por sidebar + botón principal)
  const handleSubmit = async () => {
    if (!isValid) {
      alert("Faltan documentos obligatorios")
      return
    }

    try {
      const requestData = {
        propertyId: property.id,
        bookingData,
        message,
        status: "pending",
        createdAt: new Date().toISOString()
      }

      // 🔥 persistencia mock
      const existing = JSON.parse(localStorage.getItem("requests") || "[]")

      localStorage.setItem(
        "requests",
        JSON.stringify([...existing, requestData])
      )

      // 🧹 limpiar estado previo
      localStorage.removeItem("bookingData")

      // 🚀 REDIRECT
      router.push("/rentafacil/mis-contratos")

    } catch (error) {
      console.error(error)
      alert("Error al enviar la solicitud")
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* 🟩 MAIN */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          <PropertyInfo property={property} />

          <DocumentsSection
            documentsRequired={requiredDocs}
            documents={documents}
            setDocuments={setDocuments}
          />

          <MessageToOwner
            message={message}
            setMessage={setMessage}
          />

          {/* 🔥 BOTÓN PRINCIPAL */}
          <SubmitRequest
            documents={documents}
            requiredDocs={requiredDocs}
            message={message}
            onSubmit={handleSubmit}
          />

        </div>

        {/* 🟦 SIDEBAR */}
        <div className="lg:col-span-1">

          <div className="sticky top-6 flex flex-col gap-4">

            <BookingSummary
              bookingData={bookingData}
              variant="sidebar"
            />

            <SidebarInfo
              property={property}
              documents={documents}
              requiredDocs={requiredDocs}
              onSubmit={handleSubmit}
            />

          </div>

        </div>

      </div>

    </div>
  )
}