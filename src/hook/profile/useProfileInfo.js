import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemporary } from "../../reducers/temporary";
const axios = require("axios");

const useProfileInfo = (data, fulfilled, pending, rejected, error, getApi) => {
  const [profileData, setProfileData] = useState({
    userName: "",
    role: "",
    stacks: [""],
    contact: "",
    area: "",
    grade: 0,
    introduction: ""
  });

  useEffect(() => {
    if (fulfilled) {
      setProfileData({
        userName: data.userName,
        role: data.role,
        stacks: data.stacks,
        contact: data.contact,
        area: data.area,
        grade: data.grade,
        introduction: data.introduction
      });
      console.log(data);
    }
  }, [fulfilled]);

  useEffect(() => {
    getApi("inho");
  }, []);

  useEffect(() => {
    if (rejected) {
      if (error) {
        alert(error);
        console.log(error);
      }
    }
  }, [rejected]);

  const Refresh = () => {
    getApi();
  };

  return [profileData, { Refresh }];
};

const staticProfile = {
  userName: "Inho",
  role: "DEVELOPER",
  stacks: ["ReactJS", "Django"],
  contact: "010-1234-5678",
  area: "Seoul",
  grade: 1,
  introduction: "인호 계정입니다.",
  _links: {
    self: {
      href: "https://api.eskiiimo.com/profile/user1"
    },
    profile: {
      href: "https://api.eskiiimo.com/docs/index.html#resourcesProfileGet"
    }
  }
};

export default useProfileInfo;
