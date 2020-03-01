import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPeopleData, getFindPeople } from '../reducers/People';

export function usePeopleLoading() {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(state => state.People);
  const [loadState, setLoadState] = useState({
    open: false,
    text: '로딩 중...',
  }); // 메시지 상태메시지

  useEffect(() => {
    if (isLoading) {
      setLoadState({ ...loadState, open: true });
    } else if (isError) {
      setLoadState({ ...loadState, open: false });
    } else {
      setLoadState({ ...loadState, open: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);
  return [{ loadState }, setLoadState, dispatch];
}

export const usePeopleData = () => {
  const dispatch = useDispatch();
  const { peopleCard } = useSelector(state => state.People);
  const [peopleState, setPeopleState] = useState(peopleCard);
  const [navState, setNavState] = useState({
    sort: '',
    level: '',
    role: '',
    area: '',
  });
  useEffect(() => {
    const data = {
      page: 0,
      size: 3,
      sort: 'user_name',
      level: 1,
      role: 'LEADER',
      area: 'Seoul',
    };
    dispatch(getFindPeople(data));
  }, [dispatch]);

  useEffect(() => {
    setPeopleState(peopleCard);
  }, [peopleCard]);

  return [{ peopleState, navState }, setPeopleState, setNavState];
};
