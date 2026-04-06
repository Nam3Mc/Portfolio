"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAccount, useConnect } from "wagmi"
import BookingPanel from "@/components/rentafacil/property/BookingCalendar"

interface BookingData {
  propertyId: string
  propertyName: string
  propertyImage?: string
  address: string
  startDate?: string
  months?: number
  pricePerMonth: number
  createdAt?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams()

  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()

  const [booking, setBooking] = useState<BookingData | null>(null)

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [months, setMonths] = useState(1)

  const [kycAccepted, setKycAccepted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("bookingData")

    if (!data) {
      router.push(`/rentafacil/explore/properties/${params.id}`)
      return
    }

    const parsed: BookingData = JSON.parse(data)

    if (parsed.propertyId !== params.id) {
      router.push(`/rentafacil/explore/properties/${params.id}`)
      return
    }

    setBooking(parsed)

    if (parsed.startDate) {
      setStartDate(new Date(parsed.startDate))
      setMonths(parsed.months || 1)
    }

  }, [params.id, router])

  if (!booking) {
    return <div className="p-10 text-center">Loading checkout...</div>
  }

  const handleSelection = (date: Date, m: number) => {
    setStartDate(date)
    setMonths(m)
  }

  const total = booking.pricePerMonth * months

  const canProceed =
    startDate &&
    kycAccepted &&
    termsAccepted &&
    isConnected

  const handleConfirm = () => {
    if (!canProceed) return

    console.log("🚀 Creating smart contract...")
    console.log({
      ...booking,
      startDate,
      months,
      total
    })

    // Aquí luego:
    // 👉 llamada a smart contract
    // 👉 backend
    // 👉 firma wallet

    router.push("/rentafacil/success") // futura página
  }

  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-10">

      {/* LEFT SIDE */}
      <div className="flex flex-col gap-6">

        <h1 className="text-2xl font-bold">Finalize your booking</h1>

        {/* CALENDAR (solo si no hay fecha previa) */}
        {!startDate && (
          <div className="bg-white p-5 rounded-xl shadow">
            <BookingPanel
              pricePerMonth={booking.pricePerMonth}
              isOccupied={false}
              availableFrom={new Date()}
              onSelect={handleSelection}
            />
          </div>
        )}

        {/* KYC */}
        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-3">
          <h2 className="font-semibold">Identity Verification (KYC)</h2>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={kycAccepted}
              onChange={() => setKycAccepted(!kycAccepted)}
            />
            I confirm my identity information is valid
          </label>
        </div>

        {/* TERMS */}
        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-3">
          <h2 className="font-semibold">Terms & Conditions</h2>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            I accept the rental agreement and conditions
          </label>
        </div>

        {/* WALLET */}
        {!isConnected && (
          <button
            onClick={() => connect({ connector: connectors[0] })}
            className="bg-indigo-600 text-white py-3 rounded-xl"
          >
            Connect Wallet
          </button>
        )}

        {/* CONFIRM */}
        <button
          disabled={!canProceed}
          onClick={handleConfirm}
          className={`py-3 rounded-xl font-semibold ${
            canProceed
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Confirm & Create Contract
        </button>

      </div>

      {/* RIGHT SIDE (STICKY) */}
      <div className="bg-white rounded-xl shadow p-5 h-fit sticky top-10">

        <img
          src={booking.propertyImage || "https://via.placeholder.com/400"}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        <h2 className="text-lg font-semibold">{booking.propertyName}</h2>
        <p className="text-sm text-gray-500 mb-4">{booking.address}</p>

        <div className="text-sm flex flex-col gap-2">
          <div>
            <span className="text-gray-500">Start:</span>{" "}
            {startDate ? startDate.toDateString() : "Not selected"}
          </div>

          <div>
            <span className="text-gray-500">Duration:</span>{" "}
            {months} month{months > 1 && "s"}
          </div>

          <div>
            <span className="text-gray-500">Price/month:</span>{" "}
            ${booking.pricePerMonth}
          </div>

          <div className="border-t pt-3 font-bold text-lg">
            Total: ${total}
          </div>
        </div>

      </div>

    </div>
  )
}