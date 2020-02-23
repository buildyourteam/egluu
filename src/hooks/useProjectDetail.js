import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjectDetail } from "../reducers/Project";

export function useProjectDetailLoading() {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(state => state.Project);
  const [loadState, setLoadState] = useState({
    open: false,
    text: "로딩 중..."
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
  }, [isLoading, isError, loadState]);
  return [{ loadState }, setLoadState, dispatch];
}

export const useProjectDetailData = () => {
  const dispatch = useDispatch();
  const { project } = useSelector(state => state.Project);
  const [projectDetailState, setProjectDetailState] = useState({
    projectId: "",
    imgUrl: "",
    projectName: "",
    teamName: "",
    currentMember: {
      developer: 0,
      planner: 0,
      etc: 0,
      designer: 0
    },
    needMember: {
      developer: 0,
      planner: 0,
      etc: 0,
      designer: 0
    },
    endDate: 0,
    description: "",
    memberList: [{ userId: "", status: 0 }]
  });
  const [open, setOpen] = useState({
    change: false
  });
  useEffect(() => {
    dispatch(getProjectDetail());
  }, [dispatch]);

  useEffect(() => {
    setProjectDetailState(project);
  }, [project]);

  return [{ projectDetailState, open }, setProjectDetailState, setOpen];
};
