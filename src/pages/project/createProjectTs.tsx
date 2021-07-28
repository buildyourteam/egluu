import React from "react";
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
  useProjectCreateEffectTs,
  useProjectCreateStateTS,
} from "../../hook/projectTs";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { useImageSave } from "../../hook/useImage";
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


export default function ProjectCreate() {
  const classes = useStyles();
  const { createState, createAction } = useProjectCreateStateTS();
  useImageSave(createState.createImg, "/projectDetail");
  useProjectCreateEffectTs(createState, createAction);

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.fullDiv}>
          <Button
            color="primary"
            variant="contained"
            disabled={
              createState.createProject.pending || createState.createImg.pending
            }
            onClick={() => createAction.createProjectApi(createState.project)}
            className={classes.floatRBtn}
          >
            Make Project
          </Button>
        </div>
        <div className={classes.inputGrid}>
          <div className={classes.halfDivLeft}>
            <div className={classes.inputImg}>
              <ImgInput img={createState.img} saveImg={createAction.inputImg} />
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
              placeholder="createState name"
              value={createState.project.projectName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                createAction.inputProject(e.target.name, e.target.value)
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                createAction.inputProject(e.target.name, e.target.value)
              }
              value={createState.project.teamName}
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
                  createAction.inputProjectMember(e.target.name, e.target.value)
                }
                value={createState.project.needMember.developer}
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
                  createAction.inputProjectMember(e.target.name, e.target.value)
                }
                value={createState.project.needMember.designer}
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
                  createAction.inputProjectMember(e.target.name, e.target.value)
                }
                value={createState.project.needMember.planner}
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
                  createAction.inputProjectMember(e.target.name, e.target.value)
                }
                value={createState.project.needMember.etc}
              />
            </div>
            <div className={classes.halfDivRight}>
              <label htmlFor="exampleEmail">End Date</label>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
                <MuiDateTimePicker
                  name="endDate"
                  value={createState.project.endDate}
                  onChange={(date) => createAction.inputDate(date)}
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
                action={createAction.inputField}
                pick={createState.project.projectField}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <label htmlFor="exampleEmail">Introduction</label>
          <BootstrapInput
            multiline
            type="name"
            name="introduction"
            placeholder="introduction"
            value={createState.project.introduction}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              createAction.inputProject(e.target.name, e.target.value)
            }
            fullWidth
          />
          <label htmlFor="exampleEmail">Questions</label>
          {createState.project.questions.map((value, index) => {
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
                    createAction.inputQuestion(e.target.value, index)
                  }
                  value={value}
                />
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => createAction.deleteQuestion(index)}
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
          onClick={createAction.addQuestion}
        >
          Add Questions
        </Button>
      </div>
    </Layout>
  );
}
