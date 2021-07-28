import { useEffect } from "react";
import { useSelector } from "react-redux";

const useProfileProject = (
  resGetProject,
  getProjectFulfilled,
  getProjectRejected,
  getProjectError,
  getProjectApi,

  setList,
  hiding,

  userId,
) => {
  const check = useSelector((state) => state.profile.isHideChange);

  // hide 변경사항이 있으면 다시 get요청
  useEffect(() => {
    if (check) {
      getProjectApi(userId);
    }
  }, [check, userId]);

  // 요청 성공시
  useEffect(() => {
    if (getProjectFulfilled) {
      if (resGetProject.page.totalElements) {
        setList(resGetProject._embedded.projectList);
      }
    }
  }, [getProjectFulfilled]);
};

export default useProfileProject;
