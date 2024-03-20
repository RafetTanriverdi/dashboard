import PublicLayout from "../../layout/PublicLayout/PublicLayout";
import { Button, Form } from "antd";
import { Card } from "antd";
import "./RegisterPage.scss";
import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsExports from "../../authentication/aws-exports";
import { RTInput } from "../../components/RTInput";
import { useNavigate } from "react-router-dom";
import { getRoutePath } from "@ca/routing/routes";
import { ROUTES_ID } from "@ca/routing/routes-id";
import { Space } from "antd";

Amplify.configure(awsExports);
const RegisterPageContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { userId } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
          // optional
          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });

      console.log(userId);
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  return (
    <Form layout="vertical" className="register-container">
      <Card title="Register" className="register-card">
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
