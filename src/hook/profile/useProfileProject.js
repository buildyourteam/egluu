import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useRunningProject = (
  resGetProject,
  getProjectFulfilled,
  getProjectRejected,
  getProjectError,
  getProjectApi,
  userId
) => {
  const check = useSelector(state => state.profile.isHideChange);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (check) {
      getProjectApi(userId);
    }
  }, [check]);

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
  const check = useSelector(state => state.profile.isHideChange);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (check) {
      getProjectApi(userId);
    }
  }, [check]);

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
  const check = useSelector(state => state.profile.isHideChange);

  // hide 변경사항이 있으면 다시 get요청
  useEffect(() => {
    if (check) {
      getProjectApi(userId);
    }
  }, [check]);

  // 요청 성공시
  useEffect(() => {
    if (getProjectFulfilled) {
      if (resGetProject.page.totalElements) {
        setList(resGetProject._embedded.projectList);
      }
    }
  }, [getProjectFulfilled]);
};
