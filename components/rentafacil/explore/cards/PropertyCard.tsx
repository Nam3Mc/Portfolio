"use client"

import { MapPin, Users, Star, Cpu } from "lucide-react"
import { PropertyCardProps } from "@/src/rentafacil/interfaces/PropertyCardProps"
import { PropertyWeb3 } from "@/src/rentafacil/interfaces/propertyWeb3"

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {

  const image = property.images?.[0] || "/placeholder-property.jpg"

  const rating =
    property.reviews && property.reviews.length
      ? (
          property.reviews.reduce((acc, r) => acc + r.rating, 0) /
          property.reviews.length
        ).toFixed(1)
      : null

  /* TYPE GUARD FOR WEB3 */
  const web3Property = property as PropertyWeb3

  return (

    <div
      onClick={() => onSelect(property)}
      className="
      group
      bg-white
      rounded-2xl
      overflow-hidden
      shadow-sm
      hover:shadow-2xl
      transition-all
      duration-300
      cursor-pointer
      border border-gray-100
      hover:-translate-y-1
      "
    >

      {/* IMAGE */}
      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={property.name}
          loading="lazy"
          className="
          w-full
          h-56
          object-cover
          transition-transform
          duration-500
          group-hover:scale-110
          "
        />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* PROPERTY TYPE */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold capitalize">
          {property.type}
        </div>

        {/* WEB3 BADGE */}
        {web3Property.tokenized && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">

            <Cpu size={12} />

            NFT

          </div>
        )}

      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-3">

        {/* TITLE + RATING */}
        <div className="flex items-start justify-between gap-2">

          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {property.name}
          </h3>

          {rating && (
            <div className="flex items-center gap-1 text-sm text-yellow-500">

              <Star size={14} fill="currentColor" />

              {rating}

            </div>
          )}

        </div>

        {/* address */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">

          <MapPin size={15} />

          <span className="line-clamp-1">
            {property.address}
          </span>

        </div>

        {/* GUESTS */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">

          <Users size={15} />

          {property.maxGuests} guests

        </div>

        {/* PRICE + STATUS */}
        <div className="flex items-center justify-between mt-2">

          <div className="flex items-baseline gap-1">

            <span className="text-xl font-bold text-indigo-600">
              ${property.pricePerNight}
            </span>

            <span className="text-sm text-gray-500">
              /night
            </span>

          </div>

          {property.available && (
            <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
              Available
            </span>
          )}

        </div>

      </div>

    </div>

  )
}