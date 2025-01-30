import PublicLayout from "../../layout/PublicLayout/PublicLayout";
import { Button, Form } from "antd";
import { Card } from "antd";
import "./RegisterPage.scss";
import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { RTInput } from "../../components/RTInput";
import { useNavigate } from "react-router-dom";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { Space } from "antd";

import { Layout } from "antd";
import awsmobile from "@rt/aws-exports";
import { useMutation } from "@tanstack/react-query";
import { RTButton } from "@rt/components/RTButton";
import Message from "@rt/components/RTFeedback/Message/Message";

Amplify.configure(awsmobile);
const RegisterPageContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { context, openMessage } = Message();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async () => {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email: email,
            name: username,
            "custom:role": "Admin",
            "custom:phone_number": "1234567890",
            "custom:permissions":
              "Product:Read,Product:Create,Product:Delete,Product:Update,Category:Create,Category:Read,Category:Update,Category:Delete,User:Create,User:Read,User:Update,User:Delete,Order:Refund,Order:Read,Order:Update,Order:Delete,Customer:Read,Customer:Update,Customer:Delete,Customer:Details",
          },
          autoSignIn: true,
        },
      });
    },
    onSuccess: () => {
      openMessage({
        message:
          "User Registered Successfully! Please Check your email to verify your account",
        type: "success",
        onClose: () => {
          navigate(getRoutePath(ROUTES_ID.login));
        },
      });
    },
    onError: (error) => {
      openMessage({
        message: error.message,
        type: "error",
      });
    },
  });

  return (
    <>
      {context}
      <Form
        layout="vertical"
        className="register-container"
        onFinish={() => mutation.mutate()}
      >
        <Card title="Register" className="register-card">
          <Layout
            style={{ gap: "10px", background: "none", marginBottom: "20px" }}
          ></Layout>
          <RTInput.text
            label="Username"
            name="username"
            className="register-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <RTInput.text
            label="E-mail"
            name="email"
            className="register-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <RTInput.password
            label="Password"
            name="password "
            className="register-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <RTButton.login text={"Register"} loading={mutation.isPending} />

            <Button
              type="link"
              onClick={() => navigate(getRoutePath(ROUTES_ID.login))}
            >
              Login{" "}
            </Button>
          </Space>
        </Card>
      </Form>
    </>
  );
};
const RegisterPage = (props) => {
  const { title } = props.routeData;
  return <PublicLayout title={title} content={<RegisterPageContainer />} />;
};

export default RegisterPage;
