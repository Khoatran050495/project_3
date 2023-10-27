import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: {
    status: true,
    data: "",
  },
  reducers: {
    changeStatus: (state, action) => {
      state.status = !state.status;
      state.data = action.payload;
    },
  },
});

const { actions, reducer } = sideBarSlice;
export const { changeStatus } = actions;
export default reducer;
