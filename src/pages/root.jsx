import React from "react";
import { Row, Col } from "reactstrap";
import {
  useTemporaryApi,
  useProjectListState,
  usePeopleListState,
  useRequest
} from "../hook";
import {
  Button,
  Layout,
  Jumbotron,
  SubtitleHeader,
  ProjectBox,
  PeopleBox
} from "../components";
import "./main.css";
export default function Root() {
  const [temporary, apiAction] = useTemporaryApi();
  const [
    {
      data: resProjectList,
      fulfilled: getProjectListFulfilled,
      pending: getProjectListPending,
      rejected: getProjectListRejected,
      error: getProjectListError
    },
    { run: getProjectListApi }
  ] = useRequest(apiAction.getProjectList);
  const [
    {
      data: resPeopletList,
      fulfilled: getPeopleListFulfilled,
      pending: getPeopleListPending,
      rejected: getPeopleListRejected,
      error: getPeopleListError
    },
    { run: getPeopleListApi }
  ] = useRequest(apiAction.getPeopleList);

  const [projectListState] = useProjectListState(
    resProjectList,
    getProjectListFulfilled,
    getProjectListPending,
    getProjectListRejected,
    getProjectListError,
    getProjectListApi
  );
  const [peopleListState] = usePeopleListState(
    resPeopletList,
    getPeopleListFulfilled,
    getPeopleListPending,
    getPeopleListRejected,
    getPeopleListError,
    getPeopleListApi
  );
  // console.log(peopleListState);
  return (
    <Layout>
      {getProjectListPending || getPeopleListPending ? (
        <div>로딩중...</div>
      ) : (
        <div>
          <Jumbotron />
          <SubtitleHeader>마감임박 프로젝트 </SubtitleHeader>
          <Row xs="12">
            {projectListState.map((value, index) => {
              return (
                <Col xs="3" key={index}>
                  <ProjectBox data={value} />
                </Col>
              );
            })}
          </Row>
          <SubtitleHeader> 프로젝트를 찾는 사람들 </SubtitleHeader>
          <Row xs="12">
            {peopleListState.map((value, index) => {
              return (
                <Col xs="2" key={index}>
                  <PeopleBox data={value} />
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </Layout>
  );
}
