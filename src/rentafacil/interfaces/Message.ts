export interface Message {
  id: string
  contractId: string
  propertyId: string
  senderId: string
  senderRole: "owner" | "tenant"
  text: string
  createdAt: Date
}