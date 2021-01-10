import axios from "axios";

export type RegisterState = {
  userId: String;
  userEmail: String;
  password: String;
  name: String;
};

export type RegisterLogin = {
  userId: String;
  password: String;
};

/**
 * 회원 가입 api
 */
export const registerApi: any = () => {
  // 회원 가입 정보 등록
  const postRegister = async (data: RegisterState): Promise<any> => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}auth/signup`,
      data,
    );
    return res.data;
  };
  return { postRegister };
};

/**
 * login 관련 api
 */
export const loginApi: any = () => {
  // 로그인
  const postLogin = async (data: RegisterLogin): Promise<any> => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}auth/signin`,
      data,
    );
    return res.data;
  };
  
  // 토큰 만료 시 refresh
  const refreshToken = async (): Promise<String> => {
    const token = window.sessionStorage.getItem("refreshToken");
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}auth/refresh`,
      {
        refreshToken: token,
      },
    );
    window.sessionStorage.setItem("accessToken", res.data.accessToken);
    return res.data.accessToken;
  };

  return { postLogin, refreshToken };
};
