import { useEffect } from "react";

export const useImage = (
  resImage,
  fulfilled,
  rejected,
  error,
  Api,

  imgState,
  setImgState,

  userId
) => {
  useEffect(() => {
    Api(userId);
  }, []);

  useEffect(() => {
    //console.log("img=" + resImage);
    setImgState({
      ...imgState,
      imgUrl: `http://34.105.29.115:8080/profile/image/${userId}`
    });
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      if (error) {
        alert(error);
        console.log(error);
      }
    }
  }, [rejected]);
  return;
};

export default useImage;
