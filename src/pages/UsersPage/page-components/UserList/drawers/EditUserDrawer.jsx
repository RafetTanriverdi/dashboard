import { RTButton } from "@rt/components/RTButton";
import { Drawer } from "antd";
import { useState } from "react";

import { Form } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import EditUserPanel from "../panels/EditUserPanel";

const EditUserDrawer = ({ onClose, open, inheritedData }) => {
  const { key, name, number, role, permissions } = inheritedData;

  const [newName, setNewName] = useState(name);
  const [newNumber, setNewNumber] = useState(number);
  const [newRole, setNewRole] = useState(role);
  const [newPermissions, setNewPermissions] = useState(permissions);

  const { context, openNotification } = Notification();

  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const handleEditUser = () => {
    form
      .validateFields()
      .then(() => {
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
    phoneNumber: newNumber,
    role: newRole,
    permissions: newPermissions.filter(e=>e.includes(':'))
  };
  const mutation = useMutation({
    mutationKey: "updateUser",
    mutationFn: (updateUser) => {
      return axiosInstance.patch(
        ENDPOINTS.USER.UPDATE.replace(":userId", key),
        updateUser
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      openNotification({
        key: key,
        type: "success",
        message: "User Updated Successfully",
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
      console.error("Error: User could not be updated", error);
    },
  });

  return (
    <>
      {context}
      <Drawer
        title="Edit User"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        extra={
          <RTButton.add
            text="Save Changes"
            onClick={handleEditUser}
            loading={mutation.isPending}
          />
        }
      >
        <EditUserPanel
          form={form}
          newPermissions={newPermissions}
          setNewPermissions={setNewPermissions}
          newRole={newRole}
          setNewRole={setNewRole}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
          newName={newName}
          setNewName={setNewName}
        />
      </Drawer>
    </>
  );
};

export default EditUserDrawer;
