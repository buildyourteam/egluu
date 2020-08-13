import axios from "axios";
import { useEffect } from "react";

export function useRegisterApi() {
  const postRegister = async data => {
    const res = await axios.post(
      `https://egluuapi.codingnome.dev/auth/signup`,
      data
    );
    console.log(res);
    return res.data;
  };
  return { postRegister };
}

export function useLoginApi() {
  const postLogin = async data => {
    const res = await axios.post(
      `https://egluuapi.codingnome.dev/auth/signin`,
      data
    );
    // console.log(res);
    return res.data;
  };
  return { postLogin };
}
