import axios from "axios";
const BASE_URL = `http://34.105.29.115:8080/profile/`;
// Profile Page 좌측 Info창에서 사용되는 api
export function useProfileInfoApi() {
  // get info api
  const getProfileInfo = async userId => {
    const res = await axios.get(`${BASE_URL}${userId}`);
    console.log(res);
    return res.data;
  };

  // post info api
  const postProfileInfo = async (userId, data) => {
    const token = window.sessionStorage.getItem("accessToken");
    //console.log(token);
    //console.log(userId);
    const res = await axios.put(`${BASE_URL}${userId}`, data, {
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        authToken: token
      }
    });
    console.log(res);
    return res;
  };
  return { getProfileInfo, postProfileInfo };
}
export function useProfileImgApi() {
  // get Img api
  const getProfileInfoImg = async userId => {
    // const res = await axios.get(`${BASE_URL}image/${userId}`);
    const res = await axios.get(`https://apis.tracker.delivery/carriers`);
    //console.log(res);
    return res.data;
  };

  const postProfileInfoImg = async (userId, data) => {
    const token = window.sessionStorage.getItem("accessToken");
    //console.log(token);
    //console.log(userId);
    let image = new FormData();
    image.append("image", data.imgUrl);
    const res = await axios.put(`${BASE_URL}${userId}`, image, {
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        authToken: token
      }
    });
    console.log(res);
    return res;
  };
  return { getProfileInfoImg, postProfileInfoImg };
}
