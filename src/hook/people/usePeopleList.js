import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemporary } from "../../reducers/temporary";
import { useAlert } from "../";

const axios = require("axios");

export function usePeopleListState() {
  const [peopleList, setPeopleList] = useState(staticPeopleData);
  const [page, setPage] = useState({
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const getPeopleList = async (pageNumber) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}people?page=${pageNumber}&size=6`
    );
    return res.data;
  };
  const [alertData, alertAction] = useAlert();

  return [
    { peopleList, page },
    { setPeopleList, getPeopleList, setPage },
  ];
}

export function usePeopleListEffect(
  peoplelistPromise,
  getApi,
  setPeopleList,
  setPage
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

export function usePeopleSaveEffect(
  data,
  fulfilled,
  pending,
  rejected,
  error,
  posApi
) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(fulfilled);
    if (fulfilled) {
      alertAction.open("전송 성공");
      // dispatch(setTemporary(data));
      dispatch(setTemporary(staticPeopleData));
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      if (error) {
        alertAction.open(error.response.data.message);
        console.log(error);
      }
    }
  }, [rejected]);
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
