import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { peopleListApi } from "../api";
import { useRequest, useAlert } from "..";
import { RequestState } from "../useRequest";
const axios = require("axios");

type pageType = {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type peopleListType = {
  userId: String;
  userName: String;
  stacks: Array<String>;
  area: String;
  level: number;
  _links: {
    self: {
      href: String;
    };
    profileImage: {
      href: String;
    };
  };
};

type peoplePage = {
  WantedPeopleListPromise: RequestState;
  peopleListPromise: RequestState;
  peopleList: peopleListType[];
  role: string;
  region: string;
  search: string;
  page: pageType;
  grade: string;
};

type peopleAction = {
  getPeopleList: (pageNumber: number, params: Object[]) => Promise<void>;
  getWantedPeopleList: (pageNumber: number) => Promise<void>;
  setPeopleList: Dispatch<SetStateAction<peopleListType[]>>;
  setPage: Dispatch<SetStateAction<pageType>>;
  setRole: Dispatch<SetStateAction<string>>;
  setRegion: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setGrade: Dispatch<SetStateAction<string>>;
};

type peopleState = {
  peoplePage: peoplePage;
  peopleAction: peopleAction;
};

export function usePeopleListStateTs(): peopleState {
  const [peopleList, setPeopleList] = useState<peopleListType[] | []>([]);
  const [page, setPage] = useState<pageType>({
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const [role, setRole] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [peopleListPromise, { run: getPeopleList }] = useRequest(
    peopleListApi().getPeopleList,
  );

  const [WantedPeopleListPromise, { run: getWantedPeopleList }] = useRequest(
    peopleListApi().getWantedPeopleList,
  );
  const peoplePage: peoplePage = {
    WantedPeopleListPromise,
    peopleListPromise,
    peopleList,
    page,
    role,
    region,
    search,
    grade,
  };

  const peopleAction: peopleAction = {
    setPeopleList,
    setPage,
    setRole,
    setRegion,
    setSearch,
    setGrade,
    getPeopleList,
    getWantedPeopleList,
  };

  return { peoplePage, peopleAction };
}

export function usePeopleListEffectTs(
  peoplePage: peoplePage,
  peopleAction: peopleAction,
) {
  useEffect(() => {
    if (peoplePage.peopleListPromise.fulfilled) {
      if ("_embedded" in peoplePage.peopleListPromise.data) {
        peopleAction.setPeopleList(
          peoplePage.peopleListPromise.data._embedded.peopleList,
        );
      }
    }
  }, [peoplePage.peopleListPromise.fulfilled]);

  useEffect(() => {
    if (peoplePage.peopleListPromise.rejected) {
      if (peoplePage.peopleListPromise.error) {
        peopleAction.setPeopleList([]);
      }
    }
  }, [peoplePage.peopleListPromise.rejected]);
}

export function useWantedPeopleListEffectTs(
  peoplePage: peoplePage,
  peopleAction: peopleAction,
) {
  const { alertAction } = useAlert();
  useEffect(() => {
    if (peoplePage.WantedPeopleListPromise.fulfilled) {
      if ("_embedded" in peoplePage.WantedPeopleListPromise.data) {
        peopleAction.setPeopleList(
          peoplePage.WantedPeopleListPromise.data._embedded.peopleList,
        );
      }
    }
  }, [peoplePage.WantedPeopleListPromise.fulfilled]);

  useEffect(() => {
    if (peoplePage.WantedPeopleListPromise.rejected) {
      if (peoplePage.WantedPeopleListPromise.error) {
        peopleAction.setPeopleList([]);
      }
    }
  }, [peoplePage.WantedPeopleListPromise.rejected]);

  useEffect(() => {
    peopleAction.getWantedPeopleList(0);
  }, []);
}
