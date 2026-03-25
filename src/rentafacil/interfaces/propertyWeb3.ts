import { Property } from "./Property"

export type BlockchainNetwork =
  | "ethereum"
  | "polygon"
  | "arbitrum"

export interface PropertyWeb3 extends Property {
  // 🔗 Estado de tokenización
  tokenized: boolean

  // 🪙 Identificación en blockchain
  tokenId?: string
  contractAddress?: string

  // 🌐 Red blockchain
  blockchain?: BlockchainNetwork

  // ✅ Verificación
  verifiedOnChain?: boolean
}