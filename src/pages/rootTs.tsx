import React from "react";
import { Layout, ProjectBox, PeopleBox } from "../components";
import "./main.css";
import { Pagination, Carousel, List, Typography } from "antd";
import {
  useProjectListStateTs,
  useDeadlineProjectListEffect,
} from "../hook/projectTs";
import {
  usePeopleListStateTs,
  useWantedPeopleListEffectTs,
} from "../hook/peopleTs";

const { Title } = Typography;

export default function Root() {
  const { projectPage, projectAction } = useProjectListStateTs();
  useDeadlineProjectListEffect(projectPage, projectAction);

  const { peoplePage, peopleAction } = usePeopleListStateTs();
  useWantedPeopleListEffectTs(peoplePage, peopleAction);

  return (
    <Layout>
      <div>
        <Carousel autoplay>
          <div>
            <img
              style={{
                height: "480px",
                color: "#fff",
                lineHeight: "480px",
                textAlign: "center",
                background: "#364d79",
              }}
              src="https://picsum.photos/id/1/1000/480"
              alt="image"
            />
          </div>
          <div>
            <img
              style={{
                height: "480px",
                color: "#fff",
                lineHeight: "480px",
                textAlign: "center",
                background: "#364d79",
              }}
              src="https://picsum.photos/id/2/1000/480"
              alt="image"
            />
          </div>
          <div>
            <img
              style={{
                height: "480px",
                color: "#fff",
                lineHeight: "480px",
                textAlign: "center",
                background: "#364d79",
              }}
              src="https://picsum.photos/id/3/1000/480"
              alt="image"
            />
          </div>
          <div>
            <img
              style={{
                height: "480px",
                color: "#fff",
                lineHeight: "480px",
                textAlign: "center",
                background: "#364d79",
              }}
              src="https://picsum.photos/id/4/1000/480"
              alt="image"
            />
          </div>
        </Carousel>
        <Title level={3}>마감임박 프로젝트 </Title>
        <List
          loading={projectPage.DeadLineProjectListPromise.pending}
          grid={{
            gutter: 10,
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
              projectAction.getDeadLineProjectListApi(page - 1)
            }
            total={projectPage.page?.totalPages}
          />
        </div>
        <Title level={3}>프로젝트를 찾는 사람들</Title>
        <List
          loading={peoplePage.WantedPeopleListPromise.pending}
          grid={{
            gutter: 10,
            xs: 2,
            sm: 3,
            md: 6,
            lg: 6,
            xl: 6,
            xxl: 6,
          }}
          dataSource={peoplePage.peopleList}
          renderItem={(item) => (
            <List.Item>
              <PeopleBox data={item} url={`/profile/${item.userId}`} />
            </List.Item>
          )}
        />
        <div id="pagination_div" style={{ marginTop: "30px" }}>
          <Pagination
            onChange={(page, pageSize) =>
              peopleAction.getWantedPeopleList(page - 1)
            }
            total={projectPage.page?.totalPages}
          />
        </div>
      </div>
    </Layout>
  );
}
