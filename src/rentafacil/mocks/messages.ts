import { Message } from "../interfaces/Message"
import { contracts } from "./contracts"
import { users } from "./users"

export const messages: Message[] = []

contracts.forEach((contract, i) => {

  const owner = users.find(u => u.id === contract.ownerId)!
  const tenant = users.find(u => u.id === contract.tenantId)!

  // 🔥 conversación base por contrato
  const baseMessages: Message[] = [
    {
      id: `msg-${contract.id}-1`,
      contractId: contract.id,
      propertyId: contract.propertyId,
      senderId: owner.id,
      senderRole: "owner",
      text: "Hola, revisé tu contrato.",
      createdAt: new Date(contract.startDate)
    },
    {
      id: `msg-${contract.id}-2`,
      contractId: contract.id,
      propertyId: contract.propertyId,
      senderId: tenant.id,
      senderRole: "tenant",
      text: "Perfecto, muchas gracias.",
      createdAt: new Date(contract.startDate)
    }
  ]

  // 🔥 si está aprobado agregamos mensaje extra
  if (contract.status === "approved") {
    baseMessages.push({
      id: `msg-${contract.id}-3`,
      contractId: contract.id,
      propertyId: contract.propertyId,
      senderId: owner.id,
      senderRole: "owner",
      text: "Contrato aprobado. Todo listo para continuar.",
      createdAt: new Date(contract.startDate)
    })
  }

  messages.push(...baseMessages)
})