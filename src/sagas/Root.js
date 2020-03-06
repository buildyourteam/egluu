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
import { getLink, getLinkSuccess, getLinkFail } from "../reducers/Link";

const axios = require("axios");

const BASEURL = "https://api.codingnome.dev";
// BasicPage에서 projectCard (인기, 추천, 신규)
function* getProjectListLoad(action) {
  try {
    const data = action.payload;
    const res = yield call([axios, "get"], `${BASEURL}/index`);

    console.log(res);
    const resProjectList = yield call(
      [axios, "get"],
      `${res.data._links.projectList.href}`
    );
    const resPeopleList = yield call(
      [axios, "get"],
      `${res.data._links.peopleList.href}`
    );
    const resProjectDeadLine = yield call(
      [axios, "get"],
      `${res.data._links.projectListDeadline.href}`
    );

    const project = {
      projectCard: resProjectList.data._embedded.projectList,
      deadLineProjectList: resProjectDeadLine.data._embedded.projectList
    };
    const people = resPeopleList.data._embedded.peopleList;
    yield put(getMainDataSuccess(project));
    yield put(getMainPeopleDataSuccess(people));
    yield put(getLinkSuccess(res.data._links));
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}

// BasicPage에서 peopleCard
function* getPeopleListLoad(action) {
  try {
    /*
    const data = action.payload;
    const peopleRes = yield call(
      [axios, 'get'],
      `${BASEURL}/api/people?page=${data.pageNum}&size=3&sort=user_name%2CDESC&level=1&role=LEADER&area=Seoul`,
    );
    const firstRes = yield call(
      [axios, 'get'],
      `${peopleRes.data._links.first.href}`,
    );
    console.log(firstRes);
    const peopleData = firstRes.data._embedded.peopleList;
    yield put(getMainPeopleDataSuccess(peopleData));
    */
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
