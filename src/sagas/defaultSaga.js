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

function* getDefaultLoad(action) {
  try {
    // const data = action.payload;
    yield put(getDefaultSuccess(tempList));
  } catch (error) {
    console.log(error);
    yield put(getDefaultFail());
  }
}
function* watchGetDefaultLoad() {
  yield takeLatest(getDefault, getDefaultLoad);
}

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
    fork(watchGetDefaultLoad),
    fork(watchGetMainPageLoad),
    fork(watchGetProjectLoad),
    fork(watchGetProjectDetailLoad),
    fork(watchSetProjectDetailLoad),
  ]);
}
