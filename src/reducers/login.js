import { createSlice } from "@reduxjs/toolkit";

const loginRedux = createSlice({
  name: "login",
  initialState: {
    isToken: false,
    userId: ""
  },
  reducers: {
    setToken(state, action) {
      state.isToken = action.payload.isToken;
      state.userId = action.payload.userId;
    }
  }
});

export const { setToken } = loginRedux.actions;
export default loginRedux.reducer;
