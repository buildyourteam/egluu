import axios from "axios";
// const BASE_URL = `https://egluuapi.codingnome.dev/`;
const BASE_URL = `http://211.209.39.131:8080/`;

const refreshToken = async () => {
  const token = window.sessionStorage.getItem("refreshToken");
  const res = await axios.post(`${BASE_URL}auth/refresh`, {
    refreshToken: token
  });
  window.sessionStorage.setItem("accessToken", res.data.accessToken);
  console.log(res.data.accessToken);
  return res.data.accessToken;
};

export default refreshToken;
