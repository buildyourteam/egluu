import { createSlice } from '@reduxjs/toolkit';

const defaultSlice = createSlice({
  name: 'Default',
  initialState: {
    isLoading: false,
    isError: false,
    Default: {
      open: false,
      text: '',
    },
    projectCard: [
      {
        imgUrl: '',
        projectName: '',
        teamName: '',
        currentMember: {
          developer: 0,
          planner: 0,
          other: 0,
          designer: 0,
        },
        needMember: {
          developer: 0,
          planner: 0,
          other: 0,
          designer: 0,
        },
        Dday: 0,
      },
    ],
    peopleCard: [
      {
        userId: '',
        imgUrl: '',
        name: '',
        tag: [],
        level: 0,
      },
    ],
  },
  reducers: {
    getDefault(state, action) {
      state.isLoading = true;
    },
    getDefaultSuccess(state, action) {
      state.projectCard = action.payload;
      state.isLoading = false;
    },
    getDefaultFail(state, action) {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {
  getDefault,
  getDefaultSuccess,
  getDefaultFail,
} = defaultSlice.actions;
export default defaultSlice.reducer;
