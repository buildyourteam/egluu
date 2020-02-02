import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  getDefault,
  getDefaultSuccess,
  getDefaultFail,
} from '../reducers/Default';
import {
  getProjectData,
  getProjectDataSuccess,
  getProjectFail,
  getMainData,
  getMainDataSuccess,
  getProjectDetail,
  getProjectDetailSuccess,
  setProjectDetail,
  setProjectDetailSuccess,
} from '../reducers/Project';

const tempList = [
  {
    projectId: '1',
    imgUrl: 'https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg',
    projectName: '댈러스 매버릭스',
    teamName: '돈치치와 포르징기스',
    currentMember: {
      developer: 1,
      planner: 1,
      other: 0,
      designer: 0,
    },
    needMember: {
      developer: 3,
      planner: 2,
      other: 1,
      designer: 2,
    },
    Dday: 1580047192000 + 3600 * 1000 * 6,
    field: ['앱 서비스', 'AI 서비스'],
  },
  {
    projectId: '2',
    imgUrl: 'http://www.radiokorea.com/images/news/2017/12/20/278253/1.jpg',
    projectName: '밀워키 벅스',
    teamName: '야니스와 미들턴',
    currentMember: {
      developer: 3,
      planner: 1,
      other: 1,
      designer: 2,
    },
    needMember: {
      developer: 6,
      planner: 2,
      other: 1,
      designer: 2,
    },
    Dday: 1580047192000 + 3600 * 1000 * 15,
    field: ['웹 서비스', 'AI 서비스'],
  },
  {
    projectId: '3',
    imgUrl:
      'https://post-phinf.pstatic.net/MjAxOTA2MTZfOTgg/MDAxNTYwNjc0NDEyODE2.xwa01ltmAJJF1T9pYTlqixtJQdT08Wh08hngL1HeH9Mg.qNmL9ywDG2NhCHgOY0K1YYtQbpShOJTxIMQtRsE7LDEg.PNG/image.png?type=w1200',
    projectName: '엘에이 레이커스',
    teamName: '르브론과 데이비스',
    currentMember: {
      developer: 3,
      planner: 1,
      other: 1,
      designer: 2,
    },
    needMember: {
      developer: 5,
      planner: 2,
      other: 2,
      designer: 3,
    },
    Dday: 1580047192000 + 3600 * 1000 * 5,
    field: ['블록체인', 'AI 서비스'],
  },
];

function* getProjectListLoad() {
  try {
    yield put(getMainDataSuccess(tempList));
  } catch (err) {
    console.log(err);
    yield put(getDefaultFail());
  }
}
function* watchGetMainPageLoad() {
  yield takeLatest(getMainData, getProjectListLoad);
}

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

function* getProjectDetailLoad(action) {
  try {
    const url = window.location.pathname.split('/'); // 현 주소값 쪼갬
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
        { userId: 13, status: 2 },
      ],
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

export default function* defaultSaga() {
  yield all([
    fork(watchGetMainPageLoad),
    fork(watchGetProjectLoad),
    fork(watchGetProjectDetailLoad),
    fork(watchSetProjectDetailLoad),
  ]);
}
