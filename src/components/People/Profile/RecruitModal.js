import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { planProjectApi, sendRecruitPeopleApi } from "../../../hook/api";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import "./Profile.css";
import { useRequest } from "../../../hook";
import useProfileRecruit from "../../../hook/profile/useProfileRecruit";

const RecruitModal = ({ modal, toggle, userId }) => {
  // 내부 State
  const [recruitState, setRecruitState] = useState({
    introduction: "",
    role: "",
    projectId: "",
  });

  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [nestedMessage, setNestedMessage] = useState({
    status: false,
    message: "",
  });

  // 내부 모달 띄우기
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  // Recruit 요청 실패시, 내부 모달창만 닫기 + 내부 state 유지
  // Recruit 요청 성공시, 모든 모달창 닫기 + 내부 state 초기화
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    if (nestedMessage.status) {
      setCloseAll(true);
      setRecruitState({
        introduction: "",
        role: "",
        projectId: "",
      });
    } else {
      setCloseAll(false);
    }
  };

  const { getAllPlannedProject } = planProjectApi();
  const { postRecruit } = sendRecruitPeopleApi();

  const [
    {
      data: getProjectData,
      fulfilled: getProjectFulfilled,
      pending: getProjectPending,
      rejected: getProjectRejected,
      error: getProjectError,
    },
    { run: getProjectApi },
  ] = useRequest(getAllPlannedProject);

  const [
    {
      data: postRecruitData,
      fulfilled: postRecruitFulfilled,
      pending: postRecruitPending,
      rejected: postRecruitRejected,
      error: postRecruitError,
    },
    { run: postRecruitApi },
  ] = useRequest(postRecruit);

  const { plannedProjects } = useProfileRecruit(
    getProjectData,
    getProjectFulfilled,
    getProjectRejected,
    getProjectError,
    getProjectApi,

    postRecruitData,
    postRecruitFulfilled,
    postRecruitRejected,
    postRecruitError,

    toggleNested,
    setNestedMessage,
  );

  const handleChange = (event) => {
    setRecruitState({
      ...recruitState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    postRecruitApi(userId, recruitState);
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
          <Button color="primary" onClick={handleSubmit}>
            Send
          </Button>
          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
          >
            <ModalBody>{nestedMessage.message}</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleAll}>
                All Done
              </Button>
            </ModalFooter>
          </Modal>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RecruitModal;
