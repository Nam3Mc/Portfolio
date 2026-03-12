interface PropertyAmenitiesProps {
  amenities: string[]
}

export default function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {

  return (

    <div className="flex flex-col gap-4">

      <h3 className="text-lg font-semibold">
        Amenities
      </h3>

      <div className="grid grid-cols-2 gap-3">

        {amenities.map((amenity, index) => (

          <span
            key={index}
            className="bg-gray-100 px-4 py-2 rounded-lg text-sm"
          >
            {amenity}
          </span>

        ))}

      </div>

    </div>

  )

}