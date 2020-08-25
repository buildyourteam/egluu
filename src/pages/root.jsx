import React from "react";
import { Row, Col } from "reactstrap";
import {
  useDeadlineProjectListEffect,
  usePeopleListEffect,
  usePeopleListState,
  useProjectListState,
  useRequest,
} from "../hook";
import {
  Button,
  Layout,
  Jumbotron,
  SubtitleHeader,
  ProjectBox,
  PeopleBox,
} from "../components";
import Pagination from "@material-ui/lab/Pagination";
import "./main.css";

export default function Root() {
  const [project, projectAction] = useProjectListState();
  const [projectListPromise, { run: getProjectList }] = useRequest(
    projectAction.getDeadLineProjectList
  );
  useDeadlineProjectListEffect(
    projectListPromise,
    getProjectList,
    projectAction.setProjectList,
    projectAction.setPage
  );


  const [people, peopleAction] = usePeopleListState();
  const [peopleListPromise, { run: getPeopleList }] = useRequest(
    peopleAction.getPeopleList
  );
  usePeopleListEffect(
    peopleListPromise,
    getPeopleList,
    peopleAction.setPeopleList,
    peopleAction.setPage
  );

  return (
    <Layout>
      <div>
        <Jumbotron />
        <SubtitleHeader>마감임박 프로젝트 </SubtitleHeader>
        <Row xs="12">
          {project.projectList.map((value, index) => {
            return (
              <Col xs="3" key={index}>
                <ProjectBox data={value} />
              </Col>
            );
          })}
        </Row>
        <div id="pagination_div">
          <Pagination
            id="pagination"
            count={project.totalPages}
            onChange={(e, page) => {
              getProjectList(page - 1);
            }}
          />
        </div>
        <SubtitleHeader> 프로젝트를 찾는 사람들 </SubtitleHeader>
        <Row xs="12">
          {people.peopleList.map((value, index) => {
            return (
              <Col xs="2" key={index}>
                <PeopleBox data={value} />
              </Col>
            );
          })}
        </Row>
        <div id="pagination_div">
          <Pagination
            id="pagination"
            count={people.page.totalPages}
            onChange={(e, page) => {
              getPeopleList(page - 1);
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
