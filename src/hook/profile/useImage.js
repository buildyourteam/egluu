import React, { useState, useEffect } from "react";

export const useImage = (
  resImage,
  getImageFulfilled,
  getImageRejected,
  getImageError,
  getImageApi,
  userId
) => {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    getImageApi(userId);
  }, []);

  useEffect(() => {
    //console.log(resImage);
    setImgUrl(
      "https://i.pinimg.com/236x/dd/5b/5c/dd5b5cda2e670c25f9c81b35d1e2ee59.jpg"
    );
  }, [getImageFulfilled]);

  useEffect(() => {
    if (getImageRejected) {
      if (getImageError) {
        alert(getImageError);
        console.log(getImageError);
      }
    }
  }, [getImageRejected]);
  return { imgUrl };
};

export default useImage;
