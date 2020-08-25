import { createSlice } from "@reduxjs/toolkit";

const alertRedux = createSlice({
  name: "alert",
  initialState: {
    isOpen: false,
    sentence: "",
  },
  reducers: {
    openAlert(state, action) {
      state.isOpen = true;
      state.sentence = action.payload;
    },
    closeAlert(state, action) {
      state.isOpen = false;
    },
  },
});

export const { openAlert, closeAlert } = alertRedux.actions;
export default alertRedux.reducer;
