import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemporary } from "../reducers/temporary";
const axios = require("axios");

export function useTemporaryApi() {
  const { temporary } = useSelector((state) => state.temproray);
  const getApi = async () => {
    const res = await axios.get(`http://127.0.0.1:3001/getData`);
    return res.data;
  };
  const postApi = async (data) => {
    const res = await axios.post(`http://127.0.0.1:3001/postData`, {data: data});
    return res.data;
  };

  return [temporary, { getApi, postApi }];
}

export function useGetTemporary(data, fulfilled, rejected, error, getApi) {
  const [tempState, setTempState] = useState(data);

  useEffect(() => {
    if (fulfilled) setTempState(data);
  }, [fulfilled]);

  useEffect(() => {
    getApi();
  }, []);

  useEffect(()=>{
    if(rejected){
        if(error){
            alert(error);
            console.log(error)
        }
    }
  }, [rejected]);

  const clickPlusButton = () => {
    setTempState((value) => {
      return value + 1;
    });
  };

  return [tempState, { clickPlusButton }];
}

export function usePostTemporary(data, fulfilled, rejected, error, posApi) {
    const dispatch = useDispatch();
  
    useEffect(() => {
      console.log(fulfilled)
      if (fulfilled){
        alert('전송 성공!');
        dispatch(setTemporary(data));
      } 
    }, [fulfilled]);
  
    useEffect(()=>{
        if(rejected){
            if(error){
                alert(error.response);
                console.log(error)
            }
        }
      }, [rejected])
}
