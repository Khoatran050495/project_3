import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "../../api/UserSlice";

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await UserAPI.login(userData);
    console.log(response);
    const checkid = response.data.data.role;
    if (checkid == 2) {
      localStorage.setItem("userLogin", JSON.stringify(response.data.data));
      localStorage.setItem("accessToken", response.data.accessToken);
      return response;
    } else {
      return "error";
    }
  } catch (error) {
    return error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: "",
    token: "",
    isLoggedIn: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.data = action.payload?.data?.data;
      state.token = action.payload?.data?.accessToken;
      state.isLoggedIn = true;
    },
  },
});

const { actions, reducer } = userSlice;
export default reducer;
