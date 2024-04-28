import { RTButton } from "@rt/components/RTButton";
import { Drawer } from "antd";
import { useState } from "react";
import EditCustomerPanel from "../panels/EditCustomerPanel";
import { Form } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";

const EditCustomerDrawer = ({ onClose, open, inheritedData }) => {
  const { key, name, number, email, password } = inheritedData;

  const [newName, setNewName] = useState(name);
  const [newNumber, setNewNumber] = useState(number);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState(password);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(password);

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const handleEditCustomer = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("values", values);
        mutation.mutate(postBody);
      })
      .catch((error) => {
        openNotification({
          type: "error",
          message: `Error: Please fill out all fields`,
          duration: 2.5,
        });
        console.error("Error: Please fill out all fields", error);
      });
  };

  const postBody = {
    name: newName,
  };

  console.log("postBody", postBody);

  const mutation = useMutation({
    mutationKey: "updateCustomer",
    mutationFn: (updateCustomer) => {
      return axiosInstance.put(
        ENDPOINTS.USER.UPDATE.replace(":userId", key),
        updateCustomer
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      openNotification({
        key: key,
        type: "success",
        message: "Customer Edit Successfully",
        duration: 2,
        onClose: () => {
          onClose();
        },
      });
    },
    onError: (error) => {
      const Error = error.response.data.message;
      openNotification({
        type: "error",
        message: `Error:${Error}`,
        duration: 2.5,
      });
      console.error("Error: Customer could not be updated", error);
    },
  });

  return (
    <>
      {context}
      <Drawer
        title="Edit Customer"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        extra={
          <RTButton.add
            text="Save Changes"
            onClick={handleEditCustomer}
            loading={mutation.isPending}
          />
        }
      >
        <EditCustomerPanel
          form={form}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          newPasswordConfirm={newPasswordConfirm}
          setNewPasswordConfirm={setNewPasswordConfirm}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
          newName={newName}
          setName={setNewName}
        />
      </Drawer>
    </>
  );
};

export default EditCustomerDrawer;
