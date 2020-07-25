import { createSlice } from "@reduxjs/toolkit";

const projectDetail = {
    projectName: "",
    teamName: "",
    endDate: "2020-10-30T23:59:00",
    introduction: "",
    state: 'RECRUTING',
    projectField: "",
    applyCanFile: true,
    needMember: {
        developer: 0,
        designer: 0,
        planner: 0,
        etc: 0
    },
    questions: [],
    currentMember: null,
    memberList: null,
    img: []
}

const projectRedux = createSlice({
    name: "project",
    initialState: {
        projectDetail,
    },
    reducers: {
        setProject(state, action) {
            state.projectDetail = action.payload;
        },
    }
});

export const { setProject } = projectRedux.actions;
export default projectRedux.reducer;
