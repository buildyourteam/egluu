import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../reducers/login";
import { useAlert, useMove, useRequest } from "..";
import { loginApi } from "../../hook/api";

type userType = {
  userId: string;
  password: string;
};

type LoginType = {
  loading: boolean;
  user: userType;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};


export function useLoginEffect(): LoginType {
  const dispatch = useDispatch();
  const isToken = useSelector((state: any) => state.login.isToken);
  const { alertAction } = useAlert();
  const [login, { run: postLoginApi }] = useRequest(loginApi().postLogin);
  const [user, setUser] = useState<userType>({
      userId: "",
      password: "",
    });

  useMove(isToken && login.fulfilled, "");

  const onFinish = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("Success:", user);
    postLoginApi(user);
    return false;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setUser((value) => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };

  // 로그인 성공 시 useEffect
  useEffect(() => {
    if (login.fulfilled) {
      // response에서 토큰 추출
      const accessToken = login.data.accessToken;
      const refreshToken = login.data.refreshToken;
      // 세션스토리지에 아이디와 토큰 저장
      window.sessionStorage.setItem("id", user.userId);
      window.sessionStorage.setItem("accessToken", accessToken);
      window.sessionStorage.setItem("refreshToken", refreshToken);
      alertAction.open("로그인 성공");

      // 리덕스에 디스패치
      const reduxData = {
        isToken: true,
        userId: user.userId,
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
      }
    }
  }, [login.rejected]);

  return {
    loading: login.pending,
    user,
    onFinish,
    onFinishFailed,
    handleInput,
  };
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
