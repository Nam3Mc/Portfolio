import { Property } from "@/src/rentafacil/interfaces/Property"
import { RequiredDocument } from "../interfaces/RequiredDocument"
import { users, guestUsers } from "./users"
import { PropertyWeb3 } from "../interfaces/propertyWeb3"
import { contracts } from "./contracts" // 🔥 IMPORTANTE

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

/* =========================================================
   📄 DOCUMENT GENERATOR
========================================================= */

const getDocumentsByType = (type: Property["type"]): RequiredDocument[] => {
  const baseDocs: RequiredDocument[] = [
    {
      id: "doc-id",
      name: "Cédula de ciudadanía",
      description: "Documento de identidad vigente",
      required: true,
      type: "image"
    },
    {
      id: "doc-income",
      name: "Certificado de ingresos",
      description: "Debe incluir salario y antigüedad",
      required: true,
      type: "pdf"
    }
  ]

  const extraDocs: RequiredDocument[] =
    type === "house"
      ? [
          {
            id: "doc-family",
            name: "Declaración núcleo familiar",
            required: false,
            type: "pdf"
          }
        ]
      : type === "apartment"
      ? [
          {
            id: "doc-coownership",
            name: "Reglamento de copropiedad firmado",
            required: true,
            type: "pdf"
          }
        ]
      : type === "loft"
      ? [
          {
            id: "doc-independent",
            name: "Certificación de ingresos independiente",
            required: true,
            type: "pdf"
          }
        ]
      : []

  return [...baseDocs, ...extraDocs]
}

/* =========================================================
   🔗 WEB3
========================================================= */

const getWeb3Info = (i: number): Partial<PropertyWeb3> => {
  if (i % 4 === 0) {
    const blockchains: PropertyWeb3["blockchain"][] = [
      "ethereum",
      "polygon",
      "arbitrum"
    ]
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

/* =========================================================
   📍 COORDS
========================================================= */

const cityCoords: Record<string, { lat: number; lng: number }> = {
  Bogotá: { lat: 4.711, lng: -74.072 },
  Medellín: { lat: 6.244, lng: -75.574 },
  Cartagena: { lat: 10.391, lng: -75.479 },
  Cali: { lat: 3.437, lng: -76.522 }
}

/* =========================================================
   🏠 PROPERTIES
========================================================= */

export const properties: (Property | PropertyWeb3)[] = []

for (let i = 1; i <= 40; i++) {
  const type = propertyTypes[i % propertyTypes.length]

  const city =
    i % 4 === 0
      ? "Bogotá"
      : i % 4 === 1
      ? "Medellín"
      : i % 4 === 2
      ? "Cartagena"
      : "Cali"

  const coords = cityCoords[city]

  const owner = ownerUsers[i % ownerUsers.length]

  // 🔥 ID REAL DE PROPIEDAD
  const propertyId = `property-${i}`

  // 🔥 BUSCAR CONTRATO REAL
  const contract = contracts.find(c => c.propertyId === propertyId)

  // 🔥 ESTADO DERIVADO
  const isOccupied = contract?.status === "approved"
  const contractEnd = contract?.endDate || null

  // 🔥 TENANT REAL SI EXISTE
  const tenant = contract
    ? guestUsers.find(u => u.id === contract.tenantId)!
    : guestUsers[i % guestUsers.length] // fallback para reviews

  const baseProperty: Property = {
    id: propertyId,

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

    documentsRequired: getDocumentsByType(type).map(doc => ({
      ...doc,
      id: `${doc.id}-${i}`
    })),

    // 🔥 AHORA VIENE DE CONTRATO
    isOccupied,
    availableFrom: contractEnd,

    currentContract: contract
      ? {
          id: contract.id,
          startDate: contract.startDate,
          endDate: contract.endDate,
          months: contract.months,
          tenantId: contract.tenantId
        }
      : undefined,

    rating: 3.5 + (i % 15) * 0.1,

    reviews: [
      {
        user: tenant.name,
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