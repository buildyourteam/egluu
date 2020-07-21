import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setTokenFlag } from "../../reducers/login";

export function useLoginEffect(data, fulfilled, pending, rejected, error) {
  const [state, setState] = useState({
    userId: "",
    password: ""
  });
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (fulfilled) {
      alert("로그인 성공!!");

      // console.log(state.userId);
      const token = data.headers.authtoken;

      window.sessionStorage.setItem("id", state.userId);
      window.sessionStorage.setItem("accessToken", token);
      const test = null;
      window.sessionStorage.getItem("accessToken", test);
      console.log("test = " + test);
      const reduxData = {
        isToken: true,
        userId: state.userId
      };
      dispatch(setToken(reduxData));
      //history.push("/");
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      if (error) {
        alert(error.response.data);
        setState({
          ...state,
          password: ""
        });
        // console.log(error.response);
      }
    }
  }, [rejected]);

  return [state, setState];
}

export function useLoginAuth() {
  const dispatch = useDispatch();
  useEffect(() => {
    const test = window.sessionStorage.getItem("accessToken");
    console.log(test);
    if (test !== null) {
      dispatch(setTokenFlag(true));
    }
  }, [])
}