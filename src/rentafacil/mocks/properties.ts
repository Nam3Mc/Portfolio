import { Property } from "@/src/rentafacil/interfaces/Property"
import { users } from "./users"

// Obtener solo usuarios que sean owner
const ownerIds = users.filter((u) => u.role === "owner").map((u) => u.id)

// fallback por si no hay owners
const fallbackOwner = ownerIds.length > 0 ? ownerIds : ["demo-owner"]

const propertyTypes: Property["type"][] = [
  "apartment",
  "house",
  "loft",
  "penthouse",
]

export const properties: Property[] = [
  {
    id: "property-1",
    name: "Apartamento Moderno en Bogotá",
    description: "Apartamento luminoso, cerca de centros comerciales.",
    location: "Bogotá, Colombia",
    pricePerNight: 50,
    images: [
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
    ],
    ownerId: fallbackOwner[0],
    type: "apartment",

    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,

    amenities: ["WiFi", "Cocina", "Aire acondicionado"],
    available: true,

    reviews: [
      {
        user: "Michael",
        rating: 5,
        comment: "Amazing apartment, very clean."
      },
      {
        user: "Laura",
        rating: 4,
        comment: "Great location near restaurants."
      }
    ]
  },

  {
    id: "property-2",
    name: "Casa Familiar en Medellín",
    description: "Amplia casa con jardín y piscina.",
    location: "Medellín, Colombia",
    pricePerNight: 120,
    images: [
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
    ],
    ownerId: fallbackOwner[0],
    type: "house",

    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,

    amenities: ["Piscina", "Parqueadero", "WiFi"],
    available: true,

    reviews: [
      {
        user: "Daniel",
        rating: 5,
        comment: "Perfect for family vacations."
      },
      {
        user: "Sofia",
        rating: 5,
        comment: "Beautiful house and great host."
      }
    ]
  },

  {
    id: "property-3",
    name: "Loft Minimalista en Cartagena",
    description: "Loft con diseño moderno y vista al mar.",
    location: "Cartagena, Colombia",
    pricePerNight: 80,
    images: [
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
    ],
    ownerId: fallbackOwner[0],
    type: "loft",

    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,

    amenities: ["WiFi", "Cocina", "Vista al mar"],
    available: true,

    reviews: [
      {
        user: "Ana",
        rating: 5,
        comment: "Amazing sea view!"
      },
      {
        user: "Carlos",
        rating: 4,
        comment: "Very stylish and comfortable."
      }
    ]
  }
]

// Generar automáticamente hasta tener 20 propiedades
for (let i = 4; i <= 20; i++) {

  properties.push({
    id: `property-${i}`,
    name: `Propiedad de prueba ${i}`,
    description: `Descripción de la propiedad de prueba ${i}.`,
    location: `Ciudad ${i}, Colombia`,
    pricePerNight: 40 + i,

    images: [
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
      `https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg`,
    ],

    ownerId: fallbackOwner[i % fallbackOwner.length],
    type: propertyTypes[i % propertyTypes.length],

    maxGuests: 2 + (i % 6),
    bedrooms: 1 + (i % 4),
    bathrooms: 1 + (i % 3),

    amenities: ["WiFi", "Cocina", "Aire acondicionado", "Piscina"].slice(
      0,
      (i % 4) + 1
    ),

    available: i % 3 !== 0,

    reviews: [
      {
        user: "Guest User",
        rating: 4,
        comment: "Nice place to stay."
      }
    ]
  })

}