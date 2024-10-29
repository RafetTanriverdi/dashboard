/* eslint-disable no-unused-vars */
import React from "react";
import PublicLayout from "../../layout/PublicLayout/PublicLayout";
import { Button, Form } from "antd";
import { RTInput } from "../../components/RTInput";
import "./LoginPage.scss";
import { Card } from "antd";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, signIn } from "aws-amplify/auth";
import { useState } from "react";
import { Amplify } from "aws-amplify";
import { RTButton } from "@rt/components/RTButton";
import { useUserDataStore } from "@rt/data/User/UserData";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { useMutation } from "@tanstack/react-query";
import { updateAbilityFor } from "@rt/authorization/ability";
import { useContext } from "react";
import { AbilityContext } from "@rt/authorization/can";
import { getAuthItems } from "@rt/utils/permission-util";
import awsmobile from "@rt/aws-exports";
import { getRoutePath } from "@rt/routing/routes";
import GoogleSignIn from "./GoogleSignIn/GoogleSignIn";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { defaultStorage } from "aws-amplify/utils";
import Message from "@rt/components/RTFeedback/Message/Message";

Amplify.configure(awsmobile);

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);
const LoginPageContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserData } = useUserDataStore();
  const { context, openMessage } = Message();

  const ability = useContext(AbilityContext);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      mutation.mutate();
    }
  };

  const mutation = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async () => {
      const { nextStep } = await signIn({
        username: email,
        password,
      });

      if (
        nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        navigate(
          getRoutePath(ROUTES_ID.forceChangePassword) + `?email=${email}`
        );
      } else {
        const user = await getCurrentUser();
        setUserData(user);
        navigate(getRoutePath(ROUTES_ID.dashboard));
      }
      updateAbilityFor(ability, getAuthItems());
    },
    onSuccess: () => {
      openMessage({
        message: "Login successful",
        type: "success",
        duration: 2,
     
      });
    },
    onError: (error) => {
      console.error("error in login ", error);
      openMessage({
        message: error.message,
        type: "error",
        duration: 2,
      });
    },
  });

  return (
    <>
      {context}
      <Form
        className="login-container"
        layout="vertical"
        onFinish={mutation.mutate}
      >
        <Card className="card-container" title="Login">
          <GoogleSignIn text={"Google Sign In"} />
          <RTInput.text
            label="E-mail"
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
            <RTButton.login text="Login" loading={mutation.isPending} />
            <RTButton.register
              onClick={() => navigate(getRoutePath(ROUTES_ID.register))}
              text="Register"
            />
          </Space>
        </Card>
      </Form>
    </>
  );
};

const LoginPage = (props) => {
  const { title } = props.routeData;
  return <PublicLayout title={title} content={<LoginPageContainer />} />;
};

export default LoginPage;
