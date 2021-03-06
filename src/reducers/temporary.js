import { createSlice } from '@reduxjs/toolkit';

const temporaryRedux = createSlice({
  name: 'project',
  initialState: {
    temporary: 0,
  },
  reducers: {
    setTemporary(state, action) {
      state.temporary = action.payload;
    },
  },
});

export const {
  setTemporary,
} = temporaryRedux.actions;
export default temporaryRedux.reducer;
