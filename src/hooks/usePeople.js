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
    if (navState.field) {
      peopleCard.forEach(value => {
        let Flag = false;
        value.field.forEach(value2 => {
          if (value2 === navState.field) Flag = true;
        });
        if (navState.jobGroup !== "") {
          if (navState.jobGroup === "developer")
            if (
              value.needMember.developer - value.currentMember.developer ===
              0
            )
              Flag = false;
          if (navState.jobGroup === "designer")
            if (value.needMember.designer - value.currentMember.designer === 0)
              Flag = false;
          if (navState.jobGroup === "planner")
            if (value.needMember.planner - value.currentMember.planner === 0)
              Flag = false;
        }
        if (Flag) tempData.push(value);
      });
    }
    setPeopleState(tempData);
  }, [navState.field, navState.jobGroup, peopleCard]);
  console.log(peopleState);

  return [{ peopleState, navState }, setPeopleState, setNavState];
};
