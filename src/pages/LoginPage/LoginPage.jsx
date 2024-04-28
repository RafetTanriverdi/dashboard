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
import { RTButton } from "@rt/components/RTButton";
import { useUserDataStore } from "@rt/data/User/UserData";
import GoogleSignIn from "@rt/pages/LoginPage/SocialProvider/GoogleSignIn";
import FacebookSignIn from "./SocialProvider/FacebookSignIn";
import { Layout } from "antd";

Amplify.configure(awsExports);
const LoginPageContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUserData, userData } = useUserDataStore();

  const handleSignIn = async () => {
    try {
      await signIn({
        username: email,
        password,
      });
      const user = await getCurrentUser();
      setUserData(user);
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
        <Layout style={{gap:'10px', background:'none',marginBottom:'20px'}}>
          <GoogleSignIn  text={"Sign-In With Google "}/>
          <FacebookSignIn text={'Sign-In With Facebook'} />
        </Layout>
        <RTInput.text
          label="E-mail "
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
const LoginPage = (props) => {
  const { title } = props.routeData;
  return <PublicLayout title={title} content={<LoginPageContainer />} />;
};

export default LoginPage;
