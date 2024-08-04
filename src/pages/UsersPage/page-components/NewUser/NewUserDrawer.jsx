import { Drawer } from "antd";
import NewUserPanel from "./NewUserPanel";
import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { axiosInstance } from "@rt/network/httpRequester";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import { Form } from "antd";

export const NewUserDrawer = ({ onClose, open }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);

  const queryClient = useQueryClient();

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();

  const handleForm = () => {
    form
      .validateFields()
      .then(() => {
        mutation.mutate(postBody);
      })
      .catch((error) => {
        console.error("Error: Please fill out all fields", error);
        openNotification({
          type: "error",
          message: `Error: Please fill out all fields`,
          duration: 2.5,
        });
      });
  };

  const postBody = {
    name,
    email,
    phoneNumber,
    role,
    permissions,
  };

  const mutation = useMutation({
    mutationFn: (newUser) => {
      return axiosInstance.post(ENDPOINTS.USER.ADD, newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      openNotification({
        type: "success",
        message: "User Added Successfully",
        duration: 2,
        onClose: () => {
          onClose();
          form.resetFields();
        },
      });
    },
    onError: (error) => {
      const Error = error.response.data.message;
      openNotification({
        type: "error",
        message: `Error: ${Error}`,
        duration: 2,
      });
    },
  });

  return (
    <>
      {context}
      <Drawer
        title="Add New User"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        extra={
          <RTButton.add
            text="Add New User"
            onClick={handleForm}
            loading={mutation.isPending}
          />
        }
      >
        <NewUserPanel
          form={form}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          role={role}
          setRole={setRole}
          permissions={permissions}
          setPermissions={setPermissions}
        />
      </Drawer>
    </>
  );
};