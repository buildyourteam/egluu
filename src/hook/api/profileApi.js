import axios from "axios";
const BASE_URL = `http://34.105.29.115:8080/profile/`;
// Profile Page 좌측 Info창에서 사용되는 api
export function useInfoApi() {
  // get info api
  const getInfo = async userId => {
    const res = await axios.get(`${BASE_URL}${userId}`);
    console.log(res);
    return res.data;
  };

  // post info api
  const postInfo = async (userId, data) => {
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
  return { getInfo, postInfo };
}
export function useImgApi() {
  // get Img api
  const getImg = async userId => {
    const res = await axios.get(`${BASE_URL}image/${userId}`);
    //const res = await axios.get(`https://apis.tracker.delivery/carriers`);
    //console.log(res);
    return res.data;
  };

  const postImg = async (userId, data) => {
    const token = window.sessionStorage.getItem("accessToken");
    //console.log(token);
    //console.log(userId);
    let image = new FormData();
    image.append("image", data.imgUrl);
    const res = await axios.post(`${BASE_URL}image/${userId}`, image, {
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        authToken: token
      }
    });
    console.log(res);
    return res;
  };
  return { getImg, postImg };
}
