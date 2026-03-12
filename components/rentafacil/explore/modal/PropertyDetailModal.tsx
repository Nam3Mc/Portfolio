"use client"

import { X, MapPin, Users, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { PropertyDetailModalProps } from "@/src/rentafacil/interfaces/PropertyDetailModalProps"
import useWallet from "@/src/rentafacil/web3/hooks/useWallet"

export default function PropertyDetailModal({ property, onClose }: PropertyDetailModalProps) {

  const wallet = useWallet()
  const router = useRouter()

  if (!property) return null

  const fallback =
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511"

  const images =
    property.images && property.images.length > 0
      ? property.images
      : [fallback]

  const handleViewMore = () => {
    router.push(`/rentafacil/explore/properties/${property.id}`)
  }

  const handleReserve = () => {
    router.push(`/rentafacil/explore/checkout/${property.id}`)
  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">

      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 p-4 h-[420px]">

          {/* MAIN IMAGE */}
          <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden">

            <Image
              src={images[0]}
              alt={property.name}
              fill
              priority
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />

          </div>

          {/* SECONDARY IMAGES */}
          {images.slice(1, 5).map((img, index) => (

            <div
              key={index}
              className="relative w-full h-full rounded-xl overflow-hidden"
            >

              <Image
                src={img}
                alt={`${property.name}-${index}`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />

            </div>

          ))}

        </div>

        {/* CONTENT */}
        <div className="p-8 flex flex-col gap-6">

          {/* HEADER */}
          <div className="flex flex-col gap-2">

            <h2 className="text-3xl font-bold">
              {property.name}
            </h2>

            <div className="flex items-center gap-4 text-gray-500 text-sm">

              <div className="flex items-center gap-1">
                <MapPin size={16} />
                {property.location}
              </div>

              <div className="flex items-center gap-1">
                <Users size={16} />
                {property.maxGuests} guests
              </div>

            </div>

          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            {property.description}
          </p>

          {/* AMENITIES */}
          <div className="flex flex-wrap gap-2">

            {property.amenities?.map((amenity, index) => (

              <span
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {amenity}
              </span>

            ))}

          </div>

          {/* WEB3 VERIFIED */}
          {property.tokenized && (

            <div className="border rounded-xl p-4 bg-indigo-50 flex flex-col gap-2">

              <div className="flex items-center gap-2 font-semibold text-indigo-700">
                <ShieldCheck size={18} />
                Blockchain Verified Property
              </div>

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

          )}

          {/* PRICE + ACTIONS */}
          <div className="flex items-center justify-between pt-4 border-t">

            <div className="text-3xl font-bold text-indigo-600">

              ${property.pricePerNight}

              <span className="text-sm text-gray-500 ml-2">
                /night
              </span>

            </div>

            <div className="flex gap-3">

              <button
                onClick={handleViewMore}
                className="px-6 py-2 border rounded-xl hover:bg-gray-100 transition"
              >
                View More
              </button>

              {!wallet.connected ? (

                <button className="bg-gray-400 text-white px-6 py-2 rounded-xl">
                  Connect wallet
                </button>

              ) : (

                <button
                  onClick={handleReserve}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
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