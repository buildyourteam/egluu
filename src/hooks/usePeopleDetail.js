import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPeopleDetail } from "../reducers/People";

export function usePeopleDetailLoading() {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(state => state.People);
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
  }, [isLoading, isError]);

  return [{ loadState }, setLoadState, dispatch];
}

export const usePeopleDetailData = () => {
  const dispatch = useDispatch();
  const { people } = useSelector(state => state.People);
  const [peopleDetailState, setPeopleDetailState] = useState({
    userId: "",
    imgUrl: "",
    name: "",
    role: [],
    technicalStack: [],
    contact: "",
    area: "",
    level: 0
  });
  const [open, setOpen] = useState({
    change: false
  });
  useEffect(() => {
    dispatch(getPeopleDetail());
  }, [dispatch]);

  useEffect(() => {
    setPeopleDetailState(people);
  }, [people]);

  return [{ peopleDetailState, open }, setPeopleDetailState, setOpen];
};
