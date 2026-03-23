import { Property } from "@/src/rentafacil/interfaces/Property"
import { PropertyWeb3 } from "@/src/rentafacil/interfaces/PropertyWeb3"

interface Props {
  property: Property | PropertyWeb3
}

export default function PropertyFeatures({ property }: Props) {

  const isWeb3 = (p: Property | PropertyWeb3): p is PropertyWeb3 =>
    "tokenized" in p && p.tokenized

  return (
    <div>

      {/* Título principal */}
      <h2 className="text-xl font-semibold mb-4">
        Property Features
      </h2>

      {/* Características principales */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        <div>
          <p className="font-medium">Guests</p>
          <p className="text-gray-600">{property.maxGuests}</p>
        </div>

        <div>
          <p className="font-medium">Bedrooms</p>
          <p className="text-gray-600">{property.bedrooms}</p>
        </div>

        <div>
          <p className="font-medium">Bathrooms</p>
          <p className="text-gray-600">{property.bathrooms}</p>
        </div>

        {/* Pago en cripto */}
        {isWeb3(property) && property.tokenized && property.blockchain && (
          <div className="col-span-2 md:col-span-3 mt-2">
            <p className="font-medium text-green-600">
              Accepts Crypto Payments
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {property.blockchain.charAt(0).toUpperCase() + property.blockchain.slice(1)}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Amenities */}
      {property.amenities.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            Amenities
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