import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useProjectDetailState,
  useProjectDetailEffect,
  useRequest,
  useProjectApplyState,
  useProjectApplyEffect,
} from "../../hook";
import {
  Button,
  Layout,
  IOSSwitch,
  DropdownRole,
  HalfDrawer,
} from "../../components";
import "../main.css";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  FormControlLabel,
} from "@material-ui/core";
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ko } from "date-fns/locale";
import { Link } from "react-router-dom";
import { setProject } from "../../reducers/project";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
} from "reactstrap";
export default function ProjectDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const url = location.pathname.split("/");
  const projectId = url[2];
  const [project, projectAction] = useProjectDetailState();
  const [
    {
      data: resProject,
      fulfilled: getProjectFulfilled,
      pending: getProjectPending,
      rejected: getProjectRejected,
      error: getProjectError,
    },
    { run: getProjectApi },
  ] = useRequest(projectAction.fetchGetDetail);

  useProjectDetailEffect(
    resProject,
    getProjectFulfilled,
    getProjectRejected,
    getProjectError,
    getProjectApi,
    projectAction,
    url[2]
  );

  const handleClickUpdate = () => {
    const updateProject = {
      img: [`https://egluuapi.codingnome.dev/projects/image/${url[2]}`],
      ...project.project,
    };
    dispatch(setProject(updateProject));
  };

  const handleClickDelete = () => {
    projectAction.fetchDeleteProject(projectId);
  };
  return (
    <Layout>
      {getProjectPending ? (
        <div>로딩중...</div>
      ) : (
        <div>
          {project.check.reader ? (
            <div>
              <Link to={`/projectUpdate/${url[2]}`}>
                <Button onClick={handleClickUpdate}>수정하기</Button>
              </Link>
              <Button onClick={handleClickDelete}>삭제하기</Button>
            </div>
          ) : (
            <HalfDrawer anchor="left" buttonName="지원하기">
              <ApplyProject
                questions={project.project.questions}
                projectId={projectId}
                applyApi={project.project._links}
                detailGet={getProjectFulfilled}
              />
            </HalfDrawer>
          )}
          <br />
          <img
            height={200}
            width={200}
            src={`https://egluuapi.codingnome.dev/projects/image/${url[2]}`}
            alt="temp"
          />
          <Typography>{project.project.projectName}</Typography>
          <Typography>{project.project.teamName}</Typography>
          <Typography>종료일 : {project.project.endDate}</Typography>
          <Typography>{project.project.description}</Typography>
          <Typography>개발 분야 : {project.project.projectField}</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="현재 인원" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`개발자 : ${project.project.currentMember.developer}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`디자이너 : ${project.project.currentMember.designer}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`기획자 : ${project.project.currentMember.planner}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`기타 : ${project.project.currentMember.etc}`}
              />
            </ListItem>
          </List>
          <List dense>
            <ListItem>
              <ListItemText primary="모집 인원" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`개발자 : ${project.project.needMember.developer}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`디자이너 : ${project.project.needMember.designer}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`기획자 : ${project.project.needMember.planner}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`기타 : ${project.project.needMember.etc}`}
              />
            </ListItem>
          </List>
          {project.check.reader && (
            <div>
              <FormControlLabel
                style={{ margin: "0px -20px 0px 0px", padding: "0px" }}
                control={
                  <IOSSwitch
                    name="apply"
                    checked={project.check.apply}
                    onChange={(e) =>
                      projectAction.checkSwitch(e.target.name, e.target.checked)
                    }
                    value="apply"
                  />
                }
              />
              {project.check.apply &&
                (project.apply.length === 0 ? (
                  <div>지원자가 없습니다 </div>
                ) : (
                  <div>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary={`이름 : ${
                            project.apply[project.pagination.apply].userName
                          }`}
                          secondary="Secondary text"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`역할 : ${
                            project.apply[project.pagination.apply].role
                          }`}
                          secondary="Secondary text"
                        />
                      </ListItem>
                      <Button
                        onClick={() => {
                          history.push(
                            `/profile/${
                              project.apply[project.pagination.apply].userId
                            }`
                          );
                        }}
                      >
                        상세보기
                      </Button>
                    </List>
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
                  </div>
                ))}
              <br />
              <FormControlLabel
                style={{ margin: "0px -20px 0px 0px", padding: "0px" }}
                control={
                  <IOSSwitch
                    name="recruit"
                    checked={project.check.recruit}
                    onChange={(e) =>
                      projectAction.checkSwitch(e.target.name, e.target.checked)
                    }
                    value="recruit"
                  />
                }
              />
              {project.check.recruit && (
                <div>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary={`이름 : ${
                          project.recruit[project.pagination.recruit].userName
                        }`}
                        secondary="Secondary text"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`역할 : ${
                          project.recruit[project.pagination.recruit].role
                        }`}
                        secondary="Secondary text"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`자기소개 : ${
                          project.recruit[project.pagination.recruit]
                            .selfDescription
                        }`}
                        secondary="Secondary text"
                      />
                    </ListItem>
                  </List>
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
              )}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

const ApplyProject = (props) => {
  const { questions, projectId, applyApi, detailGet } = props;
  const [apply, applyAction] = useProjectApplyState(applyApi.apply.href);
  const [applyRes, { run: postApply }] = useRequest(applyAction.fetchPostApply);
  const [applyPutRes, { run: putApply }] = useRequest(
    applyAction.fetchPutApply
  );
  const [applyGetRes, { run: getApply }] = useRequest(
    applyAction.fetchGetApply
  );
  useProjectApplyEffect(
    questions,
    getApply,
    apply,
    applyAction,
    applyRes,
    applyGetRes,
    applyPutRes,
    detailGet,
    applyApi.apply.href
  );

  return (
    <div>
      {apply.apply.answers.map((a, i) => (
        <div>
          <Typography>
            {i + 1}번 질문 : {questions[i]}
          </Typography>
          <InputGroup>
            <InputGroupAddon addonType="prepend">질문</InputGroupAddon>
            <Input
              name="answer"
              onChange={(e) => applyAction.inputAnswer(e.target.value, i)}
              value={a}
            />
          </InputGroup>
        </div>
      ))}
      <InputGroup>
        <InputGroupAddon addonType="prepend">자기소개</InputGroupAddon>
        <Input
          name="introduction"
          onChange={(e) =>
            applyAction.inputApply(e.target.name, e.target.value)
          }
          value={apply.apply.introduction}
        />
      </InputGroup>
      <DropdownRole
        dropdownCaret="역할 선택"
        action={applyAction.selectRole}
        pick={apply.apply.role}
      />
      {apply.applied ? (
        <Button
          onClick={() => {
            putApply(
              {
                answers: apply.apply.answers,
                introduction: apply.apply.introduction,
                role: apply.apply.role,
              },
              projectId
            );
          }}
        >
          수정하기
        </Button>
      ) : (
        <Button
          onClick={() => {
            postApply(
              {
                answers: apply.apply.answers,
                introduction: apply.apply.introduction,
                role: apply.apply.role,
              },
              projectId
            );
          }}
        >
          지원하기
        </Button>
      )}
    </div>
  );
};

{
  /* <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
<MuiDateTimePicker
    name="endDate"
    value={project.endDate}
    onChange={setStartDate}
    format="yy.MM.dd HH:mm"
    placeholder="종료일"
    variant="dialog"
    disableUnderline
    disableToolbar={false}
    hideTabs
    clearable
    ampm
    style={{
        borderLeft: '1px solid #cdcecd',
    }}
/>
</MuiPickersUtilsProvider> */
}
