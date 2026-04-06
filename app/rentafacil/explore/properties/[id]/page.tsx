"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { properties } from "@/src/rentafacil/mocks/properties"

import PropertyGallery from "@/components/rentafacil/property/PropertyGalery"
import PropertyBooking from "@/components/rentafacil/property/PropertyBooking"
import PropertyFeatures from "@/components/rentafacil/property/PropertyFeatures"
import ReviewCarousel from "@/components/rentafacil/property/ReviewCarousel"
import PropertyMap from "@/components/rentafacil/property/PropertyMapNearby"
import PropertyCarousel from "@/components/rentafacil/property/PropertyCarousel"

import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function PropertyPage() {
  const params = useParams()
  const searchParams = useSearchParams()

  const bookingRef = useRef<HTMLDivElement | null>(null)

  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const fullId = id?.startsWith("property-") ? id : `property-${id}`

  const property = properties.find(p => p.id === fullId)

  const formatCOP = (value: number) =>
    value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    })

  // 🔥 Detectar intención de reserva
  useEffect(() => {
    const shouldScroll = searchParams.get("reserve")

    if (shouldScroll && bookingRef.current) {
      setTimeout(() => {
        bookingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 300)
    }
  }, [searchParams])

  if (!property) {
    return (
      <div className="p-10 text-center text-gray-600">
        Propiedad no encontrada
      </div>
    )
  }

  const availableDate = property.availableFrom
    ? format(new Date(property.availableFrom), "dd 'de' MMMM yyyy", { locale: es })
    : "fecha desconocida"

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {property.name}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 text-sm flex-wrap">
            <span>⭐ {property.rating?.toFixed(1)}</span>
            <span>• {property.reviews?.length || 0} reviews</span>
            <span>• {property.address}</span>
          </div>

          <div className="mt-2">
            {property.isOccupied ? (
              <span className="text-red-500 text-sm font-medium">
                Ocupado hasta {availableDate}
              </span>
            ) : (
              <span className="text-green-600 text-sm font-medium">
                Disponible ahora
              </span>
            )}
          </div>

          {property.tokenized && (
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
              Crypto Friendly ({property.blockchain})
            </span>
          )}
        </div>

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
          No hay imágenes disponibles
        </div>
      )}

      {/* GRID PRINCIPAL */}
      <div className="grid lg:grid-cols-3 gap-12">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-10">

          {/* INFO RÁPIDA */}
          <div className="flex items-center gap-4 border-b pb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">Propiedad completa</h2>

              <div className="mt-2 flex flex-wrap gap-3 text-xs">
                <span className="px-2 py-1 bg-gray-100 rounded-full font-medium">
                  {property.maxGuests} huéspedes
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full font-medium">
                  {property.bedrooms} habitaciones
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full font-medium">
                  {property.bathrooms} baños
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium capitalize">
                  {property.type}
                </span>
              </div>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-3">Descripción</h2>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* FEATURES */}
          <div className="border-b pb-6">
            <PropertyFeatures property={property} />
          </div>

          {/* MAPA */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-3">Ubicación</h2>
            <PropertyMap
              lat={property.lat!}
              lng={property.lng!}
              address={property.address}
              radius={500}
            />
          </div>
        </div>

        {/* RIGHT COLUMN - BOOKING */}
        <div ref={bookingRef} className="relative">
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

        {property.reviews?.length ? (
          <ReviewCarousel reviews={property.reviews} />
        ) : (
          <p className="text-gray-500">No hay reseñas aún.</p>
        )}
      </div>

      {/* PROPIEDADES RELACIONADAS */}
      <div>
        <h2 className="text-3xl font-bold mb-4">Otras propiedades</h2>
        <PropertyCarousel currentPropertyId={property.id} />
      </div>

    </div>
  )
}