import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useProfileRecruit = (
  getProjectData,
  getProjectFulfilled,
  getProjectRejected,
  getProjecsError,
  getProjectApi,

  postRecruitData,
  postRecruitFulfilled,
  postRecruitRejected,
  postRecruitError,

  toggleNested,
  setNestedMessage
) => {
  const [plannedProjects, setPlannedProjects] = useState([]);
  const myId = useSelector((state) => state.login.userId);
  const [alertData, alertAction] = useAlert();

  useEffect(() => {
    if (myId) {
      getProjectApi(myId);
    }
  }, [myId]);

  useEffect(() => {
    if (getProjectFulfilled) {
      // console.log(getProjectData);
      setPlannedProjects(getProjectData);
    }
  }, [getProjectFulfilled]);

  useEffect(() => {
    if (getProjectRejected) {
      if (getProjecsError) {
        alertAction.open(getProjecsError.response.message);
        console.log(getProjecsError);
      }
    }
  }, [getProjectRejected]);

  useEffect(() => {
    if (postRecruitFulfilled) {
      setNestedMessage({
        status: true,
        message: "영입 메시지를 성공적으로 전달했습니다!",
      });
      toggleNested();
    }
  }, [postRecruitFulfilled]);

  useEffect(() => {
    if (postRecruitRejected) {
      if (postRecruitError) {
        console.log(postRecruitError);
        setNestedMessage({
          status: false,
          message: "오류가 발생했습니다. 다시 시도해주세요.",
        });
        toggleNested();
      }
    }
  }, [postRecruitRejected]);
  return { plannedProjects };
};

export default useProfileRecruit;
