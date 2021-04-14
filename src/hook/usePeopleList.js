import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "./";
const axios = require("axios");

export function usePeopleListState() {
  const [peopleList, setPeopleList] = useState(staticPeopleData);
  const [page, setPage] = useState({
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [grade, setGrade] = useState("");
  const [search, setSearch] = useState("");
  const getPeopleList = async (pageNumber, params) => {
    const res = await axios.get(
      `https://egluuapi.codingnome.dev/people?page=${pageNumber}&size=12${params}`,
    );
    return res.data;
  };
  const getWantedPeopleList = async (pageNumber) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}people?page=${pageNumber}&size=6`,
    );
    return res.data;
  };

  return [
    { peopleList, role, region, search, page, grade },
    {
      setPeopleList,
      getPeopleList,
      getWantedPeopleList,
      setPage,
      setRole,
      setRegion,
      setSearch,
      setGrade,
    },
  ];
}

export function usePeopleListEffect(
  data,
  fulfilled,
  rejected,
  error,
  getApi,
  setPeopleList,
  setPage,
) {
  useEffect(() => {
    if (fulfilled) {
      if ("_embedded" in data) {
        setPeopleList(data._embedded.peopleList);
        setPage(data.page);
      } else {
        setPeopleList([]);
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
        setPeopleList([]);
      }
    }
  }, [rejected]);
}

export function useWantedPeopleListEffect(
  peoplelistPromise,
  getApi,
  setPeopleList,
  setPage,
) {
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
