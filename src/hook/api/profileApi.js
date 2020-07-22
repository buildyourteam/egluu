import axios from "axios";

export function useProfileInfoApi() {
  const getProfileInfo = async userId => {
    const res = await axios.get(`http://34.105.29.115:8080/profile/${userId}`);
    console.log(res);
    return res.data;
  };
  const postProfileInfo = async (userId, data) => {
    const res = await axios.post(
      `http://34.105.29.115:8080/profile/${userId}`,
      data
    );
    console.log(res);
    return res;
  };
  return { getProfileInfo, postProfileInfo };
}
