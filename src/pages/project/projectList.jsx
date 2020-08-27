import React, { useState } from "react";
import {
  useProjectListState,
  useProjectListEffect,
  useRequest,
} from "../../hook";
import { Link } from "react-router-dom";
import { Layout, ProjectBox } from "../../components";
import { Row, Col } from "reactstrap";
import { ProjectSort } from "../../components/List/Sort";
import { Button } from "reactstrap";
import Pagination from "@material-ui/lab/Pagination";

export default function ProjectList() {
  const [projectList, projectListAction] = useProjectListState();
  const [
    {
      data: resProjectList,
      fulfilled: getProjectListFulfilled,
      pending: getProjectListPending,
      rejected: getProjectListRejected,
      error: getProjectListError,
    },
    { run: getProjectListApi },
  ] = useRequest(projectListAction.getProjectList);
  useProjectListEffect(
    resProjectList,
    getProjectListFulfilled,
    getProjectListRejected,
    getProjectListError,
    getProjectListApi,
    projectListAction.setProjectList,
    projectListAction.setPage
  );

  return (
    <Layout>
      <hr />
      <ProjectSort
        role={projectList.role}
        setRole={projectListAction.setRole}
        region={projectList.region}
        setRegion={projectListAction.setRegion}
        stack={projectList.stack}
        setStack={projectListAction.setStack}
        search={projectList.search}
        setSearch={projectListAction.setSearch}
        getApi={getProjectListApi}
      />
      <div className="full_div">
        <div id="button">
          <Link to="/createProject">
            <Button>프로젝트 생성</Button>
          </Link>
        </div>
      </div>
      <hr />
      <Row xs="12">
        {projectList.projectList.map((value, index) => {
          return (
            <Col xs="3" key={index}>
              <ProjectBox
                url={`/projectDetail/${value.projectId}`}
                data={value}
                // onClick={() => handleClickProject(projectId)}
              />
            </Col>
          );
        })}
      </Row>
      <div id="pagination_div">
        <Pagination
          id="pagination"
          count={projectList.page.totalPages}
          onChange={(e, page) => {
            let params = "";
            if (projectList.role !== "") params += `&role=${projectList.role}`;
            if (projectList.region !== "")
              params += `&region=${projectList.region}`;
            if (projectList.stack !== "")
              params += `&stack=${projectList.stack}`;
            getProjectListApi(page - 1, params);
          }}
        />
      </div>
    </Layout>
  );
}
