import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemporary } from "../../reducers/temporary";
const axios = require("axios");

export function useProjectListState(
  data,
  fulfilled,
  pending,
  rejected,
  error,

  getApi
) {
  const [projectList, setProjectList] = useState(staticProjectData);

  useEffect(() => {
    // if (fulfilled) setProjectList(data);
    if (fulfilled) setProjectList(staticProjectData); // 임시데이터
  }, [fulfilled]);

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    if (rejected) {
      if (error) {
        alert(error);
        console.log(error);
      }
    }
  }, [rejected]);

  const listRefresh = () => {
    getApi();
  };

  return [projectList, { listRefresh }];
}

export function useProjectSaveEffect(data, fulfilled, rejected, error, posApi) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (fulfilled) {
      alert("전송 성공!");
      dispatch(setTemporary(data));
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      if (error) {
        alert(error.response);
        console.log(error);
      }
    }
  }, [rejected]);
}

const staticProjectData = [
  {
    projectId: 16,
    projectName: "project0",
    teamName: "project team0",
    endDate: "2020-03-30T23:59:00",
    description: "need zero 입니다.",
    dday: 5,
    status: "RECRUTING",
    projectField: null,
    currentMember: {
      developer: 2,
      designer: 1,
      planner: 1,
      etc: 2
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4
    },
    leaderId: null
  },
  {
    projectId: 16,
    projectName: "project0",
    teamName: "project team0",
    endDate: "2020-03-30T23:59:00",
    description: "need zero 입니다.",
    dday: 5,
    status: "RECRUTING",
    projectField: null,
    currentMember: {
      developer: 2,
      designer: 1,
      planner: 1,
      etc: 2
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4
    },
    leaderId: null
  },
  {
    projectId: 16,
    projectName: "project0",
    teamName: "project team0",
    endDate: "2020-03-30T23:59:00",
    description: "need zero 입니다.",
    dday: 5,
    status: "RECRUTING",
    projectField: null,
    currentMember: {
      developer: 2,
      designer: 1,
      planner: 1,
      etc: 2
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4
    },
    leaderId: null
  },
  {
    projectId: 16,
    projectName: "project0",
    teamName: "project team0",
    endDate: "2020-03-30T23:59:00",
    description: "need zero 입니다.",
    dday: 5,
    status: "RECRUTING",
    projectField: null,
    currentMember: {
      developer: 2,
      designer: 1,
      planner: 1,
      etc: 2
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4
    },
    leaderId: null
  }
];
