export type BlockchainType = "ethereum" | "polygon" | "arbitrum"

export interface PropertyWeb3 {
  tokenized: boolean
  tokenId?: string
  contractAddress?: string
  blockchain?: BlockchainType
  verifiedOnChain?: boolean
}