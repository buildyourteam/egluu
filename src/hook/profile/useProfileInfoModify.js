import { useEffect } from "react";

const useProfileInfoModify = (
  resInfo,
  infoFulfilled,
  infoRejected,
  infoError,
  infoApi,

  resImg,
  imgFulfilled,
  imgRejected,
  imgError,
  imgApi,

  setModifying,

  infoState,
  setInfoState,

  imgState,
  setImgState,

  userId
) => {
  useEffect(() => {
    if (imgFulfilled && infoFulfilled) {
      setImgState({
        imgUrl: `http://34.105.29.115:8080/profile/image/${userId}`,
        isImgChange: false
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

  return;
};

export default useProfileInfoModify;
