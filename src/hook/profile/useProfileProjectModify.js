import { useEffect, useState } from "react";

const useProfileProjectModify = (
  resGetProject,
  getProjectFulfilled,
  getProjectRejected,
  getProjectError,
  getHideProjectApi,

  resHideProject,
  hideProjectFulfilled,
  hideProjectRejected,
  hideProjectError,

  resDisplayProject,
  displayProjectFulfilled,
  displayProjectRejected,
  displayProjectError,

  userId,

  list,
  setList,

  hideList,
  setHideList
) => {
  // 처음 로딩 시 숨겨진 프로젝트 목록 불러오기
  useEffect(() => {
    getHideProjectApi(userId);
  }, []);

  // 불러오기 성공시 , 불러온 내부에 프로젝트 데이터가 있으면 숨김 state에 저장
  useEffect(() => {
    if (getProjectFulfilled) {
      if (resGetProject.page.totalElements) {
        setHideList(resGetProject._embedded.projectList);
      }
    }
  }, [getProjectFulfilled]);

  // 숨기기 요청 성공시
  useEffect(() => {
    if (hideProjectFulfilled) {
      let moveData = {};
      // 일반 state list에서 선택한 project 제거
      setList(
        list.filter(a => {
          if (a.projectId === resHideProject.projectId) {
            moveData = a;
            return false;
          }
          return true;
        })
      );

      // 숨김 state list에서 위에서 선택된 project 추가
      setHideList(hideList => {
        const newList = hideList.concat(moveData);
        return newList;
      });
    }
  }, [hideProjectFulfilled]);

  // 보여주기 요청 성공시
  useEffect(() => {
    if (displayProjectFulfilled) {
      let moveData = {};
      // 숨김 state list에서 선택한 project 제거
      setHideList(
        hideList.filter(a => {
          if (a.projectId === resDisplayProject.projectId) {
            moveData = a;
            return false;
          }
          return true;
        })
      );
      // 일반 state list에 선택된 프로젝트 추가
      setList(list => {
        const newList = list.concat(moveData);
        return newList;
      });
    }
  }, [displayProjectFulfilled]);
};

export default useProfileProjectModify;
