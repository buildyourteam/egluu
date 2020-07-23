import { useEffect, useState } from "react";

const useProfileInfo = (
  getdata,
  getfulfilled,
  getrejected,
  geterror,
  getApi,

  userId
) => {
  // info 데이터 state
  const [profileData, setProfileData] = useState({
    userName: "",
    role: "",
    stacks: [""],
    contact: "",
    area: "",
    grade: 0,
    introduction: ""
  });

  // modify창 열고 닫고
  const [infoModifying, setInfoModifying] = useState(false);

  // 마운트될 때 액션 디스패치
  useEffect(() => {
    getApi(userId);
  }, []);

  // info get 성공시
  useEffect(() => {
    if (getfulfilled) {
      setProfileData({
        userName: getdata.userName,
        role: getdata.role,
        stacks: getdata.stacks,
        contact: getdata.contact,
        area: getdata.area,
        grade: getdata.grade,
        introduction: getdata.introduction
      });
      //console.log(getdata);
    }
  }, [getfulfilled]);

  // info get 실패시
  useEffect(() => {
    if (getrejected) {
      if (geterror) {
        alert(geterror);
        console.log(geterror);
      }
    }
  }, [getrejected]);

  // get refresh~
  const Refresh = () => {
    getApi();
  };

  return [profileData, infoModifying, setInfoModifying, { Refresh }];
};

export default useProfileInfo;
