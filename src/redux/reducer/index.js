import { combineReducers } from "redux";
import userSlice from "./userSlice";
import sideBarSlice from "./sidebarSice";
import cartSlice from "./CartSlice";

const rootReducer = combineReducers({
  user: userSlice,
  sideBarSlice: sideBarSlice,
  cartSlice: cartSlice,
});

export default rootReducer;
