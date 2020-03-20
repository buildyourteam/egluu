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

    //세션 스토리지에서 토큰을 가져오기
    const token = window.sessionStorage.getItem("accessToken");

    // 데이터 업로드
    const res = yield call(
      [axios, "post"],
      `https://api.codingnome.dev/projects`,
      tempData,
      {
        headers: {
          authToken: token
        }
      }
    );

    // image 업로드
    let image = new FormData();
    image.append("image", data.imgUrl);
    const imgRes = yield call(
      [axios, "post"],
      `https://api.codingnome.dev/projects/image/5`,
      image,
      {
        headers: {
          "Content-type": "multipart/form-data",
          authToken: token
        }
      }
    );
    yield put(makeProjectSuccess());

    //성공 후 해당 프로젝트 디테일 페이지로 이동
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
