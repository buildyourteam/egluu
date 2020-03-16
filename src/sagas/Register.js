import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import { register, registerSuccess, registerFail } from "../reducers/Register";

const axios = require("axios");

const BASEURL = "https://api.codingnome.dev";
// ProjectDetail 페이지에서 project Get
function* registerLoad(action) {
  try {
    const data = action.payload;
    const registerData = {
      userId: data.userId,
      userEmail: data.userEmail,
      password: data.password,
      name: data.name
    };
    // 회원가입 후 자동 로그인?
    // const loginData = {
    //     userId: data.id,
    //     password: data.password
    //   };

    //   const header = {
    //     "Content-Type": "application/json;charset=UTF-8"
    //   };
    //   const resLogin = yield call(
    //     [axios, "post"],
    //     `https://api.codingnome.dev/auth/signin`,
    //     loginData,
    //     header
    //   );

    const resRegister = yield call(
      [axios, "post"],
      `https://api.codingnome.dev/auth/signup`,
      registerData
    );
    //console.log(resLogin.headers.authtoken);
    yield put(registerSuccess());

    window.location.replace(`/auth/login`);
  } catch (err) {
    console.log(err);
    console.log("register fail");

    yield put(registerFail());
  }
}
function* watchRegisterLoad() {
  yield takeLatest(register, registerLoad);
}

export default function* registerSaga() {
  yield all([fork(watchRegisterLoad)]);
}
