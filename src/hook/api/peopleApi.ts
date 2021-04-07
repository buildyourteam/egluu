import axios from "axios";
import { loginApi } from "./";

type info = {
  userId: String;
  userEmail: String;
  password: String;
  name: String;
};

/**
 * Profile Page 좌측 Info창에서 사용되는 api
 */
export const peopleListApi: any = () => {
   
    // 사람 리스트
  const getPeopleList = async (pageNumber: number, params?: Object[]): Promise<object> => {
    const res = await axios.get(
      `https://egluuapi.codingnome.dev/people?page=${pageNumber}&size=12${params}`,
    );
    return res.data;
  };

  //
  const getWantedPeopleList = async (pageNumber: number): Promise<object> => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}people?page=${pageNumber}&size=6`,
    );
    return res.data;
  };

  return { getPeopleList, getWantedPeopleList };
}
