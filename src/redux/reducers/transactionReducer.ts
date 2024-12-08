import { createSlice } from "@reduxjs/toolkit";

const initialState:any = [
    { id: "1", name: "Dave Patrick", email: "dave@gmail.com", type: 'FD', amount: 20000 },
    { id: "2", name: "Hank Gluhwein", email: "hank@gmail.com", type: 'FD', amount: 20000  },
];

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addDeposit(state, action) {
      state.push(action.payload);
    },
    removeDeposit(state,action) {
        const { id } = action.payload;
        const existingDeposit = state.find((deposit:any) => deposit.id === id);
        if (existingDeposit) {
            return state.filter((deposit:any) => deposit.id !== id);
        }
    }
  },
});

export const { addDeposit } = transactionSlice.actions;

export default transactionSlice.reducer;