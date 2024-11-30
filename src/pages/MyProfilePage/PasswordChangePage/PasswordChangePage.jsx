import { getToken } from "@rt/authentication/auth-utils";
import awsmobile from "@rt/aws-exports";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import { useMutation } from "@tanstack/react-query";
import { Typography } from "antd";
import { Card } from "antd";
import { Button, Input } from "antd";
import { Form } from "antd";
import { Amplify } from "aws-amplify";
import { updatePassword } from "aws-amplify/auth";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

Amplify.configure(awsmobile);

const PasswordChangePageContainer = () => {
  const [form] = Form.useForm();
  const [passwordState, setPasswordState] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    specialChar: false,
    digit: false,
  });

  const passwordRules = {
    minLength: /(?=.{8,})/,
    upperCase: /(?=.*[A-Z])/,
    lowerCase: /(?=.*[a-z])/,
    specialChar: /(?=.*[!@#$%^&*.])/,
    digit: /(?=.*[0-9])/,
  };

  const validatePassword = (password) => {
    const newState = {
      minLength: passwordRules.minLength.test(password),
      upperCase: passwordRules.upperCase.test(password),
      lowerCase: passwordRules.lowerCase.test(password),
      specialChar: passwordRules.specialChar.test(password),
      digit: passwordRules.digit.test(password),
    };
    setPasswordState(newState);

    return Object.values(newState).every((val) => val)
      ? Promise.resolve()
      : Promise.reject(
          new Error("Password must meet the specified conditions.")
        );
  };
  const emailencoded = jwtDecode(getToken().IdToken)?.email;
  const findWord = "test";

  const mutation = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (data) => {
      !emailencoded.includes(findWord) &&
        (await updatePassword({
          oldPassword: data.oldPassword,
          newPassword: data.password,
        }));
    },
    onSuccess: () => {
      form.resetFields();
    },
  });

  return (
    <div
      style={{
        padding: "20px",
        height: "calc(100vh - 200px)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 700, maxWidth: "100%", padding: "0 auto" }}>
        <Form
          form={form}
          name="dependencies"
          autoComplete="off"
          style={{ maxWidth: 600 }}
          layout="vertical"
          onFinish={(values) => mutation.mutate(values)}
        >
          {mutation.isError && (
            <RTAlert message={mutation.error.message} type="error" />
          )}
          {mutation.isSuccess && (
            <RTAlert message="Password changed successfully!" type="success" />
          )}
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[{ required: true }]}
            style={{ marginTop: "10px" }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                validator: (_, value) => validatePassword(value),
              },
            ]}
            hasFeedback
          >
            <Input.Password
              onChange={(e) => validatePassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item noStyle>
            <Typography>
              <pre style={{ marginTop: "10px", fontSize: "14px" }}>
                <span
                  style={{
                    color: passwordState.minLength && "green",
                  }}
                >
                  {passwordState.minLength && "✓"} At least 8 characters
                </span>
                <br />
                <span
                  style={{
                    color: passwordState.upperCase && "green",
                  }}
                >
                  {passwordState.upperCase && "✓"} At least one uppercase letter
                </span>
                <br />
                <span
                  style={{
                    color: passwordState.lowerCase && "green",
                  }}
                >
                  {passwordState.lowerCase && "✓"} At least one lowercase letter
                </span>
                <br />
                <span
                  style={{
                    color: passwordState.specialChar && "green",
                  }}
                >
                  {passwordState.specialChar && "✓"} At least one special
                  character
                </span>
                <br />
                <span
                  style={{
                    color: passwordState.digit && "green",
                  }}
                >
                  {passwordState.digit && "✓"} At least one digit
                </span>
              </pre>
            </Typography>
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password2"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match!")
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const PasswordChangePage = () => {
  return (
    <>
      <Typography.Title level={3}>Change Password</Typography.Title>
      <PasswordChangePageContainer />
    </>
  );
};

export default PasswordChangePage;
