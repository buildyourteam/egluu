import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemporary } from "../../reducers/temporary";
import { loginApi } from "../api";
const axios = require("axios");

export function useProjectListState() {
  const [projectList, setProjectList] = useState(staticProjectData);
  const [page, setPage] = useState({
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [stack, setStack] = useState("");
  const [search, setSearch] = useState("");
  const getProjectList = async (pageNumber, sort) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}projects?page=${pageNumber}&size=8${sort}`,
    );
    return res.data;
  };

  const getDeadLineProjectList = async (pageNumber) => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}projects/deadline?page=${pageNumber}&size=4&sort=endDate`,
    );
    return res.data;
  };

  return [
    { projectList, role, region, search, page, stack },
    {
      getProjectList,
      setProjectList,
      getDeadLineProjectList,
      setPage,
      setRegion,
      setRole,
      setStack,
      setSearch,
    },
  ];
}

export function useProjectListEffect(
  data,
  fulfilled,
  rejected,
  error,
  getApi,
  setProjectList,
  setPage,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (fulfilled) {
      if ("_embedded" in data) {
        setProjectList(data._embedded.projectList);
        setPage(data.page);
      } else {
        setProjectList([]);
        setPage({
          number: 0,
          size: 0,
          totalElements: 0,
          totalPages: 0,
        });
      }
    }
  }, [fulfilled]);

  useEffect(() => {
    getApi(0, "");
  }, []);

  useEffect(() => {
    if (rejected) {
      if (error) {
        setProjectList([]);
      }
    }
  }, [rejected]);
}

export function useDeadlineProjectListEffect(
  projectlistPromise,
  getApi,
  setProjectList,
  setPage,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectlistPromise.fulfilled) {
      if (projectlistPromise.data !== undefined) {
        setProjectList(projectlistPromise.data._embedded.projectList);
        setPage(projectlistPromise.data.page);
      }
    }
  }, [projectlistPromise.fulfilled]);

  useEffect(() => {
    getApi(0, "");
  }, []);

  useEffect(() => {
    if (projectlistPromise.rejected) {
      if (projectlistPromise.error) {
        setProjectList([]);
      }
    }
  }, [projectlistPromise.rejected]);
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
