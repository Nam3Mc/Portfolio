export type BlockchainType = "ethereum" | "polygon" | "arbitrum"

export interface PropertyWeb3 {
  tokenized: boolean

  // 🔗 Solo existe si está tokenizada
  tokenId?: string
  contractAddress?: string
  blockchain?: BlockchainType

  // ✅ Verificación on-chain
  verifiedOnChain?: boolean
}