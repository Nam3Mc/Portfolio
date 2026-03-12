export interface WalletConnection {
  connected: boolean           // si la wallet está conectada
  address?: string             // dirección de la wallet
  chainId?: number             // ID de la red (Ethereum, Polygon, etc)
  networkName?: string         // nombre legible de la red
  balance?: string             // balance en la criptomoneda principal (ej. ETH, USDC)
  ensName?: string | null      // opcional, si tiene ENS asociado
  provider?: any               // provider de ethers o wagmi para hacer llamadas
  signer?: any                 // signer para firmar transacciones
  connect: () => Promise<void> // función para conectarse
  disconnect: () => void       // función para desconectar
}
