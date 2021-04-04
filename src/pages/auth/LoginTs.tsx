import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { Layout } from "../../components";
import { useRequest, useMove } from "../../hook";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import { useLoginEffect } from "../../hook/auth";

const { Title } = Typography;

function LoginPage() {
  const [onFinish, onFinishFailed] = useLoginEffect();

  return (
    <Layout>
      <Title className="login_title">Login</Title>
      <div className="login_box">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="userId"
            name="userId"
            className="login_input_form"
            rules={[{ required: true, message: "ID를 입력하셔야 합니다." }]}
          >
            <Input className="login_input" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            className="login_input_form"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력하셔야 합니다.",
                whitespace: true,
              },
            ]}
          >
            <Input type="password" className="login_input" />
          </Form.Item>
          <Form.Item className="login_submit">
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}

export default LoginPage;
