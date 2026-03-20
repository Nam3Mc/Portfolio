"use client"

import { useParams } from "next/navigation"
import { properties } from "@/src/rentafacil/mocks/properties"
import PropertyGallery from "@/components/rentafacil/property/PropertyGalery"
import PropertyBooking from "@/components/rentafacil/property/PropertyBooking"
import PropertyFeatures from "@/components/rentafacil/property/PropertyFeatures"
import ReviewCarousel from "@/components/rentafacil/property/ReviewCarousel"

export default function PropertyPage() {

  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const fullId = id?.startsWith("property-") ? id : `property-${id}`
  const property = properties.find(p => p.id === fullId)

  if (!property) {
    return <div className="p-10">Property not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2">
        {property.name}
      </h1>

      {/* 🔥 META INFO */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
        <span>⭐ 4.8</span>
        <span>• 120 reviews</span>
        <span>• {property.location}</span>
      </div>

      {/* GALLERY */}
      <PropertyGallery images={property.images} />

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-10 mt-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">

          {/* 🔥 HOST / QUICK INFO */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold">
              Entire place hosted by John
            </h2>
            <p className="text-gray-600 mt-1">
              4 guests · 2 bedrooms · 2 beds · 1 bath
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-2">
              Description
            </h2>
            <p className="text-gray-600">
              {property.description}
            </p>
          </div>

          {/* FEATURES */}
          <div className="border-b pb-6">
            <PropertyFeatures property={property} />
          </div>

        </div>

        {/* RIGHT */}
        <div className="relative">

          {/* 🔥 STICKY BOOKING */}
          <div className="sticky top-24">
            <PropertyBooking property={property} />
          </div>

        </div>

      </div>

      {/* REVIEWS */}
      <div className="mt-16">

        <h2 className="text-2xl font-semibold mb-4">
          ⭐ 4.8 · 120 reviews
        </h2>

        <ReviewCarousel reviews={property.reviews || []} />

      </div>

    </div>
  )
}