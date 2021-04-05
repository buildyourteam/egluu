import axios from "axios";
import { loginApi } from "./";

type info = {
  userId: String;
  userEmail: String;
  password: String;
  name: String;
};

/**
 * Profile Page 좌측 Info창에서 사용되는 api
 */

export function infoApi(): any {
  // get info api
  const getInfo = async (userId: String): Promise<any> => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}`,
    );
    return res.data;
  };

  // post info api
  const postInfo = async (userId: String, data: any): Promise<any> => {
    let token: String | Promise<String> | null = window.sessionStorage.getItem(
      "accessToken",
    );
    const res = await axios
      .put(`${process.env.REACT_APP_BASE_URL}profile/${userId}`, data, {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(async (error) => {
        if (error.response.data.error === "007") {
          token = await loginApi().refreshToken();
          const res = await axios
            .put(`${process.env.REACT_APP_BASE_URL}profile/${userId}`, data, {
              headers: {
                "Content-type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${token}`,
              },
            })
            .catch((error) => {
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

/**
 * img 저장 api
 */
export function imgApi():any {
  // 이미지 불러오기
  const getImg = async (userId: String): Promise<any> => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/image/${userId}`,
    );
    return res.data;
  };

  // 이미지 저장
  const postImg = async (userId: String, data: any): Promise<any> => {
    const token = window.sessionStorage.getItem("accessToken");
    let image = new FormData();
    image.append("image", data.imgUrl);
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}profile/image/${userId}`,
      image,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return res;
  };

  return { getImg, postImg };
}

/**
 * 진행중인 프로젝트
 */
export function runningProjectApi(): any {
  const getProject = async (userId: String): Promise<any> => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/running?page=0&size=10&sort=projectName%2CDESC`,
    );
    return res.data;
  };

  // 숨긴 프로젝트 목록 가져오기
  const getHideProject = async (userId: String): Promise<any> => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/running/hidden?page=0&size=10&sort=projectName%2CDESC`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };

  return { getProject, getHideProject };
}

export function endedProjectApi() {
  const getProject = async (userId: String) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/ended?page=0&size=10&sort=projectName%2CDESC`,
    );
    return res.data;
  };

  // 숨긴 프로젝트 목록 가져오기
  const getHideProject = async (userId: String) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/ended/hidden?page=0&size=10&sort=projectName%2CDESC`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };

  return { getProject, getHideProject };
}
export function planProjectApi() {
  const getProject = async (userId: String) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/plan?page=0&size=10&sort=projectName%2CDESC`,
    );

    return res.data;
  };

  // 숨긴 프로젝트 목록 가져오기
  const getHideProject = async (userId: String) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/plan/hidden?page=0&size=10&sort=projectName%2CDESC`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };

  // 모든 (planned) 프로젝트 목록 가져오기 (recruit modal에서 프로젝트 선택용)
  const getAllPlannedProject = async (myId: String) => {
    const token = window.sessionStorage.getItem("accessToken");
    // 헤더
    const header = {
      "Content-type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    };

    // 일반 plan과 숨겨진 plan 가져오기
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${myId}/plan`,
      {
        headers: header,
      },
    );
    const res2 = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${myId}/plan/hidden`,
      {
        headers: header,
      },
    );

    let totalRes: Array<Object> = [];

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
export function hideProjectApi() {
  const hideProject = async (userId: String, projectId: String) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/projects/${projectId}`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { res, projectId };
  };

  const displayProject = async (userId: String, projectId: String) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/projects/${projectId}`,
      {},
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { res, projectId };
  };
  return { hideProject, displayProject };
}
export function sendRecruitPeopleApi() {
  const postRecruit = async (userId: String, data: any) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/recruit`,
      data,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  };
  return { postRecruit };
}
export function invitationListApi() {
  const getInvitationList = async (userId: String) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/recruit`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };
  return { getInvitationList };
}
export function invitationDetailApi() {
  const getInvitationDetail = async (userId: String, pid: Number) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/recruit/${pid}`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };

  const putInvitationAccept = async (userId: String, pid: Number) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/recruit/${pid}`,
      {},
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };

  const deleteInvitationReject = async (userId: String, pid: Number) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}profile/${userId}/recruit/${pid}`,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };

  return { getInvitationDetail, putInvitationAccept, deleteInvitationReject };
}
