import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useProjectDetailState,
  useProjectDetailEffect,
  useRequest,
  useProjectApplyState,
  useProjectApplyEffect,
  useProjectDetailApplyState,
  useProjectDetailApplyEffect,
} from "../../hook";
import {
  Layout,
  IOSSwitch,
  DropdownRole,
  HalfDrawer,
  CenterModal,
  BootstrapInput,
} from "../../components";
import "../main.css";
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ko } from "date-fns/locale";
import { Link } from "react-router-dom";
import { setProject } from "../../reducers/project";
import "./projectDetail.css";
import { useProjectDetailStateTs } from "../../hook/projectTs";
import { Button, Switch, List, Typography, Card } from "antd";
const ReactMarkdown = require("react-markdown");

const { Title } = Typography;

export default function ProjectDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const url = location.pathname.split("/");
  const projectId = url[2];
  const { project, projectAction } = useProjectDetailStateTs();

//   useProjectDetailEffect(
//     project
//     projectAction,
//     url[2],
//   );

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
          number: project.project.currentMember.developer
      },
            {
          title: "디자이너",
          number: project.project.currentMember.designer
      },
            {
          title: "기획자",
          number: project.project.currentMember.planner
      },
            {
          title: "기타",
          number: project.project.currentMember.etc
      }
  ]

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
              <Button onClick={projectAction.openApply}>지원서</Button>
              <CenterModal
                header="지원하기"
                modalFlag={project.check.applyModal}
                close={projectAction.closeApply}
              >
                {/* <ApplyProject
                    questions={project.project.questions}
                    projectId={projectId}
                    applyApi={project.project._links}
                    detailGet={getProjectFulfilled}
                    close={projectAction.closeApply}
                  /> */}
              </CenterModal>
            </div>
          )}
        </div>
        <div>
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
                  header={<div>모집 인원</div>}
                  bordered
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
                {/* <List>
                  <ListItem divider>
                    <ListItemText primary="현재 인원" />
                  </ListItem>
                  <ListItem
                    disabled={project.project.currentMember.developer < 1}
                  >
                    <ListItemText primary="개발자" />
                    <ListItemSecondaryAction>
                      {project.project.currentMember.developer}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem
                    disabled={project.project.currentMember.designer < 1}
                  >
                    <ListItemText primary="디자이너" />
                    <ListItemSecondaryAction>
                      {project.project.currentMember.designer}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem
                    disabled={project.project.currentMember.planner < 1}
                  >
                    <ListItemText primary="기획자" />
                    <ListItemSecondaryAction>
                      {project.project.currentMember.planner}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem disabled={project.project.currentMember.etc < 1}>
                    <ListItemText primary="기타" />
                    <ListItemSecondaryAction>
                      {project.project.currentMember.etc}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List> */}
              </div>
              <div className="half_div_right">
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  size="large"
                  header={<div>전체 인원</div>}
                  bordered
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
                {/* <List>
                  <ListItem divider>
                    <ListItemText primary="모집 인원" />
                  </ListItem>
                  <ListItem disabled={project.project.needMember.developer < 1}>
                    <ListItemText primary={`개발자`} />
                    <ListItemSecondaryAction>
                      {project.project.needMember.developer}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem disabled={project.project.needMember.designer < 1}>
                    <ListItemText primary={`디자이너`} />
                    <ListItemSecondaryAction>
                      {project.project.needMember.designer}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem disabled={project.project.needMember.planner < 1}>
                    <ListItemText primary={`기획자`} />
                    <ListItemSecondaryAction>
                      {project.project.needMember.planner}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem disabled={project.project.needMember.etc < 1}>
                    <ListItemText primary={`기타`} />
                    <ListItemSecondaryAction>
                      {project.project.needMember.etc}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List> */}
              </div>
            </div>
          </div>
        </div>
        <div>소개</div>
        <ReactMarkdown source={project.project.introduction} />
        {project.check.reader && (
          <div>
            <Switch
              onChange={(checked: boolean) =>
                projectAction.checkSwitch("name", checked)
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
                      onClick={() => projectAction.clickPagination("apply", -1)}
                    >
                      이전
                    </Button>
                    <Button
                      disabled={
                        project.apply.length - project.pagination.apply < 2
                      }
                      onClick={() => projectAction.clickPagination("apply", 1)}
                    >
                      다음
                    </Button>
                  </List>
                  <CenterModal
                    header="지원자 상세 정보"
                    modalFlag={project.check.applyDetail}
                    close={projectAction.closeDetailApply}
                  >
                    {/* <ApplyDetailProject
                      open={project.check.applyDetail}
                      close={projectAction.closeDetailApply}
                      applyApi={
                        project.apply[project.pagination.apply]._links.self.href
                      }
                      applySet={projectAction.setApply}
                      userId={project.apply[project.pagination.apply].userId}
                      setPagination={() =>
                        projectAction.clickPagination("apply", 0)
                      }
                    /> */}
                  </CenterModal>
                </div>
              ))}
            <br />
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
                    onClick={() => projectAction.clickPagination("recruit", -1)}
                  >
                    이전
                  </Button>
                  <Button
                    disabled={
                      project.recruit.length - project.pagination.recruit < 2
                    }
                    onClick={() => projectAction.clickPagination("recruit", 1)}
                  >
                    다음
                  </Button>
                </div>
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

