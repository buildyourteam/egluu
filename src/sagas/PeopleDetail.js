import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  getPeopleFail,
  getPeopleDetail,
  getPeopleDetailSuccess,
  setPeopleDetail,
  setPeopleDetailSuccess
} from "../reducers/People";
import { getLink, getLinkSuccess, getLinkFail } from "../reducers/Link";
import { useSelector, useDispatch } from "react-redux";

const axios = require("axios");

const BASEURL = "https://api.codingnome.dev";
// PeopleDetail 페이지에서 project Get

function* getPeopleDetailLoad(action) {
  try {
    const url = window.location.pathname.split("/"); // .split('/'); // 현 주소값 쪼갬
    const useUrl = url[2];
    //console.log(useUrl);
    const res = yield call(
      [axios, "get"],
      `${BASEURL}/index/profile/${useUrl}`
    );
    const resPeople = yield call(
      [axios, "get"],
      `${res.data._links.profileDetail.href}`
    );

    const resProfileProject = yield call(
      [axios, "get"],
      `${BASEURL}/profile/${useUrl}/projects?page=0&size=10&sort=projectName%2CDESC`
    );
    const tempPeople = {
      ...resPeople.data,
      imgUrl: `${BASEURL}/profile/image/${useUrl}`,
      isImgChange: false,
      projects: resProfileProject.data._embedded.projectList
    };
    console.log(resProfileProject.data._embedded.projectList);
    console.log(tempPeople);
    yield put(getPeopleDetailSuccess(tempPeople));
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
    //현 주소값 쪼개서 아이디 가져오기
    const url = window.location.pathname.split("/");
    const useUrl = url[2];

    //세션 스토리지에서 토큰을 가져오기
    const token = window.sessionStorage.getItem("accessToken");

    const peopleData = {
      userName: data.userName,
      role: "DEVELOPER",
      // 지금은 SPRINGBOOT, GO, DJANGO 세개밖에안됨. 패치후 수정예정
      stacks: ["DJANGO", "GO"],
      contact: "010-1234-5678",
      area: data.area,
      //레벨은 api 데이터 형식상 보내야 하지만, 서버측에서 임의변동되지 않도록 막아두었음
      level: 0,
      description: data.description
    };

    const res = yield call(
      [axios, "put"],
      `${BASEURL}/profile/${useUrl}`,
      peopleData,
      {
        headers: {
          authToken: token
        }
      }
    );
    //console.log(res);

    // isImgChange는 수정 버튼을 누르고 이미지를 업로드 했을 때
    // imgInput 컴포넌트에서 이를 true로 변경함.
    // 이미지를 수정하지 않았을 때 매번 이미지가 교체되는 부담을 덜기 위해 생성
    // 변경된 이후 getPeopleDetailLoad()안에서 서버에서 리덕스로 결과값을 받아오면서 다시
    // false로 설정해줌

    //console.log(data.isImgChange);

    // 지금 db에 이미지 중복체크 안돼서 오류나니까 패치 전까지 이미지 업로드 하지 말기.
    // if (data.isImgChange) {
    //   let image = new FormData();
    //   image.append("image", data.imgUrl);
    //   const imgRes = yield call(
    //     [axios, "post"],
    //     `https://api.codingnome.dev/profile/image/${useUrl}`,
    //     image,
    //     {
    //       headers: {
    //         "Content-type": "multipart/form-data",
    //         authToken: token
    //       }
    //     }
    //   );
    //   console.log("이미지 변경");
    // }

    const tmpData = {
      ...res.data,
      imgUrl:
        "https://file3.instiz.net/data/cached_img/upload/2018/11/27/19/87ebda101425d5992c306bbc6d2b6b05.jpg"
    };

    yield put(setPeopleDetailSuccess(tmpData));
    //window.location.replace(`/profile/${useUrl}`);

    //yield put(getLinkSuccess(res.data._links));
  } catch (err) {
    console.log(err);
    yield put(getPeopleFail());
  }
}
function* watchSetPeopleDetailLoad() {
  yield takeLatest(setPeopleDetail, setPeopleDetailLoad);
}

export default function* defaultSaga() {
  yield all([fork(watchSetPeopleDetailLoad), fork(watchGetPeopleDetailLoad)]);
}
