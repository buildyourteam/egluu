import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  getPeopleData,
  getPeopleDataSuccess,
  getPeopleFail,
} from '../reducers/People';

const axios = require('axios');

const BASEURL = 'https://api.codingnome.dev';
// People 페이지에서 people
function* getPeopleLoad() {
  try {
    const res = yield call(
      [axios, 'get'],
      `${BASEURL}/api/projects?page=0&size=10&sort=projectName%2CDESC&occupation=developer&field=WEB`,
    );
    console.log(res);
    yield put(getPeopleDataSuccess(res.data));
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}
function* watchGetPeopleLoad() {
  yield takeLatest(getPeopleData, getPeopleLoad);
}

export default function* defaultSaga() {
  yield all([fork(watchGetPeopleLoad)]);
}
