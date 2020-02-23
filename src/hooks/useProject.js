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
  const [projectState, setProjectState] = useState([
    {
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
      projectField: '',
      endDay: '',
      dday: 0,
    },
  ]);
  const [navState, setNavState] = useState({
    field: '',
    jobGroup: '',
    area: '',
  });
  useEffect(() => {
    dispatch(getProjectCardList());
  }, [dispatch]);

  useEffect(() => {
    setProjectState(projectCard);
  }, [projectCard]);

  useEffect(() => {
    const tempData = [];
    if (navState.field) {
      projectCard.forEach(value => {
        let Flag = false;
        value.field.forEach(value2 => {
          if (value2 === navState.field) Flag = true;
        });
        if (navState.jobGroup !== '') {
          if (navState.jobGroup === 'developer')
            if (
              value.needMember.developer - value.currentMember.developer ===
              0
            )
              Flag = false;
          if (navState.jobGroup === 'designer')
            if (value.needMember.designer - value.currentMember.designer === 0)
              Flag = false;
          if (navState.jobGroup === 'planner')
            if (value.needMember.planner - value.currentMember.planner === 0)
              Flag = false;
        }
        if (Flag) tempData.push(value);
      });
      setProjectState(tempData); // 인호 : 이게 조건문 안에 있어야하는데 밖으로 빼놨음
    }
  }, [navState.field, navState.jobGroup, projectCard]);

  return [{ projectState, navState }, setProjectState, setNavState];
};
