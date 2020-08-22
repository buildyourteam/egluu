import { useEffect } from "react";
import { useInfoApi, useImgApi } from "../api/profileApi";
import { useRequest } from "../useRequest";
import refreshToken from "../auth/refreshToken";
const useProfileInfoModify = (
  setModifying,

  imgState,
  setImgState,

  userId
) => {
  const { postInfo } = useInfoApi();

  const [
    {
      data: infoResponse,
      fulfilled: infoFulfilled,
      pending: infoPending,
      rejected: infoRejected,
      error: infoError,
    },
    { run: postInfoApi },
  ] = useRequest(postInfo);

  const { postImg } = useImgApi();

  const [
    {
      data: imgResponse,
      fulfilled: imgFulfilled,
      pending: imgPending,
      rejected: imgRejected,
      error: imgError,
    },
    { run: postImgApi },
  ] = useRequest(postImg);

  useEffect(() => {
    if (imgFulfilled && infoFulfilled) {
      setImgState({
        imgUrl: `${process.env.REACT_APP_BASE_URL}profile/image/${userId}`,
        isImgChange: false,
      });
      setModifying();
      //console.log("둘다 ");
    }
  }, [imgFulfilled]);

  useEffect(() => {
    if (!imgState.isImgChange && infoFulfilled) {
      setModifying();
      //console.log("인포메이션만 ");
    }
  }, [infoFulfilled]);

  useEffect(() => {
    if (infoRejected) {
      if (infoError) {
        alert(infoError);
        console.log(infoError);
      }
    }
  }, [infoRejected]);

  useEffect(() => {
    if (imgRejected) {
      if (imgError) {
        alert(imgError);
        console.log(imgError);
      }
    }
  }, [imgRejected]);

  return { postInfoApi, postImgApi };
};
const useProfileImgModify = () => {};

export default useProfileInfoModify;
