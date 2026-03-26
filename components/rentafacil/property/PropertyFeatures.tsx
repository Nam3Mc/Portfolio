'use client'

import { Property } from "@/src/rentafacil/interfaces/Property"
import { PropertyWeb3 } from "@/src/rentafacil/interfaces/propertyWeb3"
import { DollarSign, Box } from "lucide-react"

interface Props {
  property: Property | PropertyWeb3
}

export default function PropertyFeatures({ property }: Props) {

  const isWeb3 = (p: Property | PropertyWeb3): p is PropertyWeb3 =>
    "tokenized" in p && p.tokenized

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">

      {/* TITLE */}
      <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
        Características de la propiedad
      </h2>

      {/* GRID DE DETALLES */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <p className="font-medium text-gray-700">Huéspedes</p>
          <p className="text-gray-600">{property.maxGuests}</p>
        </div>

        <div className="flex flex-col">
          <p className="font-medium text-gray-700">Habitaciones</p>
          <p className="text-gray-600">{property.bedrooms}</p>
        </div>

        <div className="flex flex-col">
          <p className="font-medium text-gray-700">Baños</p>
          <p className="text-gray-600">{property.bathrooms}</p>
        </div>

        <div className="flex flex-col">
          <p className="font-medium text-gray-700">Tipo</p>
          <p className="text-gray-600 capitalize">{property.type}</p>
        </div>

        {/* DISPONIBILIDAD */}
        <div className="col-span-2 md:col-span-3 mt-2">
          {property.isOccupied ? (
            <p className="text-red-600 font-semibold flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Ocupado hasta{" "}
              {property.availableFrom
                ? new Date(property.availableFrom).toLocaleDateString()
                : "fecha desconocida"}
            </p>
          ) : (
            <p className="text-green-600 font-semibold flex items-center gap-2">
              <Box className="w-4 h-4" /> Disponible ahora
            </p>
          )}
        </div>

        {/* WEB3 */}
        {isWeb3(property) && property.tokenized && property.blockchain && (
          <div className="col-span-2 md:col-span-3 mt-4 p-3 bg-green-50 rounded-lg flex flex-col">
            <p className="font-medium text-green-700 flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Acepta pagos en crypto
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium shadow-sm">
                {property.blockchain.charAt(0).toUpperCase() + property.blockchain.slice(1)}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* AMENITIES */}
      {property.amenities.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2 border-b pb-1 text-gray-700">
            Comodidades
          </h3>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((a, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-indigo-100 transition cursor-default"
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