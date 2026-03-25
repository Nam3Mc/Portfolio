import { Property } from "@/src/rentafacil/interfaces/Property"
import { PropertyWeb3 } from "../interfaces/propertyWeb3"
import { users, guestUsers } from "./users"

// 👤 Owners
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

// 🔗 Web3
const getWeb3Info = (i: number): Partial<PropertyWeb3> => {
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

  return {
    tokenized: false
  }
}

// 📍 coords
const cityCoords: Record<string, { lat: number; lng: number }> = {
  Bogotá: { lat: 4.711, lng: -74.072 },
  Medellín: { lat: 6.244, lng: -75.574 },
  Cartagena: { lat: 10.391, lng: -75.479 },
  Cali: { lat: 3.437, lng: -76.522 }
}

export const properties: (Property | PropertyWeb3)[] = []

for (let i = 1; i <= 20; i++) {

  const type = propertyTypes[i % propertyTypes.length]

  const city =
    i % 4 === 0 ? "Bogotá" :
    i % 4 === 1 ? "Medellín" :
    i % 4 === 2 ? "Cartagena" :
    "Cali"

  const coords = cityCoords[city]

  const owner = ownerUsers[i % ownerUsers.length]

  // 🔥 AQUÍ VA EL TENANT (CORRECTO)
  const tenant = guestUsers[i % guestUsers.length]

  const isOccupied = i % 3 === 0

  const contractEnd = new Date()
  contractEnd.setMonth(contractEnd.getMonth() + (i % 6) + 1)

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

    description: `Propiedad ${i} en ${city}, ideal para estancias largas con excelente ubicación.`,

    address: `${i} Calle Falsa, ${city}, Colombia`,
    lat: coords.lat + (Math.random() - 0.5) * 0.02,
    lng: coords.lng + (Math.random() - 0.5) * 0.02,

    // 💰 NUEVO MODELO
    pricePerMonth: (40 + i * 3) * 30,

    images: [
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-2.jpg",
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample.jpg",
      "https://res.cloudinary.com/dkwpozl38/image/upload/v1773183885/cld-sample-3.jpg"
    ],

    ownerId: owner.id,
    type,

    maxGuests: 2 + (i % 5),
    bedrooms: 1 + (i % 4),
    bathrooms: 1 + (i % 3),

    amenities: baseAmenities.slice(0, (i % baseAmenities.length) + 3),

    // 🔥 DISPONIBILIDAD REAL
    isOccupied,
    availableFrom: isOccupied ? contractEnd : null,

    // 🔥 CONTRATO CON USUARIO REAL
    currentContract: isOccupied
      ? {
          id: `contract-${i}`,
          startDate: new Date(),
          endDate: contractEnd,
          months: (i % 6) + 1,
          tenantId: tenant.id,
          // tenantName: tenant.name // 👈 BONUS UX
        }
      : undefined,

    rating: 3.5 + (i % 15) * 0.1,

    reviews: [
      {
        user: tenant.name, // 🔥 también real aquí
        rating: 4,
        comment: `Buen lugar. Review ${i}`
      }
    ]
  }

  const web3Data = getWeb3Info(i)

  properties.push({
    ...baseProperty,
    ...web3Data
  })
}