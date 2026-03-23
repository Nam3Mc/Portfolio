import { Property } from "@/src/rentafacil/interfaces/Property"
import { PropertyWeb3 } from "../interfaces/propertyWeb3"
import { users } from "./users"

// Filtramos los usuarios que son propietarios
const ownerUsers = users.filter(u => u.role === "owner")

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

// Helper para asignar algunas propiedades como Web3
const getWeb3Info = (i: number): Partial<PropertyWeb3> | undefined => {
  if (i % 4 === 0) {
    const blockchains: PropertyWeb3["blockchain"][] = ["ethereum", "polygon", "arbitrum"]
    const blockchain = blockchains[i % blockchains.length]
    return {
      tokenized: true,
      tokenId: `token-${i}`,
      contractAddress: `0x${Math.floor(Math.random() * 1e16).toString(16)}`,
      blockchain,
      verifiedOnChain: i % 2 === 0
    }
  }
  return undefined
}

// Coordenadas aproximadas por ciudad (simuladas)
const cityCoords: Record<string, { lat: number; lng: number }> = {
  Bogotá: { lat: 4.711, lng: -74.072 },
  Medellín: { lat: 6.244, lng: -75.574 },
  Cartagena: { lat: 10.391, lng: -75.479 },
  Cali: { lat: 3.437, lng: -76.522 }
}

export const properties: (Property | PropertyWeb3)[] = []

for (let i = 1; i <= 20; i++) {
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

  const coords = cityCoords[city]

  const address = `${i} Calle Falsa, ${city}, Colombia`
  const amenitiesCount = (i % baseAmenities.length) + 3

  const owner = ownerUsers[i % ownerUsers.length]

  const baseProperty: Property = {
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
    address,
    lat: coords.lat + (Math.random() - 0.5) * 0.02, // ligeras variaciones
    lng: coords.lng + (Math.random() - 0.5) * 0.02,
    pricePerNight: 40 + i * 3,
    images: [
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg",
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample.jpg",
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-3.jpg",
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-4.jpg",
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-4.jpg"

    ],
    ownerId: owner.id,
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
  }

  const web3Data = getWeb3Info(i)
  if (web3Data) {
    properties.push({ ...baseProperty, ...web3Data })
  } else {
    properties.push(baseProperty)
  }
}