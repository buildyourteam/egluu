import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import { Layout } from "../../components";
import { useRequest } from "../../hook";
import { registerApi } from "../../hook/api";
import { useRegisterEffect } from "../../hook/auth/useRegister";
import "./Login.css";

const Register = () => {
  const [state, setState] = useState({
    userId: "",
    userEmail: "",
    password: "",
    name: ""
  });

  //1. api와 상태변수들을 useRequest로 연동한다.
  const [
    {
      data: resRegister,
      fulfilled: RegisterFulfilled,
      pending: RegisterPending,
      rejected: RegisterRejected,
      error: RegisterError,
    },
    { run: postRegisterApi },
  ] = useRequest(registerApi.postRegister);

  //2.해당 hook에 상태변수들을 넣어준다.
  useRegisterEffect(
    resRegister,
    RegisterFulfilled,
    RegisterPending,
    RegisterRejected,
    RegisterError
  );

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    postRegisterApi(state);
    setState({ userId: "", userEmail: "", password: "", name: "" });
  };

  return (
    <Layout>
      <Container>
        <Row xs="3">
          <Col></Col>
          <Col className="loginBox">
            <h3 className="loginHeader">Create your Account</h3>
            <br />
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="id">UserId</Label>
                <Input
                  type="id"
                  name="userId"
                  id="userId"
                  placeholder="userId"
                  value={state.userId}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="userEmail"
                  id="exampleEmail"
                  placeholder="email"
                  value={state.userEmail}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="password placeholder"
                  value={state.password}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="id">Name</Label>
                <Input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="name"
                  value={state.name}
                  onChange={handleChange}
                />
              </FormGroup>
              <div className="loginSubmit">
                <Button>Submit</Button>
              </div>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Register;
