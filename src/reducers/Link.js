import { createSlice } from '@reduxjs/toolkit';

const linkSlice = createSlice({
  name: 'People',
  initialState: {
    isLoading: false,
    isError: false,
    link: [],
  },
  reducers: {
    // people list용
    getLink(state, action) {
      state.isLoading = true;
    },
    getLinkSuccess(state, action) {
      state.link = action.payload;
      state.isLoading = false;
    },
    getLinkFail(state, action) {
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export const { getLink, getLinkSuccess, getLinkFail } = linkSlice.actions;
export default linkSlice.reducer;
