"use client"

import { X, MapPin, Users, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState } from "react"

import { PropertyDetailModalProps } from "@/src/rentafacil/interfaces/PropertyDetailModalProps"
import { useAuth } from "@/src/rentafacil/auth/AuthContext"

export default function PropertyDetailModal({ property, onClose }: PropertyDetailModalProps) {
  const { user } = useAuth()
  const router = useRouter()

  if (!property) return null

  const fallback = "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
  const images = property.images?.length ? property.images : [fallback]

  const [mainImage, setMainImage] = useState(images[0])
  const [readMore, setReadMore] = useState(false)
  const [showWeb3Details, setShowWeb3Details] = useState(false)

  // 🔹 Navegación
  const handleViewMore = () => {
    router.push(`/rentafacil/explore/properties/${property.id}`)
  }

  const handleReserve = () => {
    router.push(`/rentafacil/explore/properties/${property.id}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-6">
      <div className="bg-white w-full max-w-5xl md:rounded-2xl shadow-2xl overflow-y-auto max-h-screen md:max-h-[90vh]">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        {/* IMAGE SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 p-4 h-[300px] md:h-[420px]">
          <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 relative rounded-xl overflow-hidden">
            <Image
              src={mainImage}
              alt={property.name}
              fill
              priority
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {images.slice(0, 5).map((img, index) => (
            <div
              key={index}
              onClick={() => setMainImage(img)}
              className={`relative w-full h-[80px] md:h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                mainImage === img ? "ring-2 ring-indigo-500" : "opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${property.name}-${index}`}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="p-4 md:p-8 flex flex-col gap-4 md:gap-6">

          {/* HEADER */}
          <div className="flex flex-col gap-1">
            <h2 className="text-xl md:text-3xl font-bold">{property.name}</h2>
            <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={16} /> {property.address}
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} /> {property.maxGuests} guests
              </div>

              {property.isOccupied ? (
                <span className="flex items-center gap-1 text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded-full">
                  ● Occupied
                </span>
              ) : (
                <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                  ● Available
                </span>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            {readMore ? property.description : `${property.description.slice(0, 180)}...`}
            {property.description.length > 180 && (
              <button
                className="text-indigo-600 ml-1 font-medium"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Show Less" : "Read More"}
              </button>
            )}
          </p>

          {/* AMENITIES */}
          {property.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-xs md:text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          )}

          {/* WEB3 VERIFIED */}
          {property.tokenized && (
            <div
              className="border rounded-xl p-3 md:p-4 bg-indigo-50 flex flex-col gap-2 cursor-pointer"
              onClick={() => setShowWeb3Details(!showWeb3Details)}
            >
              <div className="flex items-center gap-2 font-semibold text-indigo-700">
                <ShieldCheck size={18} />
                Blockchain Verified {showWeb3Details ? "▲" : "▼"}
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  showWeb3Details ? "max-h-40 mt-2" : "max-h-0"
                }`}
              >
                <div className="text-sm text-gray-700">
                  <strong>Network:</strong> {property.blockchain}
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Token ID:</strong> {property.tokenId}
                </div>
                <div className="text-sm text-gray-700 break-all">
                  <strong>Contract:</strong> {property.contractAddress}
                </div>
              </div>
            </div>
          )}

          {/* PRICE + ACTION */}
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mt-4 sticky bottom-0 bg-white md:bg-transparent p-4 md:p-0 border-t md:border-0 z-10">
            
            <div className="text-xl md:text-2xl font-bold text-indigo-600">
              ${property.pricePerMonth}
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">

              {/* 👤 NO LOGUEADO */}
              {!user && (
                <button
                  onClick={handleViewMore}
                  className="w-full md:w-auto bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-black transition"
                >
                  View More
                </button>
              )}

              {/* 👤 LOGUEADO */}
              {user && (
                <button
                  onClick={handleReserve}
                  className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
                >
                  Reserve
                </button>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}