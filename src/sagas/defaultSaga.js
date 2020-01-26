import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {   
  getDefault,
  getDefaultSuccess,
  getDefaultFail
} from '../reducers/Default';
import {
  getProjectData,
  getProjectDataSuccess,
  getProjectFail,
  getMainData,
  getMainDataSuccess,
  getProjectDetail,
  getProjectDetailSuccess
} from '../reducers/Project'

const tempList = [{
  projectId: '1',
  imgUrl: 'https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg',
  projectName: '댈러스 매버릭스',
  teamName: '돈치치와 포르징기스',
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
  Dday: 1580047192000+3600*1000*6,
  field: ['앱 서비스', 'AI 서비스']
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
    designer: 2
  },
  needMember: {
    developer: 6,
    planner: 2,
    other: 1,
    designer: 2
  },
  Dday: 1580047192000+3600*1000*15,
  field: ['웹 서비스', 'AI 서비스']
},
{
  projectId: '3',
  imgUrl: 'https://post-phinf.pstatic.net/MjAxOTA2MTZfOTgg/MDAxNTYwNjc0NDEyODE2.xwa01ltmAJJF1T9pYTlqixtJQdT08Wh08hngL1HeH9Mg.qNmL9ywDG2NhCHgOY0K1YYtQbpShOJTxIMQtRsE7LDEg.PNG/image.png?type=w1200',
  projectName: '엘에이 레이커스',
  teamName: '르브론과 데이비스',
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
  Dday: 1580047192000+3600*1000*5,
  field: ['블록체인', 'AI 서비스']
},
{
  projectId: '4',
  imgUrl: 'https://public-v2links.adobecc.com/62d6c808-7db9-4ec9-54ca-cce533ccc63d/component?params=component_id%3A52ee116e-0b40-407c-bdf8-a87397e5c27e&params=version%3A0&token=1580091630_da39a3ee_e47b376664f7ea7f8aae7cfaec90385318cf526e&api_key=CometServer1',
  projectName: '텐서플로우 글꼴 딥러닝',
  teamName: '윤동우와 아이들',
  currentMember: {
    developer: 4,
    planner: 2,
    other: 2,
    designer: 2
  },
  needMember: {
    developer: 6,
    planner: 3,
    other: 2,
    designer: 4
  },
  Dday: 1580047192000+3600*1000*4,
  field: ['블록체인', 'HW 개발']
},
{
  projectId: '5',
  imgUrl: 'https://public-v2links.adobecc.com/62d6c808-7db9-4ec9-54ca-cce533ccc63d/component?params=component_id%3A221a7b1f-adc0-458a-a4c2-79c2cadc18f1&params=version%3A0&token=1580091630_da39a3ee_e47b376664f7ea7f8aae7cfaec90385318cf526e&api_key=CometServer1',
  projectName: '마라탕 지도 어플리케이션',
  teamName: '윤동우와 아이들',
  currentMember: {
    developer: 2,
    planner: 2,
    other: 0,
    designer: 0
  },
  needMember: {
    developer: 4,
    planner: 4,
    other: 2,
    designer: 2
  },
  Dday: 1580047192000+3600*1000*7,
  field: ['시스템 개발']
},
{
  projectId: '6',
  imgUrl: 'https://public-v2links.adobecc.com/62d6c808-7db9-4ec9-54ca-cce533ccc63d/component?params=component_id%3A6f3faa32-e50d-4545-952f-c9ca3cd716be&params=version%3A0&token=1580091630_da39a3ee_e47b376664f7ea7f8aae7cfaec90385318cf526e&api_key=CometServer1',
  projectName: '새해 복 받으세요',
  teamName: '윤동우와 아이들',
  currentMember: {
    developer: 2,
    planner: 2,
    other: 1,
    designer: 1
  },
  needMember: {
    developer: 2,
    planner: 2,
    other: 1,
    designer: 1
  },
  Dday: 1580047192000+3600*1000*9,
  field: ['기타 개발']
}]

function* setDefaultLoad(action) {
  try {
    // const data = action.payload;
    yield put(getDefaultSuccess(tempList));
  } catch (error) {
    console.log(error);
    yield put(getDefaultFail());
  }
}
function* watchSetDefaultLoad() {
  yield takeLatest(getDefault, setDefaultLoad);
}

function* setProjectListLoad(){
  try {

    yield put(getMainDataSuccess(tempList));
  } catch(err){
    console.log(err);
    yield put(getDefaultFail());
  }
}
function* watchSetMainPageLoad() {
  yield takeLatest(getMainData, setProjectListLoad);
}

function* setProjectLoad(){
  try {
    yield put(getProjectDataSuccess(tempList));
  } catch(err){
    console.log(err);
    yield put(getProjectFail());
  }
}
function* watchSetProjectLoad() {
  yield takeLatest(getProjectData, setProjectLoad);
}

function* setProjectDetailLoad(action){
  try {
    const url = window.location.pathname.split('/'); // 현 주소값 쪼갬
    let useUrl = url[2];
    const data = tempList.filter(value =>{
      return value.projectId === useUrl
    }); // 임시 데이터
    const tempDate = new Date(data[0].Dday);
    console.log(tempDate);
    const tempData = { // 임시 데이터
      ...data[0],
      endDate: tempDate,
      projectDescription: `${data[0].projectName}의 projectDescription입니다.<a href="https://en.wikipedia.org/wiki/HTML">HTML</a>`,
      memberList: [{userId: 11, status: 0}, {userId: 12, status: 1}, {userId: 13, status: 2}]
    }
    yield put(getProjectDetailSuccess(tempData));

  } catch(err){
    console.log(err);
    yield put(getProjectFail());
  }
}
function* watchSetProjectDetailLoad() {
  yield takeLatest(getProjectDetail, setProjectDetailLoad);
}

export default function* defaultSaga() {
    yield all([
      fork(watchSetDefaultLoad),
      fork(watchSetMainPageLoad),
      fork(watchSetProjectLoad),
      fork(watchSetProjectDetailLoad)
    ]);
  }