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

Amplify.configure(awsmobile);
const RegisterPageContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
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
              "[Product:Read,Product:Create,Product:Delete,Product:Update,Category:Create,Category:Read,Category:Update,Category:Delete,User:Create,User:Read,User:Update,User:Delete]",
          },
          // optional
          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });
    } catch (error) {
      console.error("error signing up:", error);
    }
  };

  return (
    <Form layout="vertical" className="register-container">
      <Card title="Register" className="register-card">
        <Layout
          style={{ gap: "10px", background: "none", marginBottom: "20px" }}
        ></Layout>
        <RTInput.text
          label="username"
          name="username"
          className="register-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <RTInput.text
          label="email"
          name="email"
          className="register-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <RTInput.password
          label="password"
          name="password "
          className="register-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="primary" onClick={handleSignIn}>
            Register{" "}
          </Button>
          <Button
            type="link"
            onClick={() => navigate(getRoutePath(ROUTES_ID.login))}
          >
            Login{" "}
          </Button>
        </Space>
      </Card>
    </Form>
  );
};
const RegisterPage = (props) => {
  const { title } = props.routeData;
  return <PublicLayout title={title} content={<RegisterPageContainer />} />;
};

export default RegisterPage;
