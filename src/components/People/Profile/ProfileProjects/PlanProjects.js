import React from "react";
import { Row, Col } from "reactstrap";
import { useRequest } from "../../../../hook/useRequest";
import ProjectBox from "../../../Project/ProjectBox";
import { usePlanProjectApi } from "../../../../hook/api/profileApi";
import { usePlanProject } from "../../../../hook/profile/useProfileProject";
import "../Profile.css";

const PlanProjects = ({ userId }) => {
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

  const projectList = usePlanProject(
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

export default PlanProjects;
