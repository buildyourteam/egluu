import React from "react";
import { Layout, ProjectBox } from "../../components";
import { ProjectSort } from "../../components/List/Sort";
import { Alert, List, Pagination, Typography } from "antd";
import {
  useProjectListStateTs,
  useProjectListEffectTs,
} from "../../hook/projectTs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function ProjectListPage() {
  const { projectPage, projectAction } = useProjectListStateTs();
  useProjectListEffectTs(projectPage, projectAction);
  const isToken = useSelector((state: any) => state.login.isToken);

  return (
    <Layout>
      <div>
        <ProjectSort
          role={projectPage.role}
          setRole={projectAction.setRole}
          region={projectPage.region}
          setRegion={projectAction.setRegion}
          stack={projectPage.stack}
          setStack={projectAction.setStack}
          search={projectPage.search}
          setSearch={projectAction.setSearch}
          getApi={projectAction.getProjectListApi}
        />
        {isToken && <Link to="/createProject">
          <Alert
            message="프로젝트 생성을 원하신다면 여기를
          눌러주세요."
            type="success"
          />
        </Link>}

        <Title level={3}>모집 진행 중 프로젝트 </Title>
        <List
          loading={projectPage.projectListPromise.pending}
          grid={{
            gutter: 8,
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={projectPage.projectList}
          renderItem={(item) => (
            <List.Item>
              <ProjectBox
                data={item}
                url={`/projectDetail/${item.projectId}`}
              />
            </List.Item>
          )}
        />
        <div id="pagination_div">
          <Pagination
            onChange={(page, pageSize) =>
              projectAction.getProjectListApi(page - 1)
            }
            defaultCurrent={1}
            current={projectPage.page.number+1}
            pageSize={8}
            total={projectPage.page.totalPages * 8}
          />
        </div>
      </div>
    </Layout>
  );
}
