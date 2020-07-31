import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { useRequest } from "../../../../hook/useRequest";
import ProjectBox from "../../../Project/ProjectBox";
import { useEndedProjectApi } from "../../../../hook/api/profileApi";
import { useEndedProject } from "../../../../hook/profile/useProfileProject";
import "./profileProject.css";
import { useSelector } from "react-redux";
import ModifyEndedProjects from "./ModifyEndedProjects";

const EndedProjects = ({ userId }) => {
  const myId = useSelector(state => state.login.userId);

  const [hiding, setHiding] = useState(false);
  const [list, setList] = useState([]);

  const hideToggle = () => {
    setHiding(!hiding);
  };

  const { getProject } = useEndedProjectApi();

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

  useEndedProject(
    resGetProject,
    getProjectFulfilled,
    getProjectRejected,
    getProjectError,
    getProjectApi,

    setList,
    hiding,

    userId
  );
  //console.log(projectList);

  return (
    <div className="insideTab">
      {hiding ? (
        <ModifyEndedProjects list={list} setList={setList} userId={userId} />
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
          <Button id="hide-button" onClick={hideToggle}>
            Hide
          </Button>
        </div>
      )}
    </div>
  );
};

export default EndedProjects;
