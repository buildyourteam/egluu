import { useEffect } from "react";
import { infoApi, imgApi } from "../api";
import { useRequest } from "../useRequest";
import { useAlert } from "../";

const useProfileInfoModify = (
  setModifying,
  imgState,
  setImgState,

  userId,
) => {
  const { postInfo } = infoApi();

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

  const { postImg } = imgApi();

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
  const [alertData, alertAction] = useAlert();

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
        alertAction.open(infoError.response.data.message);
      }
    }
  }, [infoRejected]);

  useEffect(() => {
    if (imgRejected) {
      if (imgError) {
        alertAction.open(imgError.response.data.message);
        console.log(imgError);
      }
    }
  }, [imgRejected]);

  return { postInfoApi, postImgApi };
};
const useProfileImgModify = () => {};

export default useProfileInfoModify;
