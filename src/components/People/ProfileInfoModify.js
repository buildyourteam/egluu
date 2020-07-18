import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const ProfileInfoModify = () => {
  // 바꿔야 할 것들
  // 이름, 역할, 스택, 연락처, 지역, 소개, //
  // 이미지
  //
  // 기본값 원래 값으로 채우기
  //    페이지 state 만들기 //
  //    그 state에 로딩 연결하기//
  //
  // 클릭시 수정으로,
  // 수정완료시 api요청 후 원래 페이지로
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
            name="name"
            //id="exampleEmail"
            placeholder="name"
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleSelect">Role</Label>
          <Input
            type="select"
            name="role"
            //   id="exampleSelect"
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
            name="stack"
            //id="exampleEmail"
            placeholder="stack"
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Email Contact</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="with a placeholder"
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Region</Label>
          <Input
            type="region"
            name="region"
            //id="exampleEmail"
            placeholder="region"
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleText">Description</Label>
          <Input type="textarea" name="description" id="description" />
        </FormGroup>

        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

export default ProfileInfoModify;
