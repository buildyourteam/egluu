import React from "react";
import { useLocation } from "react-router-dom";
import {
  Layout,
  ImgInput,
  DropdownField,
  BootstrapInput,
} from "../../components";
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ko } from "date-fns/locale";
import {
  useProjectUpdateStateTs,
  useProjectUpdateEffectTs,
} from "../../hook/projectTs";
import { useImageSave } from "../../hook/useImage";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
  },
  fullDiv: {
    width: "100%",
    minHeight: "36px",
    "&::after": {
      display: "block",
      clear: "both",
      content: '"',
    },
  },
  floatRBtn: {
    float: "right",
  },
  inputGrid: {
    "&::after": {
      clear: "both",
      content: '""',
      display: "block",
    },
  },
  halfDivLeft: {
    padding: "10px 10px 10px 0",
    float: "left",
    width: "50%",
    "& > img": {
      width: "100%",
      height: "100%",
    },
  },
  halfDivRight: {
    padding: "10px",
    float: "right",
    width: "50%",
    "& > h4": {
      color: "gray",
      margin: "0px 0px 30px 0px",
    },
  },
  inputImg: {
    width: "380px",
    height: "380px",
    margin: "auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  fullInput: {
    width: "100%",
  },
  inputLabel: {
    marginTop: "5px",
    marginBottom: "2px",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function ProjectUpdate() {
    const classes = useStyles();
  const location = useLocation();
  const url = location.pathname.split("/");
  const projectId = url[2];
  const { updateState, updateAction } = useProjectUpdateStateTs();

  useProjectUpdateEffectTs(updateState, updateAction, url[2]);

  useImageSave(updateState.updateImg, "projectDetail");
  const handleClickUpdate = () => {
    const updateData = {
      projectName: updateState.project.projectName,
      teamName: updateState.project.teamName,
      endDate: updateState.project.endDate,
      introduction: updateState.project.introduction,
      state: updateState.project.state,
      projectField: updateState.project.projectField,
      applyCanFile: updateState.project.applyCanFile,
      needMember: {
        developer: updateState.project.needMember.developer,
        designer: updateState.project.needMember.designer,
        planner: updateState.project.needMember.planner,
        etc: updateState.project.needMember.etc,
      },
      questions: updateState.project.questions,
    };
    updateAction.UpdateProjectApi(projectId, updateData);
  };

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.fullDiv}>
          <Button
            color="primary"
            variant="contained"
            disabled={
              updateState.updateImg.pending || updateState.updateProject.pending
            }
            className={classes.floatRBtn}
            onClick={handleClickUpdate}
          >
            Update Project
          </Button>
        </div>
        <div className={classes.inputGrid}>
          <div className={classes.halfDivLeft}>
            <div className={classes.inputImg}>
              <ImgInput img={updateState.img} saveImg={updateAction.setImg} />
            </div>
          </div>
          <div className={classes.halfDivRight}>
            <InputLabel className={classes.inputLabel} htmlFor="name" shrink>
              Project Name
            </InputLabel>
            <Input
              id="name"
              type="name"
              name="projectName"
              placeholder="project name"
              value={updateState.project.projectName}
              onChange={updateAction.inputProject}
              className={classes.fullInput}
            />
            <InputLabel
              className={classes.inputLabel}
              htmlFor="teamName"
              shrink
            >
              Team Name
            </InputLabel>
            <Input
              id="teamName"
              type="text"
              name="teamName"
              placeholder="team name"
              onChange={updateAction.inputProject}
              value={updateState.project.teamName}
              className={classes.fullInput}
            />

            <div className={classes.halfDivLeft}>
              <label htmlFor="exampleEmail">Recruit People</label>
              <InputLabel
                className={classes.inputLabel}
                htmlFor="developer"
                shrink
              >
                Developer
              </InputLabel>
              <Input
                id="developer"
                placeholder="0"
                type="number"
                name="developer"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateAction.inputProjectMember(e)
                }
                value={updateState.project.needMember.developer}
              />
              <InputLabel
                className={classes.inputLabel}
                htmlFor="designer"
                shrink
              >
                Designer
              </InputLabel>
              <Input
                id="designer"
                placeholder="0"
                type="number"
                name="designer"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateAction.inputProjectMember(e)
                }
                value={updateState.project.needMember.designer}
              />
              <InputLabel
                className={classes.inputLabel}
                htmlFor="planner"
                shrink
              >
                Planner
              </InputLabel>
              <Input
                id="planner"
                placeholder="0"
                type="number"
                name="planner"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateAction.inputProjectMember(e)
                }
                value={updateState.project.needMember.planner}
              />
              <InputLabel className={classes.inputLabel} htmlFor="etc" shrink>
                Etc
              </InputLabel>
              <Input
                id="etc"
                placeholder="0"
                type="number"
                name="etc"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateAction.inputProjectMember(e)
                }
                value={updateState.project.needMember.etc}
              />
            </div>

            <div className={classes.halfDivRight}>
              <label htmlFor="exampleEmail">End Date</label>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
                <MuiDateTimePicker
                  name="endDate"
                  value={updateState.project.endDate}
                  onChange={(date) => updateAction.inputDate(date)}
                  format="yy.MM.dd HH:mm"
                  placeholder="종료일"
                  variant="dialog"
                  disableToolbar={false}
                  hideTabs
                  clearable
                  ampm
                />
              </MuiPickersUtilsProvider>
              <label htmlFor="exampleEmail">Role</label>
              <DropdownField
                style={{ width: "100%" }}
                dropdownCaret="Role"
                action={updateAction.inputField}
                pick={updateState.project.projectField}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <div>
            <label htmlFor="exampleEmail">Introduction</label>
            <BootstrapInput
              multiline
              name="introduction"
              placeholder="introduction"
              value={updateState.project.introduction}
              onChange={updateAction.inputProject}
              fullWidth
            />
          </div>
          <label htmlFor="exampleEmail">Questions</label>
          {updateState.project.questions.map((value: string, index: number) => {
            const questionString = `Question ${index + 1}`;
            return (
              <div>
                <InputLabel
                  className={classes.inputLabel}
                  htmlFor={questionString}
                  shrink
                >
                  {questionString}
                </InputLabel>
                <Input
                  id={questionString}
                  placeholder="question"
                  name="questions"
                  onChange={(e) =>
                    updateAction.inputQuestion(e.target.value, index)
                  }
                  value={value}
                />
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => updateAction.deleteQuestion(index)}
                >
                  Delete
                </Button>
                <div style={{ height: "12px" }} />
              </div>
            );
          })}
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={updateAction.addQuestion}
        >
          Add Questions
        </Button>
      </div>
    </Layout>
  );
}
