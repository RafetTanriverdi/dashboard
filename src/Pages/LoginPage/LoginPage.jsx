/* eslint-disable no-unused-vars */
import React from "react";
import PublicLayout from "../../Layout/PublicLayout/PublicLayout";
import RTHeader from "../../Components/RTHeader/RTHeader";
import { Button, Form } from "antd";
import { RTInput } from "../../Components/RTInput";
import "./LoginPage.scss";
import { Card } from "antd";
import { Space } from "antd";

const LoginPageContainer = () => {
  return (
    <Form className="login-container">
      <Card className="card-container" title='Login' >
        <RTInput.text className="input" />
        <RTInput.password className="input" />
        <Space>
          <Button type="primary">Login </Button>
          <Button type="link">Register </Button>
        </Space>
      </Card>
    </Form>
  );
};
const LoginPage = () => {
  return (
    <PublicLayout header={<RTHeader />} content={<LoginPageContainer />} />
  );
};

export default LoginPage;
