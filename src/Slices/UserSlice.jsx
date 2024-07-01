import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userdata: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userdata = action.payload;
    },
    logout: (state) => {
      state.userdata = null;
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
