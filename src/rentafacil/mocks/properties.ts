import { Property } from "@/src/rentafacil/interfaces/Property"

export const fallbackOwner = [
  "user-owner-1",
  "user-owner-2",
  "user-owner-3",
  "user-owner-4"
]

export const propertyTypes: Property["type"][] = [
  "apartment",
  "house",
  "studio",
  "loft"
]

export const baseAmenities = [
  "WiFi",
  "Air Conditioning",
  "Kitchen",
  "Smart TV",
  "Workspace",
  "Washer",
  "Pool",
  "Parking"
]

export const propertyExample: Property = {
  id: "property-1",

  name: "Luxury Apartment in Bogotá",
  description:
    "Beautiful modern apartment located near financial district with amazing city views. Perfect for business travelers or couples.",

  location: "Bogotá, Colombia",

  pricePerNight: 95,

  images: [
    "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg",
    "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample.jpg",
    "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-3.jpg",
    "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-4.jpg"
  ],

  ownerId: "user-owner-1",

  type: "apartment",

  maxGuests: 4,
  bedrooms: 2,
  bathrooms: 2,

  amenities: [
    "WiFi",
    "Air Conditioning",
    "Kitchen",
    "Smart TV",
    "Workspace",
    "Washer"
  ],

  available: true,

  rating: 4.8,

  reviews: [
    {
      user: "Michael",
      rating: 5,
      comment: "Amazing place. Super clean and great location."
    },
    {
      user: "Laura",
      rating: 4,
      comment: "Beautiful apartment and very comfortable."
    },
    {
      user: "Carlos",
      rating: 5,
      comment: "Would definitely stay here again."
    }
  ],

  reservations: [
    {
      id: "reservation-1",
      propertyId: "property-1",
      userId: "user-guest-1",

      checkIn: new Date("2026-04-10"),
      checkOut: new Date("2026-04-15"),

      guests: 2,

      totalPrice: 475,

      status: "confirmed",

      createdAt: new Date("2026-03-01")
    },
    {
      id: "reservation-2",
      propertyId: "property-1",
      userId: "user-guest-2",

      checkIn: new Date("2026-05-01"),
      checkOut: new Date("2026-05-05"),

      guests: 3,

      totalPrice: 380,

      status: "confirmed",

      createdAt: new Date("2026-03-05")
    }
  ]
}

export const properties: Property[] = [propertyExample]

for (let i = 2; i <= 20; i++) {
  const type = propertyTypes[i % propertyTypes.length]
  const cityIndex = i % 4

  const city =
    cityIndex === 0
      ? "Bogotá"
      : cityIndex === 1
      ? "Medellín"
      : cityIndex === 2
      ? "Cartagena"
      : "Cali"

  const location = `${city}, Colombia`

  const amenitiesCount = (i % baseAmenities.length) + 3

  properties.push({
    id: `property-${i}`,

    name:
      type === "apartment"
        ? `Moderno apartamento en ${city}`
        : type === "house"
        ? `Casa familiar en ${city}`
        : type === "studio"
        ? `Estudio acogedor en ${city}`
        : `Loft moderno en ${city}`,

    description: `Alojamiento de prueba ${i} en ${city}, ideal para turistas y viajeros de negocios. Espacio cómodo, buena ubicación y servicios esenciales.`,

    location,

    pricePerNight: 40 + i * 3,

    images: [
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg",
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample.jpg",
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-3.jpg",
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-4.jpg"
    ],

    ownerId: fallbackOwner[i % fallbackOwner.length],
    type,

    maxGuests: 2 + (i % 5),
    bedrooms: 1 + (i % 4),
    bathrooms: 1 + (i % 3),

    amenities: baseAmenities.slice(0, amenitiesCount),

    available: i % 3 !== 0,

    rating: 3.5 + (i % 15) * 0.1,

    reviews: [
      {
        user: "Guest User",
        rating: 4,
        comment: `Nice place to stay. Mock review ${i}.`
      }
    ],

    reservations: []
  })
}
