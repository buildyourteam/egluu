import React, { useEffect } from "react";
import {
  Layout,
  ImgInput,
  DropdownField,
  BootstrapInput,
} from "../../components";
import "../main.css";
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ko } from "date-fns/locale";
import { useProjectCreateEffectTs, useProjectCreateStateTS } from "../../hook/projectTs/useProjectCreateTs";
import { Button, Input } from "antd";
import { useImageSave } from "../../hook/useImage";

export default function ProjectCreate() {
  const { createState, createAction } = useProjectCreateStateTS();
  useImageSave(createState.createImg, "/projectDetail");
  useProjectCreateEffectTs(createState, createAction);

  return (
    <Layout>
      <div id="root">
        <div className="full_div">
          <div id="button">
            <Button
              loading={
                createState.createProject.pending ||
                createState.createImg.pending
              }
              onClick={() => createAction.createProjectApi(createState.project)}
            >
              Make Project
            </Button>
          </div>
        </div>
        <div className="half_div_left">
          <div className="input_img">
            <ImgInput img={createState.img} saveImg={createAction.inputImg} />
          </div>
        </div>
        <div className="half_div_right">
          <label htmlFor="exampleEmail">Project Name</label>
          <Input
            type="name"
            name="projectName"
            placeholder="createState name"
            value={createState.project.projectName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              createAction.inputProject(e.target.name, e.target.value)
            }
          />
          <label htmlFor="exampleEmail">Team Name</label>
          <Input
            type="name"
            name="teamName"
            placeholder="team name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              createAction.inputProject(e.target.name, e.target.value)
            }
            value={createState.project.teamName}
          />
          <div className="half_div_left">
            <label htmlFor="exampleEmail">Recruit People</label>
            <br />
            <Input
              addonBefore="Developer"
              placeholder="0"
              min={0}
              max={100}
              type="number"
              step="1"
              name="developer"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                createAction.inputProjectMember(e.target.name, e.target.value)
              }
              value={createState.project.needMember.developer}
            />
            <Input
              addonBefore="Designer"
              placeholder="0"
              min={0}
              max={100}
              type="number"
              step="1"
              name="designer"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                createAction.inputProjectMember(e.target.name, e.target.value)
              }
              value={createState.project.needMember.designer}
            />
            <div style={{ height: "12px" }} />
            <Input
              addonBefore="Planner"
              placeholder="0"
              min={0}
              max={100}
              type="number"
              step="1"
              name="planner"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                createAction.inputProjectMember(e.target.name, e.target.value)
              }
              value={createState.project.needMember.planner}
            />
            <div style={{ height: "12px" }} />
            <Input
              addonBefore="Etc"
              placeholder="0"
              min={0}
              max={100}
              type="number"
              step="1"
              name="etc"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                createAction.inputProjectMember(e.target.name, e.target.value)
              }
              value={createState.project.needMember.etc}
            />
          </div>
          <div className="half_div_right">
            <label htmlFor="exampleEmail">End Date</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
              <MuiDateTimePicker
                name="endDate"
                value={createState.project.endDate}
                onChange={(date)=>createAction.inputDate(date)}
                format="yy.MM.dd HH:mm"
                placeholder="종료일"
                variant="dialog"
                //   disableUnderline
                disableToolbar={false}
                hideTabs
                clearable
                ampm
              />
            </MuiPickersUtilsProvider>
            <br />
            <br />
            <br />
            <label htmlFor="exampleEmail">Role</label>
            <DropdownField
              style={{ width: "100%" }}
              dropdownCaret="Role"
              action={createAction.inputField}
              pick={createState.project.projectField}
            />
          </div>
        </div>
        <div>
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
                <Input
                  addonBefore={questionString}
                  addonAfter={
                    <Button
                      color="secondary"
                      onClick={() => createAction.deleteQuestion(index)}
                    >
                      delete
                    </Button>
                  }
                  placeholder="question"
                  name="questions"
                  onChange={(e) =>
                    createAction.inputQuestion(e.target.value, index)
                  }
                  value={value}
                />
                <div style={{ height: "12px" }} />
              </div>
            );
          })}
        </div>
        <div className="full_div">
          <div id="button">
            <Button onClick={createAction.addQuestion}>Add Questions</Button>
          </div>
        </div>
        <br />
      </div>
    </Layout>
  );
}
