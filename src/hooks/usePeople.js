import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPeopleData } from "../reducers/People";

export function usePeopleLoading() {
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

export const usePeopleData = () => {
  const dispatch = useDispatch();
  const { peopleCard } = useSelector(state => state.People);
  const [peopleState, setPeopleState] = useState([
    {
      userId: "",
      imgUrl: "",
      name: "",
      tag: [],
      level: 0
    }
  ]);
  const [navState, setNavState] = useState({
    field: "",
    jobGroup: "",
    area: ""
  });
  useEffect(() => {
    dispatch(getPeopleData());
  }, [dispatch]);

  useEffect(() => {
    setPeopleState(peopleCard);
  }, [peopleCard]);

  useEffect(() => {
    let tempData = [];
    if (navState.tag) {
      peopleCard.forEach(value => {
        let Flag = false;
        value.tag.forEach(value2 => {
          if (value2 === navState.tag) Flag = true;
        });

        if (Flag) tempData.push(value);
      });
      setPeopleState(tempData);
    }
  }, [navState.tag, navState.jobGroup, peopleCard]);
  console.log(peopleState);

  return [{ peopleState, navState }, setPeopleState, setNavState];
};
