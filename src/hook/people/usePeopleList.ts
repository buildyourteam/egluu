import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { peopleListApi } from "../api";
import { useRequest, useAlert } from "..";
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

export function usePeopleListState() {
  const [peopleList, setPeopleList] = useState<peopleListType | []>([]);
  const [page, setPage] = useState<pageType>();
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [grade, setGrade] = useState("");
  const [search, setSearch] = useState("");

  const setPeopleListRenew = (data: peopleListType) => {
    setPeopleList(() => {
      return data;
    });
  };

  const setPageMove = (data: pageType) => {
    setPage(() => {
      return data;
    });
  };

  return [
    { peopleList, role, region, search, page, grade },
    {
      setPeopleListRenew,
      setPageMove,
      setRole,
      setRegion,
      setSearch,
      setGrade,
    },
  ];
}

export function usePeopleListEffect(setPeopleListRenew: any, setPageMove: any) {
  const [peoplePromiseState, { run: getPeopleListFetch }] = useRequest(
    peopleListApi.getPeopleList,
  );
  useEffect(() => {
    if (peoplePromiseState.fulfilled) {
      if ("_embedded" in peoplePromiseState.data) {
        setPeopleListRenew(peoplePromiseState.data._embedded.peopleList);
        setPageMove(peoplePromiseState.data.page);
      } else {
        setPeopleListRenew([]);
        setPageMove({
          number: 0,
          size: 0,
          totalElements: 0,
          totalPages: 0,
        });
      }
    }
  }, [peoplePromiseState.fulfilled]);

  useEffect(() => {
    setPageMove({
      number: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    });
  }, []);

  useEffect(() => {
    if (peoplePromiseState.rejected) {
      if (peoplePromiseState.error) {
        setPeopleListRenew([]);
      }
    }
  }, [peoplePromiseState.rejected]);

  return { getPeopleListFetch };
}

export function useWantedPeopleListEffect(
  peoplelistPromise: any,
  getApi: any,
  setPeopleList: any,
  setPage: any,
) {
  const { alertAction } = useAlert();

  useEffect(() => {
    if (peoplelistPromise.fulfilled) {
      setPeopleList(peoplelistPromise.data._embedded.peopleList);
      setPage(peoplelistPromise.data.page);
    } // 임시데이터
  }, [peoplelistPromise.fulfilled]);

  useEffect(() => {
    getApi(0);
  }, []);

  useEffect(() => {
    if (peoplelistPromise.rejected) {
      if (peoplelistPromise.error) {
        alertAction.open(peoplelistPromise.error.data.message);
      }
    }
  }, [peoplelistPromise.rejected]);
}

const staticPeopleData = [
  {
    userId: "testUser1",
    userName: "User1",
    stacks: ["SPRINGBOOT", "ReactJS"],
    area: "Daegu",
    level: 1,
    _links: {
      self: {
        href: "/profile/testUser1",
      },
      profileImage: {
        href: "https://api.eskiiimo.com/profile/image/testUser1",
      },
    },
  },
  {
    userId: "testUser4",
    userName: "User4",
    stacks: ["SPRINGBOOT"],
    area: "Seoul",
    level: 1,
    _links: {
      self: {
        href: "/profile/testUser4",
      },
      profileImage: {
        href: "https://api.eskiiimo.com/profile/image/testUser4",
      },
    },
  },
  {
    userId: "testUser7",
    userName: "User7",
    stacks: ["SPRINGBOOT"],
    area: "Ilsan",
    level: 6,
    _links: {
      self: {
        href: "/profile/testUser7",
      },
      profileImage: {
        href: "https://api.eskiiimo.com/profile/image/testUser7",
      },
    },
  },
  {
    userId: "testUser7",
    userName: "User7",
    stacks: ["SPRINGBOOT"],
    area: "Seoul",
    level: 1,
    _links: {
      self: {
        href: "/profile/testUser7",
      },
      profileImage: {
        href: "https://api.eskiiimo.com/profile/image/testUser7",
      },
    },
  },
  {
    userId: "testUser7",
    userName: "User7",
    stacks: ["SPRINGBOOT"],
    area: "Seoul",
    level: 1,
    _links: {
      self: {
        href: "/profile/testUser7",
      },
      profileImage: {
        href: "https://api.eskiiimo.com/profile/image/testUser7",
      },
    },
  },
  {
    userId: "testUser7",
    userName: "User7",
    stacks: ["SPRINGBOOT"],
    area: "Busanl",
    level: 1,
    _links: {
      self: {
        href: "/profile/testUser7",
      },
      profileImage: {
        href: "https://api.eskiiimo.com/profile/image/testUser7",
      },
    },
  },
];
