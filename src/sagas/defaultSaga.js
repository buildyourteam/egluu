import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {   
  getDefault,
  getDefaultSuccess,
  getDefaultFail,
  getMainData,
  getMainDataSuccess
} from '../reducers/Default';
import {
  getProjectData,
  getProjectDataSuccess,
  getProjectFail
} from '../reducers/Project'

function* setDefaultLoad(action) {
  try {
    const data = action.payload;
    yield put(getDefaultSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getDefaultFail());
  }
}
function* watchSetDefaultLoad() {
  yield takeLatest(getDefault, setDefaultLoad);
}

function* setMainPageLoad(){
  try {
    const tempList = [{
      img: 'https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg',
      title: '댈러스 매버릭스',
      people: '돈치치와 포르징기스',
      remain: 3,
      day: 1,
      developer: 1,
      designer: 2,
      planner: 0
    },
    {
      img: 'http://www.radiokorea.com/images/news/2017/12/20/278253/1.jpg',
      title: '밀워키 벅스',
      people: '야니스와 미들턴',
      remain: 0,
      day: 2,
      developer: 0,
      designer: 0,
      planner: 0
    },
    {
      img: 'https://post-phinf.pstatic.net/MjAxOTA2MTZfOTgg/MDAxNTYwNjc0NDEyODE2.xwa01ltmAJJF1T9pYTlqixtJQdT08Wh08hngL1HeH9Mg.qNmL9ywDG2NhCHgOY0K1YYtQbpShOJTxIMQtRsE7LDEg.PNG/image.png?type=w1200',
      title: '엘에이 레이커스',
      people: '르브론과 데이비스',
      remain: 7,
      day: 5,
      developer: 2,
      designer: 2,
      planner: 3
    }]
    yield put(getMainDataSuccess(tempList));
  } catch(err){
    console.log(err);
    yield put(getDefaultFail());
  }
}
function* watchSetMainPageLoad() {
  yield takeLatest(getMainData, setMainPageLoad);
}

function* setProjectLoad(){
  try {
    const tempList = [{
      img: 'https://i.ytimg.com/vi/qrhE3pWEjJg/maxresdefault.jpg',
      title: '댈러스 매버릭스',
      people: '돈치치와 포르징기스',
      remain: 3,
      day: 1,
      developer: 1,
      designer: 2,
      planner: 0,
      field: ['앱 서비스', 'AI 서비스']
    },
    {
      img: 'http://www.radiokorea.com/images/news/2017/12/20/278253/1.jpg',
      title: '밀워키 벅스',
      people: '야니스와 미들턴',
      remain: 0,
      day: 2,
      developer: 0,
      designer: 0,
      planner: 0,
      field: ['웹 서비스', 'AI 서비스']
    },
    {
      img: 'https://post-phinf.pstatic.net/MjAxOTA2MTZfOTgg/MDAxNTYwNjc0NDEyODE2.xwa01ltmAJJF1T9pYTlqixtJQdT08Wh08hngL1HeH9Mg.qNmL9ywDG2NhCHgOY0K1YYtQbpShOJTxIMQtRsE7LDEg.PNG/image.png?type=w1200',
      title: '엘에이 레이커스',
      people: '르브론과 데이비스',
      remain: 7,
      day: 5,
      developer: 2,
      designer: 2,
      planner: 3,
      field: ['블록체인', 'AI 서비스']
    },
    {
      img: 'https://public-v2links.adobecc.com/62d6c808-7db9-4ec9-54ca-cce533ccc63d/component?params=component_id%3A52ee116e-0b40-407c-bdf8-a87397e5c27e&params=version%3A0&token=1580091630_da39a3ee_e47b376664f7ea7f8aae7cfaec90385318cf526e&api_key=CometServer1',
      title: '텐서플로우 글꼴 딥러닝',
      people: '윤동우와 아이들',
      remain: 7,
      day: 5,
      developer: 2,
      designer: 2,
      planner: 3,
      field: ['블록체인', 'HW 개발']
    },
    {
      img: 'https://public-v2links.adobecc.com/62d6c808-7db9-4ec9-54ca-cce533ccc63d/component?params=component_id%3A221a7b1f-adc0-458a-a4c2-79c2cadc18f1&params=version%3A0&token=1580091630_da39a3ee_e47b376664f7ea7f8aae7cfaec90385318cf526e&api_key=CometServer1',
      title: '마라탕 지도 어플리케이션',
      people: '윤동우와 아이들',
      remain: 7,
      day: 5,
      developer: 2,
      designer: 2,
      planner: 3,
      field: ['시스템 개발']
    },
    {
      img: 'https://public-v2links.adobecc.com/62d6c808-7db9-4ec9-54ca-cce533ccc63d/component?params=component_id%3A6f3faa32-e50d-4545-952f-c9ca3cd716be&params=version%3A0&token=1580091630_da39a3ee_e47b376664f7ea7f8aae7cfaec90385318cf526e&api_key=CometServer1',
      title: '새해 복 받으세요',
      people: '윤동우와 아이들',
      remain: 7,
      day: 5,
      developer: 2,
      designer: 2,
      planner: 3,
      field: ['기타 개발']
    }]
    yield put(getProjectDataSuccess(tempList));
  } catch(err){
    console.log(err);
    yield put(getProjectFail());
  }
}
function* watchSetProjectLoad() {
  yield takeLatest(getProjectData, setProjectLoad);
}

export default function* defaultSaga() {
    yield all([
      fork(watchSetDefaultLoad),
      fork(watchSetMainPageLoad),
      fork(watchSetProjectLoad)
    ]);
  }