"use client"

import { useParams } from "next/navigation"
import { properties } from "@/src/rentafacil/mocks/properties"
import PropertyGallery from "@/components/rentafacil/property/PropertyGalery"
import PropertyBooking from "@/components/rentafacil/property/PropertyBooking"
import PropertyFeatures from "@/components/rentafacil/property/PropertyFeatures"
import ReviewCarousel from "@/components/rentafacil/property/ReviewCarousel"
import PropertyMap from "@/components/rentafacil/property/PropertyMapNearby"
import PropertyCarousel from "@/components/rentafacil/property/PropertyCarousel"

export default function PropertyPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const fullId = id?.startsWith("property-") ? id : `property-${id}`
  const property = properties.find(p => p.id === fullId)

  const formatCOP = (value: number) =>
    value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    })

  if (!property) {
    return (
      <div className="p-10 text-center text-gray-600">
        Property not found
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold">
            {property.name}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 text-sm flex-wrap">
            <span>⭐ {property.rating?.toFixed(1)}</span>
            <span>• {property.reviews?.length || 0} reviews</span>
            <span>• {property.address}</span>
          </div>

          {/* 🔥 STATUS */}
          <div className="mt-2">
            {property.isOccupied ? (
              <span className="text-red-500 text-sm font-medium">
                Ocupado hasta{" "}
                {property.availableFrom
                  ? new Date(property.availableFrom).toLocaleDateString()
                  : "fecha desconocida"}
              </span>
            ) : (
              <span className="text-green-600 text-sm font-medium">
                Disponible ahora
              </span>
            )}
          </div>

          {/* WEB3 */}
          {("tokenized" in property && property.tokenized) && (
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
              Crypto Friendly ({property.blockchain})
            </span>
          )}
        </div>

        {/* 💰 PRICE */}
        <div className="hidden md:block text-right">
          <span className="text-2xl font-bold text-indigo-600">
            {formatCOP(property.pricePerMonth)}{" "}
            <span className="text-base font-normal">/ mes</span>
          </span>
        </div>

      </div>

      {/* GALERÍA */}
      {property.images?.length ? (
        <PropertyGallery images={property.images} />
      ) : (
        <div className="h-80 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">
          No images available
        </div>
      )}

      {/* GRID PRINCIPAL */}
      <div className="grid lg:grid-cols-3 gap-12">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">

          {/* INFO RÁPIDA */}
          <div className="flex items-center gap-4 border-b pb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">
                Propiedad completa
              </h2>

              <p className="text-gray-600 mt-2 flex flex-wrap gap-3">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                  {property.maxGuests} huéspedes
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                  {property.bedrooms} habitaciones
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                  {property.bathrooms} baños
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium capitalize">
                  {property.type}
                </span>
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-3">
              Descripción
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* FEATURES */}
          <div className="border-b pb-6">
            <PropertyFeatures property={property} />
          </div>

          {/* MAP */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-3">
              Ubicación
            </h2>
            <PropertyMap
              lat={property.lat!}
              lng={property.lng!}
              address={property.address}
              radius={500}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="sticky top-24">
            <PropertyBooking property={property} />
          </div>
        </div>

      </div>

      {/* REVIEWS */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold">
          ⭐ {property.rating?.toFixed(1)} · {property.reviews?.length || 0} reviews
        </h2>
        <ReviewCarousel reviews={property.reviews || []} />
      </div>

      {/* CAROUSEL */}
      <PropertyCarousel />

    </div>
  )
}