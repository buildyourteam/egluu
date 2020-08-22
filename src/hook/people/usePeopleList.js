import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemporary } from "../../reducers/temporary";
import { useAlert } from "../";

const axios = require("axios");

export function usePeopleListState(
  data,
  fulfilled,
  pending,
  rejected,
  error,
  getApi
) {
  const [peopleList, setPeopleList] = useState(staticPeopleData);
  const [alertData, alertAction] = useAlert();

  useEffect(() => {
    // if (fulfilled) setPeopleList(data);
    if (fulfilled) setPeopleList(staticPeopleData); // 임시데이터
  }, [fulfilled]);

  useEffect(() => {
    // getApi();
  }, []);

  useEffect(() => {
    if (rejected) {
      if (error) {
        alertAction.open(error.data.message);
        console.log(error);
      }
    }
  }, [rejected]);

  const listRefresh = () => {
    getApi();
  };

  return [peopleList, { listRefresh }];
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
