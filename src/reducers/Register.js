import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "Register",
  initialState: {
    isLoading: false,
    isError: false,
    Default: {
      open: false,
      text: ""
    },

    register: {
      name: "",
      userId: "",
      userEmail: "",
      password: ""
    }
  },
  reducers: {
    register(state, action) {
      state.isLoading = true;
    },
    registerSuccess(state, action) {
      state.register = action.payload;
      state.isLoading = false;
    },
    registerFail(state, action) {
      state.isLoading = false;
      state.isError = false;
    }
  }
});

export const {
  register,
  registerSuccess,
  registerFail
} = registerSlice.actions;
export default registerSlice.reducer;
