import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  getProjectCardList,
  getProjectCardListSuccess,
  getProjectFail,
} from '../reducers/Project';

const axios = require('axios');

const BASEURL = 'https://api.codingnome.dev';
// Project 페이지에서 project
function* getProjectCardListLoad(action) {
  try {
    const data = action.payload;
    const res = yield call(
      [axios, 'get'],
      `${BASEURL}/projects?page=${data.page}&size=${data.size}&sort=${data.sort}&occupation=${data.occupation}&field=${data.field}`,
    );
    try {
      const projectData = res.data._embedded.projectList.map(value => {
        return {
          ...value,
          imgUrl: 'https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg',
        };
      });
      yield put(getProjectCardListSuccess(projectData));
    } catch (err) {
      yield put(getProjectCardListSuccess([]));
    }
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
