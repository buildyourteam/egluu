import React from "react";
import { useLocation } from "react-router-dom";
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
import {
  useProjectUpdateStateTs,
  useProjectUpdateEffectTs,
} from "../../hook/projectTs";
import { useImageSave } from "../../hook/useImage";
import { Button, Input } from "antd";

export default function ProjectUpdate() {
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
      <div id="root">
        <div className="full_div">
          <div id="button">
            <Button
              loading={
                updateState.updateImg.pending ||
                updateState.updateProject.pending
              }
              onClick={handleClickUpdate}
            >
              Update Project
            </Button>
          </div>
        </div>
        <div className="input_grid">
          <div className="half_div_left">
            <div className="input_img">
              <ImgInput img={updateState.img} saveImg={updateAction.setImg} />
            </div>
          </div>
          <div className="half_div_right">
            <label htmlFor="exampleEmail">Project Name</label>
            <Input
              type="name"
              name="projectName"
              placeholder="project name"
              onChange={updateAction.inputProject}
              value={updateState.project.projectName}
            />
            <label htmlFor="exampleEmail">Team Name</label>
            <Input
              type="name"
              name="teamName"
              placeholder="team name"
              onChange={updateAction.inputProject}
              value={updateState.project.teamName}
            />
            <div className="half_div_left">
              <label htmlFor="exampleEmail">Recruit People</label>
              <Input
                addonBefore={<div style={{ width: "100px" }}>Developer</div>}
                placeholder="0"
                min={0}
                max={100}
                type="number"
                step="1"
                name="developer"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateAction.inputProjectMember(e)
                }
                value={updateState.project.needMember.developer}
              />
              <Input
                addonBefore={<div style={{ width: "100px" }}>Designer</div>}
                placeholder="0"
                min={0}
                max={100}
                type="number"
                step="1"
                name="designer"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateAction.inputProjectMember(e)
                }
                value={updateState.project.needMember.designer}
              />
              <Input
                addonBefore={<div style={{ width: "100px" }}>Planner</div>}
                placeholder="0"
                min={0}
                max={100}
                type="number"
                step="1"
                name="planner"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateAction.inputProjectMember(e)
                }
                value={updateState.project.needMember.planner}
              />
              <Input
                addonBefore={<div style={{ width: "100px" }}>Etc</div>}
                placeholder="0"
                min={0}
                max={100}
                type="number"
                step="1"
                name="etc"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateAction.inputProjectMember(e)
                }
                value={updateState.project.needMember.etc}
              />
            </div>
            <div className="half_div_right">
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
        <div style={{marginTop: '20px'}}>
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
                <Input
                  addonBefore={questionString}
                  addonAfter={
                    <Button
                      color="secondary"
                      onClick={() => updateAction.deleteQuestion(index)}
                    >
                      delete
                    </Button>
                  }
                  placeholder="question"
                  name="questions"
                  onChange={(e) =>
                    updateAction.inputQuestion(e.target.value, index)
                  }
                  value={value}
                />
              </div>
            );
          })}
        </div>
        <div className="full_div">
          <div id="button">
            <Button onClick={updateAction.addQuestion}>Add Questions</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
