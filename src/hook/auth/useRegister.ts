import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "..";
import { useRequest } from "../";
import { registerApi } from "../api";

export function useRegisterEffect() {
  const history = useHistory();
  const { alertAction } = useAlert();
  const [
    registerPromiseState,
    { run: postRegisterFetch },
  ] = useRequest(registerApi.postRegister);

  useEffect(() => {
    if (registerPromiseState.fulfilled) {
      alertAction.open("회원가입을 무사히 마쳤습니다. 로그인 부탁드립니다.");
      history.push("/login");
    }
  }, [registerPromiseState.fulfilled]);

  useEffect(() => {
    if (registerPromiseState.rejected) {
      if (registerPromiseState.error) {
        alertAction.open(registerPromiseState.error.response.data.message);
      }
    }
  }, [registerPromiseState.rejected]);

  return { postRegisterFetch };
}
