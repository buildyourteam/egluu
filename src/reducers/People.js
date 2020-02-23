import { createSlice } from "@reduxjs/toolkit";

const peopleSlice = createSlice({
  name: "People",
  initialState: {
    isLoading: false,
    isError: false,
    Default: {
      open: false,
      text: ""
    },
    people: {
      userId: "",
      imgUrl: "",
      userName: "",
      role: "",
      stack: "",
      contact: "",
      area: "",
      level: 0,
      description: ""
    },
    peopleCard: [
      {
        userId: "",
        imgUrl: "",
        userName: "",
        stack: "",
        level: 0
      }
    ]
  },
  reducers: {
    //people list용
    getPeopleData(state, action) {
      state.isLoading = true;
    },
    getPeopleDataSuccess(state, action) {
      state.peopleCard = action.payload;
      state.isLoading = false;
    },
    getPeopleFail(state, action) {
      state.isLoading = false;
      state.isError = false;
    },
    //메인페이지 people용(인기, 추천, 신규)
    getMainPeopleData(state, action) {
      state.isLoading = true;
    },
    getMainPeopleDataSuccess(state, action) {
      state.isLoading = false;
      state.peopleCard = action.payload;
    },
    //people detail 페이지 용
    getPeopleDetail(state, action) {
      state.isLoading = true;
    },
    getPeopleDetailSuccess(state, action) {
      state.people = action.payload;
      state.isLoading = false;
    },
    setPeopleDetail(state, action) {
      state.isLoading = true;
    },
    setPeopleDetailSuccess(state, action) {
      state.isLoading = false;
      state.people = action.payload;
    }
  }
});

export const {
  getPeopleData,
  getPeopleDataSuccess,
  getPeopleFail,
  getMainPeopleData,
  getMainPeopleDataSuccess,
  getPeopleDetail,
  getPeopleDetailSuccess,
  setPeopleDetail,
  setPeopleDetailSuccess
} = peopleSlice.actions;
export default peopleSlice.reducer;
