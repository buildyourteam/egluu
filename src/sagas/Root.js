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

function* getProjectListLoad(action) {
  try {
    const data = action.payload;
    const res = yield call([axios, "get"], `${BASEURL}/index`);

    //RootPage에서 projectCard
    const resProjectList = yield call(
      [axios, "get"],
      `${res.data._links.projectList.href}`
    );
    //RootPage에서 마감이 임박한 프로젝트
    const resProjectDeadLine = yield call(
      [axios, "get"],
      `${res.data._links.projectListDeadline.href}`
    );
    if (resProjectDeadLine.data.page.totalElements !== 0) {
      const project = {
        projectCard: resProjectList.data._embedded.projectList,
        deadLineProjectList: resProjectDeadLine.data._embedded.projectList
      };
      yield put(getMainDataSuccess(project));
    } else {
      const project = {
        projectCard: [],
        deadLineProjectList: []
      };
      yield put(getMainDataSuccess(project));
    }

    //RootPage에서 peopleCard
    const resPeopleList = yield call(
      [axios, "get"],
      `${res.data._links.peopleList.href}`
    );
    if (resPeopleList.data.page.totalElements !== 0) {
      const people = resPeopleList.data._embedded.peopleList;
      yield put(getMainPeopleDataSuccess(people));
    } else {
      yield put(getMainPeopleDataSuccess([]));
    }
    yield put(getLinkSuccess(res.data._links));
  } catch (err) {
    console.log(err);
    yield put(getProjectFail());
  }
}

// BasicPage에서 projectCard와 peopleCard 가져오기
function* watchGetMainPageLoad() {
  yield takeLatest(getMainData, getProjectListLoad);
}

export default function* rootSaga() {
  yield all([fork(watchGetMainPageLoad)]);
}
