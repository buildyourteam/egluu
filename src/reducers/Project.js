import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'Project',
  initialState: {
    isLoading: false,
    isError: false,
    Default: {
      open: false,
      text: ''
    },
    projectCard: [{
      imgUrl: '',
      projectName: '',
      teamName: '',
      currentMember: {
        developer: 0,
        planner: 0,
        other: 0,
        designer: 0
      },
      needMember: {
        developer: 0,
        planner: 0,
        other: 0,
        designer: 0
      },
      Dday: 0
    }],
  },
  reducers: {
    getProjectData(state, action) {
      state.isLoading = true;
    },
    getProjectDataSuccess(state, action) {
      state.projectCard = action.payload
      state.isLoading = false;
    },
    getProjectFail(state, action) {
      state.isLoading = false;
      state.isError = false;
    }
  },
});

export const {
    getProjectData,
    getProjectDataSuccess,
    getProjectFail
} = projectSlice.actions;
export default projectSlice.reducer;
