import { useState, useEffect } from "react";

export const useRunningProject = (
  resGetProject,
  getProjectFulfilled,
  getProjectRejected,
  getProjectError,
  getProjectApi,
  userId
) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getProjectApi(userId);
  }, [userId]);

  useEffect(() => {
    if (getProjectFulfilled && resGetProject.page.totalElements) {
      setList(resGetProject._embedded.projectList);
    }
  }, [getProjectFulfilled]);
  return list;
};
export const usePlanProject = (
  resGetProject,
  getProjectFulfilled,
  getProjectRejected,
  getProjectError,
  getProjectApi,
  userId
) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getProjectApi(userId);
  }, []);

  useEffect(() => {
    if (getProjectFulfilled && resGetProject.page.totalElements) {
      setList(resGetProject._embedded.projectList);
    }
  }, [getProjectFulfilled]);
  return list;
};
export const useEndedProject = (
  resGetProject,
  getProjectFulfilled,
  getProjectRejected,
  getProjectError,
  getProjectApi,

  setList,
  hiding,

  userId
) => {
  useEffect(() => {
    getProjectApi(userId);
  }, []);

  useEffect(() => {
    console.log(resGetProject);
    if (getProjectFulfilled && resGetProject.page.totalElements) {
      setList(resGetProject._embedded.projectList);
    }
  }, [getProjectFulfilled]);
};
