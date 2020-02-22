import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  getPeopleFail,
  getPeopleDetail,
  getPeopleDetailSuccess,
  setPeopleDetail,
  setPeopleDetailSuccess,
} from '../reducers/People';

const axios = require('axios');

const BASEURL = 'https://api.codingnome.dev';
// PeopleDetail 페이지에서 project Get
function* getPeopleDetailLoad(action) {
  try {
    const url = window.location.pathname.split('/'); // 현 주소값 쪼갬
    const useUrl = url[2];
    const res = yield call(
      [axios, 'get'],
      `${BASEURL}/api/projects?page=0&size=10&sort=projectName%2CDESC&occupation=developer&field=WEB`,
    );
    console.log(res);
    yield put(getPeopleDetailSuccess(res.data));
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
    const res = yield call(
      [axios, 'get'],
      `${BASEURL}/api/projects?page=0&size=10&sort=projectName%2CDESC&occupation=developer&field=WEB`,
    );
    console.log(res);
    yield put(setPeopleDetailSuccess(data));
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
