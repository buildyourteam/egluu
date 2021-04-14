import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from ".";
import { RequestState } from "./useRequest";


export const useImageSave = (
  postImg: RequestState,
  nextUrl: string
) => {
    const { alertAction } = useAlert();
    const history = useHistory();

  useEffect(() => {
    if (postImg.fulfilled) {
      const projectId = postImg.data.fileName.split(".");
      history.push(`${nextUrl}/${projectId[0]}`);
    }
  }, [postImg.fulfilled]);

  useEffect(() => {
    if (postImg.rejected) {
        alertAction.open(postImg.error.response.data.message);
      console.log(postImg.error);
    }
  }, [postImg.rejected]);
};
