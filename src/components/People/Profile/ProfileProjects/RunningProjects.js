import React from "react";
import { Row, Col } from "reactstrap";
import { useRequest } from "../../../../hook/useRequest";
import ProjectBox from "../../../Project/ProjectBox";
import { useRunningProjectApi } from "../../../../hook/api/profileApi";
import { useRunningProject } from "../../../../hook/profile/useProfileProject";
import "../Profile.css";

const RunningProjects = ({ userId }) => {
  const { getProject } = useRunningProjectApi();

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

  const projectList = useRunningProject(
    resGetProject,
    getProjectFulfilled,
    getProjectRejected,
    getProjectError,
    getProjectApi,
    userId
  );
  //console.log(projectList);

  return (
    <div className="insideTab">
      {getProjectPending ? (
        <p>로딩중...</p>
      ) : (
        <Row xs="3">
          {projectList.map((value, index) => (
            <Col key={index}>
              <ProjectBox data={value} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default RunningProjects;
