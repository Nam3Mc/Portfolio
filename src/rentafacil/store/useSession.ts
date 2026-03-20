import { create } from "zustand"

interface SessionState {

  user: any | null
  wallet: string | null

  login: (user:any)=>void
  logout: ()=>void

  connectWallet: (address:string)=>void
  disconnectWallet: ()=>void
}

export const useSession = create<SessionState>((set)=>({

  user: null,
  wallet: null,

  login:(user)=>set({user}),

  logout:()=>set({
    user:null,
    wallet:null
  }),

  connectWallet:(address)=>set({
    wallet:address
  }),

  disconnectWallet:()=>set({
    wallet:null
  })

}))