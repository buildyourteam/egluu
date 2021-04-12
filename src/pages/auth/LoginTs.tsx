import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { Layout } from "../../components";
import "./Login.css";
import { useLoginEffect } from "../../hook/auth";

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function LoginPage() {
  const {loading, onFinish, onFinishFailed} = useLoginEffect();
  return (
    <Layout>
      <Title level={3} className="login_title">
        Login
      </Title>
      <div className="login_box">
        <Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="UserId"
            name="userId"
            rules={[{ required: true, message: "ID를 입력하셔야 합니다." }]}
          >
            <Input className="login_input" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
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
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              로그인
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}

export default LoginPage;
