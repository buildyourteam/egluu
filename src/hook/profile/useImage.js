import { useEffect } from "react";
import { imgApi } from "../api";
import { useRequest } from "../useRequest";
export const useImage = (
  imgState,
  setImgState,

  userId,
) => {
  const { getImg } = imgApi();

  const [
    { data, fulfilled, pending, rejected, error },
    { run: getImgApi },
  ] = useRequest(getImg);

  useEffect(() => {
    getImgApi(userId);
  }, [userId]);

  useEffect(() => {
    setImgState({
      ...imgState,
      imgUrl: `${process.env.REACT_APP_BASE_URL}profile/image/${userId}`,
    });
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      if (error) {
        if (error.response.data.error === "302") {
          setImgState({
            ...imgState,
            imgUrl:
              "https://i.pinimg.com/236x/21/88/fd/2188fd41b8d31930acc43b7b197e6dfd.jpg",
          });
        }
      }
    }
  }, [rejected]);
  return pending;
};

export default useImage;
