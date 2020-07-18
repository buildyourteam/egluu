import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const ProfileInfoModify = ({ data }) => {
  // 바꿔야 할 것들
  // 이미지
  //
  // props로 state값 전달//
  // 기본값 원래 값으로 채우기//

  // 로딩 관련 변수이름 정리
  //
  // 로딩을 각 컴포넌트 안에 넣기
  // 수정완료시 api요청 후 원래 페이지로

  const [modifyState, setModifyState] = useState({
    userName: data.userName,
    role: data.role,
    stacks: data.stacks,
    contact: data.contact,
    area: data.area,
    introduction: data.introduction
  });

  const handleChange = e => {
    setModifyState({
      ...modifyState,
      [e.target.name]: e.target.value
    });
    console.log(modifyState);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <div>
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
            <option>Developer</option>
            <option>Designer</option>
            <option>Director</option>
            <option>.etc</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Stack</Label>
          <Input
            type="stack"
            name="stacks"
            //id="exampleEmail"
            placeholder="stack"
            value={modifyState.stack}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Email Contact</Label>
          <Input
            type="email"
            name="contact"
            id="exampleEmail"
            placeholder="with a placeholder"
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
