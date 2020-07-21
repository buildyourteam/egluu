import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export function useRegisterEffect(data, fulfilled, pending, rejected, error) {
  const history = useHistory();
  useEffect(() => {
    if (fulfilled) {
      alert("회원가입을 무사히 마쳤습니다,, \n 가서 로그인해 인간아!!");
      history.push("/login");
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      if (error) {
        alert(error.response.data);
        // console.log(error);
      }
    }
  }, [rejected]);
}
