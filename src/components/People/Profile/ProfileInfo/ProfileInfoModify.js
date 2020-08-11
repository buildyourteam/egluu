import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import ImageModify from "../ProfileImage/ImageModify";
import { useInfoApi, useImgApi } from "../../../../hook/api/profileApi";
import { useRequest } from "../../../../hook/useRequest";
import useProfileInfoModify from "../../../../hook/profile/useProfileInfoModify";

const ProfileInfoModify = ({
  setModifying,

  info,
  setInfo,

  imgState,
  setImgState,

  userId
}) => {
  const { postInfoApi, postImgApi } = useProfileInfoModify(
    setModifying,

    imgState,
    setImgState,

    userId
  );

  const handleChange = e => {
    // stack은 지금은 무조건 배열상태로 들어가게 임시방편함
    if (e.target.name === "stacks") {
      setInfo({
        ...info,
        [e.target.name]: [e.target.value]
      });
    }
    // 나머지는 원래 방식대로
    else {
      setInfo({
        ...info,
        [e.target.name]: e.target.value
      });
    }
    console.log(info);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { grade, ...withOutGrade } = info;
    postInfoApi(userId, withOutGrade);
    if (imgState.isImgChange) {
      postImgApi(userId, imgState);
    }
  };

  return (
    <div>
      <ImageModify state={imgState} setState={setImgState} />
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Name</Label>
          <Input
            type="name"
            name="userName"
            placeholder="name"
            value={info.userName}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleSelect">Role</Label>
          <Input
            type="select"
            name="role"
            value={info.role}
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
            value={info.stacks}
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
            value={info.contact}
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
            value={info.area}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleText">Introduction</Label>
          <Input
            type="textarea"
            name="introduction"
            id="introduction"
            value={info.introduction}
            onChange={handleChange}
          />
        </FormGroup>

        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

export default ProfileInfoModify;
