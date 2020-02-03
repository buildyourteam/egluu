import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  getDefault,
  getDefaultSuccess,
  getDefaultFail
} from "../reducers/Default";
import {
  getProjectData,
  getProjectDataSuccess,
  getProjectFail,
  getMainData,
  getMainDataSuccess,
  getProjectDetail,
  getProjectDetailSuccess,
  setProjectDetail,
  setProjectDetailSuccess
} from "../reducers/Project";
import {
  getPeopleData,
  getPeopleDataSuccess,
  getPeopleFail,
  getMainPeopleData,
  getMainPeopleDataSuccess,
  getPeopleDetail,
  getPeopleDetailSuccess,
  setPeopleDetail,
  setPeopleDetailSuccess
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
      other: 0,
      designer: 0
    },
    needMember: {
      developer: 3,
      planner: 2,
      other: 1,
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
      other: 1,
      designer: 2
    },
    needMember: {
      developer: 6,
      planner: 2,
      other: 1,
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
      other: 1,
      designer: 2
    },
    needMember: {
      developer: 5,
      planner: 2,
      other: 2,
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
    name: "라이언",
    tag: ["React JS", "Python", "JAVA"],
    level: 1
  },
  {
    userId: "1",
    imgUrl:
      "https://img.insight.co.kr/static/2017/05/25/700/8b0150slwpwuni6385m0.jpg",
    name: "오리",
    tag: ["Vue JS", "Django", "Ruby on Rails"],
    level: 1
  },
  {
    userId: "2",
    imgUrl: "http://schoolsam.co.kr/web/product/big/kko88s.jpg",
    name: "어피치",
    tag: ["Python", "JAVA"],
    level: 4
  },
  {
    userId: "3",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWDagz6NBt8oHxMbMQu2HVcFGhUrIZNQNZNUbVz206cxDUtxdC&s",
    name: "네오",
    tag: ["JAVA", "Django"],
    level: 13
  },
  {
    userId: "4",
    imgUrl:
      "http://mblogthumb3.phinf.naver.net/20160625_210/bjy0524_1466833747375ihpeN_PNG/%B7%BF%C3%F7%B8%C1%B0%ED%B6%F3%C0%CC%BE%F0%BB%E7%C1%F8.png?type=w800",
    name: "라이언",
    tag: ["Spring boot", "Ruby on Rails"],
    level: 1
  }
];
// BasicPage에서 projectCard (인기, 추천, 신규)
function* getProjectListLoad() {
  try {
    yield put(getMainDataSuccess(tempList));
  } catch (err) {
    console.log(err);
    yield put(getDefaultFail());
  }
}

// BasicPage에서 peopleCard
function* getPeopleListLoad() {
  try {
    yield put(getMainPeopleDataSuccess(peopleList));
  } catch (err) {
    console.log(err);
    yield put(getDefaultFail());
  }
}

// BasicPage에서 projectCard와 peopleCard 가져오기
function* watchGetMainPageLoad() {
  yield takeLatest(getMainData, getProjectListLoad);
  yield takeLatest(getMainPeopleData, getPeopleListLoad);
}

// Project 페이지에서 project
function* getProjectLoad() {
  try {
    yield put(getProjectDataSuccess(tempList));
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}
function* watchGetProjectLoad() {
  yield takeLatest(getProjectData, getProjectLoad);
}

// People 페이지에서 people
function* getPeopleLoad() {
  try {
    yield put(getPeopleDataSuccess(peopleList));
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}
function* watchGetPeopleLoad() {
  yield takeLatest(getPeopleData, getPeopleLoad);
}

// ProjectDetail 페이지에서 project Get
function* getProjectDetailLoad(action) {
  try {
    const url = window.location.pathname.split("/"); // 현 주소값 쪼갬
    const useUrl = url[2];
    const data = tempList.filter(value => {
      return value.projectId === useUrl;
    }); // 임시 데이터

    const tempData = {
      // 임시 데이터
      ...data[0],
      endDate: data[0].Dday,
      projectDescription: `${data[0].projectName}의 projectDescription입니다.<a href="https://en.wikipedia.org/wiki/HTML">HTML</a>`,
      memberList: [
        { userId: 11, status: 0 },
        { userId: 12, status: 1 },
        { userId: 13, status: 2 }
      ]
    };
    yield put(getProjectDetailSuccess(tempData));
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
    yield put(setProjectDetailSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}
function* watchSetProjectDetailLoad() {
  yield takeLatest(setProjectDetail, setProjectDetailLoad);
}

// PeopleDetail 페이지에서 project Get
function* getPeopleDetailLoad(action) {
  try {
    const url = window.location.pathname.split("/"); // 현 주소값 쪼갬
    const useUrl = url[2];
    console.log(useUrl);
    const data = peopleList.filter(value => {
      return value.userId === useUrl;
    }); // 임시 데이터
    console.log(data[0]);
    const tempData = {
      // 임시 데이터
      ...data[0],
      technicalStack: [`python`, `Django`, `ReactJS`],
      role: [`Frontend`, `Backend`],
      contact: `${data[0].name}의 연락처..`,
      area: `Seoul`
    };
    yield put(getPeopleDetailSuccess(tempData));
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}
function* watchGetPeopleDetailLoad() {
  yield takeLatest(getPeopleDetail, getPeopleDetailLoad);
}

// PeopleDetail 페이지에서 project Set
function* setPeopleDetailLoad(action) {
  try {
    const data = action.payload;
    yield put(setPeopleDetailSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}
function* watchSetPeopleDetailLoad() {
  yield takeLatest(setPeopleDetail, setPeopleDetailLoad);
}

export default function* defaultSaga() {
  yield all([
    fork(watchGetMainPageLoad),
    fork(watchGetProjectLoad),
    fork(watchGetPeopleLoad),
    fork(watchGetProjectDetailLoad),
    fork(watchSetProjectDetailLoad),
    fork(watchGetPeopleDetailLoad),
    fork(watchSetPeopleDetailLoad)
  ]);
}
