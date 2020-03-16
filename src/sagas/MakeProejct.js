import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  getProjectFail,
  makeProject,
  makeProjectSuccess
} from "../reducers/Project";

const axios = require("axios");

const BASEURL = "https://api.codingnome.dev";
// ProjectDetail 페이지에서 project Get
function* makeProjectLoad(action) {
  try {
    // makeproject는 로그인 토큰을 전달해야 가능

    const data = action.payload;
    const tempData = {
      projectName: data.projectName,
      teamName: data.teamName,
      endDate: data.endDate,
      description: data.description,
      status: null,
      dday: 0,
      projectField: data.field,
      currentMember: null,
      needMember: data.needMember,
      memberList: null
    };

    const token = window.sessionStorage.getItem("accessToken");
    const headers = {
      authToken: token
    };

    const res = yield call(
      [axios, "post"],
      `https://api.codingnome.dev/projects`,
      tempData,
      { headers: headers }
    );
    yield put(makeProjectSuccess());
    window.location.replace(`${res.data._links.createdProject.href}`);
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
