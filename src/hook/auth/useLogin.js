import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../reducers/login";
import { useAlert } from "../";

export function useLoginEffect(data, fulfilled, pending, rejected, error) {
  // 로그인 정보 state
  const [state, setState] = useState({
    userId: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [alertData, alertAction] = useAlert();
  // 로그인 성공 시 useEffect
  useEffect(() => {
    if (fulfilled) {
      // response에서 토큰 추출
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      // 세션스토리지에 아이디와 토큰 저장
      window.sessionStorage.setItem("id", state.userId);
      window.sessionStorage.setItem("accessToken", accessToken);
      window.sessionStorage.setItem("refreshToken", refreshToken);
      alertAction.open("로그인 성공");

      // 리덕스에 디스패치
      const reduxData = {
        isToken: true,
        userId: state.userId,
      };
      dispatch(setToken(reduxData));
    }
  }, [fulfilled]);

  // 로그인 실패시
  useEffect(() => {
    if (rejected) {
      if (error) {
        console.log(error.response.a);
        // 실패 이유 알림
        alertAction.open(error.response.data.message);

        // 실패한 아이디는 내버려두고, 비밀번호만 초기화
        setState({
          ...state,
          password: "",
        });
      }
    }
  }, [rejected]);

  // login page에서 input값 관리에 사용할 수 있게 로그인 정보 state 리턴
  return [state, setState];
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
// export function useLogoutAuth(logout) {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // 세션에서 값 받아옴

//     let test = window.sessionStorage.getItem("accessToken");
//     const id = window.sessionStorage.getItem("id");

//     // null값이 아니면
//     if (test === null) {
//       // payload 만들어서
//       const reduxData = {
//         isToken: false,
//         userId: null
//       };

//       // 액션 디스패치
//       dispatch(setToken(reduxData));
//     }
//   }, [logout]);
// }
