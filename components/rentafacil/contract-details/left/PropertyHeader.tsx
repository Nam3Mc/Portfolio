'use client'

interface Props {
  name: string
  address: string
}

export default function PropertyHeader({ name, address }: Props) {

  return (
    <div className="flex flex-col gap-1">

      {/* 🏠 NAME (MAIN) */}
      <h1 className="text-lg font-semibold text-gray-900 leading-tight">
        {name}
      </h1>

      {/* 📍 ADDRESS (SECONDARY) */}
      <p className="text-sm text-gray-500">
        {address}
      </p>

    </div>
  )
}