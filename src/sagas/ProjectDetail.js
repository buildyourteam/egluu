import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  getProjectFail,
  getProjectDetail,
  getProjectDetailSuccess,
  setProjectDetail,
  setProjectDetailSuccess,
  setProjectDelete,
  setProjectDeleteSuccess
} from "../reducers/Project";

const axios = require("axios");

const BASEURL = "https://api.codingnome.dev";
// ProjectDetail 페이지에서 project Get
function* getProjectDetailLoad() {
  try {
    const url = window.location.pathname.split("/"); // .split('/'); // 현 주소값 쪼갬
    const useUrl = url[2];
    const res = yield call(
      [axios, "get"],
      `${BASEURL}/index/projects/${useUrl}`
    );
    //console.log(res);
    const resProjectDetail = yield call(
      [axios, "get"],
      `${res.data._links.projectDetail.href}`
    );
    //console.log(resProjectDetail);
    let data;
    if (resProjectDetail.data.currentMember === null) {
      data = {
        ...resProjectDetail.data,
        imgUrl: "https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg",
        currentMember: {
          developer: 0,
          planner: 0,
          etc: 0,
          designer: 0
        }
      };
    } else {
      data = {
        ...resProjectDetail.data,
        imgUrl: "https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg"
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
    const url = window.location.pathname; // .split('/'); // 현 주소값 쪼갬
    const useUrl = url[2];
    const inputData = {
      projectName: data.projectName,
      teamName: data.teamName,
      endDate: data.endDate,
      description: data.description,
      // projectField: data.projectField,
      needMember: data.needMember,
      currentMember: data.currentMember
    };
    console.log(inputData);
    const res = yield call([axios, "put"], `${BASEURL}/${url}`, inputData);
    let projectData;
    if (res.data.currentMember === null) {
      projectData = {
        ...res.data,
        imgUrl: "https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg",
        currentMember: {
          developer: 0,
          planner: 0,
          etc: 0,
          designer: 0
        }
      };
    } else {
      projectData = {
        ...res.data,
        imgUrl: "https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg"
      };
    }
    console.log(res);
    yield put(setProjectDetailSuccess(projectData));
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}
function* watchSetProjectDetailLoad() {
  yield takeLatest(setProjectDetail, setProjectDetailLoad);
}

function* setProjectDeleteLoad(action) {
  try {
    const url = window.location.pathname.split("/"); // 현 주소값 쪼갬
    const useUrl = url[2];
    yield call([axios, "delete"], `${BASEURL}/projects/${useUrl}`);
    yield put(setProjectDeleteSuccess());
    window.location.replace("/project");
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}
function* watchSetProjectDeleteLoad() {
  yield takeLatest(setProjectDelete, setProjectDeleteLoad);
}

export default function* defaultSaga() {
  yield all([
    fork(watchGetProjectDetailLoad),
    fork(watchSetProjectDetailLoad),
    fork(watchSetProjectDeleteLoad)
  ]);
}
