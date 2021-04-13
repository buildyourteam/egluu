import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Layout,
  DropdownRole,
  HalfDrawer,
  CenterModal,
  BootstrapInput,
} from "../../components";
import "../main.css";
import { Link } from "react-router-dom";
import { setProject } from "../../reducers/project";
import "./projectDetail.css";
import {
  useProjectDetailStateTs,
  useProjectDetailEffectTs,
  useInputProjectApplyStateTs,
  useInputProjectApplyEffectTs,
  useViewProjectApplyStateTs,
  useViewProjectApplyEffectTs,
} from "../../hook/projectTs";
import { Button, Switch, List, Typography, Card, Input } from "antd";
const ReactMarkdown = require("react-markdown");

const { Title } = Typography;

export default function ProjectDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const url = location.pathname.split("/");
  const projectId = url[2];
  const { project, projectAction } = useProjectDetailStateTs();

  useProjectDetailEffectTs(project, projectAction, url[2]);

  const handleClickUpdate = () => {
    const updateProject = {
      img: [`${process.env.REACT_APP_BASE_URL}projects/image/${url[2]}`],
      ...project.project,
    };
    dispatch(setProject(updateProject));
  };

  const needList = [
    {
      title: "개발자",
      number: project.project.currentMember.developer,
    },
    {
      title: "디자이너",
      number: project.project.currentMember.designer,
    },
    {
      title: "기획자",
      number: project.project.currentMember.planner,
    },
    {
      title: "기타",
      number: project.project.currentMember.etc,
    },
  ];

  const allList = [
    {
      title: "개발자",
      number: project.project.needMember.developer,
    },
    {
      title: "디자이너",
      number: project.project.needMember.designer,
    },
    {
      title: "기획자",
      number: project.project.needMember.planner,
    },
    {
      title: "기타",
      number: project.project.needMember.etc,
    },
  ];

  return (
    <Layout>
      <div id="root">
        <div className="full_div">
          {project.check.reader ? (
            <div id="button">
              <Link to={`/projectUpdate/${url[2]}`}>
                <Button onClick={handleClickUpdate}>수정하기</Button>
              </Link>
              <Button
                danger
                onClick={projectAction.openDelete}
                style={{ marginLeft: "20px" }}
                color="danger"
              >
                삭제하기
              </Button>
              <CenterModal
                header="삭제하기"
                modalFlag={project.check.delete}
                close={projectAction.closeDelete}
                footer={
                  <div className="full_div">
                    <div id="button">
                      <Button
                        color="danger"
                        onClick={() =>
                          projectAction.deleteProjectApi(projectId)
                        }
                      >
                        삭제하기
                      </Button>
                    </div>
                  </div>
                }
              >
                <div style={{ height: "12px" }} />
                <Title level={3}>정말로 삭제하시겠습니까?</Title>
                <div style={{ height: "12px" }} />
              </CenterModal>
            </div>
          ) : (
            <div id="button">
              <Button type="primary" onClick={projectAction.openApply}>
                지원서
              </Button>
              <CenterModal
                header="지원하기"
                modalFlag={project.check.applyModal}
                close={projectAction.closeApply}
              >
                {console.log(project.project._links)}
                <ApplyProject
                  questions={project.project.questions}
                  projectId={projectId}
                  apiLink={project.project._links.apply.href}
                  detailGet={project.getProject.fulfilled}
                  close={projectAction.closeApply}
                />
              </CenterModal>
            </div>
          )}
        </div>
        <div className="input_grid">
          <div className="half_div_left">
            <img
              id="cover"
              src={`${process.env.REACT_APP_BASE_URL}projects/image/${url[2]}`}
              alt="temp"
            />
          </div>
          <div className="half_div_right">
            {/* <div id="tag_case"> */}
            <div>
              <span id="tag">{project.project.projectField}</span>
            </div>
            <Title level={1}>{project.project.projectName}</Title>
            <Title level={4}>{project.project.teamName}</Title>
            <Title level={5}>마감일 : {project.project.endDate}</Title>
            <div id="list">
              <div className="half_div_left">
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  size="large"
                  header={<div>모집 중 인원</div>}
                  bordered
                  loading={project.getProject.pending}
                  dataSource={needList}
                  renderItem={(item) => {
                    return (
                      <List.Item key={item.title}>
                        <List.Item.Meta title={<div>{item.title}</div>} />
                        <div>{item.number}명</div>
                      </List.Item>
                    );
                  }}
                />
              </div>
              <div className="half_div_right">
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  size="large"
                  header={<div>전체 인원</div>}
                  bordered
                  loading={project.getProject.pending}
                  dataSource={allList}
                  renderItem={(item) => {
                    return (
                      <List.Item key={item.title}>
                        <List.Item.Meta title={<div>{item.title}</div>} />
                        <div>{item.number}명</div>
                      </List.Item>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <Title level={3}>소개</Title>
        <ReactMarkdown
          source={project.project.introduction}
          className="introduction"
        />
        {project.check.reader && (
          <div>
            <div>
              <Title
                level={5}
                style={{
                  lineHeight: "22px",
                  marginRight: "10px",
                  display: "inline-block",
                }}
              >
                지원자 목록
              </Title>
              <Switch
                onChange={(checked: boolean) =>
                  projectAction.checkSwitch("apply", checked)
                }
              />
              {project.check.apply &&
                (project.apply.length === 0 ? (
                  <div>지원자가 없습니다 </div>
                ) : (
                  <div>
                    <List
                      itemLayout="vertical"
                      style={{
                        backgroundColor:
                          project.apply[project.pagination.apply].state ===
                          "REJECT"
                            ? "#eeeeee"
                            : project.apply[project.pagination.apply].state ===
                              "ACCEPT"
                            ? "rgb(212, 237, 218, 0.3)"
                            : "#ffffff",
                      }}
                      dataSource={project.apply}
                      header={
                        <div>
                          <b>지원 현황</b>
                        </div>
                      }
                      pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 1,
                      }}
                      renderItem={(item) => {
                        return (
                          <List.Item key={item.userName}>{item.role}</List.Item>
                        );
                      }}
                    >
                      {/* <ListItem>
                      <ListItemText
                        primary={`이름 : ${
                          project.apply[project.pagination.apply].userName
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`역할 : ${
                          project.apply[project.pagination.apply].role
                        }`}
                      />
                    </ListItem> */}
                      <Button onClick={projectAction.openDetailApply}>
                        상세보기
                      </Button>
                      <Button
                        disabled={project.pagination.apply === 0}
                        onClick={() =>
                          projectAction.clickPagination("apply", -1)
                        }
                      >
                        이전
                      </Button>
                      <Button
                        disabled={
                          project.apply.length - project.pagination.apply < 2
                        }
                        onClick={() =>
                          projectAction.clickPagination("apply", 1)
                        }
                      >
                        다음
                      </Button>
                    </List>
                    <CenterModal
                      header="지원자 상세 정보"
                      modalFlag={project.check.applyDetail}
                      close={projectAction.closeDetailApply}
                    >
                      <ViewProjectApply
                        open={project.check.applyDetail}
                        close={projectAction.closeDetailApply}
                        applyLink={
                          project.apply[project.pagination.apply]._links.self
                            .href
                        }
                        applySet={projectAction.setApply}
                        userId={project.apply[project.pagination.apply].userId}
                        setPagination={() =>
                          projectAction.clickPagination("apply", 0)
                        }
                      />
                    </CenterModal>
                  </div>
                ))}
            </div>
            <div style={{ marginTop: "10px" }}>
              <Title
                level={5}
                style={{
                  lineHeight: "22px",
                  marginRight: "10px",
                  display: "inline-block",
                }}
              >
                요청 목록
              </Title>
              <Switch
                onChange={(checked: boolean) =>
                  projectAction.checkSwitch("recruit", checked)
                }
              />
              {project.check.recruit &&
                (project.recruit.length === 0 ? (
                  <div>요청이 없습니다 </div>
                ) : (
                  <div>
                    <List
                      itemLayout="vertical"
                      size="large"
                      header={<div>지원 상태</div>}
                      bordered
                      dataSource={project.recruit}
                      pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 1,
                      }}
                      renderItem={(item) => {
                        return (
                          <List.Item>
                            <Card title={item.userName}>
                              <div>역할: {item.role}</div>
                              <div>자기소개: {item.introduction}</div>
                              <div>상태: {item.state}</div>
                            </Card>
                          </List.Item>
                        );
                      }}
                    />
                    {/* <List dense>
                    <ListItem>
                      <ListItemText
                        primary={`이름 : ${
                          project.recruit[project.pagination.recruit].userName
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`역할 : ${
                          project.recruit[project.pagination.recruit].role
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`자기소개 : ${
                          project.recruit[project.pagination.recruit]
                            .introduction
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`상태 : ${
                          project.recruit[project.pagination.recruit].state
                        }`}
                      />
                    </ListItem>
                  </List> */}
                    <Button
                      disabled={project.pagination.recruit === 0}
                      onClick={() =>
                        projectAction.clickPagination("recruit", -1)
                      }
                    >
                      이전
                    </Button>
                    <Button
                      disabled={
                        project.recruit.length - project.pagination.recruit < 2
                      }
                      onClick={() =>
                        projectAction.clickPagination("recruit", 1)
                      }
                    >
                      다음
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

const ApplyProject = (props: any) => {
  const { questions, projectId, apiLink, detailGet, close } = props;
  const { apply, applyAction } = useInputProjectApplyStateTs();
  useInputProjectApplyEffectTs(
    apply,
    applyAction,
    questions,
    detailGet,
    apiLink,
    close,
  );

  return (
    <div id="drawer_root">
      <div style={{ height: "12px" }} />
      {apply.apply.answers.map((a, i) => (
        <div>
          <label htmlFor={`q${i}`} style={{ fontSize: "15px" }}>
            {i + 1}번 질문 : {questions[i]}
          </label>
          <Input
            id={`q${i}`}
            placeholder="answer"
            name="answer"
            onChange={(e) => applyAction.inputAnswer(e.target.value, i)}
            value={a}
          />
        </div>
      ))}
      <label
        htmlFor="introduction"
        style={{ marginBottom: "0px", marginTop: "15px", fontSize: "16px" }}
      >
        자기 소개
      </label>
      <Input.TextArea
        id="introduction"
        name="introduction"
        placeholder="자기소개"
        onChange={(e) => applyAction.inputApply(e.target.name, e.target.value)}
        value={apply.apply.introduction}
        autoSize={{ minRows: 3, maxRows: 10 }}
      />
      <DropdownRole
        style={{ width: "100%", marginTop: "12px" }}
        dropdownCaret="역할 선택"
        action={applyAction.selectRole}
        pick={apply.apply.role}
      />
      <div className="full_div" style={{ marginTop: "12px" }}>
        <div id="button">
          {apply.applied ? (
            <Button
              type="primary"
              loading={apply.putApply.pending}
              onClick={() => {
                applyAction.putApplyApi(
                  {
                    answers: apply.apply.answers,
                    introduction: apply.apply.introduction,
                    role: apply.apply.role,
                  },
                  apiLink,
                );
              }}
            >
              수정하기
            </Button>
          ) : (
            <Button
              type="primary"
              loading={apply.postApply.pending}
              onClick={() => {
                applyAction.postApplyApi(
                  {
                    answers: apply.apply.answers,
                    introduction: apply.apply.introduction,
                    role: apply.apply.role,
                  },
                  apiLink,
                );
              }}
            >
              지원하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const ViewProjectApply = (props: any) => {
  const { open, close, applyLink, applySet, userId, setPagination } = props;
  const { applyDetail, applyDetailAction } = useViewProjectApplyStateTs();

  useViewProjectApplyEffectTs(
    applyDetail,
    applyDetailAction,
    open,
    applyLink,
    applySet,
    userId,
    close,
  );
  return (
    <div id="drawer_root">
      <div style={{ height: "12px" }} />
      {applyDetail.apply.answers.map((a: string, i: number) => (
        <div>
          <Title level={5}>
            {" "}
            {i + 1}번 질문 : {applyDetail.apply.questions[i]}
          </Title>
          <Title level={5}>{a}</Title>
          <div style={{ height: "12px" }} />
        </div>
      ))}
      <label htmlFor="exampleEmail" style={{ marginBottom: "0px" }}>
        자기 소개
      </label>
      <Title level={5}>{applyDetail.apply.introduction}</Title>
      <div style={{ height: "12px" }} />
      <Title level={5}>지원 분야 : {applyDetail.apply.role}</Title>
      <div style={{ height: "12px" }} />
      <div className="full_div">
        <div id="button">
          <Button
            onClick={() => {
              applyDetailAction.putApplyApi(applyLink);
            }}
          >
            수락
          </Button>
          <Button
            onClick={() => {
              applyDetailAction.deleteApplyApi(applyLink);
            }}
          >
            거절
          </Button>
        </div>
      </div>
      <div style={{ height: "12px" }} />
    </div>
  );
};
