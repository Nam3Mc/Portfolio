import { Property } from "./Property"

export interface PropertyWeb3 extends Property {
  tokenized?: boolean
  tokenId?: string
  contractAddress?: string
  blockchain?: "ethereum" | "polygon" | "arbitrum"
  verifiedOnChain?: boolean
  
}