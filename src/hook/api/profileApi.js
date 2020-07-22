import axios from "axios";

// Profile Page 좌측 Info창에서 사용되는 api
export function useProfileInfoApi() {
  // get info api
  const getProfileInfo = async userId => {
    const res = await axios.get(`http://34.105.29.115:8080/profile/${userId}`);
    console.log(res);
    return res.data;
  };

  // post info api
  const postProfileInfo = async (userId, data) => {
    const token = window.sessionStorage.getItem("accessToken");
    //console.log(token);
    //console.log(userId);
    const res = await axios.put(
      `http://34.105.29.115:8080/profile/${userId}`,
      data,
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          authToken: token
        }
      }
    );
    console.log(res);
    return res;
  };
  return { getProfileInfo, postProfileInfo };
}
