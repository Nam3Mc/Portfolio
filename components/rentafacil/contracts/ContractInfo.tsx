'use client'

interface Props {
  name: string
  address: string
  image: string
}

export default function ContractInfo({ name, address, image }: Props) {
  return (
    <div className="flex items-center gap-4">

      {/* 🖼️ IMAGE HERO */}
      <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex-shrink-0 group">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* subtle glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
      </div>

      {/* 🧠 TEXT BLOCK */}
      <div className="flex flex-col min-w-0">

        {/* NAME (primary identity) */}
        <span className="text-sm font-semibold text-gray-900 truncate leading-tight">
          {name}
        </span>

        {/* ADDRESS (secondary info) */}
        <span className="text-xs text-gray-500 truncate flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-gray-400 rounded-full" />
          {address}
        </span>

        {/* subtle tag (optional feel premium) */}
        <span className="text-[10px] text-indigo-500 mt-0.5 font-medium">
          Active property
        </span>

      </div>

    </div>
  )
}