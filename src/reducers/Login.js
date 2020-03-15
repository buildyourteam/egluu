import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "Login",
  initialState: {
    isLoading: false,
    isError: false,
    Default: {
      open: false,
      text: ""
    },
    // people 상세페이지 초기 데이터

    token: {
      authToken: ""
    }
  },
  reducers: {
    login(state, action) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.token.authToken = action.payload;
      state.isLoading = false;
    },
    loginFail(state, action) {
      state.isLoading = false;
      state.isError = false;
    }
  }
});

export const { login, loginSuccess, loginFail } = loginSlice.actions;
export default loginSlice.reducer;
