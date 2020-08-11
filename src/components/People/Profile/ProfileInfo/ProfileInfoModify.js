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
  // info 정보 post 하는 api
  const { postInfo } = useInfoApi();

  // info post 상태변수와 데이터 및 액션 디스패쳐
  const [
    {
      data: resPostInfo,
      fulfilled: postInfoFulfilled,
      pending: postInfoPending,
      rejected: postInfoRejected,
      error: postInfoError
    },
    { run: postInfoApi }
  ] = useRequest(postInfo);

  //////////////////////////////////////////////////////////////////////
  const { postImg } = useImgApi();

  const [
    {
      data: resPostImg,
      fulfilled: postImgFulfilled,
      pending: postImgPending,
      rejected: postImgRejected,
      error: postImgError
    },
    { run: postImgApi }
  ] = useRequest(postImg);

  //////////////////////////////
  useProfileInfoModify(
    resPostInfo,
    postInfoFulfilled,
    postInfoRejected,
    postInfoError,
    postInfoApi,

    resPostImg,
    postImgFulfilled,
    postImgRejected,
    postImgError,
    postImgApi,

    setModifying,

    info,
    setInfo,

    imgState,
    setImgState,

    userId
  );
  ////////////////////////////////////////////////////////////

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
    // submit 누르면 post요청하는 액션 디스패치

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
