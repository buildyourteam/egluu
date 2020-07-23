import { useEffect, useState } from "react";

import React from "react";

const useProfileInfoModify = (
  resPostProfileInfo,
  postProfileInfoFulfilled,
  postProfileInfoRejected,
  postProfileInfoError,
  getProfileInfoApi,
  infoModifyToggle,
  userId
) => {
  useEffect(() => {
    if (postProfileInfoFulfilled) {
      getProfileInfoApi(userId);
      infoModifyToggle();
    }
  }, [postProfileInfoFulfilled]);
  return;
};

export default useProfileInfoModify;
