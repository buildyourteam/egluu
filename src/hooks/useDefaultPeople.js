import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
export const useDefaultDataPeople = () => {
  const [mainPeopleState, setmainPeopleState] = useState([{
    img: '',
    name: '',
    stack: []
}]);

  const mainPeopleTemplist = [{
    img: 'http://mblogthumb3.phinf.naver.net/20160625_210/bjy0524_1466833747375ihpeN_PNG/%B7%BF%C3%F7%B8%C1%B0%ED%B6%F3%C0%CC%BE%F0%BB%E7%C1%F8.png?type=w800',
    name: '라이언',
    stack: ['곰', '사자']
  },
  {
    img: 'http://schoolsam.co.kr/web/product/big/kko88s.jpg',
    name: '어피치',
    stack: ['복숭아', '분홍색']
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWDagz6NBt8oHxMbMQu2HVcFGhUrIZNQNZNUbVz206cxDUtxdC&s',
    name: '네오',
    stack: ['단발', '고양이', ]
  },
  {
    img: 'https://img.insight.co.kr/static/2017/05/25/700/8b0150slwpwuni6385m0.jpg',
    name: '오리',
    stack: ['이름이', '생각이', '안나']
  }]

  useEffect(()=>{
    setmainPeopleState(mainPeopleTemplist);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [{mainPeopleState}, setmainPeopleState];
}
