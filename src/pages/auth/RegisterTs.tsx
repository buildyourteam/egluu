import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { Layout } from "../../components";
import { useRegisterEffect } from "../../hook/auth";

const { Title } = Typography;

const RegisterPage = () => {
  const [onFinish, onFinishFailed] = useRegisterEffect();

  return (
    <Layout>
      <Title className="login_title">Create your Account</Title>
      <div className="login_box">
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="userId"
            name="userId"
            className="login_input_form"
            rules={[{ required: true, message: "ID를 입력하셔야 합니다." }]}
          >
            <Input className="login_input" />
          </Form.Item>
          <Form.Item
            label="userEmail"
            name="userEmail"
            className="login_input_form"
            rules={[{ required: true, message: "Email을 입력하셔야 합니다." }]}
          >
            <Input className="login_input" />
          </Form.Item>
          <Form.Item
            label="name"
            name="name"
            className="login_input_form"
            rules={[{ required: true, message: "Name을 입력하셔야 합니다." }]}
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
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
