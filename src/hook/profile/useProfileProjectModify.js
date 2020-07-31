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
      console.log(resGetProject);
      if (resGetProject.page.totalElements) {
        setHideList(resGetProject._embedded.projectList);
      }
    }
  }, [getProjectFulfilled]);

  useEffect(() => {
    if (hideProjectFulfilled || displayProjectFulfilled) {
      getHideProjectApi(userId);
    }
  }, [hideProjectFulfilled, displayProjectFulfilled]);
};
