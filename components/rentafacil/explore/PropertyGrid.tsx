"use client"

import PropertyCard from "./PropertyCard"
import { PropertyGridProps } from "@/src/rentafacil/interfaces/PropertyGridProps"
import { SearchX } from "lucide-react"
import { motion } from "framer-motion"

export default function PropertyGrid({
  properties,
  onSelectProperty
}: PropertyGridProps) {

  if (!properties.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4 text-gray-500">
        <SearchX size={40} className="opacity-60" />
        <h3 className="text-lg font-semibold">
          No monthly rentals found
        </h3>
        <p className="text-sm max-w-sm">
          Try adjusting your filters or searching in another area.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
          className="cursor-pointer rounded-xl transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl"
        >
          <PropertyCard
            property={property}
            onSelect={onSelectProperty}
          />
        </motion.div>
      ))}
    </div>
  )
}