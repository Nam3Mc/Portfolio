// interfaces/Contract.ts

export type ContractStatus =
  | "pending"    // esperando aprobación
  | "approved"   // aprobado, esperando pago
  | "active"     // ya pagado, contrato en curso
  | "cancelled"  // cancelado por usuario
  | "rejected"   // rechazado por owner

export interface Contract {
  id: string

  propertyId: string
  ownerId: string
  tenantId: string

  status: ContractStatus

  startDate: Date
  endDate: Date
  months: number

  pricePerMonth: number

  // 💰 clave para tu flujo de pago
  totalAmount: number
  isPaid: boolean
  paidAt?: Date

  createdAt: Date
}