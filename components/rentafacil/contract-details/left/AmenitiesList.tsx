'use client'

interface Props {
  amenities: string[]
}

export default function AmenitiesList({ amenities }: Props) {

  if (!amenities?.length) return null

  return (
    <div className="flex flex-col gap-2">

      {/* TITLE */}
      <span className="text-xs uppercase tracking-wide text-gray-400">
        Amenidades
      </span>

      {/* CHIPS */}
      <div className="flex flex-wrap gap-2">
        {amenities.map((item, index) => (
          <span
            key={index}
            className="
              px-3 py-1 text-xs
              bg-gray-100 text-gray-700
              rounded-full
              border border-gray-200
              hover:bg-gray-200
              transition
            "
          >
            {item}
          </span>
        ))}
      </div>

    </div>
  )
}