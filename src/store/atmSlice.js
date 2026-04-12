import { createSlice } from '@reduxjs/toolkit';

export const atmSlice = createSlice({
  name: 'atm',
  initialState: {
    saldo: 1000,
  },
  reducers: {
    depositar: (state, action) => {
      state.saldo += Number(action.payload);
    },
    levantar: (state, action) => {
      state.saldo -= Number(action.payload);
    },
  },
});

export const { depositar, levantar } = atmSlice.actions;
export default atmSlice.reducer;