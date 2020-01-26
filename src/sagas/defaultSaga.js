import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {   
  getDefault,
  getDefaultSuccess,
  getDefaultFail,
  getMainData,
  getMainDataSuccess
} from '../reducers/Default';

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

export default function* defaultSaga() {
    yield all([
      fork(watchSetDefaultLoad),
      fork(watchSetMainPageLoad)
    ]);
  }