'use client'

import { Property } from "@/src/rentafacil/interfaces/Property"

export default function PropertyInfo({ property }: { property: Property }) {
  return (
    <div className="
      bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden
      flex flex-col md:flex-row
    ">

      {/* 🖼️ Imagen */}
      <div className="w-full md:w-1/3 h-52 md:h-auto">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 📄 Info */}
      <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-3 flex-1">

        {/* 🏷️ Tipo */}
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {property.type}
        </span>

        {/* 🏠 Nombre */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          {property.name}
        </h2>

        {/* 📍 Dirección */}
        <p className="text-sm text-gray-500">
          {property.address}
        </p>

        {/* 📊 Features */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
          <span>🛏 {property.bedrooms} hab.</span>
          <span>🛁 {property.bathrooms} baños</span>
          <span>👥 {property.maxGuests} huéspedes</span>
        </div>

        {/* 💰 Precio */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            {property.pricePerMonth.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0
            })}
            <span className="text-sm text-gray-500 font-normal"> / mes</span>
          </p>

          {/* ⭐ Rating */}
          {property.rating && (
            <span className="text-sm text-yellow-500 font-medium">
              ⭐ {property.rating.toFixed(1)}
            </span>
          )}
        </div>

      </div>
    </div>
  )
}