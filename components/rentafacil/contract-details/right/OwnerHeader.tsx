'use client'

import { Circle } from "lucide-react"

interface Owner {
  name: string
  avatar?: string
  status?: "online" | "offline"
}

interface Props {
  owner: Owner
}

export default function OwnerHeader({ owner }: Props) {

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100">

      {/* 👤 INFO */}
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          {owner.avatar ? (
            <img
              src={owner.avatar}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            {owner.name}
          </span>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Circle
              size={8}
              className={owner.status === "online" ? "text-green-500" : "text-gray-300"}
              fill="currentColor"
            />
            {owner.status ?? "offline"}
          </div>
        </div>

      </div>

    </div>
  )
}