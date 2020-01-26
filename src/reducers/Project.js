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
    projectData: [{
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
    getProjectData(state, action) {
      state.isLoading = true;
    },
    getProjectDataSuccess(state, action) {
      state.projectData = action.payload
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
