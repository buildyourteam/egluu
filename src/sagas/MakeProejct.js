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
    // makeproject는 로그인 토큰을 전달해야 가능
    // 하위 코드는 이를 위한 임시 로그인 테스트 코드

    const header = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const tmpLogin = {
      userId: 'eskiiimotest',
      password: 'password',
    };
    const resLogin = yield call(
      [axios, 'post'],
      `https://api.codingnome.dev/auth/signin`,
      tmpLogin,
      header,
    );
    console.log(resLogin.headers);
    const data = action.payload;
    const tempData = {
      projectName: data.projectName,
      teamName: data.teamName,
      endDate: '2020-02-20T11:11:00',
      description: data.description,
      status: null,
      dday: 0,
      projectField: data.field,
      currentMember: null,
      needMember: data.needMember,
      memberList: null,
    };
    // link로 넘어올예정임 수정예정
    // console.log(tempData);
    // const res = yield call(
    //   [axios, "post"],
    //   `https://api.codingnome.dev/projects`,
    //   tempData
    // );
    yield put(makeProjectSuccess());
    // window.location.replace(`/projects/${res.data.projectId}`);
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
