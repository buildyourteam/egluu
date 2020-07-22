import axios from "axios";

export function useRegisterApi() {
  const postRegister = async data => {
    const res = await axios.post(`http://34.105.29.115:8080/auth/signup`, data);
    console.log(res);
    return res.data;
  };
  return { postRegister };
}

export function ImageApi() {
  const getImage = async userId => {
    const res = await axios.get(
      `http://34.105.29.115:8080/profile/image/${userId}`
    );
    console(res);
    return res;
  };
  return { getImage };
}
