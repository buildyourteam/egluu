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
      // 이미지 파일을 바로 사용사지 못하고 분리해야하므로 데이터 따로 구성
      projectName: data.projectName,
      teamName: data.teamName,
      needMember: data.needMember,
      endDate: data.endDate,
      projectField: 'SYSTEM',
      description: data.description,
      currentMember: null,
    };
    /*
    const headers = {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
      Accept: 'application/hal+json',
    };
    const blob = yield new Blob([data.imgUrl[0]], {
      type: data.imgUrl.type,
    });
    const formData = yield new FormData();
    yield formData.append('files', blob);

    */
    /*
    const res = yield call(
      [axios, 'post'],
      `${BASEURL}/api/projects/image/1`,
      { image: formData },
      {
        headers,
      },
    );
    */
    const res = yield call(
      [axios, 'post'],
      `${BASEURL}/api/projects`,
      tempData,
    );
    yield put(makeProjectSuccess());
    window.location.replace(`/project/${res.data.projectId}`);
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
