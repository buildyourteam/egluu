import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemporary } from "../../reducers/temporary";
import refreshToken from "../auth/refreshToken";
const axios = require("axios");

export function useProjectListState() {
  const [projectList, setProjectList] = useState(staticProjectData);

  const getProjectList = async () => {
    let res = await axios
      .get(`${process.env.REACT_APP_BASE_URL}projects`)
      .catch(async (error) => {
        if (error.response.data.error === "007") {
          token = await refreshToken();
          res = await axios.get(`${process.env.REACT_APP_BASE_URL}projects`);
        } else {
          throw error;
        }
      });
    return res.data._embedded.projectList;
  };
  return [projectList, { getProjectList, setProjectList }];
}

export function useProjectListEffect(
  data,
  fulfilled,
  rejected,
  error,
  getApi,
  setProjectList
) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (fulfilled) {
      if (data !== undefined) {
        setProjectList(data);
      }
    }
  }, [fulfilled]);

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    if (rejected) {
      if (error) {
        setProjectList([]);
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
      etc: 2,
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4,
    },
    leaderId: null,
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
      etc: 2,
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4,
    },
    leaderId: null,
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
      etc: 2,
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4,
    },
    leaderId: null,
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
      etc: 2,
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4,
    },
    leaderId: null,
  },
];
