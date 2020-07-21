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
    },
    setTokenFlag(state, action) {
      state.isToken = action.payload
    }
  }
});

export const { setToken, setTokenFlag } = loginRedux.actions;
export default loginRedux.reducer;
