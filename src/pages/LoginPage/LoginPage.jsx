/* eslint-disable no-unused-vars */
import React from "react";
import PublicLayout from "../../layout/PublicLayout/PublicLayout";
import { Button, Form } from "antd";
import { RTInput } from "../../components/RTInput";
import "./LoginPage.scss";
import { Card } from "antd";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchAuthSession, getCurrentUser, signIn } from "aws-amplify/auth";
import { useState } from "react";
import { Amplify } from "aws-amplify";
import awsExports from "../../authentication/aws-exports";
import { getRoutePath } from "../../routing/routes";
import { ROUTES_ID } from "../../routing/routes-id";
import { RTButton } from "@ca/components/RTButton";

Amplify.configure(awsExports);
const LoginPageContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      
      const response = await signIn({
        username: email,

        password,
      });
      console.log("response from login ", response);
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("idToken", idToken);
      navigate(getRoutePath(ROUTES_ID.dashboard));
    } catch (e) {
      console.log("error in login ", e);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignIn();
    }
  };

  return (
    <Form className="login-container" layout="vertical" onFinish={handleSignIn}>
      <Card className="card-container" title="Login">
        <RTInput.text
          label="E-mail Or User Name"
          name="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <RTInput.password
          label="Password"
          name="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Space>
          <RTButton.login text="Login" />
          <RTButton.register
            onClick={() => navigate(getRoutePath(ROUTES_ID.register))}
            text="Register"
          />
        </Space>
      </Card>
    </Form>
  );
};
const LoginPage = () => {
  return <PublicLayout content={<LoginPageContainer />} />;
};

export default LoginPage;
