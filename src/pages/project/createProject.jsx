import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  useProjectCreateState,
  useProjectCreateEffect,
  useRequest,
} from "../../hook";
import { Layout, ImgInput, DropdownField } from "../../components";
import "../main.css";
import tempimg from "../../components/icon/move.gif";
import {
  List,
  ListItem,
  ListItemText,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  TextField,
} from "@material-ui/core";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ko } from "date-fns/locale";

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
    { fulfilled: getImgFulfilled, pending: getImgPending },
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
      const projectId = resProject.data._links.createdProject.href.split("/");
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
        <div id="root">
          <div className="full_div">
            <div id="button">
              <Button onClick={handleClickCreate}>Make Project</Button>
            </div>
          </div>
          <div className="half_div_left">
            <div className="input_img">
              <ImgInput img={project.img} saveImg={projectAction.inputImg} />
            </div>
          </div>
          <div className="half_div_right">
            <Label for="exampleEmail">Project Name</Label>
            <Input
              type="name"
              name="projectName"
              placeholder="project name"
              value={project.project.projectName}
              onChange={projectAction.inputProject}
            />
            <Label for="exampleEmail">Team Name</Label>
            <Input
              type="name"
              name="teamName"
              placeholder="team name"
              onChange={projectAction.inputProject}
              value={project.project.teamName}
            />
            <div className="half_div_left">
              <Label for="exampleEmail">Recruit People</Label>
              <br />
              <InputGroup>
                <InputGroupAddon id="input-group-half" addonType="prepend">
                  Developer
                </InputGroupAddon>
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
              <div style={{ height: "12px" }} />
              <InputGroup>
                <InputGroupAddon id="input-group-half" addonType="prepend">
                  Designer
                </InputGroupAddon>
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
              <div style={{ height: "12px" }} />
              <InputGroup>
                <InputGroupAddon id="input-group-half" addonType="prepend">
                  Planner
                </InputGroupAddon>
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
              <div style={{ height: "12px" }} />
              <InputGroup>
                <InputGroupAddon id="input-group-half" addonType="prepend">
                  Etc
                </InputGroupAddon>
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
            </div>
            <div className="half_div_right">
              <Label for="exampleEmail">End Date</Label>
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
              <br />
              <br />
              <br />
              <Label for="exampleEmail">Role</Label>
              <DropdownField
                style={{ width: "100%" }}
                dropdownCaret="Role"
                action={projectAction.inputField}
                pick={project.project.projectField}
              />
            </div>
          </div>
          <div>
            <Label for="exampleEmail">Introduction</Label>
            <Input
              type="name"
              name="introduction"
              placeholder="introduction"
              value={project.project.introduction}
              onChange={projectAction.inputProject}
            />
            <Label for="exampleEmail">Questions</Label>
            {project.project.questions.map((value, index) => {
              const questionString = `Question ${index + 1}`;
              return (
                <div>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      {questionString}
                    </InputGroupAddon>
                    <Input
                      placeholder="question"
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
                        delete
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <div style={{ height: "12px" }} />
                </div>
              );
            })}
          </div>
          <div className="full_div">
            <div id="button">
              <Button
                variant="outline-secondary"
                onClick={projectAction.addQuestion}
              >
                Add Questions
              </Button>
            </div>
          </div>
          <br />
        </div>
      )}
    </Layout>
  );
}
