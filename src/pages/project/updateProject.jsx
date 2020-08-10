import React from "react";
import { useLocation } from "react-router-dom";
import {
  useProjectUpdateState,
  useRequest,
  useProjectUpdateEffect,
} from "../../hook";
import { Button, Layout, ImgInput } from "../../components";
import "../main.css";
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

export default function ProjectUpdate() {
  const location = useLocation();
  const url = location.pathname.split("/");
  const projectId = url[2];
  const [project, projectAction] = useProjectUpdateState();
  const [
    {
      data: resProject,
      fulfilled: getProjectFulfilled,
      pending: getProjectPending,
      rejected: getProjectRejected,
      error: getProjectError,
    },
    { run: UpdateProjectApi },
  ] = useRequest(projectAction.fetchPutUpdate);
  const [
    {
      data: resImg,
      fulfilled: getImgFulfilled,
      pending: getImgPending,
      rejected: getImgRejected,
      error: getImgError,
    },
    { run: UpdateImgApi },
  ] = useRequest(projectAction.fetchImg);
  useProjectUpdateEffect(
    resProject,
    getProjectFulfilled,
    getProjectRejected,
    getProjectError,
    UpdateImgApi,
    project.img,
    url[2]
  );
  const handleClickUpdate = () => {
    const updateData = {
      projectName: project.project.projectName,
      teamName: project.project.teamName,
      endDate: project.project.endDate,
      introduction: project.project.introduction,
      state: project.project.state,
      projectField: project.project.projectField,
      applyCanFile: project.project.applyCanFile,
      needMember: {
        developer: project.project.needMember.developer,
        designer: project.project.needMember.designer,
        planner: project.project.needMember.planner,
        etc: project.project.needMember.etc,
      },
      questions: project.project.questions,
    };
    UpdateProjectApi(projectId, updateData);
  };

  return (
    <Layout>
      {false ? (
        <div>로딩중...</div>
      ) : (
        <div>
          <ImgInput img={project.img} saveImg={projectAction.inputImg} />
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
          <Button onClick={handleClickUpdate}>프로젝트 수정</Button>
        </div>
      )}
    </Layout>
  );
}
