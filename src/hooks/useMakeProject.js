import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectDetail } from '../reducers/Project';

export function useMakeProjectLoading() {
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

export const useMakeProjectData = () => {
  const date = new Date();
  const [MakeprojectState, setMakeProjectState] = useState({
    projectId: '',
    imgUrl: '',
    projectName: '',
    teamName: '',
    currentMember: {
      developer: 0,
      planner: 0,
      etc: 0,
      designer: 0,
    },
    needMember: {
      developer: 0,
      planner: 0,
      etc: 0,
      designer: 0,
    },
    endDate: date,
    description: '',
    memberList: [{ userId: '', status: 0 }],
  });

  return [{ MakeprojectState }, setMakeProjectState];
};
