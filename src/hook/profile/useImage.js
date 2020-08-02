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
      imgUrl: `https://egluuapi.codingnome.dev/profile/image/${userId}`,
    });
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      if (error) {
        //alert(error);
        console.log(error.response.data);
        // 이미지 설정한적 없어서 get 이미지가 에러날 때 기본이미지로 대체
        if (error.response.data.error === 305) {
          setImgState({
            ...imgState,
            imgUrl:
              "https://i.pinimg.com/236x/21/88/fd/2188fd41b8d31930acc43b7b197e6dfd.jpg",
          });
        }
      }
    }
  }, [rejected]);
  return;
};

export default useImage;
