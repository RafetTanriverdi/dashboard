import PublicLayout from "../../Layout/PublicLayout/PublicLayout";
import RTHeader from "../../Components/RTHeader/RTHeader";
import { Button, Form } from "antd";
import { RTInput } from "../../Components/RTInput";
import { Card } from "antd";
import "./RegisterPage.scss";
import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsExports from "@rt/Authentication/aws-exports";

Amplify.configure(awsExports)
const RegisterPageContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const { userId } = await signUp({
        username:email,
        password,
        options: {
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
        <Button type="primary" onClick={handleSignIn}>
          Register{" "}
        </Button>
      </Card>
    </Form>
  );
};
const RegisterPage = () => {
  return (
    <PublicLayout header={<RTHeader />} content={<RegisterPageContainer />} />
  );
};

export default RegisterPage;
