import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  getProjectFail,
  getMainData,
  getMainDataSuccess
} from "../reducers/Project";
import {
  getMainPeopleData,
  getMainPeopleDataSuccess,
  getPeopleFail
} from "../reducers/People";

const tempList = [
  {
    projectId: "1",
    imgUrl: "https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg",
    projectName: "댈러스 매버릭스",
    teamName: "돈치치와 포르징기스",
    currentMember: {
      developer: 1,
      planner: 1,
      etc: 0,
      designer: 0
    },
    needMember: {
      developer: 3,
      planner: 2,
      etc: 1,
      designer: 2
    },
    Dday: 1580047192000 + 3600 * 1000 * 6,
    field: ["앱 서비스", "AI 서비스"]
  },
  {
    projectId: "2",
    imgUrl: "http://www.radiokorea.com/images/news/2017/12/20/278253/1.jpg",
    projectName: "밀워키 벅스",
    teamName: "야니스와 미들턴",
    currentMember: {
      developer: 3,
      planner: 1,
      etc: 1,
      designer: 2
    },
    needMember: {
      developer: 6,
      planner: 2,
      etc: 1,
      designer: 2
    },
    Dday: 1580047192000 + 3600 * 1000 * 15,
    field: ["웹 서비스", "AI 서비스"]
  },
  {
    projectId: "3",
    imgUrl:
      "https://post-phinf.pstatic.net/MjAxOTA2MTZfOTgg/MDAxNTYwNjc0NDEyODE2.xwa01ltmAJJF1T9pYTlqixtJQdT08Wh08hngL1HeH9Mg.qNmL9ywDG2NhCHgOY0K1YYtQbpShOJTxIMQtRsE7LDEg.PNG/image.png?type=w1200",
    projectName: "엘에이 레이커스",
    teamName: "르브론과 데이비스",
    currentMember: {
      developer: 3,
      planner: 1,
      etc: 1,
      designer: 2
    },
    needMember: {
      developer: 5,
      planner: 2,
      etc: 2,
      designer: 3
    },
    Dday: 1580047192000 + 3600 * 1000 * 5,
    field: ["블록체인", "AI 서비스"]
  }
];

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

const axios = require("axios");

const BASEURL = "https://api.codingnome.dev";
// BasicPage에서 projectCard (인기, 추천, 신규)
function* getProjectListLoad() {
  try {
    const res = yield call(
      [axios, "get"],
      `${BASEURL}/api/projects?page=0&size=10&sort=projectName%2CDESC&occupation=developer&field=WEB`
    );
    console.log(res);
    const projectRes = yield call([axios, "get"], `${BASEURL}/api/projects`);
    console.log(projectRes);
    const data = projectRes.data._embedded.projectList.map(value => {
      if (value.currentMember === null) {
        return {
          ...value,
          imgUrl: "https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg",
          currentMember: {
            developer: 0,
            planner: 0,
            etc: 0,
            designer: 0
          }
        };
      }
      return {
        ...value,
        imgUrl: "https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg"
      };
    });
    yield put(getMainDataSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}

// BasicPage에서 peopleCard
function* getPeopleListLoad() {
  try {
    //yield put(getMainPeopleDataSuccess(peopleList));
    const res = yield call([axios, "get"], `${BASEURL}/api/people`);
    console.log(res.data._embedded);
    const data = res.data._embedded.peopleList.map(value => {
      return {
        ...value,
        imgUrl:
          "http://mblogthumb3.phinf.naver.net/20160625_210/bjy0524_1466833747375ihpeN_PNG/%B7%BF%C3%F7%B8%C1%B0%ED%B6%F3%C0%CC%BE%F0%BB%E7%C1%F8.png?type=w800"
      };
    });

    yield put(getMainPeopleDataSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}

// BasicPage에서 projectCard와 peopleCard 가져오기
function* watchGetMainPageLoad() {
  yield takeLatest(getMainData, getProjectListLoad);
  yield takeLatest(getMainPeopleData, getPeopleListLoad);
}

export default function* rootSaga() {
  yield all([fork(watchGetMainPageLoad)]);
}
