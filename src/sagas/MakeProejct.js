import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  getProjectFail,
  makeProject,
  makeProjectSuccess,
} from '../reducers/Project';

const axios = require('axios');

const BASEURL = 'https://api.codingnome.dev';
// ProjectDetail 페이지에서 project Get
function* makeProjectLoad(action) {
  try {
    const data = action.payload;
    const tempData = {
      projectName: data.projectName,
      teamName: data.teamName,
      needMember: data.needMember,
      endDate: data.endDate,
      projectField: data.field,
      description: data.description,
      currentMember: null,
    };
    // link로 넘어올예정임 수정예정
    console.log(tempData);
    const res = yield call(
      [axios, 'post'],
      `https://api.codingnome.dev/projects`,
      tempData,
    );
    yield put(makeProjectSuccess());
    window.location.replace(`/projects/${res.data.projectId}`);
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}
function* watchMakeProjectLoad() {
  yield takeLatest(makeProject, makeProjectLoad);
}

export default function* makeProjectSaga() {
  yield all([fork(watchMakeProjectLoad)]);
}
