import axios from "axios";
import { useSelector } from "react-redux";
import refreshToken from "../auth/refreshToken";

// Profile Page 좌측 Info창에서 사용되는 api
export function useInfoApi() {
  // get info api
  const getInfo = async userId => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}`
    );
    return res.data;
  };

  // post info api
  const postInfo = async (userId, data) => {
    let token = window.sessionStorage.getItem("accessToken");
    const res = await axios
      .put(`${process.env.REACT_APP_BASE_URL}profile/${userId}`, data, {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      })
      .catch(async error => {
        if (error.response.data.error === "007") {
          token = await refreshToken();
          console.log(token);
          const res = await axios
            .put(`${process.env.REACT_APP_BASE_URL}profile/${userId}`, data, {
              headers: {
                "Content-type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${token}`
              }
            })
            .catch(error => {
              throw error;
            });
          return res;
        } else {
          throw error;
        }
      });
    return res;
  };
  return { getInfo, postInfo };
}
export function useImgApi() {
  // get Img api
  const getImg = async userId => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/image/${userId}`
    );
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
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}profile/image/${userId}`,
      image,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(res);
    return res;
  };
  return { getImg, postImg };
}
export function useRunningProjectApi() {
  const getProject = async userId => {
    //const res = await axios.get(`${process.env.REACT_APP_BASE_URL}${userId}`);
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/running?page=0&size=10&sort=projectName%2CDESC`
    );

    return res.data;
  };
  // 숨긴 프로젝트 목록 가져오기
  const getHideProject = async userId => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/running/hidden?page=0&size=10&sort=projectName%2CDESC`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  };

  return { getProject, getHideProject };
}
export function useEndedProjectApi() {
  // 종료된 프로젝트 목록 가져오기
  const getProject = async userId => {
    //const res = await axios.get(`${process.env.REACT_APP_BASE_URL}${userId}`);
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/ended?page=0&size=10&sort=projectName%2CDESC`
    );
    return res.data;
  };

  // 숨긴 프로젝트 목록 가져오기
  const getHideProject = async userId => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/ended/hidden?page=0&size=10&sort=projectName%2CDESC`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  };

  return { getProject, getHideProject };
}
export function usePlanProjectApi() {
  const getProject = async userId => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/plan?page=0&size=10&sort=projectName%2CDESC`
    );

    return res.data;
  };

  // 숨긴 프로젝트 목록 가져오기
  const getHideProject = async userId => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/plan/hidden?page=0&size=10&sort=projectName%2CDESC`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  };

  // 모든 (planned) 프로젝트 목록 가져오기 (recruit modal에서 프로젝트 선택용)
  const getAllPlannedProject = async myId => {
    const token = window.sessionStorage.getItem("accessToken");

    // 헤더
    const header = {
      "Content-type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`
    };

    // 일반 plan과 숨겨진 plan 가져오기
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${myId}/plan`,
      {
        headers: header
      }
    );
    const res2 = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${myId}/plan/hidden`,
      {
        headers: header
      }
    );

    let totalRes = [];

    // 안에 데이터가 있을 경우 데이터 가져오기
    if (res.data.page.totalElements) {
      totalRes = totalRes.concat(res.data._embedded.projectList);
    }
    if (res2.data.page.totalElements) {
      totalRes = totalRes.concat(res2.data._embedded.projectList);
    }

    return totalRes;
  };

  return { getProject, getHideProject, getAllPlannedProject };
}
export function useHideProjectApi() {
  const hideProject = async (userId, projectId) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/projects/${projectId}`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return { res, projectId };
  };

  const displayProject = async (userId, projectId) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/projects/${projectId}`,
      {},
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return { res, projectId };
  };
  return { hideProject, displayProject };
}
export function useSendRecruitPeopleApi() {
  const postRecruit = async (userId, data) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/recruit`,
      data,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res;
  };
  return { postRecruit };
}
export function useInvitationListApi() {
  const getInvitationList = async userId => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/recruit`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    // console.log(res);
    return res.data;
  };
  return { getInvitationList };
}
export function useInvitationDetailApi() {
  const getInvitationDetail = async (userId, pid) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/recruit/${pid}`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(res);
    return res.data;
  };

  const putInvitationAccept = async (userId, pid) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/recruit/${pid}`,
      {},
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  };

  const deleteInvitationReject = async (userId, pid) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/recruit/${pid}`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  };
  return { getInvitationDetail, putInvitationAccept, deleteInvitationReject };
}
// recruitToPeople
// recruitToProject
