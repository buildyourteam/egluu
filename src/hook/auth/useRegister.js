import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "../";

export function useRegisterEffect(data, fulfilled, pending, rejected, error) {
  const history = useHistory();
  const [alertData, alertAction] = useAlert();

  useEffect(() => {
    if (fulfilled) {
      alertAction.open(
        "회원가입을 무사히 마쳤습니다,, \n 가서 로그인해 인간아!!"
      );
      history.push("/login");
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      if (error) {
        alertAction.open(error.response.data);
        // console.log(error);
      }
    }
  }, [rejected]);
}
