/* eslint-disable no-unused-vars */
import React from "react";
import PublicLayout from "../../Layout/PublicLayout/PublicLayout";
import RTHeader from "../../Components/RTHeader/RTHeader";
import { Button, Form } from "antd";
import { RTInput } from "../../Components/RTInput";
import "./LoginPage.scss";
import { Card } from "antd";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchAuthSession, signIn, signOut } from "aws-amplify/auth";
import { getRoutePath } from "../../Routes/routes";
import { ROUTES_ID } from "../../Routes/routes-id";
import { useState } from "react";
import { Amplify } from "aws-amplify";
import awsExports from "@rt/Authentication/aws-exports";

Amplify.configure(awsExports);
const LoginPageContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { isSignedIn, nextStep } = await signIn({ username:email, password });
    console.log("isSignedIn", isSignedIn);
    console.log("nextStep", nextStep);

    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("idToken", idToken);
    navigate(getRoutePath(ROUTES_ID.dashboard));
  };

  return (
    <Form className="login-container" layout="vertical">
      <Card className="card-container" title="Login">
        <RTInput.text
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="email"
          name="email"
        />
        <RTInput.password
          label="password"
          name="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Space>
          <Button type="primary" onClick={handleSignIn}>
            Login{" "}
          </Button>
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
