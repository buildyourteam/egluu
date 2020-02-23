import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  getProjectCardList,
  getProjectCardListSuccess,
  getProjectFail,
} from '../reducers/Project';

const axios = require('axios');

const BASEURL = 'https://api.codingnome.dev';
// Project 페이지에서 project
function* getProjectCardListLoad() {
  try {
    const res = yield call(
      [axios, 'get'],
      `${BASEURL}/api/projects?page=0&size=10&sort=projectName%2CDESC&occupation=developer&field=WEB`,
    );
    yield put(getProjectCardListSuccess(res.data));
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}
function* watchProjectCardList() {
  yield takeLatest(getProjectCardList, getProjectCardListLoad);
}

export default function* projectListSaga() {
  yield all([fork(watchProjectCardList)]);
}
