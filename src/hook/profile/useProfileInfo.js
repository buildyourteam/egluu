import { useEffect } from "react";

const useProfileInfo = (
  data,
  fulfilled,
  rejected,
  error,
  Api,

  infoState,
  setInfoState,

  userId
) => {
  // 마운트될 때 액션 디스패치
  useEffect(() => {
    Api(userId);
  }, []);

  // info get 성공시
  useEffect(() => {
    if (fulfilled) {
      setInfoState({
        userName: data.userName,
        role: data.role,
        stacks: data.stacks,
        contact: data.contact,
        area: data.area,
        grade: data.grade,
        introduction: data.introduction
      });
      //console.log(data);
    }
  }, [fulfilled]);

  // info get 실패시
  useEffect(() => {
    if (rejected) {
      if (error) {
        alert(error);
        console.log(error);
      }
    }
  }, [rejected]);

  // get refresh~
  const Refresh = () => {
    Api();
  };

  return;
};

export default useProfileInfo;
