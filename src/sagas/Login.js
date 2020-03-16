import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import { loginFail, login, loginSuccess } from "../reducers/Login";

const axios = require("axios");

const BASEURL = "https://api.codingnome.dev";
// ProjectDetail 페이지에서 project Get
function* loginLoad(action) {
  try {
    const data = action.payload;
    const loginData = {
      userId: data.id,
      password: data.password
    };

    const header = {
      "Content-Type": "application/json;charset=UTF-8"
    };
    const resLogin = yield call(
      [axios, "post"],
      `https://api.codingnome.dev/auth/signin`,
      loginData,
      header
    );
    //console.log(resLogin.headers.authtoken);
    const token = resLogin.headers.authtoken;
    yield put(loginSuccess(token));

    //세션 스토리지에 아이디와 토큰 저장.
    //페이지간 이동시 세션 유지
    //로그아웃이나 나가기 시 세션삭제
    window.sessionStorage.setItem("id", data.id);
    window.sessionStorage.setItem("accessToken", token);

    window.location.replace(`/`);
  } catch (err) {
    console.log(err);
    console.log("login fail");

    yield put(loginFail());
  }
}
function* watchLoginLoad() {
  yield takeLatest(login, loginLoad);
}

export default function* loginSaga() {
  yield all([fork(watchLoginLoad)]);
}
