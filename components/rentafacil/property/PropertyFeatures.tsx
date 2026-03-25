"use client"

import { Property } from "@/src/rentafacil/interfaces/Property"
import { PropertyWeb3 } from "@/src/rentafacil/interfaces/propertyWeb3"

interface Props {
  property: Property | PropertyWeb3
}

export default function PropertyFeatures({ property }: Props) {

  const isWeb3 = (p: Property | PropertyWeb3): p is PropertyWeb3 =>
    "tokenized" in p && p.tokenized

  return (
    <div>

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-4">
        Características de la propiedad
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        <div>
          <p className="font-medium">Huéspedes</p>
          <p className="text-gray-600">{property.maxGuests}</p>
        </div>

        <div>
          <p className="font-medium">Habitaciones</p>
          <p className="text-gray-600">{property.bedrooms}</p>
        </div>

        <div>
          <p className="font-medium">Baños</p>
          <p className="text-gray-600">{property.bathrooms}</p>
        </div>

        <div>
          <p className="font-medium">Tipo</p>
          <p className="text-gray-600 capitalize">{property.type}</p>
        </div>

        {/* 🔥 NUEVO: DISPONIBILIDAD */}
        <div className="col-span-2 md:col-span-3 mt-2">
          {property.isOccupied ? (
            <p className="text-red-500 font-medium">
              Ocupado hasta{" "}
              {property.availableFrom
                ? new Date(property.availableFrom).toLocaleDateString()
                : "fecha desconocida"}
            </p>
          ) : (
            <p className="text-green-600 font-medium">
              Disponible ahora
            </p>
          )}
        </div>

        {/* 🔗 WEB3 */}
        {isWeb3(property) && property.tokenized && property.blockchain && (
          <div className="col-span-2 md:col-span-3 mt-2">
            <p className="font-medium text-green-600">
              Acepta pagos en crypto
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {property.blockchain.charAt(0).toUpperCase() + property.blockchain.slice(1)}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* AMENITIES */}
      {property.amenities.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            Comodidades
          </h3>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((a, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}