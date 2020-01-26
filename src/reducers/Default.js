import { createSlice } from '@reduxjs/toolkit';

const defaultSlice = createSlice({
  name: 'Default',
  initialState: {
    isLoading: false,
    isError: false,
    Default: {
      open: false,
      text: ''
    },
    mainData: [{
      img: '',
      title: '',
      people: '',
      remain: 0,
      day: 0,
      developer: 0,
      designer: 0,
      planner: 0
  }]
  },
  reducers: {
    getDefault(state, action) {
      state.isLoading = true;
    },
    getDefaultSuccess(state, action) {
      state.Default = action.payload
      state.isLoading = false;
    },
    getDefaultFail(state, action) {
      state.isLoading = false;
      state.isError = false;
    },
    getMainData(state, action){
      state.isLoading = true;
    },
    getMainDataSuccess(state, action){
      state.isLoading = false;
      state.mainData = action.payload;
    }
  },
});

export const {
  getDefault,
  getDefaultSuccess,
  getDefaultFail,
  getMainData,
  getMainDataSuccess
} = defaultSlice.actions;
export default defaultSlice.reducer;
