import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { useRequest } from "../../../../hook/useRequest";
import ProjectBox from "../../../Project/ProjectBox";
import { usePlanProjectApi } from "../../../../hook/api/profileApi";
// 잠시 ended 훅을 공유해서 써보자
import useProfileProject from "../../../../hook/profile/useProfileProject";
import "../Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { setHideChange } from "../../../../reducers/profile";

import ModifyPlanProjects from "./ModifyPlanProjects";

const PlanProjects = ({ userId }) => {
  const dispatch = useDispatch();

  const myId = useSelector(state => state.login.userId);

  const [hiding, setHiding] = useState(false);
  const [list, setList] = useState([]);

  const hideToggle = () => {
    if (hiding) {
      setHiding(false);
      const reduxData = {
        isHideChange: true
      };
      dispatch(setHideChange(reduxData));
    } else {
      setHiding(true);
      const reduxData = {
        isHideChange: false
      };
      dispatch(setHideChange(reduxData));
    }
  };

  const { getProject } = usePlanProjectApi();

  const [
    {
      data: resGetProject,
      fulfilled: getProjectFulfilled,
      pending: getProjectPending,
      rejected: getProjectRejected,
      error: getProjectError
    },
    { run: getProjectApi }
  ] = useRequest(getProject);

  useProfileProject(
    resGetProject,
    getProjectFulfilled,
    getProjectRejected,
    getProjectError,
    getProjectApi,

    setList,
    hiding,

    userId
  );

  return (
    <div className="insideTab">
      {hiding ? (
        <ModifyPlanProjects list={list} setList={setList} userId={userId} />
      ) : getProjectPending ? (
        <p>로딩중...</p>
      ) : (
        <Row xs="3">
          {list.map((value, index) => (
            <Col key={index}>
              <ProjectBox data={value} />
            </Col>
          ))}
        </Row>
      )}
      {myId === userId && (
        <div>
          <Button id="hide-toggle-button" onClick={hideToggle}>
            Hide
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanProjects;
