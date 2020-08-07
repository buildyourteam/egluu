import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useProfileRecruit = (
  getProjectData,
  getProjectFulfilled,
  getProjectRejected,
  getProjecsError,
  getProjectApi
) => {
  const [plannedProjects, setPlannedProjects] = useState([]);
  const myId = useSelector(state => state.login.userId);
  useEffect(() => {
    if (myId) {
      getProjectApi(myId);
    }
  }, [myId]);

  useEffect(() => {
    if (getProjectFulfilled) {
      setPlannedProjects(getProjectData);
    }
  }, [getProjectFulfilled]);

  useEffect(() => {
    if (getProjectRejected) {
      if (getProjecsError) {
        alert(getProjecsError);
        console.log(getProjecsError);
      }
    }
  }, [getProjectRejected]);
  return { plannedProjects };
};

export default useProfileRecruit;
