import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  useProjectCreateState,
  useProjectCreateEffect,
  useRequest,
} from "../../hook";
import { Button, Layout, ImgInput } from "../../components";
import "../main.css";
import tempimg from "../../components/icon/move.gif";
import { List, ListItem, ListItemText } from "@material-ui/core";
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ko } from "date-fns/locale";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
} from "reactstrap";

export default function ProjectCreate() {
  const location = useLocation();
  const history = useHistory();
  const url = location.pathname.split("/");
  const [project, projectAction] = useProjectCreateState();
  const [
    {
      data: resProject,
      fulfilled: getProjectFulfilled,
      pending: getProjectPending,
      rejected: getProjectRejected,
      error: getProjectError,
    },
    { run: createProjectApi },
  ] = useRequest(projectAction.fetchPostCreate);
  const [
    {
      data: resImg,
      fulfilled: getImgFulfilled,
      pending: getImgPending,
      rejected: getImgRejected,
      error: getImgError,
    },
    { run: createImgApi },
  ] = useRequest(projectAction.fetchImg);
  useProjectCreateEffect(
    resProject,
    getProjectFulfilled,
    getProjectRejected,
    getProjectError,
    createImgApi,
    project.img
  );

  useEffect(() => {
    if (getImgFulfilled) {
      const projectId = resProject._links.createdProject.href.split("/");
      history.push(`/projectDetail/${projectId[2]}`);
    }
  }, [getImgFulfilled]);

  const handleClickCreate = () => {
    createProjectApi(project.project);
  };

  return (
    <Layout>
      {false ? (
        <div>로딩중...</div>
      ) : (
        <div>
          <ImgInput img={project.img} saveImg={projectAction.inputImg} />
          {/* <img src={project.url} alt='temp' /> */}
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>프로젝트 이름</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="프로젝트 이름"
              name="projectName"
              onChange={projectAction.inputProject}
              value={project.project.projectName}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>팀 이름</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="팀 이름"
              name="teamName"
              onChange={projectAction.inputProject}
              value={project.project.teamName}
            />
          </InputGroup>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
            <MuiDateTimePicker
              name="endDate"
              value={project.project.endDate}
              onChange={projectAction.inputDate}
              format="yy.MM.dd HH:mm"
              placeholder="종료일"
              variant="dialog"
              disableUnderline
              disableToolbar={false}
              hideTabs
              clearable
              ampm
            />
          </MuiPickersUtilsProvider>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>프로젝트 설명</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="프로젝트 설명"
              name="introduction"
              onChange={projectAction.inputProject}
              value={project.project.introduction}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>개발 분야</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="개발 분야"
              name="projectField"
              onChange={projectAction.inputProject}
              value={project.project.projectField}
            />
          </InputGroup>
          <List dense>
            <ListItem>
              <ListItemText primary="모집 인원" />
            </ListItem>
            <InputGroup>
              <InputGroupAddon addonType="prepend">개발자</InputGroupAddon>
              <Input
                placeholder="0"
                min={0}
                max={100}
                type="number"
                step="1"
                name="developer"
                onChange={projectAction.inputProjectMember}
                value={project.project.needMember.developer}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">디자이너</InputGroupAddon>
              <Input
                placeholder="0"
                min={0}
                max={100}
                type="number"
                step="1"
                name="designer"
                onChange={projectAction.inputProjectMember}
                value={project.project.needMember.designer}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">기획자</InputGroupAddon>
              <Input
                placeholder="0"
                min={0}
                max={100}
                type="number"
                step="1"
                name="planner"
                onChange={projectAction.inputProjectMember}
                value={project.project.needMember.planner}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">기타</InputGroupAddon>
              <Input
                placeholder="0"
                min={0}
                max={100}
                type="number"
                step="1"
                name="etc"
                onChange={projectAction.inputProjectMember}
                value={project.project.needMember.etc}
              />
            </InputGroup>
          </List>
          {project.project.questions.map((value, index) => (
            // <InputGroup key={index}>
            //     {console.log(value)}
            //     <InputGroupAddon addonType="prepend">질문 {index}번</InputGroupAddon>
            //     <InputGroup.Append>
            //         <Button variant="outline-secondary" onClick={() => projectAction.deleteQuestion(index)}>삭제</Button>
            //     </InputGroup.Append>
            //     <Form.Control
            //         placeholder={`질문 ${index}번`}
            //         name="question" onChange={e => projectAction.inputQuestion(e.target.value, index)} value={value}
            //     />
            // </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">질문</InputGroupAddon>
              <Input
                placeholder="질문"
                name="questions"
                onChange={(e) =>
                  projectAction.inputQuestion(e.target.value, index)
                }
                value={value}
              />
              <InputGroupAddon addonType="append">
                <Button
                  color="secondary"
                  onClick={() => projectAction.deleteQuestion(index)}
                >
                  삭제
                </Button>
              </InputGroupAddon>
            </InputGroup>
          ))}
          <Button
            variant="outline-secondary"
            onClick={projectAction.addQuestion}
          >
            질문 추가
          </Button>
          <br />
          <Button onClick={handleClickCreate}>프로젝트 생성</Button>
        </div>
      )}
    </Layout>
  );
}

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
