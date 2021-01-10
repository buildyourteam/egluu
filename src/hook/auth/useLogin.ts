import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../reducers/login";
import { useAlert, useRequest } from "..";
import { loginApi } from "../../hook/api";

export function useLoginEffect() {
  const { postLogin } = loginApi();
  const [login, { run: postLoginApi }] = useRequest(postLogin);

  // 로그인 정보 state
  const [loginState, setLoginState] = useState({
    userId: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { alertAction } = useAlert();
  
  // 로그인 성공 시 useEffect
  useEffect(() => {
    if (login.fulfilled) {
      // response에서 토큰 추출
      const accessToken = login.data.accessToken;
      const refreshToken = login.data.refreshToken;
      // 세션스토리지에 아이디와 토큰 저장
      window.sessionStorage.setItem("id", loginState.userId);
      window.sessionStorage.setItem("accessToken", accessToken);
      window.sessionStorage.setItem("refreshToken", refreshToken);
      alertAction.open("로그인 성공");

      // 리덕스에 디스패치
      const reduxData = {
        isToken: true,
        userId: loginState.userId,
      };
      dispatch(setToken(reduxData));
    }
  }, [login.fulfilled]);

  // 로그인 실패시
  useEffect(() => {
    if (login.rejected) {
      if (login.error) {
        // 실패 이유 알림
        alertAction.open(login.error.response.data.message);
        // 실패한 아이디는 내버려두고, 비밀번호만 초기화
        setLoginState({
          ...loginState,
          password: "",
        });
      }
    }
  }, [login.rejected]);

  // login page에서 input값 관리에 사용할 수 있게 로그인 정보 state 리턴
  return [{ loginState }, { setLoginState, postLoginApi }];
}

// 세션 스토리지에 아이디와 토큰이 있을 때, 리덕스에 토큰유무와 아이디를 저장
// 레이아웃 바에서 유저아이디를 띄우기 위함
export function useLoginAuth() {
  const dispatch = useDispatch();

  // 새로고침시 (최상단 컴포넌트 app이 다시 그려질 시)만 동작
  useEffect(() => {
    // 세션에서 값 받아옴
    let test = null;
    test = window.sessionStorage.getItem("accessToken");
    const id = window.sessionStorage.getItem("id");

    // null값이 아니면
    if (test !== null) {
      // payload 만들어서
      const reduxData = {
        isToken: true,
        userId: id,
      };

      // 액션 디스패치
      dispatch(setToken(reduxData));
    }
  }, []);
}
