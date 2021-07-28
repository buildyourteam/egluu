import { useSelector, useDispatch } from "react-redux";
const axios = require("axios");

export function useTemporaryApi() {
  const { temporary } = useSelector((state) => state.temproray);
  const getProjectList = async () => {
    const res = await axios.get(`https://apis.tracker.delivery/carriers`);
    return res.data;
  };
  const getPeopleList = async () => {
    const res = await axios.get(`https://apis.tracker.delivery/carriers`);
    return res.data;
  };
  const postProjectList = async (data) => {
    await axios.post(`https://apis.tracker.delivery/carriers`, { data: data });
  };
  const postPeopletList = async (data) => {
    await axios.post(`https://apis.tracker.delivery/carriers`, { data: data });
  };

  return [
    temporary,
    {
      getProjectList,
      getPeopleList,
      postProjectList,
      postPeopletList,
    },
  ];
}
