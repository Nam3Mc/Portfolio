"use client"

import { useParams } from "next/navigation"

import { properties } from "@/src/rentafacil/mocks/properties"

import PropertyGallery from "@/components/rentafacil/property/PropertyGallery"
import PropertyInfo from "@/components/rentafacil/property/PropertyInfo"
import PropertyAmenities from "@/components/rentafacil/property/PropertyAmenities"
import PropertyReviews from "@/components/rentafacil/property/PropertyReviews"
import ReservationCard from "@/components/rentafacil/property/ReservationCard"

export default function PropertyPage() {

  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const property = properties.find((p) => p.id === id)

  if (!property) {

    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        Property not found
      </div>
    )

  }

return (

<div className="max-w-6xl mx-auto px-6 py-10">

<PropertyGallery images={property.images} />

</div>

)
}