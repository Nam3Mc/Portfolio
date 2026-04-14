// interfaces/Contract.ts

export interface Contract {
  id: string

  propertyId: string
  ownerId: string
  tenantId: string

  status: "pending" | "approved" | "rejected"

  startDate: Date
  endDate: Date
  months: number

  pricePerMonth: number

  createdAt: Date
}