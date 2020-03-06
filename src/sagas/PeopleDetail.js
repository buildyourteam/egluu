import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  getPeopleFail,
  getPeopleDetail,
  getPeopleDetailSuccess,
  setPeopleDetail,
  setPeopleDetailSuccess
} from "../reducers/People";
import { getLink, getLinkSuccess, getLinkFail } from "../reducers/Link";

const axios = require("axios");

const BASEURL = "https://api.codingnome.dev";
// PeopleDetail 페이지에서 project Get
function* getPeopleDetailLoad(action) {
  try {
    const url = window.location.pathname.split("/"); // .split('/'); // 현 주소값 쪼갬
    const useUrl = url[2];
    console.log(useUrl);
    const res = yield call(
      [axios, "get"],
      `${BASEURL}/index/profile/${useUrl}`
    );
    const resPeople = yield call(
      [axios, "get"],
      `${res.data._links.profileDetail.href}`
    );
    const tempPeople = {
      ...resPeople.data,
      imgUrl: "https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg"
    };
    yield put(getPeopleDetailSuccess(tempPeople));
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}
function* watchGetPeopleDetailLoad() {
  yield takeLatest(getPeopleDetail, getPeopleDetailLoad);
}

// PeopleDetail 페이지에서 project Set
function* setPeopleDetailLoad(action) {
  try {
    const data = action.payload;
    const url = window.location.pathname; // .split('/'); // 현 주소값 쪼갬
    const peopleData = {
      userName: data.userName,
      role: data.role,
      stack: data.stack,
      contact: data.contact,
      area: data.area,
      level: data.level,
      description: data.description
    };
    const res = yield call([axios, "put"], `${BASEURL}${url}`, peopleData);
    yield put(setPeopleDetailSuccess(data));
    yield put(getLinkSuccess(res.data._links));
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}
function* watchSetPeopleDetailLoad() {
  yield takeLatest(setPeopleDetail, setPeopleDetailLoad);
}

export default function* defaultSaga() {
  yield all([fork(watchSetPeopleDetailLoad), fork(watchGetPeopleDetailLoad)]);
}
