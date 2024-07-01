import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../Slices/UserSlice";

const store = configureStore({
  reducer: {
    user: useReducer,
  },
});
export default store;
