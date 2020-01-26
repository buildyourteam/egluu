import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjectData } from '../reducers/Project'

 export function useProjectLoading() {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(state => state.Project);
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

export const useProjectData = () => {
  const dispatch = useDispatch();
  const { projectData } = useSelector(state => state.Project);
  const [projectState, setProjectState] = useState([{
    img: '',
    title: '',
    people: '',
    remain: 0,
    day: 0,
    developer: 0,
    designer: 0,
    planner: 0,
    field: []
  }]);
  const [navState, setNavState] = useState({
    field:'',
    jobGroup: '',
    area: ''
  });
  useEffect(()=>{
    dispatch(getProjectData());
  }, [dispatch]);

  useEffect(()=>{
    setProjectState(projectData);
  }, [projectData])

  useEffect(()=>{
    let tempData = [];
    if(navState.field){
      projectData.forEach(value=>{
        let Flag = false;
        value.field.forEach(value2 => {
         if(value2 === navState.field)
          Flag = true;
        });
        if(navState.jobGroup !== ''){
          if(navState.jobGroup === 'developer')
            if(value.developer === 0)
              Flag = false;
          if(navState.jobGroup === 'designer')
            if(value.designer === 0)
              Flag = false;
          if(navState.jobGroup === 'planner')
            if(value.planner === 0)
              Flag = false;
        }
        if(Flag)
          tempData.push(value);
      });
    }
    setProjectState(tempData);
  }, [navState.field, navState.jobGroup]);

  return [{projectState, navState}, setProjectState, setNavState];
}
