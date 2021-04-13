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
import { useLoginEffect } from "../../hook/auth/useLogin";
import { useRequest, useMove } from "../../hook";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";

const Login = () => {
  const isToken = useSelector(state => state.login.isToken);

  const [
    {
      data: resLogin,
      fulfilled: LoginFulfilled,
      pending: LoginPending,
      rejected: LoginRejected,
      error: LoginError
    },
    { run: postLoginApi }
  ] = useRequest(postLogin);

  const [state, setState] = useLoginEffect(
    resLogin,
    LoginFulfilled,
    LoginPending,
    LoginRejected,
    LoginError
  );

  useMove(isToken && LoginFulfilled, "");

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    postLoginApi(state);
  };
  return (
    <Layout>
      <Container>
        <Row xs="3">
          <Col></Col>

          <Col className="loginBox">
            <h1 className="loginHeader">Login</h1>
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
              <br />
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

export default Login;
