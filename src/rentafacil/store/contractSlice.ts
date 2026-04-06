// store/slices/contractSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ContractState {
  propertyId: string | null
  startDate: string | null
  months: number | null
}

const initialState: ContractState = {
  propertyId: null,
  startDate: null,
  months: null,
}

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setContractData: (
      state,
      action: PayloadAction<{
        propertyId: string
        startDate: string
        months: number
      }>
    ) => {
      state.propertyId = action.payload.propertyId
      state.startDate = action.payload.startDate
      state.months = action.payload.months
    },
  },
})

export const { setContractData } = contractSlice.actions
export default contractSlice.reducer