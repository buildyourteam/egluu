import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectCardList } from '../reducers/Project';

export function useProjectLoading() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  return [{ loadState }, setLoadState, dispatch];
}

export const useProjectData = () => {
  const dispatch = useDispatch();
  const { projectCard } = useSelector(state => state.Project);
  const [projectState, setProjectState] = useState(projectCard);
  const [navState, setNavState] = useState({
    page: 0,
    size: 10,
    sort: 'projectName',
    field: '',
    occupation: '',
    area: '',
  });
  useEffect(() => {
    const initData = {
      page: 0,
      size: 10,
      sort: 'projectName',
      occupation: 'developer',
      field: 'WEB',
    };
    dispatch(getProjectCardList(initData));
  }, [dispatch]);

  useEffect(() => {
    setProjectState(projectCard);
  }, [projectCard]);

  return [{ projectState, navState }, setProjectState, setNavState];
};
