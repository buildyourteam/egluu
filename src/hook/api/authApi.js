import axios from "axios";
import { useEffect } from "react";
const BASE_URL = `http://211.209.39.131:8080/auth/`;
// const BASE_URL = `https://egluuapi.codingnome.dev/auth/`;

export function useRegisterApi() {
  const postRegister = async data => {
    const res = await axios.post(`${BASE_URL}signup`, data);
    console.log(res);
    return res.data;
  };
  return { postRegister };
}

export function useLoginApi() {
  const postLogin = async data => {
    const res = await axios.post(`${BASE_URL}signin`, data);
    // console.log(res);
    return res.data;
  };
  return { postLogin };
}
