"use client"

import { useState } from "react"
import {
  UploadedDocument,
  BookingSummaryData,
  PreBookingRequest
} from "@/src/rentafacil/interfaces/preCheckout"

import { createPreBooking } from "../store/preCheckoutSlice"
import { validatePreCheckout } from "../utils/preCheckoutValidation"

export default function usePreCheckout() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [message, setMessage] = useState("")
  const [booking, setBooking] = useState<BookingSummaryData | null>(null)

  // 🔹 Validación global
  const isValid = () => {
    return validatePreCheckout({
      documents,
      message,
      booking
    })
  }

  // 🔹 Submit principal
  const handleSubmit = async () => {
    if (!isValid()) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    if (!booking) return

    const payload: PreBookingRequest = {
      propertyId: booking.propertyName, // luego cambiar por ID real
      userId: "user_mock", // luego auth real
      documents,
      message,
      status: "PENDING_APPROVAL"
    }

    await createPreBooking(payload)
  }

  return {
    // estado
    documents,
    message,
    booking,

    // setters
    setDocuments,
    setMessage,
    setBooking,

    // acciones
    handleSubmit,
    isValid
  }
}