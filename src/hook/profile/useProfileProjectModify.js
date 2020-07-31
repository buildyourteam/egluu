import { useEffect, useState } from "react";

export const useEndedModify = (
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
  useEffect(() => {
    getHideProjectApi(userId);
  }, []);

  useEffect(() => {
    if (getProjectFulfilled) {
      if (resGetProject.page.totalElements) {
        setHideList(resGetProject._embedded.projectList);
      }
    }
  }, [getProjectFulfilled]);

  useEffect(() => {
    if (hideProjectFulfilled) {
      let moveData = {};
      setList(
        list.filter(a => {
          if (a.projectId === resHideProject.projectId) {
            moveData = a;
            return false;
          }
          return true;
        })
      );
      setHideList(hideList => {
        const newList = hideList.concat(moveData);
        return newList;
      });
    }
  }, [hideProjectFulfilled]);

  useEffect(() => {
    if (displayProjectFulfilled) {
      let moveData = {};
      setHideList(
        hideList.filter(a => {
          if (a.projectId === resDisplayProject.projectId) {
            moveData = a;
            return false;
          }
          return true;
        })
      );
      setList(list => {
        const newList = list.concat(moveData);
        return newList;
      });
    }
  }, [displayProjectFulfilled]);
};
