import awsmobile from "@rt/aws-exports";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { Form } from "antd";
import { Amplify } from "aws-amplify";
import { updatePassword } from "aws-amplify/auth";

Amplify.configure(awsmobile);

const PasswordChangePage = () => {
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (data) => {
      await updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.password,
      });
    },
    onSuccess: () => {
      form.resetFields();
    }
  });
  return (
    <div style={{ padding: "20px" }}>
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
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="password2"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isPending}>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordChangePage;
