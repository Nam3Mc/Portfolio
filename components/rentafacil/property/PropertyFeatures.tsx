import { Property } from "@/src/rentafacil/interfaces/Property"

interface Props {
  property: Property
}

export default function PropertyFeatures({ property }: Props) {

  return (
    <div>

      <h2 className="text-xl font-semibold mb-4">
        Property Features
      </h2>

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

      </div>

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

    </div>
  )
}