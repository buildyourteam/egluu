import axios from "axios";
import { useEffect } from "react";


export function useRegisterApi() {
  const postRegister = async data => {
    const res = await axios.post(`http://34.105.29.115:8080/auth/signup`, data);
    console.log(res);
    return res.data;
  };
  return { postRegister };
}

export function useLoginApi() {
  const postLogin = async data => {
    const res = await axios.post(`http://34.105.29.115:8080/auth/signin`, data);
    console.log(res);
    return res;
  };
  return { postLogin };
}

