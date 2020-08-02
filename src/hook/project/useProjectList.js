import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemporary } from "../../reducers/temporary";
const axios = require("axios");

export function useProjectListState() {
  const [projectList, setProjectList] = useState(staticProjectData);

  const getProjectList = async () => {
    const res = await axios.get("https://egluuapi.codingnome.dev/projects");
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
        console.log(error);
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
