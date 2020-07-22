import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useDropzone } from "react-dropzone";
import ImageModify from "./ImageModify";
import useProfileInfoApi from "../../hook/api/profileApi";
const ProfileInfoModify = ({ data, api }) => {
  // input state
  const [modifyState, setModifyState] = useState({
    userName: data.userName,
    role: data.role,
    stacks: data.stacks,
    contact: data.contact,
    area: data.area,
    grade: 10,
    introduction: data.introduction
  });

  const handleChange = e => {
    // stack은 지금은 무조건 배열상태로 들어가게 임시방편함
    if (e.target.name === "stacks") {
      setModifyState({
        ...modifyState,
        [e.target.name]: [e.target.value]
      });
    }
    // 나머지는 원래 방식대로
    else {
      setModifyState({
        ...modifyState,
        [e.target.name]: e.target.value
      });
    }
    console.log(modifyState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // submit 누르면 post요청하는 액션 디스패치
    api("inho", modifyState);
  };
  return (
    <div>
      {/* <ImageModify /> */}
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Name</Label>
          <Input
            type="name"
            name="userName"
            placeholder="name"
            value={modifyState.userName}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleSelect">Role</Label>
          <Input
            type="select"
            name="role"
            value={modifyState.role}
            onChange={handleChange}
          >
            <option value="DEVELOPER">DEVELOPER</option>
            <option value="DESIGNER">DESIGNER</option>
            <option value="LEADER">LEADER</option>
            <option value="ETC">ETC</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Stack</Label>
          <Input
            type="stack"
            name="stacks"
            //id="exampleEmail"
            placeholder="stack"
            value={modifyState.stacks}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Email Contact</Label>
          <Input
            type="contact"
            name="contact"
            //id="exampleEmail"
            placeholder="contact"
            value={modifyState.contact}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Area</Label>
          <Input
            type="area"
            name="area"
            //id="exampleEmail"
            placeholder="area"
            value={modifyState.area}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleText">Introduction</Label>
          <Input
            type="textarea"
            name="introduction"
            id="introduction"
            value={modifyState.introduction}
            onChange={handleChange}
          />
        </FormGroup>

        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

export default ProfileInfoModify;
