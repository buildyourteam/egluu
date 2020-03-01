import { createSlice } from '@reduxjs/toolkit';

const peopleSlice = createSlice({
  name: 'People',
  initialState: {
    isLoading: false,
    isError: false,
    Default: {
      open: false,
      text: '',
    },
    // people 상세페이지 초기 데이터
    people: {
      userId: '',
      imgUrl: '',
      userName: '',
      role: '',
      stack: '',
      contact: '',
      area: '',
      level: 0,
      description: '',
    },
    // 메인페이지 people card 데이터
    peopleCard: [
      {
        userId: '',
        imgUrl: '',
        userName: '',
        stack: '',
        level: 0,
      },
    ],
  },
  reducers: {
    // people list용
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
    // 메인페이지 people용
    getMainPeopleData(state, action) {
      state.isLoading = true;
    },
    getMainPeopleDataSuccess(state, action) {
      state.isLoading = false;
      state.peopleCard = action.payload;
    },
    // people detail 페이지 용
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
    },
    // profile make 페이지용
    makeProfile(state, action) {
      state.isLoading = true;
    },
    makeProfileSuccess(state, action) {
      state.isLoading = false;
    },
    getFindPeople(state, action) {
      state.isLoading = true;
    },
  },
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
  setPeopleDetailSuccess,
  makeProfile,
  makeProfileSuccess,
  getFindPeople,
} = peopleSlice.actions;
export default peopleSlice.reducer;
