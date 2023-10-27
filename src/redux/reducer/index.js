import { combineReducers } from "redux";
import orders from "./OrderSlice";
import UserSlice from "./UserSlice";
import ProductStock from "./productmanaSlice";

const rootReducer = combineReducers({
  Orders: orders,
  UserSlice: UserSlice,
  ProductStock: ProductStock,
});

export default rootReducer;
