import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMainData } from "../reducers/Default";

 export function useLoading() {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(state => state.Default);
  const [loadState, setLoadState] = useState({
    open : false,
    text: '로딩 중...'
  }); // 메시지 상태메시지

  useEffect(()=>{
    if(isLoading){
      setLoadState({...loadState, open: true});
    }else if(isError){
      setLoadState({...loadState, open: false});
    }else{
      setLoadState({...loadState, open: false});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  return [{loadState}, setLoadState, dispatch];
}

export const useDefaultData = () => {
  const dispatch = useDispatch();
  const { mainData } = useSelector(state => state.Default);
  const [hotProjectState, setHotProjectState] = useState([{
    img: '',
    title: '',
    people: '',
    remain: 0,
    day: 0,
    developer: 0,
    designer: 0,
    planner: 0
}]);

  useEffect(()=>{
    console.log("??");
    dispatch(getMainData());
  }, [dispatch]);

  useEffect(()=>{
    setHotProjectState(mainData);
  }, [mainData])

  return [{hotProjectState}, setHotProjectState];
}
