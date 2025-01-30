import awsmobile from "@rt/aws-exports";
import { RTButton } from "@rt/components/RTButton";
import { RTInput } from "@rt/components/RTInput";
import LoginLayout from "@rt/layout/LoginLayout/LoginLayout";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { Card } from "antd";
import { Form } from "antd";
import { Amplify } from "aws-amplify";
import { confirmSignIn } from "aws-amplify/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

Amplify.configure(awsmobile)
const ForceChangePasswordPageContainer = () => {
  const [newPassword, setNewPassword] = useState("");
const navigate = useNavigate();

  async function handlePasswordChange() {
    try {
      const { isSignedIn } = await confirmSignIn({
        challengeResponse: newPassword,
        options:{
          autoSignIn: true
        }
      })

      if (isSignedIn) {
        navigate(getRoutePath(ROUTES_ID.dashboard));
      } 
    } catch (error) {
      console.error("Error confirming sign in", error);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePasswordChange();
    }
  };

  return (
    <Form layout="vertical" onFinish={handlePasswordChange}>
      <Card className="card-container" title="New Password">
        <RTInput.password
          label="Password"
          name="password"
          className="input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <RTButton.login text="Change Password" />

      </Card>
    </Form>
  );
};

function ForceChangePasswordPage(props) {
  const { title } = props.routeData;
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  if (!email) {
    return <Navigate to={getRoutePath(ROUTES_ID.login)} />;
  } else {
    return (
      <LoginLayout
        content={<ForceChangePasswordPageContainer />}
        title={title}
      />
    );
  }
}

export default ForceChangePasswordPage;
