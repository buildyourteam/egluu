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

export const registerApi = () => {
  const postRegister = async (data: RegisterState) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}auth/signup`,
      data,
    );
    return res.data;
  };
  return { postRegister };
};

export const loginApi = () => {
  const postLogin = async (data: RegisterLogin) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}auth/signin`,
      data,
    );
    return res.data;
  };
  return { postLogin };
};
