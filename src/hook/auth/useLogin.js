import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from '../../reducers/login';

export function useLoginEffect(data, fulfilled, pending, rejected, error) {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (fulfilled) {
      alert("로그인 성공!!");
      console.log(data)
      console.log(data.headers);
      const token = data.headers.authtoken;

      window.sessionStorage.setItem("id", data.id);
      window.sessionStorage.setItem("accessToken", token);
      dispatch(setToken(true));
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
