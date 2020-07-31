import axios from "axios";
const BASE_URL = `https://egluuapi.codingnome.dev/profile/`;
// Profile Page 좌측 Info창에서 사용되는 api
export function useInfoApi() {
  // get info api
  const getInfo = async userId => {
    const res = await axios.get(`${BASE_URL}${userId}`);
    return res.data;
  };

  // post info api
  const postInfo = async (userId, data) => {
    const token = window.sessionStorage.getItem("accessToken");
    //console.log(token);
    //console.log(userId);
    const res = await axios.put(`${BASE_URL}${userId}`, data, {
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        authToken: token
      }
    });
    return res;
  };
  return { getInfo, postInfo };
}
export function useImgApi() {
  // get Img api
  const getImg = async userId => {
    const res = await axios.get(`${BASE_URL}image/${userId}`);
    //const res = await axios.get(`https://apis.tracker.delivery/carriers`);
    //console.log(res);
    return res.data;
  };

  const postImg = async (userId, data) => {
    const token = window.sessionStorage.getItem("accessToken");
    //console.log(token);
    //console.log(userId);
    let image = new FormData();
    image.append("image", data.imgUrl);
    const res = await axios.post(`${BASE_URL}image/${userId}`, image, {
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        authToken: token
      }
    });
    console.log(res);
    return res;
  };
  return { getImg, postImg };
}
export function useRunningProjectApi() {
  const getProject = async userId => {
    //const res = await axios.get(`${BASE_URL}${userId}`);
    const res = await axios.get(
      `${BASE_URL}${userId}/running?page=0&size=10&sort=projectName%2CDESC`
    );

    return res.data;
  };
  return { getProject };
}
export function useEndedProjectApi() {
  // 종료된 프로젝트 목록 가져오기
  const getProject = async userId => {
    //const res = await axios.get(`${BASE_URL}${userId}`);
    const res = await axios.get(
      `${BASE_URL}${userId}/ended?page=0&size=10&sort=projectName%2CDESC`
    );
    console.log(`종료프로젝트 목록 ${res.data}`);
    return res.data;
  };

  // 숨긴 프로젝트 목록 가져오기
  const getHideProject = async userId => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${BASE_URL}${userId}/ended/hidden?page=0&size=10&sort=projectName%2CDESC`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          authToken: token
        }
      }
    );
    console.log(`숨긴프로젝트 목록 ${res.data}`);
    return res.data;
  };

  const hideProject = async (userId, projectId) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.delete(
      `${BASE_URL}${userId}/projects/${projectId}`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          authToken: token
        }
      }
    );
    return res.data;
  };

  const displayProject = async (userId, projectId) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.put(
      `${BASE_URL}${userId}/projects/${projectId}`,
      {},
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          authToken: token
        }
      }
    );
    return res.data;
  };

  return { getProject, getHideProject, hideProject, displayProject };
}
export function usePlanProjectApi() {
  const getProject = async userId => {
    //const res = await axios.get(`${BASE_URL}${userId}`);
    const res = await axios.get(
      `${BASE_URL}${userId}/plan?page=0&size=10&sort=projectName%2CDESC`
    );

    return res.data;
  };
  return { getProject };
}
