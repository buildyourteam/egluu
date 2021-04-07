import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRequest } from "..";
import { setTemporary } from "../../reducers/temporary";
import { loginApi } from "../api";
import { RequestState } from "../useRequest";

const axios = require("axios");

type projectListType = {
  projectId: number;
  projectName: string;
  teamName: string;
  endDate: string;
  description: string;
  dday: number;
  status: string;
  projectField: object | null;
  currentMember: {
    developer: number;
    designer: number;
    planner: number;
    etc: number;
  };
  needMember: {
    developer: number;
    designer: number;
    planner: number;
    etc: number;
  };
  leaderId: string | null;
};

type pageType = {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type projectPage = {
  projectList: projectListType[];
  role: string;
  region: string;
  search: string;
  page: pageType;
  stack: string;
  projectListPromise: RequestState;
  DeadLineProjectListPromise: RequestState;
};

type projectAction = {
  setProjectList: Dispatch<SetStateAction<projectListType[]>>;
  setPage: Dispatch<
    SetStateAction<{
      number: number;
      size: number;
      totalElements: number;
      totalPages: number;
    }>
  >;
  setRegion: Dispatch<SetStateAction<string>>;
  setRole: Dispatch<SetStateAction<string>>;
  setStack: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
  getProjectListApi: (
    pageNumber: number,
    sort?: string | undefined,
  ) => Promise<void>;
  getDeadLineProjectListApi: (
    pageNumber: number,
    sort?: string | undefined,
  ) => Promise<void>;
};

type projectState = {
  projectPage: projectPage;
  projectAction: projectAction;
};

export function useProjectListStateTs(): projectState {
  const [projectList, setProjectList] = useState<projectListType[] | []>([]);
  const [page, setPage] = useState<pageType>({
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const [role, setRole] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [stack, setStack] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const getProjectList = async (
    pageNumber: number,
    sort?: string,
  ): Promise<object> => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}projects?page=${pageNumber}&size=8${sort}`,
    );
    return res.data;
  };

  const getDeadLineProjectList = async (
    pageNumber: number,
  ): Promise<object> => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}projects/deadline?page=${pageNumber}&size=4&sort=endDate`,
    );
    return res.data;
  };

  const [projectListPromise, { run: getProjectListApi }] = useRequest(
    getProjectList,
  );

  const [
    DeadLineProjectListPromise,
    { run: getDeadLineProjectListApi },
  ] = useRequest(getDeadLineProjectList);

  const projectPage: projectPage = {
    projectList,
    role,
    region,
    search,
    page,
    stack,
    projectListPromise,
    DeadLineProjectListPromise,
  };
  const projectAction: projectAction = {
    setProjectList,
    setPage,
    setRegion,
    setRole,
    setStack,
    setSearch,
    getProjectListApi,
    getDeadLineProjectListApi,
  };

  return { projectPage, projectAction };
}

export function useProjectListEffectTs(
  project: projectPage,
  projectAction: projectAction,
) {
  useEffect(() => {
    if (project.projectListPromise.fulfilled) {
      if ("_embedded" in project.projectListPromise.data) {
        projectAction.setProjectList(
          project.projectListPromise.data._embedded.projectList,
        );
        projectAction.setPage(project.projectListPromise.data.page);
      } else {
        projectAction.setProjectList([]);
        projectAction.setPage({
          number: 0,
          size: 0,
          totalElements: 0,
          totalPages: 0,
        });
      }
    }
  }, [project.projectListPromise.fulfilled]);

  useEffect(() => {
    projectAction.getProjectListApi(0, "");
  }, []);

  useEffect(() => {
    if (project.projectListPromise.rejected) {
      if (project.projectListPromise.error) {
        projectAction.setProjectList([]);
      }
    }
  }, [project.projectListPromise.rejected]);
}

export function useDeadlineProjectListEffect(
  project: projectPage,
  projectAction: projectAction,
) {
  useEffect(() => {
    if (project.DeadLineProjectListPromise.fulfilled) {
      if ("_embedded" in project.DeadLineProjectListPromise.data) {
        projectAction.setProjectList(
          project.DeadLineProjectListPromise.data._embedded.projectList,
        );
        projectAction.setPage(project.DeadLineProjectListPromise.data.page);
      } else {
        projectAction.setProjectList([]);
        projectAction.setPage({
          number: 0,
          size: 0,
          totalElements: 0,
          totalPages: 0,
        });
      }
    }
  }, [project.DeadLineProjectListPromise.fulfilled]);

  useEffect(() => {
    projectAction.getDeadLineProjectListApi(0, "");
  }, []);

  useEffect(() => {
    if (project.DeadLineProjectListPromise.rejected) {
      if (project.DeadLineProjectListPromise.error) {
        projectAction.setProjectList([]);
      }
    }
  }, [project.DeadLineProjectListPromise.rejected]);
}
