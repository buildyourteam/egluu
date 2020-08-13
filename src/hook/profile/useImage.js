import { useEffect } from "react";
import { useImgApi } from "../api/profileApi";
import { useRequest } from "../useRequest";
export const useImage = (
  imgState,
  setImgState,

  userId
) => {
  const { getImg } = useImgApi();

  const [
    { data, fulfilled, pending, rejected, error },
    { run: getImgApi }
  ] = useRequest(getImg);

  useEffect(() => {
    getImgApi(userId);
  }, [userId]);

  useEffect(() => {
    setImgState({
      ...imgState,
      imgUrl: `https://egluuapi.codingnome.dev/profile/image/${userId}`
    });
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      if (error) {
        // console.log(error.response.data);
        if (error.response.data.error === "302") {
          setImgState({
            ...imgState,
            imgUrl:
              "https://i.pinimg.com/236x/21/88/fd/2188fd41b8d31930acc43b7b197e6dfd.jpg"
          });
        }
      }
    }
  }, [rejected]);
  return pending;
};

export default useImage;
