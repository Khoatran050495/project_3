import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "../../api/user";
import { PostOrdersAPI } from "../../api/OrdersClient";

export const register = createAsyncThunk(
  "register/fecthauthAPI",
  async (payload) => {
    try {
      const response = await UserAPI.register(payload);
      const userId = response.data.user.id;
      const orderValue = {
        Users_id: userId,
      };
      const postOrder = await PostOrdersAPI.PostOrders(orderValue);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await UserAPI.login(userData);
    const checkid = response.data.data.role;
    if (checkid == 1) {
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
