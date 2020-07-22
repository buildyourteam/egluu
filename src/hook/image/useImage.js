import React, { useState, useEffect } from "react";

const useImage = (
  resImage,
  getImageFulfilled,
  getImagePending,
  getImageRejected,
  getImageError,
  getImageApi,
  purpose,
  userId
) => {
  const [state, setState] = useState("");
  useEffect(() => {
    getImageApi(userId);
  }, []);
  useEffect(() => {
    console.log(resImage);
  }, [getImageFulfilled]);
  return;
};

export default useImage;
