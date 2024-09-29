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
import { getRoutePath } from "../../routing/routes";
import { RTButton } from "@rt/components/RTButton";
import { useUserDataStore } from "@rt/data/User/UserData";
import { ROUTES_ID } from "@rt/routing/routes-id";
import awsmobile from "@rt/aws-exports";
import { useMutation } from "@tanstack/react-query";
import { updateAbilityFor } from "@rt/authorization/ability";
import { useContext } from "react";
import { AbilityContext } from "@rt/authorization/can";
import { getAuthItems } from "@rt/utils/permission-util";

Amplify.configure(awsmobile);

const LoginPageContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserData } = useUserDataStore();

  const ability = useContext(AbilityContext);
  const handleSignIn = async () => {
    try {
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
        console.log("user", user);
        navigate(getRoutePath(ROUTES_ID.dashboard));
      }
      updateAbilityFor(ability, getAuthItems());
    } catch (e) {
      console.error("error in login ", e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignIn();
    }
  };

  const mutation = useMutation({
    mutationKey: "signIn",
    mutationFn: handleSignIn,
  });

  return (
    <Form
      className="login-container"
      layout="vertical"
      onFinish={mutation.mutate}
    >
      <Card className="card-container" title="Login">
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
  );
};

const LoginPage = (props) => {
  const { title } = props.routeData;
  return <PublicLayout title={title} content={<LoginPageContainer />} />;
};

export default LoginPage;
