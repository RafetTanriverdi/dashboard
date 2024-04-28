import { Drawer } from "antd";
import NewCustomerPanel from "./NewCustomerPanel";
import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { axiosInstance } from "@rt/network/httpRequester";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import { Form } from "antd";

export const NewCustomerDrawer = ({ onClose, open }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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
    name: name,
    email: email,
    number: number,
    password: password,
    password_repeat: passwordConfirm,

  };

  const mutation = useMutation({
    mutationFn: (newCustomer) => {
      return axiosInstance.post(ENDPOINTS.USER.ADD, newCustomer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });

      openNotification({
        type: "success",
        message: "Customer Added Successfully",
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
        title="Add New Customer"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        extra={
          <RTButton.add
            text="Add New Customer"
            onClick={handleForm}
            loading={mutation.isPending}
          />
        }
      >
        <NewCustomerPanel form={form} 
        name={name} setName={setName} 
        email={email} setEmail={setEmail}
        number={number} setNumber={setNumber}
        password={password} setPassword={setPassword}
        passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm}
        
        />
      </Drawer>
    </>
  );
};
