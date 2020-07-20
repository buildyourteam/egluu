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
import { useLoginApi } from "../../hook/api/authApi";
import { useLoginEffect } from "../../hook/auth/useLogin";
import { useRequest } from "../../hook";
import "./Login.css";
const Login = () => {
  const [state, setState] = useState({
    userId: "",
    password: ""
  });

  const { postLogin } = useLoginApi();

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

  useLoginEffect(
    resLogin,
    LoginFulfilled,
    LoginPending,
    LoginRejected,
    LoginError
  );

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    postLoginApi(state);
    setState({
      userId: "",
      password: ""
    });
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
