import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { usePlanProjectApi } from "../../../hook/api/profileApi";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import "./Profile.css";
import { useRequest } from "../../../hook";
import useProfileRecruit from "../../../hook/profile/useProfileRecruit";

const RecruitModal = ({ modal, toggle }) => {
  const { getAllPlannedProject } = usePlanProjectApi();

  const [
    {
      data: getProjectData,
      fulfilled: getProjectFulfilled,
      pending: getProjectPending,
      rejected: getProjectRejected,
      error: getProjecsError
    },
    { run: getProjectApi }
  ] = useRequest(getAllPlannedProject);

  const { plannedProjects } = useProfileRecruit(
    getProjectData,
    getProjectFulfilled,
    getProjectRejected,
    getProjecsError,
    getProjectApi
  );

  // 내부 State
  const [recruitState, setRecruitState] = useState({
    introduction: "",
    role: "",
    projectId: ""
  });

  const handleChange = event => {
    setRecruitState({
      ...recruitState,
      [event.target.name]: event.target.value
    });
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <br />
        <FormControl>
          <InputLabel>프로젝트 선택</InputLabel>
          <Select
            value={recruitState.projectId}
            name="projectId"
            onChange={handleChange}
          >
            {plannedProjects &&
              plannedProjects.map((pj, index) => {
                return (
                  <MenuItem key={index} value={pj.projectId}>
                    {pj.projectName}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>제안할 역할</InputLabel>
          <Select value={recruitState.role} name="role" onChange={handleChange}>
            <MenuItem value={"DEVELOPER"}>DEVELOPER</MenuItem>
            <MenuItem value={"DESIGNER"}>DESIGNER</MenuItem>
            <MenuItem value={"LEADER"}>LEADER</MenuItem>
            <MenuItem value={"ETC"}>ETC</MenuItem>
          </Select>
        </FormControl>
        <br />

        <TextField
          label="영입 제안 메시지를 입력하세요."
          multiline
          rows={4}
          variant="outlined"
          name="introduction"
          value={recruitState.introduction}
          onChange={handleChange}
        />
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RecruitModal;
