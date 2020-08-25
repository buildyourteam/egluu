import axios from "axios";

const refreshToken = async () => {
  const token = window.sessionStorage.getItem("refreshToken");
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}auth/refresh`,
    {
      refreshToken: token,
    }
  );
  window.sessionStorage.setItem("accessToken", res.data.accessToken);
  return res.data.accessToken;
};

export default refreshToken;
