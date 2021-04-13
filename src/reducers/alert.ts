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
      console.log(action.payload);
      state.sentence = action.payload;
    },
    closeAlert(state) {
      state.isOpen = false;
    },
  },
});

export const { openAlert, closeAlert } = alertRedux.actions;
export default alertRedux.reducer;
