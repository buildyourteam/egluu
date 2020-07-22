import { useEffect, useState } from "react";

const useProfileInfo = (
  getdata,
  getfulfilled,
  getrejected,
  geterror,
  getApi,

  postdata,
  postfulfilled,
  postrejected,
  posterror,

  toggle,
  infoModifying
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

  // 마운트될 때 액션 디스패치
  useEffect(() => {
    getApi("inho");
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
      console.log(getdata);
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

  // info post 성공시
  useEffect(() => {
    if (postfulfilled) {
      // (ProfileInfoModify 말고) ProfileInfo 컴포넌트 다시 마운트
      toggle(!infoModifying);
    }
  }, [postfulfilled]);

  return [profileData, { Refresh }];
};

export default useProfileInfo;
