import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  getPeopleFail,
  makeProfile,
  makeProfileSuccess
} from "../reducers/People";

const axios = require("axios");

const BASEURL = "https://api.codingnome.dev";
// ProjectDetail 페이지에서 project Get
function* makeProfileLoad(action) {
  try {
    const data = action.payload;
    const tempData = {
      // 이미지 파일을 바로 사용사지 못하고 분리해야하므로 데이터 따로 구성
      userName: data.userName,
      role: data.role,
      stack: data.stack,
      contact: data.contact,
      area: data.area,
      level: data.level,
      description: data.description
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
    // const res = yield call(
    //   [axios, "post"],
    //   `${BASEURL}/api/profile`,
    //   tempData
    // );
    yield put(makeProfileSuccess());
    //window.location.replace(`/people/${res.data.userId}`);
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}
function* watchMakeProfileLoad() {
  yield takeLatest(makeProfile, makeProfileLoad);
}

export default function* makeProfileSaga() {
  yield all([fork(watchMakeProfileLoad)]);
}
