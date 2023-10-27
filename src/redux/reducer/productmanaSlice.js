import { createSlice } from "@reduxjs/toolkit";

const CartStock = createSlice({
  name: "CartStocks",
  initialState: true,
  reducers: {
    ProductStock: (state, action) => {
      return (state = !state);
    },
  },
});

const { actions, reducer } = CartStock;
export const { ProductStock } = actions;
export default reducer;
