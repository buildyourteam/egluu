import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  getPeopleData,
  getPeopleDataSuccess,
  getPeopleFail
} from "../reducers/People";

const axios = require("axios");
const peopleList = [
  {
    userId: "0",
    imgUrl:
      "http://mblogthumb3.phinf.naver.net/20160625_210/bjy0524_1466833747375ihpeN_PNG/%B7%BF%C3%F7%B8%C1%B0%ED%B6%F3%C0%CC%BE%F0%BB%E7%C1%F8.png?type=w800",
    userName: "라이언",
    role: "개발자",
    stack: "#ReactJS#Python#JAVA",
    level: 1,
    contact: "라이언의 연락처",
    area: "seoul",
    description: "안녕하세요 라이언입니다."
  },
  {
    userId: "1",
    imgUrl:
      "https://img.insight.co.kr/static/2017/05/25/700/8b0150slwpwuni6385m0.jpg",
    userName: "오리",
    role: "개발자",
    stack: "#Vue JS#Django#Ruby on Rails",
    level: 1,
    contact: "오리의 연락처",
    area: "busan",
    description: "안녕하세요 오리입니다."
  },
  {
    userId: 2,
    imgUrl: "http://schoolsam.co.kr/web/product/big/kko88s.jpg",
    userName: "어피치",
    role: "개발자",
    stack: "#Python#JAVA",
    level: 4,
    contact: "어피치의 연락처",
    area: "daegu",
    description: "안녕하세요 어피치입니다."
  },
  {
    userId: "3",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWDagz6NBt8oHxMbMQu2HVcFGhUrIZNQNZNUbVz206cxDUtxdC&s",
    userName: "네오",
    role: "개발자",
    stack: "#JAVA#Django",
    level: 13,
    contact: "네오의 연락처",
    area: "gangwon",
    description: "안녕하세요 네오입니다."
  },
  {
    userId: "4",
    imgUrl:
      "http://mblogthumb3.phinf.naver.net/20160625_210/bjy0524_1466833747375ihpeN_PNG/%B7%BF%C3%F7%B8%C1%B0%ED%B6%F3%C0%CC%BE%F0%BB%E7%C1%F8.png?type=w800",
    userName: "라이언",
    role: "개발자",
    stack: "#Spring boot#Ruby on Rails",
    level: 1,
    contact: "라이언의 연락처",
    area: "gwangju",
    description: "안녕하세요 라이언입니다."
  }
];
const BASEURL = "https://api.codingnome.dev";
// People 페이지에서 people
function* getPeopleLoad() {
  try {
    // const res = yield call(
    //   [axios, 'get'],
    //   `${BASEURL}/api/projects?page=0&size=10&sort=projectName%2CDESC&occupation=developer&field=WEB`,
    // );
    // console.log(res);
    // yield put(getPeopleDataSuccess(res.data));
    yield put(getPeopleDataSuccess(peopleList));
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}
function* watchGetPeopleLoad() {
  yield takeLatest(getPeopleData, getPeopleLoad);
}

export default function* defaultSaga() {
  yield all([fork(watchGetPeopleLoad)]);
}
