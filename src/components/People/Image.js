import React from "react";
import ImageApi from "../../hook/api/imgApi";
import useRequest from "../../hook/useRequest";

const Image = ({ purpose, userId }) => {
  const { getImage } = ImageApi();
  const [
    {
      data: resImage,
      fulfilled: getImageFulfilled,
      pending: getImagePending,
      rejected: getImageRejected,
      error: getImageError
    },
    { run: getImageApi }
  ] = useRequest(getImage);

  const [imageState] = useImage(
    resImage,
    getImageFulfilled,
    getImagePending,
    getImageRejected,
    getImageError,
    getImageApi,
    purpose,
    userId
  );

  return <div></div>;
};

export default Image;
