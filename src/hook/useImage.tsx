import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RequestState } from "./useRequest";


export const useImageSave = (
  postImg: RequestState,
  nextUrl: string
) => {
  //   const [alertData, alertAction] = useAlert();
    const history = useHistory();

  useEffect(() => {
    if (postImg.fulfilled) {
      const projectId = postImg.data.fileName.split(".");
      history.push(`${nextUrl}/${projectId[0]}`);
    }
  }, [postImg.fulfilled]);

  useEffect(() => {
    if (postImg.rejected) {
      //   alertAction.open(createState.createProject.error.response.data.message);
      console.log(postImg.error);
    }
  }, [postImg.rejected]);
};
