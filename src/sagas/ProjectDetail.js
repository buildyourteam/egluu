import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  getProjectFail,
  getProjectDetail,
  getProjectDetailSuccess,
  setProjectDetail,
  setProjectDetailSuccess,
} from '../reducers/Project';

const axios = require('axios');

const BASEURL = 'https://api.codingnome.dev';
// ProjectDetail 페이지에서 project Get
function* getProjectDetailLoad() {
  try {
    const url = window.location.pathname.split('/'); // 현 주소값 쪼갬
    const useUrl = url[2];
    const res = yield call([axios, 'get'], `${BASEURL}/api/projects/${useUrl}`);
    let data;
    if (res.data.currentMember === null) {
      data = {
        ...res.data,
        imgUrl: 'https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg',
        currentMember: {
          developer: 0,
          planner: 0,
          etc: 0,
          designer: 0,
        },
      };
    } else {
      data = {
        ...res.data,
        imgUrl: 'https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg',
      };
    }
    yield put(getProjectDetailSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}
function* watchGetProjectDetailLoad() {
  yield takeLatest(getProjectDetail, getProjectDetailLoad);
}

// ProjectDetail 페이지에서 project Set
function* setProjectDetailLoad(action) {
  try {
    const data = action.payload;
    yield put(setProjectDetailSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}
function* watchSetProjectDetailLoad() {
  yield takeLatest(setProjectDetail, setProjectDetailLoad);
}

export default function* defaultSaga() {
  yield all([fork(watchGetProjectDetailLoad), fork(watchSetProjectDetailLoad)]);
}