// const ApplyProject = (props: any) => {
//   const { questions, projectId, applyApi, detailGet, close } = props;
//   const [apply, applyAction] = useProjectApplyState(applyApi.apply.href);
//   const [applyRes, { run: postApply }] = useRequest(applyAction.fetchPostApply);
//   const [applyPutRes, { run: putApply }] = useRequest(
//     applyAction.fetchPutApply,
//   );
//   const [applyGetRes, { run: getApply }] = useRequest(
//     applyAction.fetchGetApply,
//   );

//   useProjectApplyEffect(
//     questions,
//     getApply,
//     apply,
//     applyAction,
//     applyRes,
//     applyGetRes,
//     applyPutRes,
//     detailGet,
//     applyApi.apply.href,
//     close,
//   );

//   return (
//     <div id="drawer_root">
//       <div style={{ height: "12px" }} />
//       {apply.apply.answers.map((a, i) => (
//         <div>
//           <Typography variant="h6">
//             {i + 1}번 질문 : {questions[i]}
//           </Typography>
//           <InputGroup>
//             <InputGroupAddon addonType="prepend">답변</InputGroupAddon>
//             <Input
//               name="answer"
//               onChange={(e) => applyAction.inputAnswer(e.target.value, i)}
//               value={a}
//             />
//           </InputGroup>
//           <div style={{ height: "12px" }} />
//         </div>
//       ))}
//       <Label for="exampleEmail" style={{ marginBottom: "0px" }}>
//         자기 소개
//       </Label>
//       <BootstrapInput
//         multiline
//         name="introduction"
//         onChange={(e) => applyAction.inputApply(e.target.name, e.target.value)}
//         value={apply.apply.introduction}
//         fullWidth
//       />
//       <div style={{ height: "12px" }} />
//       <DropdownRole
//         style={{ width: "100%" }}
//         dropdownCaret="역할 선택"
//         action={applyAction.selectRole}
//         pick={apply.apply.role}
//       />
//       <div style={{ height: "12px" }} />
//       <div className="full_div">
//         <div id="button">
//           {apply.applied ? (
//             <Button
//               onClick={() => {
//                 putApply(
//                   {
//                     answers: apply.apply.answers,
//                     introduction: apply.apply.introduction,
//                     role: apply.apply.role,
//                   },
//                   projectId,
//                 );
//               }}
//             >
//               수정하기
//             </Button>
//           ) : (
//             <Button
//               onClick={() => {
//                 postApply(
//                   {
//                     answers: apply.apply.answers,
//                     introduction: apply.apply.introduction,
//                     role: apply.apply.role,
//                   },
//                   projectId,
//                 );
//               }}
//             >
//               지원하기
//             </Button>
//           )}
//         </div>
//       </div>
//       <div style={{ height: "12px" }} />
//     </div>
//   );
// };

// const ApplyDetailProject = (props) => {
//   const { open, close, applyApi, applySet, userId, setPagination } = props;
//   const [apply, applyAction] = useProjectDetailApplyState(applyApi);
//   console.log(applyAction);
//   const [applyGetRes, { run: getApply }] = useRequest(
//     applyAction.fetchGetApply,
//   );
//   const [applyPutRes, { run: putApply }] = useRequest(
//     applyAction.fetchPutApply,
//   );
//   const [applyDeleteRes, { run: deleteApply }] = useRequest(
//     applyAction.fetchDeleteApply,
//   );

//   useProjectDetailApplyEffect(
//     open,
//     getApply,
//     apply,
//     applyGetRes,
//     applyPutRes,
//     applyDeleteRes,
//     applySet,
//     userId,
//     close,
//     applyAction,
//     setPagination,
//   );
//   return (
//     <div id="drawer_root">
//       <div style={{ height: "12px" }} />
//       {apply.apply.answers.map((a, i) => (
//         <div>
//           <Typography variant="h6">
//             {i + 1}번 질문 : {apply.apply.questions[i]}
//           </Typography>
//           <Typography variant="h6">{a}</Typography>
//           <div style={{ height: "12px" }} />
//         </div>
//       ))}
//       <Label for="exampleEmail" style={{ marginBottom: "0px" }}>
//         자기 소개
//       </Label>
//       <Typography variant="h6">{apply.apply.introduction}</Typography>
//       <div style={{ height: "12px" }} />
//       <Typography variant="h6">지원 분야 : {apply.apply.role}</Typography>
//       <div style={{ height: "12px" }} />
//       <div className="full_div">
//         <div id="button">
//           <Button
//             onClick={() => {
//               putApply();
//             }}
//           >
//             수락
//           </Button>
//           <Button
//             onClick={() => {
//               deleteApply();
//             }}
//           >
//             거절
//           </Button>
//         </div>
//       </div>
//       <div style={{ height: "12px" }} />
//     </div>
//   );
// };
