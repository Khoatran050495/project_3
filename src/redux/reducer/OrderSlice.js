import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: true,
  reducers: {
    CartItem: (state, action) => {
      return (state = !state);
    },
  },
});

const { actions, reducer } = CartSlice;
export const { CartItem, CartStock } = actions;
export default reducer;
