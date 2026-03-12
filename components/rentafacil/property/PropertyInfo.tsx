interface PropertyInfoProps {

  name: string
  location: string
  description: string
  maxGuests: number
  bedrooms: number
  bathrooms: number

}

export default function PropertyInfo({
  name,
  location,
  description,
  maxGuests,
  bedrooms,
  bathrooms
}: PropertyInfoProps) {

  return (

    <div className="flex flex-col gap-8">

      <div className="flex flex-col gap-2">

        <h1 className="text-3xl font-bold">
          {name}
        </h1>

        <span className="text-gray-500">
          {location}
        </span>

      </div>


      <div className="flex flex-col gap-2">

        <h2 className="text-xl font-semibold">
          Hosted Property
        </h2>

        <div className="flex gap-4 text-gray-600">

          <span>{maxGuests} guests</span>
          <span>{bedrooms} bedrooms</span>
          <span>{bathrooms} bathrooms</span>

        </div>

      </div>


      <div className="flex flex-col gap-2">

        <h3 className="text-lg font-semibold">
          Description
        </h3>

        <p className="text-gray-600">
          {description}
        </p>

      </div>

    </div>

  )

}