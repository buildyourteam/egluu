import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export function useLoginEffect(data, fulfilled, pending, rejected, error) {
  const history = useHistory();
  useEffect(() => {
    if (fulfilled) {
      alert("로그인 성공!!");

      const token = data.headers.authtoken;
      console.log(token);

      window.sessionStorage.setItem("id", data.id);
      window.sessionStorage.setItem("accessToken", token);

      //history.push("/");
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      if (error) {
        alert(error.response.data);
        // console.log(error.response);
      }
    }
  }, [rejected]);
}
