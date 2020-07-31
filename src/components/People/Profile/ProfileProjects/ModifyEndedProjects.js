import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { useRequest } from "../../../../hook/useRequest";
import ProjectBox from "../../../Project/ProjectBox";
import { useEndedProjectApi } from "../../../../hook/api/profileApi";
import { useEndedModify } from "../../../../hook/profile/useProfileProjectModify";
import "./profileProject.css";
import { useSelector } from "react-redux";

const ModifyEndedProjects = ({ list, setList, userId }) => {
  const [hideList, setHideList] = useState([]);
  const { getHideProject, hideProject, displayProject } = useEndedProjectApi();

  const [
    {
      data: resGetProject,
      fulfilled: getProjectFulfilled,
      pending: getProjectPending,
      rejected: getProjectRejected,
      error: getProjectError
    },
    { run: getHideProjectApi }
  ] = useRequest(getHideProject);

  const [
    {
      data: resHideProject,
      fulfilled: hideProjectFulfilled,
      pending: hideProjectPending,
      rejected: hideProjectRejected,
      error: hideProjectError
    },
    { run: hideProjectApi }
  ] = useRequest(hideProject);

  const [
    {
      data: resDisplayProject,
      fulfilled: displayProjectFulfilled,
      pending: displayProjectPending,
      rejected: displayProjectRejected,
      error: displayProjectError
    },
    { run: displayProjectApi }
  ] = useRequest(displayProject);

  useEndedModify(
    resGetProject,
    getProjectFulfilled,
    getProjectRejected,
    getProjectError,
    getHideProjectApi,

    resHideProject,
    hideProjectFulfilled,
    hideProjectRejected,
    hideProjectError,

    resDisplayProject,
    displayProjectFulfilled,
    displayProjectRejected,
    displayProjectError,

    userId,

    list,
    setList,

    hideList,
    setHideList
  );

  const handleHide = id => {
    hideProjectApi(userId, id);
  };

  const handleDisplay = id => {
    displayProjectApi(userId, id);
  };

  return (
    <>
      <div className="display-projects">
        <Row xs="3">
          {list.map((value, index) => (
            <Col key={index}>
              <Button
                className="hide-botton"
                onClick={() => handleHide(value.projectId)}
              >
                Hide
              </Button>
              <ProjectBox data={value} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="hidden-projects">
        <Row xs="3">
          {hideList.map((value, index) => (
            <Col key={index}>
              <Button
                className="display-botton"
                onClick={() => handleDisplay(value.projectId)}
              >
                Display
              </Button>
              <ProjectBox data={value} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default ModifyEndedProjects;
