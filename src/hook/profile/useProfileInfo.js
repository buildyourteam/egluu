import { useEffect } from "react";
import { useInfoApi } from "../../hook/api/profileApi";
import { useRequest } from "../useRequest";
import { useAlert } from "../";

const useProfileInfo = (setInfo, userId) => {
  // info 정보 get 하는 api
  const { getInfo } = useInfoApi();
  const [alertData, alertAction] = useAlert();

  // info get의 상태변수와 데이터 및 액션 디스패쳐
  const [
    { data: response, fulfilled, pending, rejected, error },
    { run: getInfoApi },
  ] = useRequest(getInfo);

  // 마운트될 때 액션 디스패치
  useEffect(() => {
    getInfoApi(userId);
  }, [userId]);

  // info get 성공시
  useEffect(() => {
    if (fulfilled) {
      setInfo({
        userName: response.userName,
        role: response.role,
        stacks: response.stacks,
        contact: response.contact,
        area: response.area,
        grade: response.grade,
        introduction: response.introduction,
      });
    }
  }, [fulfilled]);

  // info get 실패시
  useEffect(() => {
    if (rejected) {
      if (error) {
        alertAction.open(error.response.message);
        console.log(error);
      }
    }
  }, [rejected]);

  // get refresh~
  const Refresh = () => {
    Api();
  };

  return pending;
};

export default useProfileInfo;
