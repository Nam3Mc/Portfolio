'use client'

interface Props {
  description: string
}

export default function DescriptionBlock({ description }: Props) {

  if (!description) return null

  return (
    <div className="flex flex-col gap-2">

      {/* TITLE */}
      <span className="text-xs uppercase tracking-wide text-gray-400">
        Descripción
      </span>

      {/* TEXT */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>

    </div>
  )
}