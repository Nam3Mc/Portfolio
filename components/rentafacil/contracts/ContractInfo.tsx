'use client'

interface Props {
  name: string
  address: string
  image: string
}

export default function ContractInfo({ name, address, image }: Props) {
  return (
    <div className="flex items-center gap-4">

      {/* Imagen */}
      <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Texto */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900 truncate">
          {name}
        </span>
        <span className="text-xs text-gray-500 truncate">
          {address}
        </span>
      </div>

    </div>
  )
}