// mocks/contracts.ts

import { Contract } from "../interfaces/Contract"
import { guestUsers, ownerUsers } from "./users"

export const contracts: Contract[] = []

// 🔥 MISMO TOTAL QUE PROPERTIES
const TOTAL_PROPERTIES = 40

for (let i = 1; i <= TOTAL_PROPERTIES; i++) {
  // 🔥 SOLO ALGUNAS PROPIEDADES TIENEN CONTRATO
  if (i % 2 !== 0) continue

  const propertyId = `property-${i}`

  const tenant = guestUsers[i % guestUsers.length]
  const owner = ownerUsers[i % ownerUsers.length]

  const months = (i % 6) + 1

  const startDate = new Date()
  startDate.setDate(startDate.getDate() + i)

  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + months)

  const statuses: Contract["status"][] = [
    "pending",
    "approved",
    "rejected"
  ]

  const status = statuses[i % statuses.length]

  // 🔥 MISMA LÓGICA DE PRECIO QUE PROPERTY
  const pricePerMonth = (40 + i * 3) * 30

  contracts.push({
    id: `contract-${i}`,

    propertyId,
    ownerId: owner.id,
    tenantId: tenant.id,

    status,

    startDate,
    endDate,
    months,

    pricePerMonth,

    createdAt: new Date()
  })
}