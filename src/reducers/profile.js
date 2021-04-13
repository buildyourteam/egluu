import { createSlice } from "@reduxjs/toolkit";

const profileRedux = createSlice({
  name: "hide",
  initialState: {
    isHideChange: true
  },
  reducers: {
    setHideChange(state, action) {
      state.isHideChange = action.payload.isHideChange;
    }
  }
});

export const { setHideChange } = profileRedux.actions;
export default profileRedux.reducer;
