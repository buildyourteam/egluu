import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  getProjectFail,
  getMainData,
  getMainDataSuccess,
} from '../reducers/Project';
import {
  getMainPeopleData,
  getMainPeopleDataSuccess,
  getPeopleFail,
} from '../reducers/People';

const axios = require('axios');

const BASEURL = 'https://api.codingnome.dev';
// BasicPage에서 projectCard (인기, 추천, 신규)
function* getProjectListLoad() {
  try {
    const res = yield call(
      [axios, 'get'],
      `${BASEURL}/api/projects?page=0&size=10&sort=projectName%2CDESC&occupation=developer&field=WEB`,
    );
    console.log(res);
    const projectRes = yield call([axios, 'get'], `${BASEURL}/api/projects`);
    console.log(projectRes);
    yield put(getMainDataSuccess(res.data.page));
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}

// BasicPage에서 peopleCard
function* getPeopleListLoad() {
  try {
    yield put(getMainPeopleDataSuccess([]));
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}

// BasicPage에서 projectCard와 peopleCard 가져오기
function* watchGetMainPageLoad() {
  yield takeLatest(getMainData, getProjectListLoad);
  yield takeLatest(getMainPeopleData, getPeopleListLoad);
}

export default function* rootSaga() {
  yield all([fork(watchGetMainPageLoad)]);
}
