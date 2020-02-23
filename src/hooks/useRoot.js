import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMainData } from '../reducers/Project';
import { getMainPeopleData } from '../reducers/People';

export function useLoading() {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(state => state.Project);
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
  }, [isLoading, isError]);

  return [{ loadState }, setLoadState, dispatch];
}

export const useDefaultData = () => {
  const dispatch = useDispatch();
  const { projectCard } = useSelector(state => state.Project);
  const [hotProjectState, setHotProjectState] = useState([
    {
      imgUrl: '',
      projectName: '',
      teamName: '',
      currentMember: {
        developer: 0,
        planner: 0,
        other: 0,
        designer: 0,
      },
      needMember: {
        developer: 0,
        planner: 0,
        other: 0,
        designer: 0,
      },
      Dday: 0,
    },
  ]);
  useEffect(() => {
    dispatch(getMainData());
  }, [dispatch]);

  useEffect(() => {
    setHotProjectState(projectCard);
  }, [projectCard]);

  return [{ hotProjectState }, setHotProjectState];
};

export const useDefaultPeopleData = () => {
  const dispatch = useDispatch();
  const { peopleCard } = useSelector(state => state.People);
  const [hotPeopleState, setHotPeopleState] = useState([
    {
      userId: '',
      imgUrl: '',
      name: '',
      tag: [],
      level: 0,
    },
  ]);
  useEffect(() => {
    dispatch(getMainPeopleData());
  }, [dispatch]);

  useEffect(() => {
    setHotPeopleState(peopleCard);
  }, [peopleCard]);

  return [{ hotPeopleState }, setHotPeopleState];
};
